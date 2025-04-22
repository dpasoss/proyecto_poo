// console.log("Usuario cargado:", JSON.parse(localStorage.getItem("usuario")));
// console.log("Trabajo ID (de la URL):", new URLSearchParams(window.location.search).get("id"));
// console.log("Trabajo ID (guardado):", localStorage.getItem("trabajoId"));

// =======================
// Mostrar/ocultar paneles según rol
// =======================
document.addEventListener("DOMContentLoaded", () => {

  const user = JSON.parse(localStorage.getItem("usuario"));

  const navEmpresarial = document.getElementById('nav-panel-empresarial');
  const navAdmin = document.getElementById('nav-panel-admin');

  // Ocultar Panel Empresarial si no es empleador
  if (user?.rol !== 'empleador' && navEmpresarial) {
      navEmpresarial.style.display = 'none';
  }

  // Ocultar Panel Administrador si no es admin
  if (user?.rol !== 'admin' && navAdmin) {
      navAdmin.style.display = 'none';
  }

    // Validar si es solicitante
    if (!user || user.rol !== 'solicitante') {
      alert("⛔ Solo usuarios solicitantes pueden aplicar a empleos.");
      window.location.href = "index.html";
    }
});



// =======================
// Cargar datos del trabajo
// =======================

window.addEventListener("DOMContentLoaded", async () => {
    const params = new URLSearchParams(window.location.search);
    const trabajoId = params.get("id");
  
    // Guardamos el ID para usarlo después en el login! 
    localStorage.setItem("trabajoId", trabajoId);

    if (!trabajoId) {
      alert("❌ No se proporcionó el ID del trabajo en la URL.");
      window.location.href = "buscadorEmpleo.html";
      return;
    }
  
    // Mostrar datos del trabajo arriba del formulario
    if (trabajoId) {
      try {
        const res = await fetch(`http://localhost:3000/job/${trabajoId}`);
        const trabajo = await res.json();
  
        document.getElementById("tituloTrabajo").textContent = `Aplicar para: ${trabajo.titulo}`;
        document.getElementById("infoTrabajo").textContent = `${trabajo.empresa || 'Empresa no especificada'} • ${trabajo.ubicacion} • ${trabajo.modalidad}`;
      } catch (error) {
        console.error("Error al cargar el trabajo:", error);
      }
    }
  });
  
// =======================
// Envío del formulario
// =======================

  document.getElementById("formAplicacion").addEventListener("submit", async (e) => {
    e.preventDefault();


    const user = JSON.parse(localStorage.getItem("usuario"));
    const userId = user?.id;

    const jobId = localStorage.getItem("trabajoId");

    console.log("userId:", userId);
    console.log("jobId:", jobId);
  
    if (!userId || !jobId) {
      alert("Falta el usuario o el ID del trabajo. Asegurate de haber iniciado sesión.");
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
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      });
  
      const resultado = await response.json();
  
      if (response.ok) {
        alert("✅ Tu solicitud fue enviada con éxito.");
        form.reset();
      } else {
        alert("❌ Hubo un error al enviar tu solicitud.");
        console.error(resultado);
      }
  
    } catch (error) {
      console.error("❌ Error de red al enviar la solicitud:", error);
      alert("Error de red al enviar la solicitud.");
    }
  });
  
  


  
  
