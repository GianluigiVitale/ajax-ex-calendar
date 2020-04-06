$(document).ready(function() {

    var htmlGiorno = $('#calendar-template').html();
    var templateGiorno = Handlebars.compile(htmlGiorno);


    var dataIniziale = moment('01-01-2018', 'DD-MM-YYYY');
    var limiteIniziale = moment('01-01-2018', 'DD-MM-YYYY');
    var limiteFinale = moment('30-11-2018', 'DD-MM-YYYY');

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



    function aggiuntaSpaziGrigliaSettimana(meseDaStampare) {        // questa funzione prende il giorno della settimana del primo giorno del mese (meseDaStampare) e crea degli spazi vuoti nella griglia in base al giorno della settimana (es. Domenica uguale 6 spazi vuoti dal Lunedi' al Sabato)
        var weekDay1stMonth = meseDaStampare.startOf('month').weekday();
        var divVuoto = '<div class="giorno"></div>';
        for (var i = 1; i <= weekDay1stMonth; i++) {
            $('.giorni-mese').append(divVuoto);
        }
    }


    function stampoGiorniMese(meseDaStampare) {         // questa funzione prende dalla variabile meseDaStampare il mese, vede quanti giorni ci sono e stampa a schermo tutti i giorni (handlebars)
        $('.giorni-mese').empty();
        var giorniMese = meseDaStampare.daysInMonth();
        var giornoX = meseDaStampare.clone();
        var meseAttuale = giornoX.format('MMMM');
        var annoAttuale = giornoX.format('YYYY');
        $('#mese').text(meseAttuale);
        $('#anno').text(annoAttuale);
        aggiuntaSpaziGrigliaSettimana(meseDaStampare);

        for (var i = 1; i <= giorniMese; i++) {
            var giornoDaInserire = {
                giorno: i,
                dataGiorno: giornoX.format('YYYY-MM-DD')
            }

            var templateFinale = templateGiorno(giornoDaInserire); // Stiamo popolando il template con i dati dell'oggetto
            $('.giorni-mese').append(templateFinale);
            giornoX.add(1, 'day');
        }
    }


    function stampaFestivi(meseDaStampare) {    // questa funzione fa una chiamata AJAX a un API e se c'e' una vacanza in un giorno cambia il colore di quel giorno e dice quale e' la vacanza
        $('.giorni-mese .giorno:nth-child(7n)').addClass('festivo');    // aggiungo a ogni domenica il colore rosso
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
                    $('.giorno[data-giorno="' + dataFestivo + '"]').addClass('festivo').find('.testo-numero-giorno').text(' - ' + nomeGiornoFestivo);
                }
            }
        });
    }


    function controlloMeseNext(meseDaStampare) {        // questa funzione fa si che si ci muova sempre tra il range gennaio 2018 e dicembre 2018 se il mese e' dicembre torna a gennaio
        $('.mese-precedente').prop('disabled', false);
        if (meseDaStampare.isSameOrAfter(limiteFinale)) {
            alert('Anno 2019 e successivi non disponibili');
        } else {
            dataIniziale.add(1, 'month');
            if (meseDaStampare.isSameOrAfter(limiteFinale)) {
                $('.mese-successivo').prop('disabled', true);
            }
        }
    }


    function controlloMesePrevt(meseDaStampare) {       // questa funzione fa si che si ci muova sempre tra il range gennaio 2018 e dicembre 2018 se il mese e' gennaio torna a dicembre
        $('.mese-successivo').prop('disabled', false);
        if (meseDaStampare.isSameOrBefore(limiteIniziale)) {
            alert('Anno 2017 e precedenti non disponibili');
        } else {
            dataIniziale.subtract(1, 'month');
            if (meseDaStampare.isSameOrBefore(limiteIniziale)) {
                $('.mese-precedente').prop('disabled', true);
            }
        }
    }


});
