//seleccionamos el contenedor donde se mostrarán los atractivos turísticos
const contenedor = document.getElementById("turismo");
//seleccionamos el mensaje de carga
const loading = document.getElementById("loading");

//usamos fetch para consumir la api de atractivos turísticos
fetch("https://api-colombia.com/api/v1/TouristicAttraction")
  .then(response => response.json()) //convertimos la respuesta en json
  .then(data => {
    //ocultamos el mensaje de carga
    loading.style.display = "none";

    //mostramos solo los primeros 20 atractivos
    data.slice(0, 20).forEach(lugar => {
      const card = document.createElement("div");
      card.className = "card";

      //valores por defecto si faltan datos
      const nombre = lugar.name || "nombre no disponible";
      const ciudad = lugar.city || "ciudad no especificada";
      const departamento = lugar.department || "departamento no especificado";
      const descripcion = lugar.description || "sin descripción";

      card.innerHTML = `
        <h3>${nombre}</h3>
        <p><strong>ubicación:</strong> ${ciudad}, ${departamento}</p>
        <p>${descripcion}</p>
      `;

      contenedor.appendChild(card);
    });
  })
  .catch(error => {
    //manejo de errores
    loading.textContent = "error al cargar los atractivos turísticos.";
    console.error(error);
  });
