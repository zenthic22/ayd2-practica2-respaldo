# Práctica 2 de Análisis y Diseño 2

## Descripción del proyecto

**ClimaGT** es una aplicación web responsiva que permite consultar en tiempo real el estado meteorológico, la temperatura y la calidad del aire de Ciudad de Guatemala. Está diseñada con arquitectura de **microservicios** y se estructura de la siguiente manera:

### Arquitectura

- **Backend (Node.js + Express)**  
  - `microservicio-clima`: obtiene pronóstico diario y temperaturas horarias desde la API de Open-Meteo.  
  - `microservicio-aire`: consulta el índice de calidad del aire (AQI) actual, por hora y promedio diario vía la API de Air Quality de Open-Meteo.  
  - `microservicio-temperatura`: (en desarrollo) expondrá datos de “sensación térmica” o temperatura aparente.

- **Frontend (React + React-Bootstrap + Recharts)**  
  - Ruteo con React Router para vistas de clima, temperatura y calidad del aire.  
  - Componentes que consumen los endpoints de cada microservicio.  
  - Tarjetas informativas y gráficos interactivos para visualización de datos.

### Características principales

- Consultas en **tiempo real** sobre clima y calidad del aire.  
- Interfaz **responsive** y accesible desde dispositivos móviles y escritorio.  
- Escalabilidad mediante contenedores (Docker/Kubernetes).  
- Fácil integración de nuevos servicios (p. ej. índice UV, precipitaciones).

### Tecnologías

- **Backend:** Node.js, Express, Axios  
- **Frontend:** React, React-Bootstrap, Recharts, React Router  
- **Infraestructura:** Docker, Kubernetes  
- **APIs externas:** Open-Meteo (clima y calidad del aire)


## DIAGRAMA DE BLOQUES

![imagen](https://github.com/user-attachments/assets/52cbc9ee-d750-4bd7-8960-a72ffc96366a)



## COLECCIÓN DE POSTMAN:

### Microservicio Calidad del Aire

--------- CALIDAD DEL AIRE ACTUAL -------------
Link: http://localhost:3002/micro-aire/actual
Método: GET

![imagen](https://github.com/user-attachments/assets/0ac3ef0f-561d-4760-b2f9-7ad4d6d2ea8f)


--------- CALIDAD DEL AIRE PRÓXIMAS 24 HORAS ----------
Link: http://localhost:3002/micro-aire/horario
Método: GET

![imagen](https://github.com/user-attachments/assets/6d878b19-9114-4a0a-8670-21413b9d22b3)


--------- CALIDAD DEL AIRE PROMEDIO DIARIO ------------
Link: http://localhost:3002/micro-aire/diario
Método: GET

![imagen](https://github.com/user-attachments/assets/68fbd58a-fa0a-4729-a5ee-f0e72ffcdeb8)

