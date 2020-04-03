$(document).ready(function() {

    var htmlGiorno = $('#calendar-template').html();
    var templateGiorno = Handlebars.compile(htmlGiorno);


    var dataIniziale = moment('01-01-2018', 'DD-MM-YYYY');
    stampoGiorniMese(dataIniziale);
    stampaFestivi(dataIniziale);


    $('.mese-successivo').click(function () {   // quando si clicca per andare al mese successivo
        controlloMeseNext(dataIniziale);
        stampoGiorniMese(dataIniziale);
        stampaFestivi(dataIniziale);
    });

    $('.mese-precedente').click(function () {   // quando si clicca per tornare al mese precedente
        controlloMesePrevt(dataIniziale);
        stampoGiorniMese(dataIniziale);
        stampaFestivi(dataIniziale);
    });



    // FUNZIONI USATE



    function stampoGiorniMese(meseDaStampare) {         // questa funzione prende dalla variabile meseDaStampare il mese, vede quanti giorni ci sono e stampa a schermo tutti i giorni (handlebars)
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


    function stampaFestivi(meseDaStampare) {    // questa funzione fa una chiamata AJAX a un API e se c'e' una vacanza in un giorno cambia il colore di quel giorno e dice quale e' la vacanza
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


    function controlloMeseNext(meseDaStampare) {        // questa funzione fa si che si ci muova sempre tra il range gennaio 2018 e dicembre 2018 se il mese e' dicembre torna a gennaio
        var giornoX = meseDaStampare.clone();
        var meseAttuale = giornoX.format('MMMM');
        if (meseAttuale == 'dicembre') {
            alert('Anno 2019 e successivi non disponibili');
        } else {
            dataIniziale.add(1, 'month');
        }
    }


    function controlloMesePrevt(meseDaStampare) {       // questa funzione fa si che si ci muova sempre tra il range gennaio 2018 e dicembre 2018 se il mese e' gennaio torna a dicembre
        var giornoX = meseDaStampare.clone();
        var meseAttuale = giornoX.format('MMMM');
        if (meseAttuale == 'gennaio') {
            alert('Anno 2017 e precedenti non disponibili');
        } else {
            dataIniziale.subtract(1, 'month');
        }
    }


});
