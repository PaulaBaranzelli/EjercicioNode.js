const { checkToken } = require("../middleware/auth");
const jwt = require("../../utils/jwt");
const Eventos = require("../models/eventos.model");
const Events = require("../models/eventos.model");



//Rutas para la gestion de eventos
const listEvents = async (req, res) =>{ 
    try {
       const list = await Eventos.find().populate("nombre");
       return res.json(list); 

    } catch (error){
     console.log(error);
     return res.status(500).json({ message: "Se ha producido un error al intentar obtener la lista de eventos" });
    }
  
 };

 const eventById = async (req, res) =>{ 
    try {
       const idEvento = req.body.id; 
       const data = await Eventos.find({id: idEvento});
       return res.json(data); 

    } catch (error){
     console.log(error);
     return res.status(404).json({message: "Se ha producido un error al intentar obtener el evento"});
    }
  
 };

 const newEvent = async (req, res) =>{ 
    try {
      // Verificar si el usuario tiene rol de administrador
      if (req.user?.role !== 'admin') {
         return res.status(403).json({ message: "No se puede completar la acción: el usuario debe ser administrador" });
     }
     // Verificar si ya existe un evento con el mismo nombre
     const eventoExistente = await Eventos.findOne({ nombre: req.body.nombre });
     if (eventoExistente) {
         return res.status(400).json({ message: "El evento ya existe" });
     }
     // Crear un nuevo evento con los datos del cuerpo de la solicitud
     const newEvento = new Eventos(req.body);
     const createdEvento = await newEvento.save();

     return res.status(201).json({
         success: true,
         message: "Evento creado",
         data: createdEvento,
     });
   } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "No se ha podido crear el evento" });
  }
};
     
 const updateEvent = async (req, res) =>{ 
    const id = req.params.id;
    const evento = req.body;
    try {
       const updatedEvent = await Eventos.findByIdAndUpdate(id, evento, {new: true});
       return res.json(updatedEvent)
              
    } catch (error){
     console.log(error);
    }
  
 };

 const deleteEvent = async (req, res) =>{ 
    try {
      if(checkToken(req.user.role)){
       const deleteEvento = await Eventos.findByIdAndDelete(req.params.id);
       return res.json(deleteEvento); 
      }
    } catch (error){
     console.log(error);
     return res.status(500).json({ message: "No se ha podido completar la acción" });
    }
  
 };

 //Rutas para la consulta avanzada
 const upcomingEvents = async (req, res) =>{ 
    try {
       const hoy = new Date();
       const eventosProximos = Eventos
       .filte(evento => new Date(Eventos.fecha) >= hoy)
       .sort((a,b) => new Date(a.fecha) - new Date(b.fecha));
       return res.json({
        success: true,
        Eventos: eventosProximos
       });
       
    } catch (error){
     console.log(error);
     return res.status(500).json({ message: 'No se pudo completar la acción' });
    }
  
 };

 const typeEvent = async (req, res) =>{ 
    try {
      const {tipoDeporte} = req.query; 
       const data = await Eventos.find({type: tipoDeporte });
              
      if (data.length === 0) {
                
          return res.status(404).json({message: "No se han encontrado resultados" }); 
       } else{
            return res.json(data);
       }

    } catch (error){
     console.log(error);
     return res.status(500).json({message: "Se ha producido un error al intentar obtener el evento buscado" });
    }
  
 };

 const filterEvent = async (req, res) =>{ 
    try {
       const tipoDeporte = req.query.type;
       if(!tipoDeporte){
        return res.json({
            success: true,
            eventos: Eventos
        });
       }
       const eventosFiltrados = Eventos.filter(evento => evento.tipoDeporte === tipoDeporte.toLowerCase());
        if(eventosFiltrados.length === 0){
            return res.statuts(400).json({
                success: false,
                message: "No se encontraron eventos"
            });
        }
        return res.json({
            success: true,
            eventos: eventosFiltrados
        });

    } catch (error){
     console.log(error);
     return res.status(500).json({ message: "No se pudo completar la acción" });
    }
  
 };

 const registrerUpload = async (req, res) => { 
    const newEvent = new Eventos (req.body);
    if(req.file.path){
        newEvent.image = req.file.path;
    }
    const createdEvento = await newEvent.save();
    return res.json(createdEvento);
 };

 module.exports = { listEvents, eventById, newEvent, updateEvent, deleteEvent, upcomingEvents, typeEvent, filterEvent, registrerUpload  };