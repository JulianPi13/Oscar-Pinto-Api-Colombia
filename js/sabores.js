//seleccionamos el contenedor donde se mostrarán los platos
const contenedor = document.getElementById("platos");
//seleccionamos el mensaje de carga
const loading = document.getElementById("loading");

//usamos fetch para consumir la api de platos típicos
fetch("https://api-colombia.com/api/v1/TypicalDish")
  .then(response => response.json()) //convertimos la respuesta en json
  .then(data => {
    //ocultamos el mensaje de carga
    loading.style.display = "none";

    //mostramos mínimo 15 platos
    data.slice(0, 15).forEach(plato => {
      const card = document.createElement("div");
      card.className = "card";

      //valores por defecto si faltan datos
      const nombre = plato.name || "nombre no disponible";
      const descripcion = plato.description || "sin descripción";
      const departamento = plato.department || "departamento no especificado";
      const imagen = plato.image || "https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg";

      card.innerHTML = `
        <h3>${nombre}</h3>
        <p><strong>departamento:</strong> ${departamento}</p>
        <p>${descripcion}</p>
        <img src="${imagen}" alt="imagen de ${nombre}">
      `;

      contenedor.appendChild(card);
    });

    //contar platos
    const total = data.length;
    const resumen = document.createElement("p");
    resumen.innerHTML = "<strong>total de platos típicos:</strong> " + total;
    contenedor.appendChild(resumen);
  })
  .catch(error => {
    //manejo de errores
    loading.textContent = "error al cargar los platos típicos.";
    console.error(error);
  });
