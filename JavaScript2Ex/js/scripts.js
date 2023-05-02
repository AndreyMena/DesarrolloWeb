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

      const template = document.getElementById('mi-tarjeta-template');
      const templateContent = template.content;

      const shadowRoot = this.attachShadow({mode: 'open'});
        
      const style = document.createElement('style');
      style.textContent = `
        .card {
            display: block;
            position: relative;
            background-color: cadetblue;
            border-radius: 40px;
            overflow: hidden;
            width: 100%;
        }

        .img {
            width: 40%;
            object-fit: cover;
        }

        .card-inner {
            display: flex;
            align-items: stretch;
            min-height: 240px;
            max-height: 240px;
            min-width: 600px;
            height: 100%;
            width: 100%;
        }

        .content {
            padding: 10px;
            width: 60%;
        }

        .container {
            width: 100%;
            max-width: 600px;
        }
      `;
        
      shadowRoot.appendChild(style);
      
      shadowRoot.appendChild(templateContent.cloneNode(true));
    }
  }
);