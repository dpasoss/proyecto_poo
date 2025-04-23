document.addEventListener("DOMContentLoaded", () => {
  const user = JSON.parse(localStorage.getItem("usuario"));

  const navEmpresarial = document.getElementById('nav-panel-empresarial');
  const navAdmin = document.getElementById('nav-panel-admin');

  if (user?.rol !== 'empleador' && navEmpresarial) {
    navEmpresarial.style.display = 'none';
  }

  if (user?.rol !== 'admin' && navAdmin) {
    navAdmin.style.display = 'none';
  }

  if (!user || user.rol !== 'solicitante') {
    Swal.fire({
      icon: 'error',
      title: 'Acceso denegado',
      text: 'Solo usuarios solicitantes pueden aplicar a empleos.',
    }).then(() => {
      window.location.href = "index.html";
    });
  }
});

window.addEventListener("DOMContentLoaded", async () => {
  const params = new URLSearchParams(window.location.search);
  const trabajoId = params.get("id");

  localStorage.setItem("trabajoId", trabajoId);

  if (!trabajoId) {
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'No se proporcionó el ID del trabajo en la URL.'
    }).then(() => {
      window.location.href = "buscadorEmpleo.html";
    });
    return;
  }

  try {
    const res = await fetch(`http://localhost:3000/job/${trabajoId}`);
    const trabajo = await res.json();

    document.getElementById("tituloTrabajo").textContent = `Aplicar para: ${trabajo.titulo}`;
    document.getElementById("infoTrabajo").textContent = `${trabajo.empresa || 'Empresa no especificada'} • ${trabajo.ubicacion} • ${trabajo.modalidad}`;
  } catch (error) {
    console.error("Error al cargar el trabajo:", error);
    Swal.fire("Error", "No se pudo cargar la información del trabajo.", "error");
  }
});

document.getElementById("formAplicacion").addEventListener("submit", async (e) => {
  e.preventDefault();

  const user = JSON.parse(localStorage.getItem("usuario"));
  const userId = user?.id || user?._id;

  const jobId = localStorage.getItem("trabajoId");

  console.log("userId:", userId);
  console.log("jobId:", jobId);

if (!userId || !jobId) {
  alert("Falta el usuario o el ID del trabajo. Asegúrate de haber iniciado sesión.");
  return;
}


  const form = e.target;

  const data = {
    user: userId,
    job: jobId,
    nombre: form.nombre.value,
    correo: form.correo.value,
    telefono: form.telefono.value,
    experiencia: parseInt(form.experiencia.value),
    linkedin: form.linkedin.value,
    github: form.github.value,
    interes: form.interes.value,
    salario: form.salario.value,
    incorporacion: form.incorporacion.value
  };

  try {
    const response = await fetch("http://localhost:3000/job/aplicar", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });

    const resultado = await response.json();

    if (response.ok) {
      Swal.fire("✅ Éxito", "Tu solicitud fue enviada con éxito.", "success");
      form.reset();
    } else {
      Swal.fire("❌ Error", resultado.mensaje || "Hubo un problema al enviar la solicitud.", "error");
      console.error(resultado);
    }
  } catch (error) {
    console.error("❌ Error de red al enviar la solicitud:", error);
    Swal.fire("❌ Error de red", "No se pudo conectar al servidor.", "error");
  }
});

  
  
