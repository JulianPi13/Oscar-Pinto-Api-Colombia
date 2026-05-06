//seleccionamos el contenedor donde se mostrarán los departamentos
const contenedor = document.getElementById("departamentos");
//seleccionamos el mensaje de carga
const loading = document.getElementById("loading");

//diccionario con datos oficiales de departamentos
const datosDepartamentos = {
  "Antioquia": {region:"Andina",poblacion:"6700000",area:"63612",descripcion:"Centro económico y cultural, Medellín como capital."},
  "Valle del Cauca": {region:"Pacífica",poblacion:"4700000",area:"22140",descripcion:"Región industrial y agrícola, Cali como capital."},
  "Cundinamarca": {region:"Andina",poblacion:"3100000",area:"22623",descripcion:"Rodea Bogotá, gran importancia administrativa."},
  "Santander": {region:"Andina",poblacion:"2200000",area:"30537",descripcion:"Conocido por su café y cañón del Chicamocha."},
  "Atlántico": {region:"Caribe",poblacion:"2500000",area:"3388",descripcion:"Barranquilla es su capital y puerto principal."},
  "Bolívar": {region:"Caribe",poblacion:"2100000",area:"25978",descripcion:"Cartagena es patrimonio histórico y turístico."},
  "Huila": {region:"Andina",poblacion:"1200000",area:"19890",descripcion:"Región cafetera y productora de arroz."},
  "Nariño": {region:"Pacífica",poblacion:"1600000",area:"33268",descripcion:"Pasto es su capital, diversidad cultural."},
  "Cesar": {region:"Caribe",poblacion:"1200000",area:"22905",descripcion:"Vallenato como símbolo cultural."},
  "Cauca": {region:"Pacífica",poblacion:"1500000",area:"29308",descripcion:"Gran diversidad étnica y cultural."},
  "Magdalena": {region:"Caribe",poblacion:"1300000",area:"23188",descripcion:"Santa Marta como capital turística."},
  "Boyacá": {region:"Andina",poblacion:"1300000",area:"23189",descripcion:"Cuna de la independencia, Tunja capital."},
  "Meta": {region:"Orinoquía",poblacion:"1100000",area:"85635",descripcion:"Puerta de los Llanos Orientales."},
  "La Guajira": {region:"Caribe",poblacion:"1000000",area:"20848",descripcion:"Cultura Wayuu, Cabo de la Vela."},
  "Risaralda": {region:"Andina",poblacion:"1000000",area:"4140",descripcion:"Pereira como capital, parte del Eje Cafetero."}
};

//usamos fetch para consumir la api de departamentos
fetch("https://api-colombia.com/api/v1/Department")
  .then(response => response.json())
  .then(data => {
    //ocultamos el mensaje de carga
    loading.style.display = "none";

    //mostramos mínimo 15 departamentos
    data.slice(0, 15).forEach(depto => {
      const card = document.createElement("div");
      card.className = "card";

      //si el departamento está en el diccionario, usamos esos datos
      const info = datosDepartamentos[depto.name] || {};
      const nombre = depto.name || "nombre no disponible";
      const region = info.region || depto.region || "región no especificada";
      const poblacion = info.poblacion || depto.population || "dato no disponible";
      const area = info.area || depto.area || "dato no disponible";
      const descripcion = info.descripcion || depto.description || "sin descripción";

      card.innerHTML = `
        <h3>${nombre}</h3>
        <p><strong>región:</strong> ${region}</p>
        <p><strong>población:</strong> ${poblacion}</p>
        <p><strong>superficie:</strong> ${area} km²</p>
        <p>${descripcion}</p>
      `;

      contenedor.appendChild(card);
    });
  })
  .catch(error => {
    //manejo de errores
    loading.textContent = "error al cargar los departamentos.";
    console.error(error);
  });
