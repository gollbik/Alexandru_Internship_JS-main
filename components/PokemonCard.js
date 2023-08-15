import { LitElement, html, css } from "lit";
import { pushState } from "../router.js";
import { getColorForPokemon } from "../api/app";
import styles from "../styles/app.css";

export class PokemonCard extends LitElement {
  static styles = css([styles]);

  constructor() {
    super();
  }

  static get properties() {
    return {
      id: { type: Number },
      offset: { type: Number },
      image: { type: String },
      name: { type: String },
      page: { type: Number },
    };
  }

  connectedCallback() {
    super.connectedCallback();
  }

  render() {
    return html`<li
      class="card"
      style="background-color: ${getColorForPokemon(
        this.id - 1 + this.offset
      )};"
      @click="${() => pushState(`./pokemon/${this.id}`, { page: this.page })}"
    >
      <h2 class="card-id">${this.id}</h2>
      <img class="card-image" src="${this.image}" />
      <h2 class="card-title">${this.name}</h2>
    </li>`;
  }
}

customElements.define("pokemon-card", PokemonCard);
