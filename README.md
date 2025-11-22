
# Eventify - Sistema de Gestión de Eventos

Eventify es una aplicación backend en Node.js + Express con vistas EJS y base de datos MongoDB. Permite registrar usuarios, iniciar sesión mediante JWT, y administrar eventos (crear, listar, editar y eliminar).
El sistema fue desarrollado para resolver un problema real:
la falta de una herramienta simple, unificada y moderna para organizar eventos de forma ordenada, con control financiero y seguimiento de invitados y proveedores.

Es una aplicación escalable, rápida, segura y presentada con vistas simples e intuitivas.


## Características principales

- Gestión de eventos
   - Crear, editar y eliminar eventos
   - Definir presupuesto
   - Registrar fecha, nombre y detalles
   
- Gestión de proveedores
   - CRUD completo (alta/baja/modificación)
   - Vínculo a eventos
   - Costos estimados por servicio

- Gestión de invitados
   - CRUD completo
   - Asignación a eventos
   - Estados:
       Pendiente
       Confirmado
       Rechazado

- Gestión de gastos
   - Monto, descripción y proveedor
   - Afecta automáticamente al presupuesto del evento

- Dashboard del evento
   - Presupuesto total
   - Gastado
   - Restante
   - % consumido
   - Invitados por estado
   - Proveedores asignados
   - Lista de gastos
   - Todo centralizado en una vista

Autenticación segura


## Tecnologías
- Node.js
- Express
- MongoDB / Mongoose
- JWT (jsonwebtoken)
- EJS
- Render (deploy)
- MongoDB Atlas (base de datos en la nube)


## Variables de entorno
Crear un archivo .env en la raíz del proyecto con:
PORT=3000
MONGO_URI=<tu_string_de_conexión>
JWT_SECRET=<tu_clave_secreta>


## Instalación
 1. Clonar el repositorio
    git clone <URL-del-repo>
 2. npm install
    npm install 
 3. Crear archivo .env con las variables necesarias
 4. Iniciar el servidor
    npm start
La aplicación queda disponible en: 
    https://localhost:3000    
    

## Deploy (Render)

1. Subir el proyecto a GitHub
2. Crear un Web Service en Render.
3. Configurar:
   - Build Command: npm install
   - Start Command: npm start
4. Agregar las variables de entorno en Render.
5. Aceptar y desplegar.
Render iniciará el servidor automáticamente.


## Estructura del proyecto
/models
/routes
/views
/public
/app.js

## Screenshots




## Authors
- Equipo 1 - Comisión B - Proyecto académico "Eventify"

