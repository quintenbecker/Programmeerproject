DESIGN Programmeerproject.

De data die ik voor het project gebruik is: 
> [Renewable energy](https://ec.europa.eu/eurostat/tgm/refreshTableAction.do?tab=table&plugin=1&pcode=sdg_07_40&language=en)

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
 
 Dit wordt gedaan omdat de wereldkaart met slider (per jaar) gemakkelijk te maken is. 
      
      
