import $ from 'jquery';
import './components/PokemonCard.js';
import './style/style.css';

$(function () {
	setTimeout(function () {
		$('.card-flip').addClass('flipped');
		$('.back').addClass('blink');
	}, 2500);
	setTimeout(function () {
		$('.front').addClass('blink');
		$('.card-flip').removeClass('flipped');
	}, 3300);
	setTimeout(function () {
		$('.front').removeClass('blink');
		$('.back').removeClass('blink');
	}, 4500);
});

const name = () => $('#search-input').val().toLowerCase();

$('#search-form').on('submit', (event) => {
	event.preventDefault();
	$('pokemon-card').attr('name', name);
	$('.card-flip').removeClass('flipped');
});

$('.card-flip').on('click', (event) => {
	$(event.currentTarget).toggleClass('flipped');
});
