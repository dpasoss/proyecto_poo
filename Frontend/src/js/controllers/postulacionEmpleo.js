window.addEventListener("DOMContentLoaded", async () => {
    const params = new URLSearchParams(window.location.search);
    const trabajoId = params.get("id");
  
    // Guardamos el ID para usarlo después en el login! 
    localStorage.setItem("trabajoId", trabajoId);
  
    // Mostrar datos del trabajo arriba del formulario
    if (trabajoId) {
      try {
        const res = await fetch(`http://localhost:3000/job/${trabajoId}`);
        const trabajo = await res.json();
  
        document.getElementById("tituloTrabajo").textContent = `Aplicar para: ${trabajo.titulo}`;
        document.getElementById("infoTrabajo").textContent = `${trabajo.empresa || 'Empresa no especificada'} • ${trabajo.ubicacion} • ${trabajo.Modalidad}`;
      } catch (error) {
        console.error("Error al cargar el trabajo:", error);
      }
    }
  });
  
  // Envío del formulario
  document.getElementById("formAplicacion").addEventListener("submit", async (e) => {
    e.preventDefault();
  
    const userId = localStorage.getItem("userId"); // lo dará tu compañera al hacer login
    const jobId = localStorage.getItem("trabajoId");
  
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
  