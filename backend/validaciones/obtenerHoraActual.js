//funcion para obtener la hora actual
function obtenerHoraActual() {
    // Crea un nuevo objeto de fecha
    let fecha = new Date();
  
    // Obtiene la hora, minutos y segundos
    let hora = fecha.getHours();
    
    //@return {Int} hora: es la hora actual
    return hora;
  }