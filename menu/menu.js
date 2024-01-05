function onOpen() {
    // Add a custom menu to the spreadsheet.
    SpreadsheetApp.getUi() // Or DocumentApp, SlidesApp, or FormApp.
        .createMenu('Funcionalidades')
        .addItem('Migracion A Consolidado', 'triggerVerificacionDeUrlGoogleSheet')
        .addItem('Lectura de Buzon', 'triggerLecturaBuzon')
        .addToUi();
  }