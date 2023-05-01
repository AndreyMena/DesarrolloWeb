function verificar(control, max, progressText) {
    if (control.value.length>max){
        document.querySelector("#comentario").value = control.value.slice(0, -1);
    }else{
        var contador = max - (control.value.length);
        progressText.innerHTML = "Usted tiene un espacio de "+contador+" caracteres restantes.";
    }
}