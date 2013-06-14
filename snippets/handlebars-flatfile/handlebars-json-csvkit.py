import os, sys, argparse
from subprocess import Popen, PIPE, STDOUT

parser = argparse.ArgumentParser()
parser.add_argument("csv_filename", help="Name of the csv file you want to convert to json")
args = parser.parse_args()

def convertToJson(filename):

    # take argument run command in the shell, capturing output
    cmd = 'csvjson %s' % filename
    p = Popen(cmd, shell=True, stdin=PIPE, stdout=PIPE, stderr=STDOUT, close_fds=True)

    print "parsing csv"

    # set command line output to variable
    jsonOutput = p.stdout.read()

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