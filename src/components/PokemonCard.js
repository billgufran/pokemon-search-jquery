import axios from "axios";
import $ from "jquery";
import pokeball from "../img/pokeball-404.png";

function importAll(r) {
	let icons = {};
	r.keys().map((item, index) => {
		icons[item.replace("./", "")] = r(item);
	});
	return icons;
}

const icons = importAll(
	require.context("../img/icons", false, /\.svg$/)
);

console.log(icons)

class PokemonCard extends HTMLElement {
	static get observedAttributes() {
		return ["name"];
	}

	constructor() {
		super();
		this.callPokemon = this.callPokemon.bind(this);
		this.padZero = this.padZero.bind(this);
		this.toProperCase = this.toProperCase.bind(this);
	}

	padZero(num, digits = 3) {
		const string = String(num);
		if (string.length === digits) {
			return string;
		} else if (string.length < digits) {
			return string.padStart(digits, "0");
		}
	}

	toProperCase(string) {
		const firstChar = string[0].toUpperCase();
		return firstChar + string.substring(1);
	}

	async callPokemon() {
		this.name = $(this).attr("name");

		try {
			const res = await axios.get(
				`https://pokeapi.co/api/v2/pokemon/${this.name}`
			);

			this.data = res.data;
			$('pokemon-card').addClass('card-flip').removeClass('card')

			$(this).html(`
					<div class="front flex-center">
						<div>
							<h3>#${this.padZero(this.data.id)}</h3>
						</div>
						<img src='https://pokeres.bastionbot.org/images/pokemon/${this.data.id}.png'
						width='200px'>
						<h1>${this.toProperCase(this.data.name)}</h1>
						<div id='types'>
							${this.data.types
								.map(type => {
									const icon = icons[`${type.type.name}.svg`]
									return `
									<div class="${type.type.name} type">
											<p>${type.type.name.toUpperCase()}</p>
											<img src=${icon.default} alt="type's symbol">
									</div>
								`;
								})
								.join("")}
						</div>
					</div>

					<div class="back flex-center">
						<h2>Stats</h2>
						<div id="stats">
							${this.data.stats
								.map(stat => {
									return `
									<div id="${stat.stat.name} " class="stat">
											<p>${stat.stat.name.toUpperCase()} &horbar; <b>${stat.base_stat}</b></p>
									</div>
								`;
								})
								.join("")}
						</div>
					</div>
				`);
		} catch (error) {
			// alert("Not today kid");
			console.log(error.response);

			$('pokemon-card').addClass('card').removeClass('card-flip')

			$(this).html(`
				<div id="error" class="flex-center">
					<img id="not-found" src="${pokeball}" alt="pokemon not found">
					<p>Pokémon not found</p>
				</div>
			`)
		}
	}

	connectedCallback() {
		this.callPokemon();
	}

	attributeChangedCallback() {
		this.callPokemon();
	}
}

customElements.define("pokemon-card", PokemonCard);
