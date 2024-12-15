# Introduccion

··· Descripcion General
La API de eventos deportivos permite acceder a datos sobre estos eventos, incluyendo sus fechas, ubicaciones, tipo de deporte y demás. También proporciona funcionalidades àra filtrar eventos crear nuevos, actualizar existentes y eliminarlos.

- Propósito
Esta API está diseñada para integrarse en aplicaciones web o móbiles que requieran información sobre eventos deportivos.

- Puerto
El puerto utilizado es el 3500.

- Método
La API utiliza autenticación mediante tokens JWT.

- Modelos
El modelo de datos de los usuarios obtiene la siguiente información: ID - USERNAME - PASSWORD - ROLE (que por defecto se le asigna el de cliente).

El modelo de datos de los eventos obtiene la siguiente información: ID - NOMBRE - DESCRIPCION - FECHA - UBICACION - TIPO DE DEPORTE - ORGANIZADR 


- Endpoints

De los eventos:
. GET/events: listEvents = para obtener una lista de los eventos.
. GET/events: eventById = para filtrar los eventos por ID.
. POST/events: newEvent = para dar de alta un evento.
. PUT/update/:id: updateEvent = para actualizar un evento.
.DELETE/delete/:id: deleteEvent = para eliminar un evento.
.GET/events/upcoming: upcomingEvents = para filtrar los próximos eventos.
.GET/events?type: typeEvent = para filtrar por tipo de evento.
.GET/events/date?from=2023-09-10&to=2023-09-20: filterEvent = para filtrar un evento por una fecha en específico.

De los usuarios:
.POST/registrer: registrerUser = para registrar un nuevo usuario.
.POST/login: loginUser = para que se loguee un usuario ya existente.
.GET/listUsers: getUsers = devuelve información del usuario.
