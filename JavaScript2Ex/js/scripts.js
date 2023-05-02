function verificar(control, max, progressText) {
    if (control.value.length>max){
        document.querySelector("#comentario").value = control.value.slice(0, -1);
    }else{
        var contador = max - (control.value.length);
        progressText.innerHTML = "Usted tiene un espacio de "+contador+" caracteres restantes.";
    }
}

customElements.define('mi-tarjeta',
  class extends HTMLElement {
    constructor() {
      super();

      const shadowRoot = this.attachShadow({mode: 'open'});

      const style = document.createElement('style');
      style.textContent = `
        div { padding: 10px; border: 1px solid gray; width: 200px; margin: 10px; }
        h2 { margin: 0 0 10px; }
        ul { margin: 0; }
        p { margin: 10px 0; }
      `;

      shadowRoot.appendChild(style);
      shadowRoot.appendChild(templateContent.cloneNode(true));
    }
  }
);