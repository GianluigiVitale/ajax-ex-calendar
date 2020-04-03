$(document).ready(function() {

    var htmlGiorno = $('#calendar-template').html();
    var templateGiorno = Handlebars.compile(htmlGiorno);


    var dataIniziale = moment('01-01-2018', 'DD-MM-YYYY');
    stampoGiorniMese(dataIniziale);
    stampaFestivi(dataIniziale);




    $('.mese-successivo').click(function () {
        dataIniziale.add(1, 'month');
        stampoGiorniMese(dataIniziale);
        stampaFestivi(dataIniziale);
    });

    $('.mese-precedente').click(function () {
        dataIniziale.subtract(1, 'month');
        stampoGiorniMese(dataIniziale);
        stampaFestivi(dataIniziale);
    });

    //


    // FUNZIONI USATE



    function stampaFestivi(meseDaStampare) {
        var giornoX = meseDaStampare.clone();
        var meseAttuale = giornoX.month();
        $.ajax({
            url: 'https://flynn.boolean.careers/exercises/api/holidays',
            method: 'GET',
            data: {
                year: 2018,
                month: meseAttuale
            },
            success: function(data) {
                var giorniFestivi = data.response;
                for (var i = 0; i < giorniFestivi.length; i++) {
                    var giornoFestivo = giorniFestivi[i];
                    var nomeGiornoFestivo = giornoFestivo.name;
                    var dataFestivo = giornoFestivo.date;
                    $('#giorni-mese li[data-giorno="' + dataFestivo + '"]').addClass('festivo').append(' - ' + nomeGiornoFestivo);
                }
            }
        });
    }


    function stampoGiorniMese(meseDaStampare) {
        $('#giorni-mese').empty();
        var giorniMese = meseDaStampare.daysInMonth();
        var giornoX = meseDaStampare.clone();
        var meseAttuale = giornoX.format('MMMM');
        var annoAttuale = giornoX.format('YYYY');
        $('#mese').text(meseAttuale);
        $('#anno').text(annoAttuale);

        for (var i = 1; i <= giorniMese; i++) {
            var giornoDaInserire = {
                giorno: i + ' ' + meseAttuale,
                dataGiorno: giornoX.format('YYYY-MM-DD')
            }

            var templateFinale = templateGiorno(giornoDaInserire); // Stiamo popolando il template con i dati dell'oggetto
            $('#giorni-mese').append(templateFinale);
            giornoX.add(1, 'day');
        }
    }

});
