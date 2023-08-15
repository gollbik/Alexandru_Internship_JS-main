import styles from "../styles/app.css?inline";
import { LitElement, html, css } from "lit";

export class NotFound extends LitElement {
  static styles = css([styles]);

  render() {
    return html` <h2>Oops... Page not found</h2> `;
  }
}

customElements.define("not-found-page", NotFound);
