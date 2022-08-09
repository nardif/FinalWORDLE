window.onload = function(){
    //SI YA HAY UN NOMBRE EN EL LOCALHOST SALTA AL JUEGO
    if ((localStorage.getItem('nombre'))!=null) {
        window.location.href = 'juego.html';
    }
        var jugarBtn = document.getElementById('btn');
        var nombre = document.getElementById('nombre');
        var em_nombre= document.getElementById('em_nombre');

        var listaNombres = [];

        jugarBtn.onclick = function(){
            if (nombre.value.trim() == ""){
                em_nombre.classList.remove('errorOculto');
            } else if (!listaNombres.includes(nombre.value)) {
                listaNombres.push(nombre.value);
                localStorage.setItem('nombre', nombre.value);
                window.location.href='juego.html';
            }
            console.log(listaNombres);
    }

     //LIMPIAR ERRORES
     function clearErrorMsg(){
        var errorType = "em_" + document.activeElement.name;
        var errorMsg = document.getElementById(errorType);
        errorMsg.classList.add('errorOculto');
    }

    //LIMPIAR EVENTOS ERROR
    nombre.addEventListener('focus',clearErrorMsg);
}