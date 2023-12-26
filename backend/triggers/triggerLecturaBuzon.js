function triggerLecturaBuzon() {
    const [hora, diaSemanaActual] = obtenerHoraActualYDiaDeLaSemana();
    //si el dia es miercoles
    if (diaSemanaActual == "martes") {

        const bandeja = consultarBandeja();
        //si hay correos sin dichas etiquetas

        console.log(bandeja);
        if (bandeja.length > 0) {
            console.log(bandeja);
        }
    }
}