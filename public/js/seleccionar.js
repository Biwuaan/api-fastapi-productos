const inputFiltro = document.getElementById("filtro-nombre");
const btnBuscar = document.getElementById("btn-buscar");
const resultadoDiv = document.getElementById("resultado");

// 1. Cargar nombres al cargar la página
window.addEventListener("DOMContentLoaded", async function () {
  try {
    const respuesta = await fetch("http://localhost:8000/productos");
    const productos = await respuesta.json();

    productos.forEach(p => {
      const option = document.createElement("option");
      option.value = p.nombre;
      option.textContent = p.nombre;
      inputFiltro.appendChild(option);
    });

  } catch (error) {
    console.error("❌ Error al cargar productos:", error);
  }
});

// 2. Buscar producto seleccionado al hacer clic
btnBuscar.addEventListener("click", async function () {
  const nombreSeleccionado = inputFiltro.value.toLowerCase();

  try {
    const respuesta = await fetch("http://localhost:8000/productos");
    const productos = await respuesta.json();

    const filtrados = productos.filter(p =>
      p.nombre.toLowerCase() === nombreSeleccionado
    );

    if (filtrados.length > 0) {
      resultadoDiv.innerHTML = filtrados.map(producto => `
        <div class="card-producto">
          <h2>${producto.nombre}</h2>
          <p><strong>Descripción:</strong> ${producto.descripcion}</p>
          <p><strong>Precio:</strong> $${producto.precio.toFixed(2)}</p>
        </div>
      `).join('');
    } else {
      resultadoDiv.innerHTML = "<p>❌ Producto no encontrado</p>";
    }

  } catch (error) {
    console.error("⚠️ Error al buscar productos:", error);
    resultadoDiv.innerHTML = "<p>⚠️ No se pudo conectar al servidor</p>";
  }
});
