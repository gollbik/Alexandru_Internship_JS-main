import { LitElement, html, css } from "lit";
import styles from "../styles/app.css";

export class PokemonStats extends LitElement {
  static styles = css([styles]);

  static get properties() {
    return {
      hp: { type: Number },
      attack: { type: Number },
      defense: { type: Number },
      speed: { type: Number },
    };
  }

  render() {
    return html`
      <div class="interior">
        <ul class="stats-list">
          <li class="stats">
            <x-large class="large">HP: </x-large>
            <progress value="${this.hp}" max="120"></progress>
          </li>
          <li class="stats">
            <x-large>ATK: </x-large>
            <progress value="${this.attack}" max="120"></progress>
          </li>
          <li class="stats">
            <x-large>DEF: </x-large>
            <progress value="${this.defense}" max="120"></progress>
          </li>
          <li class="stats">
            <x-large>SPD:</x-large>
            <progress value="${this.speed}" max="120"></progress>
          </li>
        </ul>
      </div>
    `;
  }
}

customElements.define("pokemon-stats", PokemonStats);
