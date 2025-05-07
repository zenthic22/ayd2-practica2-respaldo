
output "ip_clima" {
  description = "Elastic IP pública para el microservicio clima"
  value       = aws_eip.clima_ip.public_ip
}

output "ip_temperatura" {
  description = "Elastic IP pública para el microservicio temperatura"
  value       = aws_eip.temperatura_ip.public_ip
}

output "ip_aire" {
  description = "Elastic IP pública para el microservicio aire"
  value       = aws_eip.aire_ip.public_ip
}

output "ip_frontend" {
  description = "Elastic IP pública para el frontend React"
  value       = aws_eip.frontend_ip.public_ip
}
