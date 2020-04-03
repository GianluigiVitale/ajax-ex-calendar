var htmlGiorno = $('#calendar-template').html();
var templateGiorno = Handlebars.compile(htmlGiorno);


var dataIniziale = moment('01-01-2018', 'DD-MM-YYYY');
stampoGiorniMese(dataIniziale)

function stampoGiorniMese(meseDaStampare) {
    $('#giorni-mese').empty();
    var giorniMese = meseDaStampare.daysInMonth();
    var giornoX = meseDaStampare.clone();
    var meseAttuale = giornoX.format('MMMM');
    $('#mese').text(meseAttuale);

    for (var i = 1; i <= giorniMese; i++) {
        var giornoDaInserire = {
            giorno: i + ' ' + meseAttuale
        }

        var templateFinale = templateGiorno(giornoDaInserire); // Stiamo popolando il template con i dati dell'oggetto
        $('#giorni-mese').append(templateFinale);
    }
}
