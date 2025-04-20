document.getElementById("filterBtn").addEventListener("click", async () => {
    const titulo = document.querySelector(".search-input").value;
    const ubicacion = document.getElementById("location").value;
    const salario = document.getElementById("salary").value;
    const tipoTrabajo = document.getElementById("type").value;
    const modalidad = document.getElementById("modality").value;
  
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
        tabla.innerHTML = `<tr><td colspan="6">No se encontraron resultados.</td></tr>`;
        return;
      }
  
      trabajos.forEach(trabajo => {
        const fila = document.createElement("tr");
        fila.innerHTML = `
          <td>${trabajo.titulo}</td>
          <td>${trabajo.empresa || "No especificado"}</td>
          <td>${trabajo.ubicacion}</td>
          <td>₡${trabajo.salario.toLocaleString()}</td>
          <td>${trabajo.Modalidad}</td>
          <td><button class="btn-aplicar" onclick="aplicarTrabajo('${trabajo._id}')">Aplicar</button></td>
        `;
        tabla.appendChild(fila);
      });
  
    } catch (error) {
      console.error("Error al cargar trabajos:", error);
    }
  });
  
  //Botón para limpiar filtros
  document.getElementById("clearBtn").addEventListener("click", () => {
    document.getElementById("titulo").value = "";
    document.getElementById("location").value = "";
    document.getElementById("salary").value = "";
    document.getElementById("type").value = "";
    document.getElementById("modality").value = "";
  
    const tabla = document.querySelector("#jobs-table tbody");
    tabla.innerHTML = "";
  });
  
  //botón "Aplicar"
  function aplicarTrabajo(id) {
    window.location.href = `postulacionEmpleo.html?id=${id}`;
  }
  