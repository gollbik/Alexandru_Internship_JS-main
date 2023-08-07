import styles from '/style.css'
import { LitElement, html, css } from 'lit';

export class CounterButton extends LitElement {
    static styles =css([styles]);

    constructor() {
        super();
        this.count = 0;
    }

    render() {
        return html`
      <button @click=${this.increment}>
        count is ${this.count}
      </button>
    `;
    }

    increment() {
        this.count += 1;
        this.requestUpdate(); // Informs Lit to perform an update, causing `render` to be called
    }
}

customElements.define('counter-button', CounterButton);
