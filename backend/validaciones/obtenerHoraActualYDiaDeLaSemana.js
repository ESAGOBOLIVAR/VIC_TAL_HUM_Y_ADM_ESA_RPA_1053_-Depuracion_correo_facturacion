function obtenerHoraActualYDiaDeLaSemana() {
    const fecha = new Date();
    const hora = fecha.getHours();
    // const minutos = fecha.getMinutes();
    // const segundos = fecha.getSeconds();
  
    // Formatear la hora en un string de dos dígitos
    const horaFormateada = String(hora).padStart(2, "0");
    // const minutosFormateados = String(minutos).padStart(2, "0");
    // const segundosFormateados = String(segundos).padStart(2, "0");
  
    // Obtener el número del día de la semana (0-6, donde 0 es domingo)
    let numeroDiaSemana = fecha.getDay();
  
    // Crear un arreglo con los nombres de los días de la semana
    let diasSemana = [
      "domingo",
      "lunes",
      "martes",
      "miercoles",
      "jueves",
      "viernes",
      "sabado",
    ];
  
    // Obtener el nombre del día de la semana actual
    let diaSemanaActual = diasSemana[numeroDiaSemana];
  
    // Devolver la hora en el formato deseado
    // return `${horaFormateada}:${minutosFormateados}:${segundosFormateados}`;
    //@return {Int} horaFormateada: es la hora en formato 24 horas
    //@return {String} diaSemanaActual: es dia de la semana
    return [horaFormateada, diaSemanaActual];
  }
  