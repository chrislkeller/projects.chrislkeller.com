import os, sys, argparse, csv, json

parser = argparse.ArgumentParser()
parser.add_argument("csv_filename", help="Name of the csv file you want to convert to json")
args = parser.parse_args()

# default is to use first row of csv as fieldnames
# uncomment below to use custom
#fieldnames = ("DataOrder", "Data", "Title", "Source", "SourceLink")

def convertToJson(filename):

    # open the csv
    f = open(filename, 'rU')

    print "parsing csv"

    # default is to use first row of csv as fieldnames
    # uncomment below to use custom
    #reader = csv.DictReader(f, fieldnames = fieldnames)

    reader = csv.DictReader(f)

    # parse CSV into JSON
    jsonOutput = json.dumps([row for row in reader])

    # wrap the json
    writeTestData = '{"objects": %s}' % jsonOutput

    # get file name by stripping csv extension and rename as json
    jsonDataFile = os.path.splitext(filename)[0] + '.json'

    # open output file
    f = open(jsonDataFile, 'w')

    # write to the output file
    f.write(writeTestData)

    # close the output file
    f.close()

    print "csv converted to json"

    return

convertToJson(args.csv_filename)