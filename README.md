# Sistema de reservas de mesas en restaurantes
#### Descripción

Back-end y front-end desarrollado en JavaScript con Node.Js & Express.js que implementa  un sistema de reservas de mesas en restaurantes, donde el sistema tendrá que mantener un registro de las mesas de un restaurante con sus coordenadas en cada restaurante y la capacidad de cada una de ellas. Ademas de poder registrar las reservas en un rango de horario. 

#### Herramientas utilizadas

**Editor de Código :**  Visual Studio Code 

**Lenguaje de Programación:** JavaScript 

**SGBD:** PostgreSQL version-13  

**Stack tecnológico JEE del proyecto:**

- Modelo y capa de persistencia: Sequelize ORM 
- Capa de negocios : Express.Js & Node.js 
- Capa de exposición o presentación de servicios RESTful: Express.js 
- Front-end : desarrollado en React.js 

**Para testing de requests:** Extensión de VS CODE - Thunder Client 

#### **Development team**

- Alex Gómez
- Victor Gonzalez 

#### Módulos del Sistema:

- Administración de datos de Restaurante.

- Administración de datos de las mesas. 

- Administración de datos del cliente.

- Registro de Reserva de mesas. 

  

#### ¿Cómo utilizar? 

**1.Crear base de datos**

Crear una base de datos con el nombre `srmr`. 

**2.Construir el proyecto**

2.1.Cuando el proyecto se ejecuta por primera vez es conveniente asegurarse de que las dependencias se instalan correctamente  utilizando, `npm install`

2.2.Luego, para construir el proyecto solo se necesita ejecutar `npm run start`, automaticamente creara las tablas y relaciones en la base de datos.  El backend se levantara en el puerto : http://localhost:8080/

2.3. Para utilizar el front-end, dirigirse a la carpeta .~/front y ejecutar `npm install` luego `npm run start` y se levantara en el puerto : http://localhost:3000/



**La siguiente tabla muestra un  resumen de las solicitudes del API RESTful ( ENDPOINTS ) :**



| Method | URLS                                 | Actions                                             |
| ------ | ------------------------------------ | --------------------------------------------------- |
| POST   | http://localhost:8080/restaurantes   | Agregamos un nuevo restaurante en la base de datos. |
| GET    | http://localhost:8080/restaurantes/1 | Obtenemos un restaurante by ID                      |
| GET    | http://localhost:8080/restaurantes   | Obtenemos todos los restaurantes del sistema        |
| PUT    | http://localhost:8080/restaurantes/1 | Actualizamos algun dato de algún restaurante.       |
| DELETE | http://localhost:8080/restaurantes/1 | Borra un restaurante by ID                          |
| DELETE | http://localhost:8080/restaurantes   | Borra todos los restaurantes del sistema            |
| POST   | http://localhost:8080/mesas          | Creamos mesas para un restaurante.                  |
| GET    | http://localhost:8080/mesas/3        | Obtenemos una mesa by ID                            |
| GET    | http://localhost:8080/mesas          | Obtenemos todas las mesas del sistema               |
| PUT    | http://localhost:8080/mesas/1        | Obtenemos las mesas by ID                           |
| DELETE | http://localhost:8080/mesas/2        | Borra una mesa by ID                                |
| DELETE | http://localhost:8080/mesas          | Borra todas las mesas del sistema                   |
| POST   | http://localhost:8080/clientes/      | Crea un cliente                                     |
| GET    | http://localhost:8080/clientes/1     | Obtiene en cliente by ID                            |
| GET    | http://localhost:8080/clientes       | Obtiene todos los clientes del sistema              |
| PUT    | http://localhost:8080/clientes/1     | Actualiza algún dato de un cliente                  |
| DELETE | http://localhost:8080/clientes/2     | Borra un cliente by ID                              |
| DELETE | http://localhost:8080/clientes       | Borra todos los clientes de la base de datos        |



Finalmente para utilizar la API RESTful, instalar la extensión Thunder Client de VSCODE y exportar el archivo `Sistema de reservas de mesas en restaurantes.json` que se encuentra en el directorio scripts. Alli se encuentran los endpoints para testear y probar el backend. 

