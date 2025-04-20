import controller from '../controllers/panelEmpleador.js';


// Listado de libros que se obtienen desde el API
document.getElementById("btnListar").addEventListener('click',(event)=>{
    event.preventDefault();
    controller.obtenerTrabajos();
});

// Guardar un libro en el servidor por medio del API
document.getElementById("btnGuardar").addEventListener('click',(event)=>{
    event.preventDefault();
    controller.crearTrabajo();
});

// Actualizar los datos de un libro
document.getElementById("btnActualizar").addEventListener('click',(event)=>{
    event.preventDefault();
    controller.actualizarTrabajo();
});

// Actualizar los datos de un libro
document.getElementById("btnLimpiar").addEventListener('click',(event)=>{
    event.preventDefault();
    controller.limpiar();
});
