document.addEventListener("DOMContentLoaded", () => {
    const footerDesign = () => {
        return `
    <footer class="footer__container">
      <div class="footer__inner inner__width">
        <p>Created by NarakCODE</p>
      </div>
    </footer>
    `;
    };

    class FooterComponent extends HTMLElement {
        connectedCallback() {
            this.innerHTML = footerDesign();
        }
    }

    customElements.define("footer-component", FooterComponent);
});
