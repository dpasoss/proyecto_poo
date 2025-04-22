import api from '../services/panelEmpresarial.js';
import { Job } from '../models/job.js';

document.addEventListener("DOMContentLoaded", async () => {
    const usuario = JSON.parse(localStorage.getItem('usuario'));

    // Mostrar/Ocultar elementos según el rol
    const navEmpresarial = document.getElementById('nav-panel-empresarial');
    const navAdmin = document.getElementById('nav-panel-admin');
    const navBuscador = document.getElementById('nav-buscador');


    if (usuario.rol !== 'empleador' && navEmpresarial) { 
        navEmpresarial.style.display = 'none';
        navBuscador.style.display = 'none';
    }

    if (usuario.rol !== 'admin' && navAdmin) {
        navAdmin.style.display = 'none';
        navBuscador.style.display = 'none';

    }

    // Asignar automáticamente nombre de empresa
    document.getElementById('empresa').value = usuario.datosEmpleador?.nombreEmpresa || usuario.nombre;

    
});


export async function crearTrabajo() { 
 
    try { 

        const titulo = document.getElementById("titulo").value;
        const descripcion = document.getElementById("descripcion").value;
        const salario = document.getElementById("salario").value;
        const ubicacion = document.getElementById("ubicacion").value;
        const tipoTrabajo = document.getElementById("tipoTrabajo").value;
        const modalidad = document.getElementById("modalidad").value;
        const vencimiento = document.getElementById("vencimiento").value;
        const empresa = document.getElementById("empresa").value;

        const salarioNumber = parseFloat(salario);
        const vencimientoDate = new Date(vencimiento);

        const nuevoEmpleo = new Job(
            null,
            titulo,
            descripcion,
            salarioNumber,
            ubicacion,
            tipoTrabajo,
            modalidad,
            vencimientoDate,
            empresa
        );

        const respuesta = await api.crearTrabajo(nuevoEmpleo);

      //4. Mostrar los datos en el formulario
        document.getElementById("id").value = respuesta._id;

    } catch (error) {
    console.log(error);
    }

    if (!titulo || !descripcion || !salario || !ubicacion) {
        alert("Por favor completa todos los campos obligatorios.");
        return;
    }
    
}

// export async function obtenerTrabajos() { 

//     try {    
//         const empleos = await api.obtenerTrabajos();
//         console.log(empleos);
//         const tablaEmpleos = document.getElementById("tablaEmpleos");
//         tablaEmpleos.innerHTML = "";    
        
//         empleos.forEach(empleo => {
//             let row = tablaEmpleos.insertRow();
//             row.insertCell(0).innerHTML = empleo.titulo;
//             row.insertCell(1).innerHTML = empleo.descripcion;
//             row.insertCell(2).innerHTML = empleo.salario;
//             row.insertCell(3).innerHTML = empleo.ubicacion;
//             row.insertCell(4).innerHTML = empleo.tipoTrabajo;
//             row.insertCell(5).innerHTML = empleo.modalidad;
//             row.insertCell(6).innerHTML = empleo.vencimiento; 
//             row.insertCell(7).innerHTML = empleo.empresa; 
//             row.insertCell(8).innerHTML = empleo.aplicantes; 

//             const btnModificar = document.createElement('button');
//             btnModificar.className = 'formbold-btn-sucess';
//             btnModificar.textContent = 'Modificar';
//             btnModificar.onclick = () => cargarEmpleo(`${empleo._id}`);            
//             row.insertCell(9).appendChild(btnModificar);            
            
//             const btnEliminar = document.createElement('button');
//             btnEliminar.className = 'formbold-btn-danger';
//             btnEliminar.textContent = 'Eliminar';
//             btnEliminar.onclick = () => eliminarTrabajo(empleo._id);            
//             row.insertCell(10).appendChild(btnEliminar); 
//         });

//     } catch (error) {
//     console.log(error);
//     }
// }

export async function obtenerTrabajos() { 
    try {
        const usuario = JSON.parse(localStorage.getItem('usuario'));
        if (!usuario || usuario.rol !== 'empleador') return;

        const nombreEmpresa = usuario.datosEmpleador?.nombreEmpresa || usuario.nombre;

        const empleos = await api.obtenerTrabajos();
        const empleosEmpresa = empleos.filter(empleo => empleo.empresa === nombreEmpresa);

        const tablaEmpleos = document.getElementById("tablaEmpleos");
        tablaEmpleos.innerHTML = "";

        if (empleosEmpresa.length === 0) {
            tablaEmpleos.innerHTML = "<tr><td colspan='11'>🔍 No hay empleos registrados aún.</td></tr>";
            return;
        }

        empleosEmpresa.forEach(async empleo => {
            const row = tablaEmpleos.insertRow();
            row.insertCell(0).innerHTML = empleo.titulo;
            row.insertCell(1).innerHTML = empleo.descripcion;
            row.insertCell(2).innerHTML = empleo.salario;
            row.insertCell(3).innerHTML = empleo.ubicacion;
            row.insertCell(4).innerHTML = empleo.tipoTrabajo;
            row.insertCell(5).innerHTML = empleo.modalidad;
            row.insertCell(6).innerHTML = empleo.vencimiento; 
            row.insertCell(7).innerHTML = empleo.empresa; 

            const cellAplicantes = row.insertCell(8);
            cellAplicantes.innerHTML = 'Cargando...';

            try {
                const respuesta = await fetch(`http://localhost:3000/job/solicitante/${empleo._id}`);
                const data = await respuesta.json();
                cellAplicantes.innerHTML = data.cantidad;
            } catch (error) {
                console.error('❌ Error al obtener candidatos:', error);
                cellAplicantes.innerHTML = 'Error';
            }

            const btnModificar = document.createElement('button');
            btnModificar.className = 'formbold-btn-sucess';
            btnModificar.textContent = 'Modificar';
            btnModificar.onclick = () => cargarEmpleo(empleo._id);            
            row.insertCell(9).appendChild(btnModificar);            

            const btnEliminar = document.createElement('button');
            btnEliminar.className = 'formbold-btn-danger';
            btnEliminar.textContent = 'Eliminar';
            btnEliminar.onclick = () => eliminarTrabajo(empleo._id);            
            row.insertCell(10).appendChild(btnEliminar); 
        });
    } catch (error) {
        console.error('❌ Error en obtenerTrabajos:', error);
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
        document.getElementById("empresa").value = empleos.empresa;


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
        const empresaTrabajo = document.getElementById("empresa").value;

        const empleoModificado = new Job(id, titulo, descripcion, salario, ubicacion, tipoTrabajo, modalidad, vencimiento, empresaTrabajo);        
        console.log(empleoModificado)

        console.log("🆔 ID del empleo modificado:", empleoModificado.id);
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

// async function obtenerCantidadCandidatos() {
//     try {
//         const usuario = JSON.parse(localStorage.getItem('usuario'));
//         if (!usuario || usuario.rol !== 'empleador') return;

//         const nombreEmpresa = usuario.nombre;

//         const res = await fetch(`http://localhost:3000/api/empleos/candidatos/${nombreEmpresa}`);
//         const data = await res.json();

//         const tabla = document.getElementById('tablaCandidatos');
//         tabla.innerHTML = '';

//         const row = tabla.insertRow();
//         row.insertCell(0).innerText = data.cantidad;

//     } catch (error) {
//         console.error('Error al obtener cantidad de candidatos:', error);
//     }
// }


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




