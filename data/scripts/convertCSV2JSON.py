import csv
import json

with open("data/csv/data.csv", 'r') as csv_file:
    file = csv.DictReader(csv_file)

    json_dict = {}


    for row in file:
        if row["TIME"] in json_dict.keys():
            pass
        else:
            json_dict[row["TIME"]] = {}

        if row["GEO"] in json_dict[row["TIME"]].keys():
            pass
        else:
            json_dict[row["TIME"]][row["GEO"]] = {}

        json_dict[row["TIME"]][row["GEO"]][row["INDIC_EN"]] = row["Value"]


with open('data/json/jsonfile.json', 'w') as f:
    json.dump(json_dict, f)
