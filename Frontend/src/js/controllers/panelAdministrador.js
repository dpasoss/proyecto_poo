document.addEventListener("DOMContentLoaded", () => {
  const usuario = JSON.parse(localStorage.getItem('usuario'));

  if (!usuario || usuario.rol !== 'admin') {
    Swal.fire({
      icon: 'error',
      title: 'Acceso denegado',
      text: 'Solo administradores pueden ingresar',
      confirmButtonText: 'OK'
    }).then(() => {
      window.location.href = "index.html";
    });
    return;
  }

  const navEmpresarial = document.getElementById('nav-panel-empresarial');
  if (navEmpresarial) navEmpresarial.style.display = 'none';
});

function mostrarSeccion(id) {
  document.getElementById("adminHome").style.display = "none";
  document.querySelectorAll(".admin-section").forEach(sec => sec.style.display = "none");
  document.getElementById(id).style.display = "block";
  if (id === "usuarios") cargarUsuarios();
  if (id === "empleos") cargarEmpleos();
  if (id === "moderacion") cargarModeracion();

}

function volverInicio() {
  document.querySelectorAll(".admin-section").forEach(sec => sec.style.display = "none");
  document.getElementById("adminHome").style.display = "grid";
}

async function cargarUsuarios() {
  try {
    const res = await fetch("http://localhost:3000/api/users");
    const usuarios = await res.json();
    const tbody = document.getElementById("tablaUsuarios");
    tbody.innerHTML = "";

    usuarios.forEach(usuario => {
      const fila = document.createElement("tr");
      fila.innerHTML = `
        <td>${usuario.nombre}</td>
        <td>${usuario.correo}</td>
        <td>${usuario.rol}</td>
        <td>
          <button class="btn-edit" onclick="editarUsuario('${usuario._id}')">Editar</button>
          <button class="btn-delete" onclick="eliminarUsuario('${usuario._id}')">Eliminar</button>
        </td>
      `;
      tbody.appendChild(fila);
    });
  } catch (error) {
    console.error("Error al cargar usuarios:", error);
  }
}

async function eliminarUsuario(id) {
  const confirmar = await Swal.fire({
    title: '¿Eliminar usuario?',
    text: 'Esta acción no se puede deshacer.',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Sí, eliminar',
    cancelButtonText: 'Cancelar'
  });

  if (!confirmar.isConfirmed) return;

  try {
    const res = await fetch(`http://localhost:3000/api/users/${id}`, {
      method: "DELETE"
    });
    const data = await res.json();

    if (res.ok) {
      Swal.fire('¡Eliminado!', 'El usuario ha sido eliminado.', 'success');
      cargarUsuarios();
    } else {
      Swal.fire('Error', data.mensaje, 'error');
    }
  } catch (error) {
    Swal.fire('Error', 'No se pudo eliminar el usuario.', 'error');
  }
}

async function cargarEmpleos() {
  try {
    const res = await fetch("http://localhost:3000/job");
    const empleos = await res.json();
    const tbody = document.getElementById("tablaEmpleos");
    tbody.innerHTML = "";

    empleos.forEach(empleo => {
      const fila = document.createElement("tr");
      fila.innerHTML = `
        <td>${empleo.titulo}</td>
        <td>${empleo.ubicacion}</td>
        <td>${empleo.modalidad || 'No especificado'}</td>
        <td>
          <button class="btn-edit" onclick="editarEmpleo('${empleo._id}')">Editar</button>
          <button class="btn-delete" onclick="eliminarEmpleo('${empleo._id}')">Eliminar</button>
        </td>
      `;
      tbody.appendChild(fila);
    });
  } catch (error) {
    console.error("Error al cargar empleos:", error);
  }
}

async function eliminarEmpleo(id) {
  const confirmar = await Swal.fire({
    title: '¿Eliminar empleo?',
    text: 'Esta acción no se puede deshacer.',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Sí, eliminar',
    cancelButtonText: 'Cancelar'
  });

  if (!confirmar.isConfirmed) return;

  try {
    const res = await fetch(`http://localhost:3000/job/${id}`, {
      method: "DELETE"
    });
    const data = await res.json();

    if (res.ok) {
      Swal.fire('¡Eliminado!', 'El empleo ha sido eliminado.', 'success');
      cargarEmpleos();
    } else {
      Swal.fire('Error', data.mensaje, 'error');
    }
  } catch (error) {
    Swal.fire('Error', 'No se pudo eliminar el empleo.', 'error');
  }
}

let entidadEnEdicion = null;
let tipoEdicion = '';

function editarUsuario(id) {
  tipoEdicion = 'usuario';
  fetch(`http://localhost:3000/api/users/${id}`)
    .then(res => res.json())
    .then(data => {
      entidadEnEdicion = data;
      abrirModal('Editar Usuario', [
        { name: 'nombre', value: data.nombre },
        { name: 'correo', value: data.correo },
        { name: 'rol', value: data.rol }
      ]);
    });
}

function editarEmpleo(id) {
  tipoEdicion = 'empleo';
  fetch(`http://localhost:3000/job/${id}`)
    .then(res => res.json())
    .then(data => {
      entidadEnEdicion = data;
      abrirModal('Editar Empleo', [
        { name: 'titulo', value: data.titulo },
        { name: 'descripcion', value: data.descripcion || '' },
        { name: 'salario', value: data.salario || '' },
        { name: 'ubicacion', value: data.ubicacion },
        { name: 'tipoTrabajo', value: data.tipoTrabajo || 'tiempo completo' },
        { name: 'modalidad', value: data.modalidad || 'onsite' },
        { name: 'vencimiento', value: data.vencimiento?.slice(0, 10) || '' },
        { name: 'empresa', value: data.empresa || '' }
      ]);
    });
}

function abrirModal(titulo, campos) {
  const form = document.getElementById('formEditar');
  document.getElementById('modalTitulo').textContent = titulo;
  form.innerHTML = '';

  campos.forEach(campo => {
    let tipo = 'text';
    if (campo.name === 'salario') tipo = 'number';
    if (campo.name === 'vencimiento') tipo = 'date';

    form.innerHTML += `
      <label>${campo.name}</label>
      <input type="${tipo}" name="${campo.name}" value="${campo.value}" required />
    `;
  });

  document.getElementById('modalEditar').style.display = 'flex';
}

function cerrarModal() {
  document.getElementById('modalEditar').style.display = 'none';
  entidadEnEdicion = null;
  tipoEdicion = '';
}

async function guardarCambios() {
  const form = document.getElementById('formEditar');
  const data = Object.fromEntries(new FormData(form));
  const id = entidadEnEdicion._id;
  const endpoint = tipoEdicion === 'usuario' ? 'api/users' : 'job';

  try {
    const res = await fetch(`http://localhost:3000/${endpoint}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    const json = await res.json();

    if (res.ok) {
      Swal.fire({
        icon: 'success',
        title: 'Guardado',
        text: 'Cambios guardados correctamente.',
        timer: 2000,
        showConfirmButton: false
      });

      
      if (tipoEdicion === 'usuario') {
        await cargarUsuarios();
      } else {
        await cargarEmpleos();
      }

      cerrarModal();

    } else {
      Swal.fire('Error', 'No se pudieron guardar los cambios.', 'error');
      console.error(json);
    }
  } catch (error) {
    Swal.fire('Error', 'Ocurrió un error al guardar.', 'error');
    console.error(error);
  }
}

async function cargarModeracion() {
  try {
    const res = await fetch("http://localhost:3000/job");
    const empleos = await res.json();
    const tbody = document.getElementById("tablaModeracion");
    tbody.innerHTML = "";

    empleos.forEach(empleo => {
      const fila = document.createElement("tr");
      fila.innerHTML = `
        <td>${empleo.titulo}</td>
        <td>${empleo.empresa || 'No especificada'}</td>
        <td>${empleo.activo ? 'Activo' : 'Inactivo'}</td>
        <td>
          <button class="${empleo.activo ? 'btn-delete' : 'btn-edit'}"
          onclick="cambiarEstado('${empleo._id}', ${empleo.activo})">
        ${empleo.activo ? 'Inactivar' : 'Activar'}
          </button>

      `;
      tbody.appendChild(fila);
    });
  } catch (error) {
    console.error("Error al cargar moderación:", error);
  }
}


async function cambiarEstado(id, estadoActual) {
  const accion = estadoActual ? 'inactivar' : 'activar';

  const confirmar = await Swal.fire({
    title: `¿Deseas ${accion} esta publicación?`,
    icon: 'question',
    showCancelButton: true,
    confirmButtonText: 'Sí, confirmar',
    cancelButtonText: 'Cancelar'
  });

  if (confirmar.isConfirmed) {
    try {
      const res = await fetch(`http://localhost:3000/job/estado/${id}`, {
        method: 'PUT'
      });

      const data = await res.json();

      if (res.ok) {
        Swal.fire('Listo ✅', `La publicación fue ${accion} con éxito`, 'success');
        cargarModeracion(); 
      } else {
        Swal.fire('Error', data.mensaje || 'Ocurrió un problema al cambiar el estado.', 'error');
      }
    } catch (error) {
      Swal.fire('Error', 'No se pudo conectar con el servidor.', 'error');
      console.error('Error al cambiar estado:', error);
    }
  }
}





