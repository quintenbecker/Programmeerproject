### Samenvatting
Mijn website bevat een home pagina; met informatie over het onderwerp en een visualisatie pagina; met 3 interactieve visualisaties (een wereldmap, een barchart en een linegraph). Het probleem van mij project wordt op de homepage duidelijk: Door de hoge Co2 uitstoot en het opraken van fossiele brandstoffen is het noodzakelijk om met een alternatief te komen. Tegenwoordig is heel Europa bezig met het duurzamer worden en met het gebruiken van'renewable energy', maar hoe duurzaam zijn we eigenlijk?
Het doel van mijn site (de oplossing) is dat de gebruiker een beter inzicht te krijgen over het 'renewable energy' aandeel van Europeese landen en in welke sector ze deze toepassen. 

![Visualisatie](doc/visualisatie.png)

### Design

DATA -> JSON
Op de site is de data gemakkelijk te downloaden als CSV bestand. De eerste stap is om deze om te zetten naar JSON file. De opmaak van mijn JSON file is als volgt:

2007 = {
        "BELGIUM" : {
            "total" : "3,1",
            "transport" : "0,6",
            "electrivity" : "3,6",
            "heating & cooling" : "4,5"
        },
        "Denmark" : {
            "total" : "17,8",
            "transport" : "0,5",
            "electrivity" : "25,6",
            "heating & cooling" : "4,5"          
        }
      }
 2008 = { enz...    
      }
      
Er wordt dus geselecteerd op jaren als key, met daarin de verschillende landen en hun data van dat jaar. Dit wordt op deze manier gedaan omdat de wereldkaart met slider (per jaar) gemakkelijker te maken is. Voor de andere visualisaties moet er eerst een nieuwe dictionary gemaakt worden .

Dit is de enige keer dat mijn data geparsed wordt. Met deze Json file kunnen alle visualisaties gemaakt worden.

JSON -> VISUALISATIE

Worldmap - De worldmap is een interactieve heat map met een slider per jaar, de key is dus "YEAR" en van elk land willen we alleen de waarde van de “Share of renewable energy in gross final energy consumption”, en nog niet per sector. Dus dit was gemakkelijk te implementeren. 

Line Graph - Deze is linked met de Worldmap, er wordt op een bepaald land gedrukt, wat mee wordt gegeven aan de nieuwe fucntion.  Van de data wordt er een nieuwe dictionary gemaakt worden. Waar deze “country” in te vinden is.  Zo kan de linechart gemaakt worden en zie je het verloop van ‘renewable energy’ in de jaren van een bepaald land. Ook is er hier een dropdown menu gemaakt met alle landen binnen Europa. Hetzelfde principe gebeurt wanneer hier een land geselecteerd wordt. 

Bar chart - Deze is linked met de Line Graph, wanneer er van een bepaald land op een bepaald jaarstip wordt geklikt, wordt er een nieuwe function aangeroepen die de barchart maakt. Hier wordt weer eerst een dictionary gemaakt waar de key ‘year’ in zit. Hiermee kan de barchart voor dat bepaalde jaar gemaakt worden. Deze barchart laat de share van reneweable energy zien in drie verschillende sectoren: Transport, Electricity & Heat and Cooling.

Ik heb mijn javascript bestanden per visualisatie opgedeeld met daarin de functions:

all.js, hier zit mijn enige window onload om de juiste data in te laden. Hierin wordt de functie makeworldmap(data) aangeroepen met deze data. 

worldmap.js, hier zitten twee functies: makeSlider() en drawMap(). De makeSlider functie maakt de slider, in de .onchange wordt de drawMap aangeroepen met data en het gekozen jaar -> drawMap(data, year).
In de .onclick van de drawMap function wordt er een land gekozen en meegegeven aan makeLineChart() samen met dat -> makeLineChart(data, country). 

linechart.js, hierin is er eerst een ‘if’ statement, is er nog geen svg? Voer dan de makeSvg() en de drawLineChart() uit. Is er wel al een svg? Voer dan alleen de updateFuction() uit. 
De makeSvg() function spreekt voor zich, in de drawlineChart() wordt er dus data en country meegegeven. In deze function wordt er een line en een scatterplot gemaakt. In de .onclick van de scatterplot in beide de drawLineChart() en updateFuntion () wordt het jaar meegegeven aan de makeBarChart() in barchart.js -> makeBarChart(data, country, year). 

barchart.js, hier wordt eerst een nieuwe dictionary gemaakt de data, country en year. Erna wordt er een ‘if’ statement gemaakt, als er al een barchart is? updateBarFunction(). Zo niet? drawBarChart().

### Challenges 
Mijn grootste challenge tijdens dit project was om het groter geheel te begrijpen. De site met de svg's, de manieren om iets aan te roepen in css dmv id's en classes, maar ook iedere tool en visualisatie maken ging mij niet gemakkelijk af. Ik vond het ook moeilijk om mijn code zo effectief te schijven e de interactie behouden tussen de verschillende files waar ik in werkte; hoe je de fucnties met elkaar kon laten interacteren terwijl ze in andere files zaten. Ook was het voor mij allemaal even opzoeken hoe het nou precies in d3 werkt. Ik heb heel veel geleerd over d3, javascript, css en html. Ik heb nu het idee dat ik de principes begrijp en vooral hoe ze met elkaar samenhangen. 


### Decisions
Mijn 
  

