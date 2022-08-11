let container = document.querySelector('#container');
let btn = document.querySelector('#btn');
let select = document.querySelector('#select-genero');
const urlBase = 'https://rickandmortyapi.com/api/';
const filterParameter = '?gender='
const characters = 'character';
let nameEpisode = '';
/**
 * Obtiene todos los personajes y pasa el resultado al metodo showCaracter
 */
const getAllCharacters = () =>{
    fetch(`${urlBase}${characters}`)
        .then(response => response.json())
        .then(data =>createCard(data.results))
}
/**
 * Obtiene el personaje por su id y hace uso de la funcion createCard.
 * @param {*} id 
 */
const getCharacter = (id)=>{
    fetch(`${urlBase}${characters}/${id}`)
        .then(response => response.json())
        .then(data => createCardCharacter(data))
} 
/**
 * Obtiene el nombre del episodio de dicho personaje
 * @param {*} url 
 */
const getEpisode = (url)=>{
  fetch(`${url}`)
    .then(response => response.json()) 
    .then(data => {
      const{name}=data;
      nameEpisode = name;
    })  
}
/**
 * Obtiene personajes por genero
 * @param {*} gender  => genero seleccionado
 */
const getCharactersGender = (gender) => {
    fetch(`${urlBase}${characters}/${filterParameter}${gender}`)
      .then(response=>response.json())
      .then(data=>createCardFilter(data.results))
      .catch(err =>console.log(err))
}
/**
 * Crea una card y la inserta en el HTML con los datos del personaje
 * @param {*} character => un personaje
 */
const createCard = (characters) =>{
    for (const character of characters) {
      const{name,status,species,image,location,id,episode,gender}=character;
      getEpisode(episode[0]);
      container.innerHTML +=`<div class="card mb-3" style="max-width: 540px;">
      <div class="row g-0">
        <div class="col-md-4">
          <img src="${image}" class="img-fluid rounded-start" alt="...">
        </div>
        <div class="col-md-8">
          <div class="card-body">
            <h5 class="card-title">${name}</h5>
            <p class="card-text">${status} | ${species}</p>
            <p class="card-text">Ultima ubicacion conocida: <small class="text-muted">${location.name}</small></p>
            <p class="card-text">Genero: <small class="text-muted">${gender}</small></p>
            <button type="button" class="btn btn-primary" id="btn" onclick="getCharacter(${id})">Ver mas</button>
          </div>
        </div>
      </div>
    </div>`
  }
}
/**
 * Crea una card del personaje seleccionado
 * @param {*} character 
 */
const createCardCharacter = (character) =>{
  const{name,status,species,image,location,gender}=character;
  container.innerHTML=`<div class="card mb-3" style="max-width: 540px;">
  <div class="row g-0">
    <div class="col-md-4">
      <img src="${image}" class="img-fluid rounded-start" alt="...">
    </div>
    <div class="col-md-8">
      <div class="card-body">
        <h5 class="card-title">${name}</h5>
        <p class="card-text">${status} | ${species}</p>
        <p class="card-text">Ultima ubicacion conocida: <small class="text-muted">${location.name}</small></p>
        <p class="card-text">Genero: <small class="text-muted">${gender}</small></p>
        <p class="card-text">Visto por primera vez en: <small class="text-muted">${nameEpisode}</small></p>
        <button type="button" class="btn btn-primary" id="btn" onclick="">Volver</button>
      </div>
    </div>
  </div>
</div>`
}
/**
 * Crea una card Crea una card y la inserta en el HTML con los datos del personaje, con el tipo de genero seleccionado
 * @param {} characters 
 */
const createCardFilter = (characters) =>{
  container.innerHTML='';
  for (const character of characters) {
    const{name,status,species,image,location,id,episode,gender}=character;
    getEpisode(episode[0]);
    container.innerHTML +=`<div class="card mb-3" style="max-width: 540px;">
    <div class="row g-0">
      <div class="col-md-4">
        <img src="${image}" class="img-fluid rounded-start" alt="...">
      </div>
      <div class="col-md-8">
        <div class="card-body">
          <h5 class="card-title">${name}</h5>
          <p class="card-text">${status} | ${species}</p>
          <p class="card-text">Ultima ubicacion conocida: <small class="text-muted">${location.name}</small></p>
          <p class="card-text">Genero: <small class="text-muted">${gender}</small></p>
          <button type="button" class="btn btn-primary" id="btn" onclick="getCharacter(${id})">Ver mas</button>
        </div>
      </div>
    </div>
  </div>`
}
}
/**
 * Capturo el valor seleccionado del select
 */
const captureValue = () =>{
  let selectOption = document.querySelector('#select-genero');
  let option = selectOption.options[selectOption.selectedIndex];
  let textOption = option.text;
  getCharactersGender(textOption);
}
select.addEventListener('change',captureValue)
getAllCharacters();
