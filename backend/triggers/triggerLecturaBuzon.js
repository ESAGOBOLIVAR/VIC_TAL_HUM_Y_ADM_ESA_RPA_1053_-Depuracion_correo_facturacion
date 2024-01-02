//funcion encargada de tener la lectura de de los correos del  buzon de instalacion
function triggerLecturaBuzon() {
    const [hora, diaSemanaActual] = obtenerHoraActualYDiaDeLaSemana();

    const { idDataBase, nameTables } = parametrosGlobales();

    const { tablaConsolidadoReporteFacturacion } = nameTables;
    const { idBaseDeDatosConsolidadoDepuracionCorreoFacturacion } = idDataBase
    //si el dia es miercoles
    if (diaSemanaActual == "martes") {

        const bandeja = consultarBandeja();

        //data del consolidado
        let dataSheetConsolidadoReporteFacturacion = readAllArray([tablaConsolidadoReporteFacturacion, idBaseDeDatosConsolidadoDepuracionCorreoFacturacion]);
        //convertir la data
        dataSheetConsolidadoReporteFacturacion = JSON.parse(dataSheetConsolidadoReporteFacturacion);


        //obtener la hoja de calculo
        const [sheetHojaConsolidadoReporteFacturacion] = asignarNombreHojaDeCalculo(tablaConsolidadoReporteFacturacion, idBaseDeDatosConsolidadoDepuracionCorreoFacturacion);



        //si hay correos sin dichas etiquetas
        bandeja.map((registrosCorreos, index) => {

            //acceder siempre al primer correo de un buzon
            let mensaje = registrosCorreos.getMessages()[0];

            let asuntoMensajePadre = mensaje.getSubject();

            let idPadre = mensaje.getId();

            // let etiquetasPadre=mensaje.getThread().getLabels();
            console.log("<<<<<ASUNTO HILO PADRE>>>>>>>>>>>>>>>")
            console.log(asuntoMensajePadre);


            //obtener el nro de factura
            let nroFactura = asuntoMensajePadre.split(";");

            //si el asunto tiene un nro de factura entonces procesarlo
            if (nroFactura.length >= 3) {

                //obtener el nuro de la factura
                nroFactura = nroFactura[2];

                //recorrer base de consolidado para verificar si existe
                let busqueda = dataSheetConsolidadoReporteFacturacion.find(el => el[4].toString().trim() == nroFactura.toString().trim());

                let busquedaIndice=dataSheetConsolidadoReporteFacturacion.findIndex(el => el[4].toString().trim() == nroFactura.toString().trim());

                // si encuentra el nro de factura en la google sheet del consolidado significa que lo gestiono por lo tanto se procede
                // a etiquetar el correo
                if (busqueda != undefined) {


                    console.log("INDICE A ACTUALIZAR");
                    console.log(busquedaIndice);
                    let indice = busquedaIndice + 2;

                    let columnaEstado = 8;

                    console.log(`EL NRO DE FACTURA ${nroFactura} SE ENCONTRO EN EL CONSOLIDADO SE PROCEDE A COLOCAR ETIQUETA GESTIONADO`);
                    agregarEtiqueta("GESTIONADO", mensaje.getThread());

                    //actualizar campo del numero de factura que encontro por un estado de "GESTIONADO"
                    let rango = sheetHojaConsolidadoReporteFacturacion.getRange(indice, columnaEstado).setValue("GESTIONADO");



                } else {
                    //de lo contrario va a colocar el correo como no gestionado
                    console.log(`NO SE ENCONTRO EL NRO DE FACTURA ${nroFactura} EN EL CONSOLIDADO FINAL,COLOCAR ETIQUETAR COMO NO GESTIONADO`);
                    agregarEtiqueta("NO GESTIONADO", mensaje.getThread());


                }


            } else { //en caso de que no tenga un nro de factura directo entonces pasarlo como "NO GESTIONADO" 

                console.log("NO SE PUEDO EXTRAER EL NRO DE LA FACTURA DEL ASUNTO YA QUE ESTE NO CUMPLE CON EL PATRON DE EXTRAER POR COMA,POR LO TANTO COLOCAR ETIQUETAR COMO NO GESTIONADO");

                agregarEtiqueta("NO GESTIONADO", mensaje.getThread());

            }

        });
    } //fin condicional dia
} //fin del trigger