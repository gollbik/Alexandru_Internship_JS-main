import styles from "/components/app.css";
import { LitElement, html, css } from "lit";
import { map } from "lit/directives/map.js";
import { FetchPokemons, getColorForPokemon } from "../components/app";
import { pushState } from "../router.js";
export class HomePage extends LitElement {
  static styles = css([styles]);

  constructor() {
    super();
    this.offset = 0;
    this.page = 1;
  }

  static get properties() {
    return {
      pokemons: Array,
      offset: Number,
      page: Number,
    };
  }

  connectedCallback() {
    super.connectedCallback();

    this.fetchPokemons(history.state?.page);
  }

  async fetchPokemons(page) {
    this.pokemons = await FetchPokemons.getPokemonList(page || this.page);
  }

  handleNextPage() {
    if ((this.page + 1) * 25 > 200) {
      this.page = 1;
    } else {
      this.page++;
    }
    this.fetchPokemons();
  }

  handlePrevPage() {
    if (this.page <= 1) {
      this.page = 1; // sau înlocuiți cu numărul maxim de pagini pe care le aveți
    } else {
      this.page--;
    }

    this.fetchPokemons();
  }

  render() {
    return html`
      <h1>Pokemons</h1>
      <ol id="pokedex">
        ${map(
          this.pokemons || [],
          ({ id, image, name }) => html`<li
            class="card"
            style="background-color: ${getColorForPokemon(
              id - 1 + this.offset
            )};"
            @click="${() => pushState(`./pokemon/${id}`, { page: this.page })}"
          >
            <img class="card-image" src="${image}" />
            <h2 class="card-title">${id}. ${name}</h2>
          </li>`
        )}
      </ol>
      <div id="footer">
        <button @click="${this.handlePrevPage}"><</button>
        <button @click="${this.handleNextPage}">></button>
      </div>
    `;
  }
}

customElements.define("home-page", HomePage);
