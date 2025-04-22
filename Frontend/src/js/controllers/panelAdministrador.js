// Mostrar secciones tipo SPA
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

// Editar usuario (placeholder)
function editarUsuario(id) {
  alert(`🔧 Aquí editarías el usuario con ID: ${id}`);
  // window.location.href = `/editarUsuario.html?id=${id}`;
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

// Editar empleo (placeholder)
function editarEmpleo(id) {
  alert(`✏️ Aquí editarías el empleo con ID: ${id}`);
  // window.location.href = `/editarEmpleo.html?id=${id}`;
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
