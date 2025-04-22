function mostrarSeccion(id) {
  document.getElementById("adminHome").style.display = "none";
  document.querySelectorAll(".admin-section").forEach(sec => sec.style.display = "none");
  document.getElementById(id).style.display = "block";

  if (id === "usuarios") cargarUsuarios();
  if (id === "empleos") cargarEmpleos();
}

function volverInicio() {
  document.querySelectorAll(".admin-section").forEach(sec => sec.style.display = "none");
  document.getElementById("adminHome").style.display = "grid";
}

// Obtener usuarios desde el backend
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


function editarUsuario(id) {
  alert(`🔧 Aquí editarías el usuario con ID: ${id}`);
 
}

// Eliminar usuario con confirmación nativa
async function eliminarUsuario(id) {
  const confirmar = confirm("¿Estás segura/o de eliminar este usuario?");
  if (!confirmar) return;

  try {
    const res = await fetch(`http://localhost:3000/api/users/${id}`, {
      method: "DELETE"
    });

    const data = await res.json();

    if (res.ok) {
      alert("✅ Usuario eliminado correctamente.");
      cargarUsuarios();
    } else {
      alert("❌ Error: " + data.mensaje);
    }
  } catch (error) {
    alert("❌ Error al eliminar el usuario.");
    console.error("Error al eliminar:", error);
  }
}

// Cargar empleos
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
        <td>${empleo.Modalidad || 'No especificado'}</td>
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


function editarEmpleo(id) {
  alert(`✏️ Aquí editarías el empleo con ID: ${id}`);

}

// Eliminar empleo
async function eliminarEmpleo(id) {
  const confirmar = confirm("¿Estás segura/o de eliminar este empleo?");
  if (!confirmar) return;

  try {
    const res = await fetch(`http://localhost:3000/job/${id}`, {
      method: "DELETE"
    });

    const data = await res.json();

    if (res.ok) {
      alert("✅ Empleo eliminado correctamente.");
      cargarEmpleos();
    } else {
      alert("❌ Error: " + data.mensaje);
    }
  } catch (error) {
    alert("❌ Error al eliminar el empleo.");
    console.error("Error:", error);
  }
}

let entidadEnEdicion = null;
let tipoEdicion = ''; // "usuario" o "empleo"

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
        { name: 'ubicacion', value: data.ubicacion },
        { name: 'Modalidad', value: data.Modalidad }
      ]);
    });
}

function abrirModal(titulo, campos) {
  const form = document.getElementById('formEditar');
  document.getElementById('modalTitulo').textContent = titulo;
  form.innerHTML = '';
  campos.forEach(campo => {
    form.innerHTML += `<label>${campo.name}</label>
      <input type="text" name="${campo.name}" value="${campo.value}" required />`;
  });
  document.getElementById('modalEditar').style.display = 'flex';
}

function cerrarModal() {
  document.getElementById('modalEditar').style.display = 'none';
  entidadEnEdicion = null;
  tipoEdicion = '';
}

//Guarda los cambios del editar del admin
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
      alert("✅ Cambios guardados correctamente.");
      cerrarModal();
      tipoEdicion === 'usuario' ? cargarUsuarios() : cargarEmpleos();
    } else {
      alert("❌ Error al guardar los cambios.");
      console.error(json);
    }
  } catch (error) {
    console.error("Error:", error);
  }
}

