import $ from "jquery";
import "./components/PokemonCard.js";
import "./style/style.css";

const name = () => $('#search-input').val().toLowerCase()

$("#search-form").on("submit", event => {
   event.preventDefault();
   $('pokemon-card').attr('name', name);
   $('.card').toggleClass('flipped');
});

$('.card').on("click", function(){
   $(this).toggleClass('flipped');
 });