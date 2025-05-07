// infra/main.tf
provider "aws" {
  region = var.aws_region
}

resource "aws_security_group" "app_sg" {
  name        = "app-sg"
  description = "Permite SSH (22) y puertos de servicios (3000-3002, 4500)"

  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
  ingress {
    from_port   = 3000
    to_port     = 3002
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
  ingress {
    from_port   = 4500
    to_port     = 4500
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

// Función común de user_data
locals {
  user_data_common = <<-EOF
    #!/bin/bash
    # Actualizar repos y paquetes
    yum update -y
    # Instalar Git (no disponible en amazon-linux-extras)
    sudo yum install -y git
    # Instalar Docker
    amazon-linux-extras install docker -y
    service docker start
    usermod -a -G docker ec2-user


    # Configurar credenciales Git en .netrc
    cat > /home/ec2-user/.netrc <<NETRC
machine github.com
login ${var.git_username}
password ${var.git_token}
NETRC
    chown ec2-user:ec2-user /home/ec2-user/.netrc
    chmod 600 /home/ec2-user/.netrc

    cd /home/ec2-user
    # Clonar o actualizar el repositorio
    if [ ! -d infra ]; then
      git clone -b develop ${var.repo_url} infra
    else
      cd infra && git pull  --rebase origin develop 
    fi
  EOF
}

// Instancia para microservicio clima
resource "aws_instance" "clima" {
  ami                         = var.ami_id
  instance_type               = var.instance_type
  vpc_security_group_ids      = [aws_security_group.app_sg.id]
  associate_public_ip_address = true
  root_block_device {
    delete_on_termination = true
  }
  user_data = <<-EOF
${local.user_data_common}
    # Desplegar microservicio clima
    cd infra/backend/microservicio-clima
    docker build -t clima-image .
    docker run -d --name clima -p 3001:3001 clima-image
  EOF

  tags = { Name = "srv-clima" }
}
resource "aws_eip" "clima_ip" {
  vpc      = true
  instance = aws_instance.clima.id
}

// Instancia para microservicio temperatura
resource "aws_instance" "temperatura" {
  ami                         = var.ami_id
  instance_type               = var.instance_type
  vpc_security_group_ids      = [aws_security_group.app_sg.id]
  associate_public_ip_address = true
  root_block_device {
    delete_on_termination = true
  }
  user_data = <<-EOF
${local.user_data_common}
    # Desplegar microservicio temperatura
    cd infra/backend/microservicio-temperatura
    docker build -t temperatura-image .
    docker run -d --name temperatura -p 3000:3000 temperatura-image
  EOF

  tags = { Name = "srv-temperatura" }
}
resource "aws_eip" "temperatura_ip" {
  vpc      = true
  instance = aws_instance.temperatura.id
}

// Instancia para microservicio aire
resource "aws_instance" "aire" {
  ami                         = var.ami_id
  instance_type               = var.instance_type
  vpc_security_group_ids      = [aws_security_group.app_sg.id]
  associate_public_ip_address = true
  root_block_device {
    delete_on_termination = true
  }
  user_data = <<-EOF
${local.user_data_common}
    # Desplegar microservicio aire
    cd infra/backend/microservicio-aire
    docker build -t aire-image .
    docker run -d --name aire -p 3002:3002 aire-image
  EOF

  tags = { Name = "srv-aire" }
}
resource "aws_eip" "aire_ip" {
  vpc      = true
  instance = aws_instance.aire.id
}

// Instancia para frontend React
resource "aws_instance" "frontend" {
  ami                         = var.ami_id
  instance_type               = var.instance_type
  vpc_security_group_ids      = [aws_security_group.app_sg.id]
  associate_public_ip_address = true
  root_block_device {
    delete_on_termination = true
  }
  user_data = <<-EOF
${local.user_data_common}
    # Desplegar frontend React
    cd infra/app
    docker build -t frontend-image .
    docker run -d --name frontend -p 4500:80 frontend-image
  EOF

  tags = { Name = "srv-frontend" }
}
resource "aws_eip" "frontend_ip" {
  vpc      = true
  instance = aws_instance.frontend.id
}
