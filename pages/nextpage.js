import { LitElement, html, css } from "lit";

export class NextPage extends LitElement {
  static styles = css``;

  static get properties() {
    return {
      page: { type: Number },
    };
  }

  render() {
    return html`
      <!-- Afișează conținutul paginii următoare -->
      <h1>Next Page</h1>
      <p>Page number: ${this.page}</p>
    `;
  }
}

customElements.define("next-page", NextPage);
