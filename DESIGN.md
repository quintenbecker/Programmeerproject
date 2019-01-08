# DESIGN Programmeerproject.

## DATA
De data die ik voor het project gebruik is: 
> [Renewable energy](https://ec.europa.eu/eurostat/tgm/refreshTableAction.do?tab=table&plugin=1&pcode=sdg_07_40&language=en)

#### DATA -> JSON
Op de site is deze data gemakkelijk te downloaden als CSV bestand. De eerste stap is om deze om te zetten naar JSON file. 
De opmaak van mijn JSON file is als volgt:

```
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
 ```
 
 Er wordt dus geselecteerd op jaren, met daarin de verschilledne landen en hun data van dat jaar. Dit wordt op deze manier gedaan omdat de wereldkaart met slider (per jaar) gemakkelijker te maken is, maar ook de line graph en pie chart door middel van de gekoppelde values aan de key makkelijk te vormen zijn. 
 
 Dit is de enige keer dat mijn data geparsed wordt. MEt deze Json file kunnen alle visualisaties gemaakt worden. 
 
 #### JSON -> VISUALISATIE
 
 Met deze Json list is het mogelijk om alle visualisaties te maken. 
 
 Worldmap - De worldmap is een interactieve heat map met een slide per jaar, de key is dus "YEAR" en van elk land willen we               alleen de waarde van de Share of renewable energy in gross final energy consumption, en nog niet per sector.
 
 Line Graph - Deze is linked met de Worldmap, er wordt op een bepaald land gedrukt, wat dan de key wordt. Hier ook worden                   alleen de totale waarde van elk jaar weergegeven in de line graph. Zo is er een mooi overzicht van de toename in               renewable energy van dat bepaalde land. Maar op elk jaar zit er een knopje op de lijn waar op geklikt kan                     worden. 
 
 Pie chart - Deze is linked met de Line Graph, wanneer er van een bepaald land op een bepaald jaarstip wordt geklikt, zoek je              de key "YEAR" en dan als key het land en worden de values die daarbij horen allemaal tentoongesteld in een pie                chart. We hebben het dan over de drie verschillende sectoren Transport, Electricity & Heat and Cooling.

<img src="doc/Schets_opmaak.png" width="400">
      
