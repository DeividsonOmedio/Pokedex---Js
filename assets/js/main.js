let offset = 0;
const limit = 5;
const maxRecords = 151;

const pokemonList = document.getElementById("pokemonList");
const loadMoreButton = document.getElementById("loadMoreButton");

const pokemonEspecifico = document.getElementById("pokemonEspecifico");
const listAtributs = document.getElementById("atributs");



/*function convertTypesToLi(pokemonTypes){
    return pokemonTypes.map((typeSlot) => `<li class="type">${typeSlot.type.name}</li>`)
}*/

function loadPokemonItens(offset, limit) {
  pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
    const newHtml = pokemons
      .map(
        (pokemon) =>
          `
            <li id="pokemonEspecifico" name="${pokemon.name}" class="pokemon  ${
            pokemon.type
          }" >        
                    <span class="number">${pokemon.number}</span>
                    <span class="name nome" >${pokemon.name}</span>
                    
                    <div class="detail">
                        <ol class="types">
                            ${pokemon.types
                              .map(
                                (type) =>
                                  `<li class="type ${type}">${type}</li>`
                              )
                              .join("")}  
                        </ol>
                        
                        <img src="${pokemon.photo}" 
                             alt="${pokemon.name}">
                    </div>            
                </li>
                `
      )
      .join("");
    pokemonList.innerHTML += newHtml;
    pegarnome()
  });
}

loadPokemonItens(offset, limit);

loadMoreButton.addEventListener("click", () => {
  offset += limit;
  const quantRecordNextPage = offset + limit;

  if (quantRecordNextPage >= maxRecords) {
    const newLimit = maxRecords - offset;
    loadPokemonItens(offset, newLimit);

    loadMoreButton.parentElement.removeChild(loadMoreButton);
  } else {
    loadPokemonItens(offset, limit);
    
  }
  pegarnome()
});


var arrayListAtributs = [
    "none",
    "flex"
]
        
function pegarnome() {
  
   
    currentListAtributs = 1

    var ppp = [...document.querySelectorAll(".pokemon")]
        ppp.map((e)=>{
            e.addEventListener("click", (evt)=>{
               

                var nome = [...document.querySelectorAll(".nome")]
                var indice = evt.target.textContent
                console.log(indice)
                buscarAtribudos(indice)
                MudarDisplayAtributs()

                
            })
            
            
        }) 
}
function MudarDisplayAtributs(){
    if(currentListAtributs == arrayListAtributs.length){
        currentListAtributs = 0
    }
    listAtributs.style.display = arrayListAtributs[currentListAtributs]
    currentListAtributs++
}

listAtributs.addEventListener("click", (e)=>{
    
    if( e.target.nodeName == 'DIV' || e.target.nodeName == 'LI' || e.target.nodeName == "OL" || e.target.nodeName == "IMG") console.log("clicou no filho")
    else MudarDisplayAtributs()
    
})



function buscarAtribudos(indice){
    fetch(`https://pokeapi.co/api/v2/pokemon/${indice}`)
        .then((response)=> response.json())
        
        .then((pokeAtributts) => passarAtributos(pokeAtributts))


        
        


        
} 

function passarAtributos(pokeAtributts){
  const listAtributsAtualizado = document.getElementById("listAtributs");
  const passarabilities = pokeAtributts.abilities.map((typeSlot) => typeSlot.ability.name)
  const [passarabilitie] = passarabilities
  var psabilities = passarabilities
   var psabilitie = passarabilitie

   const passartypes = pokeAtributts.types.map((typeSlot) => typeSlot.type.name)
   const [passartype] = passartypes
   var pstypes = passartypes
   var pstype = passartype

  var forms = pokeAtributts.forms[0]
  console.log(forms)

  var version_group = pokeAtributts.moves[0].move.name
  var version_group2 = pokeAtributts.moves[1].move.name

  console.log(version_group)
  var weight = pokeAtributts.weight/10
  
    const newAtributs = `
    <div id="listAtributs" class=" ${pstype}"> 
              <span>Id: ${pokeAtributts.id}</span>  
              <ol id="">
              <li><img src="${pokeAtributts.sprites.other.dream_world.front_default}"</li>
                <li><span>Name: </span><span id="nameSpan">${pokeAtributts.name}</span></li>
                
                <ol class="typeAtributs">
                            ${pstypes.map((type) =>
                                  `<li><span class="typeChild"><span id="spanType">Type: </span></span> ${type}</li>`
                              )
                              .join("")}  
                        </ol>
                <ol class="typeAtributs">
                            ${psabilities.map((ability) =>
                                  `<li class="type ${ability}"><span class="typeChild">Abilityes: </span> ${ability}</li>`
                              )
                              .join("")}  
                        </ol>
                <li><span>Weight: </span>${weight} Kg</li>
                <li><span>Height </span>${pokeAtributts.height} cm</li>
                <ol class="typeAtributs">
                <li><span>Moviments: </span>${version_group}</li>
                <li><span>Moviments: </span>${version_group2}</li>
                </ol>
  
              </ol>
        </div>
                `
                listAtributsAtualizado.innerHTML = newAtributs
                console.log(pokeAtributts)

}

                
                
