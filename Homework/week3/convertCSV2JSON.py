import csv
import sys
import json

# Tutorial/example from : https://jaranto.blogspot.nl/2012/12/transform-csv-file-to-json-file-with.html
fieldNames=["Regio","Jaar","Totaal",
					"Infrastructuur","Bebouwing",
					"Semibebouwing", "Recreatie",
					"Agrarisch","Natuur",
					"Binnenwater","Buitenwater"]

def convert(fileName):
     
    # Open files.
    csvFilename = fileName[0]
    jsonFilename = csvFilename.split(".")[0]+".json"
    csvFile = open(csvFilename, 'r')
    jsonFile = open(jsonFilename, 'w') 
    
    # Make CSVreader.
    csvReader = csv.DictReader(csvFile, fieldNames)
         
    # Write to JSON file.
    data = json.dumps([r for r in csvReader])
    jsonFile.write(data) 
 
    # Close files.
    csvFile.close()
    jsonFile.close()
 
if __name__=="__main__":
 convert(sys.argv[1:])