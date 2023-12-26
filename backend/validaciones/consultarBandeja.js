//funcion para consultar la bandeja de entrada y omitir aquellos correos que tienen la bandeja de GESTIONADO o NO GESTIONADO
function consultarBandeja() {

    let cantidadMensajes = 30; // Cantidad de mensajes a leer

    //consulta original descartar luego
    let consultaGmail = `is:inbox after:2023/12/18 -in:trash -in:sent -is:forwarded -label:{"GESTIONADO","NO GESTIONADO"}`;

    let bandeja = GmailApp.search(
        consultaGmail,
        0,
        cantidadMensajes
    );
    //@param {Array of array} se retorna el arreglo de objetos de la bandeja,
    //en esta caso retornaria un arreglo vacio [];
    return bandeja;
}