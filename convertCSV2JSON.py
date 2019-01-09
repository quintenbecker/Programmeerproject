import csv
import json

with open("data.csv", 'r') as csv_file:
    file = csv.DictReader(csv_file)

    json_dict = {}
    countries = {}


    for row in file:
        # if row["INDIC_EN"] == "Share of renewable energy in heating and cooling":
        #     print(row["Value"])

        countries[row["GEO"]] = row["Value"]

        # countries[row["GEO"]] = {row["INDIC_EN"]: row["Value"], row["INDIC_EN"]: row["Value"]}

    print(countries)
#         json_dict[row["TIME"]] =
#
#         if row["TIME"] == "2000":
#             json_list.append({"country": row["GEO"], "value": row["Value"]})
#
# with open('jsonfile.json', 'w') as f:
#     json.dump(json_list, f)
#
#     maak json list, Eerste key is tijd
#
#
#     vb
#
#      2007 = {
#         "BELGIUM" : {
#             "total" : "3,1",
#             "transport" : "0,6",
#             "electrivity" : "3,6",
#             "heating & cooling" : "4,5"
#         },
#         "Denmark" : {
#             "total" : "17,8",
#             "transport" : "0,5",
#             "electrivity" : "25,6",
#             "heating & cooling" : "4,5"
#         }
#       }
#  2008 = { enz...
#       }
