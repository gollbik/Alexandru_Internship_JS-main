import { LitElement, html, css } from "lit";
import { map } from "lit/directives/map.js";

import { FetchPokemons } from "../api/app";
import { pushState } from "../router.js";
import { PokemonCard } from "../components/PokemonCard";
import styles from "../styles/app.css?inline";

export class HomePage extends LitElement {
  static styles = css([styles]);
  static properties = {
    pokemons: { state: true },
    page: { state: true },
    offset: { state: true },
  };
  constructor() {
    super();
    this.offset = 0;
    this.page = 1;
    this.pokemons = [];
  }

  async connectedCallback() {
    super.connectedCallback();

    this.pokemons = await FetchPokemons.getPokemonList(
      history.state?.page ? history.state.page : this.page
    );
  }

  async handleNextPage() {
    if ((this.page + 1) * 25 > 200) {
      this.page = 1;
    } else {
      this.page++;
    }
    this.pokemons = await FetchPokemons.getPokemonList(this.page);
  }

  async handlePrevPage() {
    if (this.page <= 1) {
      this.page = 1;
    } else {
      this.page--;
    }

    this.pokemons = await FetchPokemons.getPokemonList(this.page);
  }

  render() {
    return html`
      <div>
        <div class="navbar">
          <h1>Pokemons</h1>
        </div>

        <ol id="pokedex">
          ${map(
            this.pokemons || [],
            ({ id, image, name }) => html`
              <pokemon-card
                .id="${id}"
                .image="${image}"
                .name="${name}"
                .page="${this.page}"
                .offset="${this.offset}"
              ></pokemon-card>
            `
          )}
        </ol>
        <div id="footer">
          <button @click="${this.handlePrevPage}"><</button>
          <button @click="${this.handleNextPage}">></button>
        </div>
      </div>
    `;
  }
}

customElements.define("home-page", HomePage);
