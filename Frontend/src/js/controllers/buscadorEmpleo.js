document.addEventListener("DOMContentLoaded", () => {
  const usuario = JSON.parse(localStorage.getItem('usuario'));

  const navEmpresarial = document.getElementById('nav-panel-empresarial');
  const navAdmin = document.getElementById('nav-panel-admin');

  if (usuario?.rol !== 'empleador' && navEmpresarial) {
    navEmpresarial.style.display = 'none';
  }

  if (usuario?.rol !== 'admin' && navAdmin) {
    navAdmin.style.display = 'none';
  }
});

document.getElementById("filterBtn").addEventListener("click", async () => {
  const titulo = document.querySelector(".search-input").value;
  const ubicacion = document.getElementById("location").value;
  const salario = document.getElementById("salary").value;
  const tipoTrabajo = document.getElementById("type").value;
  const modalidad = document.getElementById("modalidad").value;

  const queryParams = new URLSearchParams({
    ...(titulo && { titulo }),
    ...(ubicacion && { ubicacion }),
    ...(salario && { salario }),
    ...(tipoTrabajo && { tipoTrabajo }),
    ...(modalidad && { modalidad }),
  });

  try {
    const response = await fetch(`http://localhost:3000/job/buscar?${queryParams}`);
    const trabajos = await response.json();

    const tabla = document.querySelector("#jobs-table tbody");
    tabla.innerHTML = "";

    if (!trabajos.length) {
      Swal.fire({
        icon: 'info',
        title: 'Sin resultados',
        text: 'No se encontraron trabajos que coincidan con los filtros aplicados.',
        confirmButtonText: 'Entendido'
      });
      return;
    }

    trabajos.forEach(trabajo => {
      const fila = document.createElement("tr");
      fila.innerHTML = `
        <td>${trabajo.titulo}</td>
        <td>${trabajo.empresa || "No especificado"}</td>
        <td>${trabajo.ubicacion}</td>
        <td>₡${trabajo.salario.toLocaleString()}</td>
        <td>${trabajo.modalidad || "No especificado"}</td>
        <td><button class="btn-aplicar" onclick="aplicarTrabajo('${trabajo._id}')">Aplicar</button></td>
      `;
      tabla.appendChild(fila);
    });

  } catch (error) {
    console.error("Error al cargar trabajos:", error);
    Swal.fire({
      icon: 'error',
      title: 'Error al cargar',
      text: 'Ocurrió un error al intentar buscar los trabajos. Inténtalo nuevamente.',
      confirmButtonText: 'Aceptar'
    });
  }
});

document.getElementById("clearBtn").addEventListener("click", () => {
  document.getElementById("titulo").value = "";
  document.getElementById("location").value = "";
  document.getElementById("salary").value = "";
  document.getElementById("type").value = "";
  document.getElementById("modalidad").value = "";

  const tabla = document.querySelector("#jobs-table tbody");
  tabla.innerHTML = "";
});

function aplicarTrabajo(id) {
  
  Swal.fire({
    title: '¿Deseas aplicar a esta vacante?',
    icon: 'question',
    showCancelButton: true,
    confirmButtonText: 'Sí, aplicar',
    cancelButtonText: 'Cancelar'
  }).then(result => {
    if (result.isConfirmed) {
      window.location.href = `postulacionEmpleo.html?id=${id}`;
    }
  });
}


  

  


  
