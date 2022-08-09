window.onload = function(){
    //DECLARAR VARIABLES
    var intentoString = '';
    var palabraGanadora;
    var numIntento = 0; // para que cambie las rows en la validacion de palabras
    var chequeoXletra = 0; //variable tipo índice para repetir el chequeo por cada letra de la palabra
    var rowPalabra = 0; //variable tipo indice para evaluar los intentos
    var chequeoWin = true;  //si esta en true al final de las validaciones el jugador adivinó la palabra
    var iPalabraGanadora = Math.floor(Math.random() * (13941 + 1));
    var estado_Partida = "pendiente";
    var num_Partida = 0;
    var tiempo_Actual;
    var btnGuardarPartida = document.getElementById('guardar');

    //MODAL SETUP
    // declarar inputs
    var modalGanar = document.getElementById("modalGanar");
    var modalPerder = document.getElementById("modalPerder");
    var span = document.getElementsByClassName("cerrar")[0];
    // cerrar modal cuando se hace click en el <span> (x)
    span.onclick = function() {
        modalGanar.classList.add('modal');
        modalPerder.classList.add('modal');
    }

    //FETCH PALABRA GANADORA
    fetch("../src/palabras.json")
    .then(res => res.json())
    .then(data => {
        console.log(data);
        palabraGanadora = data[iPalabraGanadora];
        console.log(palabraGanadora);
        
    })

    //     1. Crear una nueva matriz llamada “colores” que tenga la misma dimensión del tablero del juego, en donde en cada posición se deberá guardar un valor numérico de 0 a 3. Luego se debera crear una funcion “pintarTablero” que recorrar dicha matriz y dependiendo del valor guardado en cada posicion de la matriz, pinte de verde, amarillo o gris cada input HTML del tablero, correspondiente a la posicion de la matriz.
    // - El valor 0 representa el color blanco.
    // - El valor 1 representa el color verde.
    // - El color 2 representa el color amarillo.
    // - El color 3 representa el color gris.

    var colores = [
        [0,0,0,0,0],
        [0,0,0,0,0],
        [0,0,0,0,0],
        [0,0,0,0,0],
        [0,0,0,0,0],
        [0,0,0,0,0]
    ]

    function pintarTablero(){
        for (let irow = 0; irow < colores.length; irow++) {
            for (let icol = 0; icol < (colores.length-1); icol++) {

                var inputP = document.getElementById(`R${irow}C${icol}`);
            
                switch (colores[irow][icol]) {
                    case 0:
                        inputP.classList.add('White');
                        break;
                    case 1:
                        inputP.classList.add('Green');
                        break;
                    case 2:
                        inputP.classList.add('Yellow');
                        break;
                    case 3:
                        inputP.classList.add('Gray');
                        break;
                    default:
                        inputP.classList.add('White');
                        break;
                }      
            }
        }
    }

    // 2. Crear una nueva matriz llamada “letras” que tenga la misma dimensión del tablero del juego, en donde en cada posición se debe guardar una letra o un string vacío. Luego se deberá crear una función llamada “inicio” que recorra dicha matriz y le asigne una función al evento onInput de input HTML del tablero, correspondiente a la posición de la matriz. La función debe obtener el valor del input y guardarlo en la matriz “letras” respetando la posición del input en el tablero.

    var letras = [
        ["","","","",""],
        ["","","","",""],
        ["","","","",""],
        ["","","","",""],
        ["","","","",""],
        ["","","","",""]
    ]

    // 3. Actualizar la función creada en el punto anterior para obtener cada “fila” del tablero representada con el elemento FieldSet para agregar una función en el evento onkeydown que muestra un console.log cuando se presiona la tecla “enter”.

    function inicio(){
        for (let irow = 0; irow < letras.length; irow++) {
            var fieldset = document.getElementById(`f${irow}`);
            fieldset.onkeydown = function(e){
                if (e.keyCode === 13) {
                    validarLetra();
                }
            }

            for (let icol = 0; icol < (letras.length-1); icol++) {
                var inputL = document.getElementById(`R${irow}C${icol}`);

                inputL.oninput = function(event){  
                    letras[irow][icol] = event.target.value;
                    //console.log(letras)
                    intentoString = letras[irow].join('');
                   // inputL[irow].focus();   //inicio focus para escribir
                }
            }
            
        }
    }
    
    // 4. Crear una función llamada “validarLetra” que se ejecute cuando se presiona la tecla “enter” cuando una fila del tablero (FieldSet) tenga foco. Esta función debe obtener la letra ingresada en la fila del tablero y chequear si la palabra ingresada es la ganadora o tiene alguna letra en común. 
    //Como resultado esta función debe actualizar la matriz de colores creada en el punto 1, y luego debe ejecutar la función “pintarTablero” para mostrar el resultado en pantalla.

    function validarLetra(){
        chequeoXletra = 0; //En 0 para recorrer la palabra desde el principio
        if (intentoString.length == 5) {
            if (rowPalabra < 6) {
                do {
                    if(intentoString[chequeoXletra] === palabraGanadora[chequeoXletra]){
                        colores[rowPalabra][chequeoXletra] = 1;
                        chequeoWin = true;
                        pintarTablero();
                    }
                    else if (intentoString[chequeoXletra] != palabraGanadora[chequeoXletra]) {   //[] MARCA CADA POSICION DEL ARRAY Y SE REPITA
                        chequeoWin =  false;
                        if (palabraGanadora.includes(intentoString[chequeoXletra])) {
                            console.log('la letra ' + intentoString[chequeoXletra] + ' existe en ' + palabraGanadora);
                            colores[rowPalabra][chequeoXletra] = 2;    //PRIMER 0 INDICA ROW, SEGUNDO 0 COLUMNA
                            pintarTablero();
                            console.log(colores);
                        } else{
                            console.log('la letra ' + intentoString[chequeoXletra] + ' NO existe en ' + palabraGanadora);
                            colores[rowPalabra][chequeoXletra] = 3;
                            pintarTablero();
                            console.log(colores);
                        }
                    }
                    chequeoXletra++;
                } while (chequeoXletra < 6 );

                rowPalabra++;
                document.getElementById ((`R${rowPalabra}C${0}`)).focus();   //focus para escribir
                if (chequeoWin == true) {
                    if (intentoString === palabraGanadora) {
                        pararTiempo();
                        modalGanar.classList.remove('modal');
                        estado_Partida = "ganada";
                        seteandoLocalStorage();
                    }
                         
                }
                
            } else {
                if (intentoString != palabraGanadora) {
                    pararTiempo();
                    modalPerder.classList.remove('modal');
                    estado_Partida = "perdida";
                    seteandoLocalStorage();
                }
            }
        }
    }

    // LOCALSTORAGE
    var partida = {
        numPartida: num_Partida,
        ganadora: palabraGanadora,
        matrizColores: colores,
        matrizLetras: letras,
        tiempoActual:tiempo_Actual,
        estadoPartida: estado_Partida

    }
    var objetoUser = {
        usuario : nombre,
        partida: partida,
    }
    
    var nombre = localStorage.getItem('nombre');

   function seteandoLocalStorage(){
    partida = new Object();
    partida.numPartida = num_Partida++;
    partida.ganadora = palabraGanadora;
    partida.matrizColores = colores;
    partida.matrizLetras = letras;
    partida.tiempoActual = tiempo_Actual;
    partida.estadoPartida = estado_Partida;

    objetoUser = new Object();
    objetoUser.usuario = nombre;
    objetoUser.partida = partida;

    window.localStorage.setItem("objetoUser", JSON.stringify(objetoUser));
   }
    

    // CRONOMETRO
    var segundos = 00;
    var minutos = 00;
    var Segundos = document.getElementById("segundos");
    var Minutos = document.getElementById("minutos");
    const Tiempobtn = document.getElementById("tiempo");
    var tiempo; 

    var on = false;
 
    function cronometro(){
        if (segundos < 60) {
            segundos++;
            Minutos.innerHTML = minutos;
            Segundos.innerHTML = ":" + segundos;
         }
         if(segundos > 59){
            segundos = 0; 
            minutos++;
            Minutos.innerHTML = minutos;
            Segundos.innerHTML = ":" + segundos;
         }
         
    }
    var inicioTiempo = function(){
        tiempo = setInterval(cronometro,1000); 
    }  
    var pararTiempo = function(){
        Tiempobtn.innerHTML = !on ? "Parar" : "Reanudar";
        if(!on){
            on = true;  inicioTiempo();
        }else{
            on = false; clearInterval(tiempo);
            tiempo_Actual = minutos + ": " + segundos;
        }
     }
     
    // EJECUTAR FUNCIONES
    document.getElementById('R0C0').focus();   //inicio focus para escribir
    inicio();
    pararTiempo();
    Tiempobtn.onclick = function(){
        Tiempobtn.addEventListener('click', () => {
        })
        pararTiempo();
    }
    btnGuardarPartida.onclick = function(){
        btnGuardarPartida.addEventListener('click', () => {
        })
        seteandoLocalStorage();
    }     
}