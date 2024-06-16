document.addEventListener("DOMContentLoaded", () => {
  const headerDesign = () => {
    return `
     <!-- Header Container -->
    <header class="header__container">
      <!-- Inner Width -->
      <div class="header__inner inner__width">

        <!-- Header Logo -->
        <a class="header__logo" href="./index.html"
          >Diary Application
          <span><img src="./assets/images/diary.png" alt="logo-img" /></span
        ></a>

        <!-- Header Profile -->
        <div class="header__profile">
          <img src="./assets/images/profile-img.avif" alt="profile-img" />
        </div>
      </div>
    </header>
    `;
  };

  class HeaderComponent extends HTMLElement {
    connectedCallback() {
      this.innerHTML = headerDesign();
    }
  }

  customElements.define("header-component", HeaderComponent);
});
