// Función para agregar etiqueta al hilo del correo
function agregarEtiqueta(nombreEtiqueta, hiloCorreo) {
    let etiqueta = GmailApp.getUserLabelByName(nombreEtiqueta);

    // Verificar si la etiqueta existe, si no, crearla
    if (!etiqueta) {
        etiqueta = GmailApp.createLabel(nombreEtiqueta);
    }

    // Agregar la etiqueta al hilo del correo
    etiqueta.addToThread(hiloCorreo);
}