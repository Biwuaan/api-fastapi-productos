const formulario = document.getElementById("form-producto");
const mensaje = document.getElementById("mensaje");

formulario.addEventListener("submit", async function (event) {
    event.preventDefault(); // Evita recargar la página
    console.log("Formulario enviado");

    // Capturar los valores
    const nombre = document.getElementById("nombre").value;
    const descripcion = document.getElementById("desc").value;
    const precio = parseFloat(document.getElementById("precio").value);

    // Construir el objeto
    const producto = {nombre, descripcion, precio };

    try {
    const respuesta = await fetch("http://localhost:8000/productos", {
         method: "POST",
        headers: {
        "Content-Type": "application/json"
        },
        body: JSON.stringify(producto)
    });

    if (respuesta.ok) {
        mensaje.textContent = "✅ Producto agregado correctamente";
        formulario.reset();
    } else {
        mensaje.textContent = "❌ Error al agregar producto";
    }
    } catch (error) {
        mensaje.textContent = "❌ Error de conexión con el servidor";
        console.error(error);
    }
});