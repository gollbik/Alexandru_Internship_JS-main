import { LitElement, html, css } from "lit";

export class PrevPage extends LitElement {
  static get properties() {
    return {
      page: { type: Number },
    };
  }

  render() {
    return html`
      <!-- Afișează conținutul paginii anterioare -->
      <h1>Previous Page</h1>
      <p>Page number: ${this.page}</p>
    `;
  }
}

customElements.define("prev-page", PrevPage);
