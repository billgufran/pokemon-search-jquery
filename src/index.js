import $ from "jquery";
import "./components/PokemonCard.js";
import "./style/style.css";

$(function() {
   setTimeout(function() {
      $(".card-flip").addClass("flipped");
      $('.back').addClass('blink')
   }, 4000)
   setTimeout(function() {
      $('.front').addClass('blink')
      $(".card-flip").removeClass("flipped")
   }, 4800)
   setTimeout(function() {
      $('.front').removeClass('blink')
      $('.back').removeClass('blink')
   }, 6000)
})

const name = () => $("#search-input").val().toLowerCase();

$("#search-form").on("submit", event => {
	event.preventDefault();
	$("pokemon-card").attr("name", name);
	$(".card-flip").removeClass("flipped");
});

$(".card-flip").on("click", event => {
   $(event.currentTarget).toggleClass("flipped");
});