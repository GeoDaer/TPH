$(document).ready(function(){
	var inetxml = 'assets/xml/Termine.xml';
	var localxml = 'Termine.xml';
	var datum = "";
	var zeit = "";
	var detail1 = "";
	var detail2 = "";
	var thema = "";

	$.ajax({
		url: inetxml,
		dataType: 'xml',
		success: function(data){
			// Extract relevant data from XML
			var dHeute = new Date(); // Datum Heute
			var x = 1; // Variable für HTML-ID
			// Schleife um Termine abzufragen
			for (d = 0; d < 31; d++){
				// Datum vorbereiten für Termin Attribut

				var heute = dHeute.getDate() + "." + (dHeute.getMonth() + 1) + ".";
				var tag = dHeute.getDate();
				var monat = dHeute.getMonth() + 1
				tag = tag<10?'0'+tag:tag;
				monat = monat<10?'0'+monat:monat;
				var sDatum = tag + "." + monat + ".";
				// Alle Termine auf gesuchtes Datum abfragen, bei gefundenem Termin alle Node Childs in Variablen schreiben, falls diese gefüllt wurden.
				$(data).find('termin').each(function(){
					if($(this).attr('datum') == sDatum) {
						tDatum = $(this).attr('datum');
						tZeit = $(this).find('zeit').text();
						if ($(this).find('detail1').text() == "-"){
							tDetail1 = "";
						} else {
							tDetail1 = $(this).find('detail1').text();
						}
						if ($(this).find('detail2').text() == "-"){
							tDetail2 = "";
						} else {
							tDetail2 = $(this).find('detail2').text();
						}
						if ($(this).find('thema').text() == "-"){
							tThema = "";
						} else {
							tThema = 'Thema: "' + $(this).find('thema').text() + '"';
						}
						if ($(this).find('bibel').text() == "-") {
							tBibel = "";
						} else {
							tBibel = $(this).find('bibel').text();
						}
						if ($(this).find('link').text() == "-"){
							tLink = "";
						} else {
							tLink = $(this).find('link').text();
						}
						// Ausgabe der Variablen an html
						$('#tDatum' + x).html(tDatum);
						$('#tDetail' + x).html("<b>" + tZeit + ": </b>" + tDetail1 + "<br/>" + tDetail2 + "<br/>" + tThema + "<br/>" + tBibel + "<br/><a href='" + tLink + "' target='blanc'>" + tLink + "</a>");
						// x um 1 erhöhen um die nächste ID zu füllen
						x++;
					}
				});
				// Schleife verlassen, wenn die nächsten 4 Termine an HTML weitergeleitet wurden
				if (x == 5) {
					break;
				}
				dHeute.setDate(dHeute.getDate() + 1);
			}
		},
		error: function(data){
			console.log('Error loading XML data');
			//$('#inhalt').text('Error loading XML data');
		}
	});
});
