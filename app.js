window.onload = function(){

//     1. Crear una nueva matriz llamada “colores” que tenga la misma dimensión del tablero del juego, en donde en cada posición se deberá guardar un valor numérico de 0 a 3. Luego se debera crear una funcion “pintarTablero” que recorrar dicha matriz y dependiendo del valor guardado en cada posicion de la matriz, pinte de verde, amarillo o gris cada input HTML del tablero, correspondiente a la posicion de la matriz.  

// - El valor 0 representa el color blanco.
// - El valor 1 representa el color verde.
// - El color 2 representa el color amarillo.
// El color 3 representa el color gris.

    var colores = [
        [0,1,2,3,0],
        [1,2,3,0,1],
        [2,3,0,1,2],
        [3,2,1,0,1],
        [2,3,0,1,2],
        [3,0,1,2,3]
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

    // function inicio(){
    //     for (let irow = 0; irow < letras.length; irow++) {
    //         for (let icol = 0; icol < (letras.length-1); icol++) {
    //             var inputL = document.getElementById(`R${irow}C${icol}`);
    //             inputL.oninput = function(event){
    //                letras[irow][icol] = event.target.value;
    //                console.log(letras)
    //             }
    //         }
    //     }
        
    // }

    // 3. Actualizar la función creada en el punto anterior para obtener cada “fila” del tablero representada con el elemento FieldSet para agregar una función en el evento onkeydown que muestra un console.log cuando se presiona la tecla “enter”.

    function inicio(){
        for (let irow = 0; irow < letras.length; irow++) {
                var fieldset = document.getElementById(`f${irow}`);
                fieldset.onkeydown = function(e){
                    if (e.keyCode === 13) {
                    console.log("funciona");
                    }
                }
            

            for (let icol = 0; icol < (letras.length-1); icol++) {
                var inputL = document.getElementById(`R${irow}C${icol}`);
                inputL.oninput = function(event){
                   letras[irow][icol] = event.target.value;
                   console.log(letras)
                }
            }
        }
        
    }

    // 4. Crear una función llamada “validarLetra” que se ejecute cuando se presiona la tecla “enter” cuando una fila del tablero (FieldSet) tenga foco. Esta función debe obtener la letra ingresada en la fila del tablero y chequear si la palabra ingresada es la ganadora o tiene alguna letra en común. Como resultado esta función debe actualizar la matriz de colores creada en el punto 1, y luego debe ejecutar la función “pintarTablero” para mostrar el resultado en pantalla.

    function validarLetra(){
        
    }
    
    inicio();
    pintarTablero();
}