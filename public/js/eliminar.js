const inputFiltro = document.getElementById("filtro-nombre");
const btnDelete = document.getElementById("btn-delete");
const mensaje = document.getElementById("mensaje");

// 1. Cargar productos al cargar la página
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
    mensaje.textContent = "❌ Error al cargar productos";
    console.error(error);
  }
});

// 2. Eliminar producto seleccionado
btnDelete.addEventListener("click", async function () {
  const nombreSeleccionado = inputFiltro.value;

  if (!nombreSeleccionado) {
    mensaje.textContent = "⚠️ Selecciona un producto";
    return;
  }

  try {
    const respuesta = await fetch(`http://localhost:8000/productos/${encodeURIComponent(nombreSeleccionado)}`, {
      method: "DELETE"
    });

    if (respuesta.ok) {
      mensaje.textContent = "✅ Producto eliminado correctamente";
      location.reload(); // Recargar la página para actualizar la lista
    } else {
      mensaje.textContent = "❌ No se pudo eliminar el producto";
    }

  } catch (error) {
    mensaje.textContent = "⚠️ Error al conectar con el servidor";
    console.error(error);
  }
});
