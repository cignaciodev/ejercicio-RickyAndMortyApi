let container = document.querySelector('#container');
let nameEpisode = '';
/**
 * Obtiene todos los personajes y pasa el resultado al metodo showCaracter
 */
const getAllCharacters = () =>{
    fetch('https://rickandmortyapi.com/api/character')
        .then(response => response.json())
        .then(data => showCharacter(data.results))
}
/**
 * Obtiene el id de cada personaje y el primer episodio donde aparecio.
 * Hace uso de las funciones getCharacter y getEpisode
 * @param {*} characters => array de personajes
 */
const showCharacter = (characters) =>{
    for(const character of characters){
        const{id, episode}=character;
        getCharacter(id);
        getEpisode(episode[0]);
    }
  
}
/**
 * Obtiene el personaje por su id y hace uso de la funcion createCard.
 * @param {*} id 
 */
const getCharacter = (id)=>{
    fetch(`https://rickandmortyapi.com/api/character/${id}`)
        .then(response => response.json())
        .then(data => createCard(data))
} 
/**
 * Obtiene el nombre del episodio de dicho personaje
 * @param {*} url 
 */
const getEpisode = (url)=>{
  fetch(`${url}`)
    .then(response => response.json()) //array
    .then(data => {
      const{name}=data;
      nameEpisode = name;
    })  
}
/**
 * Crea una card y la inserta en el HTML con los datos del personaje
 * @param {*} character => un personaje
 */
const createCard = (character) =>{
    const{name,status,species,image,location}=character;
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
          <p class="card-text">Visto por primera vez en: <small class="text-muted">${nameEpisode}</small></p>
        </div>
      </div>
    </div>
  </div>`
}

getAllCharacters();