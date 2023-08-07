import styles from "/components/app.css";
import { LitElement, html, css } from "lit";
import { FetchPokemons, getColorForPokemon } from "/components/app";
import { unsafeCSS } from "lit";
import { pushState } from "../router";
export class Pokemon extends LitElement {
  static styles = css`
    ${unsafeCSS(styles)}
  `;

  static get properties() {
    return {
      pokemon: { type: Object },
    };
  }

  connectedCallback() {
    super.connectedCallback();
    this.fetchPokemon();
  }

  async fetchPokemon() {
    this.pokemon = await FetchPokemons.getPokemonDetails(this.id);
    const stats = await FetchPokemons.pokeStats(this.id);

    this.pokemon = { ...this.pokemon, ...stats };

    console.log(this.pokemon);
  }

  handleBack() {
    pushState("./", { ...history.state });
  }

  renderAbilities() {
    if (!this.pokemon || !this.pokemon.abilities) {
      return html``;
    }

    return html`
      <ul>
        ${this.pokemon.abilities.map(
          (ability) => html`
            <li class="space">
              <div class="container2">
                <h3>${ability.abilityName}</h3>
                <p class="abilities">
                  ${this.getEffectEntries(ability.effectEntries)}
                </p>
              </div>
            </li>
          `
        )}
      </ul>
    `;
  }

  getEffectEntries(entries) {
    if (!entries || !entries.length) {
      return "";
    }

    return entries.map((entry) => html`<p>${entry.effect}</p>`);
  }

  render() {
    if (!this.pokemon) {
      return html`<div>Loading...</div>`;
    }

    const { id, image, name, types } = this.pokemon;

    return html`
      <div class="popup">
        <div class="card2">
          <button id="closeBtn" @click="${this.handleBack}">Close</button>
          <div
            class="card2"
            style="background-color: ${getColorForPokemon(id - 1)};"
          >
            <img class="card-image2" src="${image}" />
            <h2 class="card-title">${name}</h2>
            ${types && types.length >= 2
              ? html`
                  <div class="container3">
                    <x-large>${types[0].type.name}</x-large>
                  </div>
                  <div class="container3">
                    <x-large>${types[1].type.name}</x-large>
                  </div>
                `
              : types && types.length === 1
              ? html`
                  <div class="container3">
                    <x-large>${types[0].type.name}</x-large>
                  </div>
                `
              : html``}
            <div class="interior">
              <ul class="stats-list">
                <li class="stats">
                  <x-large class="large">HP: </x-large>
                  <progress value="${this.pokemon.hp}" max="120"></progress>
                </li>
                <li class="stats">
                  <x-large>ATK: </x-large>
                  <progress value="${this.pokemon.attack}" max="120"></progress>
                </li>
                <li class="stats">
                  <x-large>DEF: </x-large>
                  <progress
                    value="${this.pokemon.defense}"
                    max="120"
                  ></progress>
                </li>
                <li class="stats">
                  <x-large>SPD:</x-large>
                  <progress value="${this.pokemon.speed}" max="120"></progress>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="card2">
          <h2 class="card-title2">Abilities:</h2>
          ${this.renderAbilities()}
        </div>
      </div>
    `;
  }
}

customElements.define("pokemon-page", Pokemon);
