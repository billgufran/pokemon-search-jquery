import $ from 'jquery';
import "./style/style.css";

async function callPokemon(name) {
   const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
   const data = await res.json()
   console.log(data)
}

// $('#search-button').submit(() => callPokemon('mudkip'))
$('#click').on('click', () => callPokemon('mudkip'))