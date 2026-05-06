//seleccionamos el contenedor donde se mostrarán los platos
const contenedor = document.getElementById("platos");
//seleccionamos el mensaje de carga
const loading = document.getElementById("loading");

//diccionario de imágenes para platos típicos
const imagenesPlatos = {
  "Bandeja Paisa": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSOI6DKuZmMhOb0bpQkFOkoMpZR9wW6EQIy7knUd4riaQnuZs8QYwHirlhUQKnHfcDOvqFDRLEGAecF6Ioehf9wf0lzHTk9M74Gh63piBfs&s=10.jpg",
  "Ajiaco": "https://www.google.com/imgres?q=sancocho%20colombiano&imgurl=https%3A%2F%2Fcdn7.kiwilimon.com%2Frecetaimagen%2F38182%2F400x400%2F48808.jpg.webp&imgrefurl=https%3A%2F%2Fwww.kiwilimon.com%2Freceta%2Fpollo-y-carne%2Fsancocho-colombiano&docid=9TBFKtyDDfpgYM&tbnid=-WrhDai1nMstGM&vet=12ahUKEwjg78jUlaWUAxUeRTABHabrGcwQnPAOegQIFRAB..i&w=400&h=400&hcb=2&ved=2ahUKEwjg78jUlaWUAxUeRTABHabrGcwQnPAOegQIFRAB.jpg",
  "Lechona Tolimense": "https://www.google.com/imgres?q=lechona&imgurl=https%3A%2F%2Fcdn.colombia.com%2Fgastronomia%2F2011%2F07%2F22%2Flechona-1476-1.jpg&imgrefurl=https%3A%2F%2Fwww.colombia.com%2Fgastronomia%2Frecetas-colombianas%2Flechona-r5&docid=cD2x_d6gcO5ujM&tbnid=JDRriN4ripQaAM&vet=12ahUKEwiWqOrKlqWUAxU4QzABHYnwCe0QnPAOegQIHBAB..i&w=800&h=433&hcb=2&ved=2ahUKEwiWqOrKlqWUAxU4QzABHYnwCe0QnPAOegQIHBAB.jpg",
  "Sancocho": "https://www.google.com/imgres?q=sancocho%20colombiano&imgurl=https%3A%2F%2Fcdn7.kiwilimon.com%2Frecetaimagen%2F38182%2F400x400%2F48808.jpg.webp&imgrefurl=https%3A%2F%2Fwww.kiwilimon.com%2Freceta%2Fpollo-y-carne%2Fsancocho-colombiano&docid=9TBFKtyDDfpgYM&tbnid=-WrhDai1nMstGM&vet=12ahUKEwjg78jUlaWUAxUeRTABHabrGcwQnPAOegQIFRAB..i&w=400&h=400&hcb=2&ved=2ahUKEwjg78jUlaWUAxUeRTABHabrGcwQnPAOegQIFRAB.jpg",
  "Arepas": "https://www.google.com/imgres?q=arepas&imgurl=https%3A%2F%2Fcdn.colombia.com%2Fgastronomia%2F2011%2F07%2F22%2Farepas-1476-1.jpg&imgrefurl=https%3A%2F%2Fwww.colombia.com%2Fgastronomia%2Frecetas-colombianas%2Firepas-r5&docid=cD2x_d6gcO5ujM&tbnid=JDRriN4ripQaAM&vet=12ahUKEwiWqOrKlqWUAxU4QzABHYnwCe0QnPAOegQIHBAB..i&w=800&h=433&hcb=2&ved=2ahUKEwiWqOrKlqWUAxU4QzABHYnwCe0QnPAOegQIHBAB.jpg",
  "Tamales": "https://www.google.com/imgres?q=tamales&imgurl=https%3A%2F%2Fcdn.colombia.com%2Fgastronomia%2F２０１１％２Ｆ０７％２Ｆ２２％２Ｆtamales-1476-1.jpg&imgrefurl=https%3A%２Ｆwww.colombia.com％２Ｆgastronomia％２Ｆrecetas-colombianas％２Ｆtamales-r5&docid=cD２x_d6gcO5ujM&tbnid=JDRriN4ripQaAM&vet=1２ahUKEwiWqOrKlqWUAxU4QzABHYnwCe0QnPAOegQIHBAB..i&w=800&h=433&hcb=２&ved=２ahUKEwiWqOrKlqWUAxU4QzABHYnwCe0QnPAOegQIHBAB.jpg",
  "Empanadas": "https://www.google.com/imgres?q=empanadas&imgurl=https%3A%2F%2Fcdn.colombia.com%2Fgastronomia%2F２０１１％２Ｆ０７％２Ｆ２２％２Ｆempanadas-1476-1.jpg&imgrefurl=https%3A%２Ｆwww.colombia.com％２Ｆgastronomia％２Ｆrecetas-colombianas％２Ｆempanadas-r5&docid=cD２x_d6gcO5ujM&tbnid=JDRriN4ripQaAM&vet=1２ahUKEwiWqOrKlqWUAxU4QzABHYnwCe0QnPAOegQIHBAB..i&w=800&h=433&hcb=２&ved=２ahUKEwiWqOrKlqWUAxU4QzABHYnwCe0QnPAOegQIHBAB.jpg",
  "Mondongo": "https://www.google.com/imgres?q=mondongo&imgurl=https%3A%2F% twenty-one.jpg"

};

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
      const imagen = imagenesPlatos[nombre] || plato.image || "https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg";

      card.innerHTML = `
        <h3>${nombre}</h3>
        <p><strong>departamento:</strong> ${departamento}</p>
        <p>${descripcion}</p>
        <img src="${imagen}" alt="imagen de ${nombre}">
      `;

      contenedor.appendChild(card);
    });

    //extra: contar platos
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
