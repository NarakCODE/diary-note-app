const footerDesign = () => {
  return `
    <footer class="footer__container">
      <div class="footer__inner inner__width">
        <p>Copyright &copy; 2022. Created by <b>Channarak Lu</b></p>
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
