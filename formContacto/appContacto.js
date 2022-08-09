window.onload = function(){
    //DECLARACIÓN DE INPUTS
    const clickButton = document.getElementById('btn');
    var nombre = document.getElementById('nombre');
    var email = document.getElementById('email');
    var mensaje = document.getElementById('mensaje');
    var em_nombre= document.getElementById('em_nombre');
    var em_email = document.getElementById('em_email');
    var em_mensaje = document.getElementById('em_mensaje');
    var campos_completos = true;
    var asunto = 'Consulta/Mensaje Wordle';

   //MODAL SETUP
    // declarar inputs
    var modal = document.getElementById("miModal");
    var span = document.getElementsByClassName("cerrar")[0];
    // cerrar modal cuando se hace click en el <span> (x)
    span.onclick = function() {
        modal.classList.add('modal');
    }

    //VALIDACIONES
    function validarEspaciosOnull(x){
        if (x.value.trim() == ""){
            console.log("debe ingresar un valor en el campo");
            campos_completos = false;
           // modal campos imncopletos
           modal.classList.remove('modal');
        } else{
             console.log("ingreso "+x.value.trim()+", es correcto!");
        } 
    }
    //Nombre
    function validarNombre(){
        var regexNumeros = /^[0-9]+$/;
        var regexLetras = /^[A-z]+$/
       if ((regexNumeros.test(nombre.value)) || (regexLetras.test(nombre.value))) {
            em_nombre.classList.remove('errorOculto');
            campos_completos = false;
        }
        
    }    
    //Email
    function validarEmail(){
       var regex = /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/;
        if (!regex.test(email.value)) {
            em_email.classList.remove('errorOculto');
            campos_completos = false;
        }
    }
    //Mensaje
    function validarMensaje(){
        if (mensaje.value.length < 5) {
            em_mensaje.classList.remove('errorOculto');
            campos_completos = false;
        }
    }

    //LIMPIAR ERRORES
    function clearErrorMsg(){
        var errorType = "em_" + document.activeElement.name;
        var errorMsg = document.getElementById(errorType);
        errorMsg.classList.add('errorOculto');
    }

    //LIMPIAR EVENTOS ERROR
    email.addEventListener('focus',clearErrorMsg);
    nombre.addEventListener('focus',clearErrorMsg);
    mensaje.addEventListener('focus', clearErrorMsg);

    //EJECUTO VALIDACIONES Y ENVIO MENSAJE
    clickButton.onclick = function(){
        clickButton.addEventListener('click', () => {
        })
        //Ejecutar validaciones
        validarEspaciosOnull(nombre);
        if (campos_completos = true) {
            validarNombre();
        }
        validarEspaciosOnull(mensaje)
        if(campos_completos = true){
            validarMensaje();
        }
        validarEmail();
       
        if (campos_completos != false) {
            window.open('mailto:'+email.value+'?subject='+asunto+'&body='+mensaje.value+"%0A"+"%0A"+nombre.value);
        }

    }
}