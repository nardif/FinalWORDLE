window.onload = function(){
    // var matrix = [
    //     [1,2,3,4,5],
    //     [6,7,8,9,1],
    //     [2,3,4,5,6],
    //     [7,8,9,1,2],
    //     [3,4,5,6,7],
    //     [8,9,1,2,3]
    // ]

    // for (let irow = 0; irow < matrix.length; irow++) {
    //     console.log(matrix[irow]);
        
    //     for (let icell = 0; icell < matrix.length; icell++) {
    //     console.log(matrix[irow][icell]);            
    //     }
        
    // }

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
                        inputP.style.backgroundColor="white";
                        break;
                    case 1:
                        inputP.style.backgroundColor="green";
                        break;
                    case 2:
                        inputP.style.backgroundColor="yellow";
                        break;
                    case 3:
                        inputP.style.backgroundColor="gray";
                        break;
                    default:
                        inputP.style.backgroundColor="white";
                        break;
                }      
            }
        }
    }
    pintarTablero();
}