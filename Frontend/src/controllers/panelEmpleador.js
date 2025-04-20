import api from '../services/panelEmpresarial.js';
import { Job } from '../models/job.js';

export async function crearTrabajo() {

    try { 

        const titulo = document.getElementById("titulo").value;
        const descripcion = document.getElementById("descripcion").value;
        const salario = document.getElementById("salario").value;
        const ubicacion = document.getElementById("ubicacion").value;
        const tipoTrabajo = document.getElementById("tipoTrabajo").value;
        const modalidad = document.getElementById("modalidad").value;
        const vencimiento = document.getElementById("vencimiento").value;

        const nuevoEmpleo = new Job(titulo,descripcion,salario,ubicacion,tipoTrabajo,modalidad,vencimiento);
      
        const respuesta = await api.crearTrabajo(nuevoEmpleo);

      //4. Mostrar los datos en el formulario
        document.getElementById("id").value = respuesta._id;

    } catch (error) {
    console.log(error);
    }
}

export async function obtenerTrabajos() { 

    try {    
        const empleos = await api.obtenerTrabajos();
        console.log(empleos);
        const tablaEmpleos = document.getElementById("tablaEmpleos");
        tablaEmpleos.innerHTML = "";    
        
        empleos.forEach(empleo => {
            let row = tablaEmpleos.insertRow();
            row.insertCell(0).innerHTML = empleo.titulo;
            row.insertCell(1).innerHTML = empleo.descripcion;
            row.insertCell(2).innerHTML = empleo.salario;
            row.insertCell(3).innerHTML = empleo.ubicacion;
            row.insertCell(4).innerHTML = empleo.tipoTrabajo;
            row.insertCell(5).innerHTML = empleo.modalidad;
            row.insertCell(6).innerHTML = empleo.vencimiento; 

            const btnModificar = document.createElement('button');
            btnModificar.className = 'formbold-btn-sucess';
            btnModificar.textContent = 'Modificar';
            btnModificar.onclick = () => cargarEmpleo(`${empleo._id}`);            
            row.insertCell(7).appendChild(btnModificar);            
            
            const btnEliminar = document.createElement('button');
            btnEliminar.className = 'formbold-btn-danger';
            btnEliminar.textContent = 'Eliminar';
            btnEliminar.onclick = () => eliminarTrabajo(empleo._id);            
            row.insertCell(8).appendChild(btnEliminar); 
        });

    } catch (error) {
    console.log(error);
    }
}

export async function cargarEmpleo(id) {
    try {
        const empleos = await api.obtenerTrabajoPorId(id);

        console.log("Empleo cargado desde API:", empleos);
        
        document.getElementById("id").value = empleos._id;
        document.getElementById("titulo").value = empleos.titulo;
        document.getElementById("descripcion").value = empleos.descripcion;
        document.getElementById("salario").value = empleos.salario;
        document.getElementById("ubicacion").value = empleos.ubicacion;
        document.getElementById("tipoTrabajo").value = empleos.tipoTrabajo;
        document.getElementById("modalidad").value = empleos.modalidad;
        document.getElementById("vencimiento").value = empleos.vencimiento;

    } catch (error) {
        console.log(error);
    }
};

export async function actualizarTrabajo() {

    try { 
        const id = document.getElementById("id").value;
        const titulo = document.getElementById("titulo").value;
        const descripcion = document.getElementById("descripcion").value;
        const salario = document.getElementById("salario").value;
        const ubicacion = document.getElementById("ubicacion").value;
        const tipoTrabajo = document.getElementById("tipoTrabajo").value;
        const modalidad = document.getElementById("modalidad").value;
        const vencimiento = document.getElementById("vencimiento").value;

        const empleoModificado = new Job(titulo, descripcion, salario, ubicacion, tipoTrabajo, modalidad, vencimiento, id);        
        console.log(empleoModificado)

        const respuesta = await api.actualizarTrabajo(empleoModificado);
  
        //4. Mostrar los datos en el formulario
        console.log(`Empleo modificado: ${respuesta}`)
  
      } catch (error) {
      console.log(error);
      }
}

export async function eliminarTrabajo(id) {

    try {    
        // const id = document.getElementById("id").value;
        const respuesta = await api.eliminarTrabajo(id);
        
        console.log(`Empleo eliminado: ${respuesta}`)

        await obtenerTrabajos();

    } catch (error) {
    console.log(error);
    }
}

export async function limpiar() {
    document.getElementById("id").value = "";
    document.getElementById("titulo").value = "";
    document.getElementById("descripcion").value = "";
    document.getElementById("salario").value = "";
    document.getElementById("ubicacion").value = "";
    document.getElementById("tipoTrabajo").value = "";
    document.getElementById("modalidad").value = "";
    document.getElementById("vencimiento").value = "";
}

export default{
    crearTrabajo,
    obtenerTrabajos,
    actualizarTrabajo,
    eliminarTrabajo,
    limpiar
};