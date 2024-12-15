const {listEvents, eventById, newEvent, updateEvent, deleteEvent, upcomingEvents, typeEvent, filterEvent, registrerUpload } = require('../Controller/eventos.controller')
const upload = require('../middleware/files');
const router = require('./usuarios.routes');

//Rutas para la gestion de eventos (JWT)
router.get("/events", listEvents);
router.get("/events", eventById);
router.post("/events", newEvent);
router.put("/update/:id", updateEvent);
router.delete("/delete/:id", deleteEvent);

//Rutas para la consulta avanzada de eventos
router.get("/events/upcoming", upcomingEvents);
router.get("/events?type", typeEvent)
router.get("/events/date?from=2023-09-10&to=2023-09-20", filterEvent)

//Ruta para las imagenes
router.post("/upload", upload.single("image"), registrerUpload);
