//trigger para validar la informacion que el usuario sube para almacenar en el consolidado
function triggerVerificacionDeUrlGoogleSheet() {
    //desestructuracion de los parametros globales
    const { idDataBase, nameTables } = parametrosGlobales();
    const { idBaseDeDatosDepuracionCorreoFacturacion, idBaseDeDatosConsolidadoDepuracionCorreoFacturacion } = idDataBase;
    const { tablaEjecucion, tablaConsolidadoReporteFacturacion } = nameTables;
    //data hoja ejecucion
    const [sheetHojaEjecucion] = asignarNombreHojaDeCalculo(tablaEjecucion, idBaseDeDatosDepuracionCorreoFacturacion);
    const [sheetHojaConsolidadoReporteFacturacion] = asignarNombreHojaDeCalculo(tablaConsolidadoReporteFacturacion, idBaseDeDatosConsolidadoDepuracionCorreoFacturacion);



    let url = sheetHojaEjecucion.getRange("C2").getValue();

    let hora = obtenerHoraActual();
    //la hora va a ser desde 8 pm hasta las 12 de la noche
    if (hora >= 20 && hora <= 24) {

        //si hay una url de google sheet
        if (url) {
            //data de la hoja que sube el usuario diariamente o cada tiempo
            let datosHojaBuzonFacturacion = readAllByUrl(url);
            //data del consolidado
            let dataSheetConsolidadoReporteFacturacion = readAllArray([tablaConsolidadoReporteFacturacion, idBaseDeDatosConsolidadoDepuracionCorreoFacturacion])

            dataSheetConsolidadoReporteFacturacion = JSON.parse(dataSheetConsolidadoReporteFacturacion);
            //arreglo donde se almacenaran todos los registros que no esten en el consolidado
            let arregloRegistrosInsertar = [];

            //console.log(dataSheetConsolidadoReporteFacturacion);

            // console.log(datosHojaBuzonFacturacion);
            //recorrer datos de la hoja de calculo BUZON FACTURACION  (1) Es la url que carga el usuario
            datosHojaBuzonFacturacion.map(el => {
                let numero_factura = el[4].toString().trim();

                // if(el[0]=="41355"){
                //     console.log(el);
                // }
                //buscar Consolidado Depuración correo facturación si el numero de la factura existe
                let busqueda = dataSheetConsolidadoReporteFacturacion.find(registro => registro[4].toString().trim() == numero_factura);

                //buscar en el arreglo antes de insertar
                let busquedaEnArregloAInsertar = arregloRegistrosInsertar.find(registro => registro[4].toString().trim() == numero_factura);

                //si no lo encuentra en la hoja de calculo del consolidado ni tampoco en el mismo proceso al insetar entonces lo va agregar
                if (busqueda == undefined && busquedaEnArregloAInsertar == undefined) {

                    arregloRegistrosInsertar.push(el);
                }
            });

            //insertar multiples registros si no existen en el consolidado
            if (arregloRegistrosInsertar.length > 0) {

                console.log(arregloRegistrosInsertar);
                // Inserta los datos en la hoja de cálculo.
                sheetHojaConsolidadoReporteFacturacion.getRange(sheetHojaConsolidadoReporteFacturacion.getLastRow() + 1, 1, arregloRegistrosInsertar.length, arregloRegistrosInsertar[0].length).setValues(arregloRegistrosInsertar);

            }

        }
    }


}