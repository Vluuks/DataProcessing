# Renske Talsma
# 10896503

# This is a small program that takes a CSV file and transforms it into a JSON file. 
# Make sure the CSV file had the headers on the first line as these are kept. The
# name of the JSON file will automatically be generated from the CSV file.

from collections import OrderedDict
import csv
import json
import sys

# Get source file from command line.
def convert(fileName):
     
    # Prepare files.
    csvFileName = fileName[0]
    jsonFileName = csvFileName.split(".")[0]+".json"
    
    # Open the CSV file and read row by row.
    with open(csvFileName,'r') as f:
        reader = csv.reader(f)
        headerlist = next(reader)
        csvlist = []
        for row in reader:
                d = OrderedDict()
                for i, x in enumerate(row):
                        d[headerlist[i]] = x
                csvlist.append(d)

    # Write to JSON file.
    with open(jsonFileName,'w') as f:
        json.dump(csvlist,f)


if __name__=="__main__":
 convert(sys.argv[1:])