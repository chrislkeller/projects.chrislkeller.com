import os, sys, argparse, csv, json

parser = argparse.ArgumentParser()
parser.add_argument('csv_filename', help='Name of the csv file you want to convert to json')
parser.add_argument('usage', help='Add \'timeline\' if you want json for a vertical timeline, or \'handlebars\' if you want json for a handlebars template')
args = parser.parse_args()

def convertToJson(filename, output):

    print "parsing %s \n" % (filename)

    # open the csv
    file = open(filename, 'rU')

    # uncomment below to use custom fieldnames
    # for dict keys

    '''
    fieldnames = [
        'DataOrder',
        'Data',
        'Title',
        'Source',
        'SourceLink'
    ]
    '''

    # create a new list to push keys to
    fieldnames = []

    # gather the first row as string
    dict_keys = file.readline()

    # split the string on commas
    split_keys = dict_keys.rstrip('\r\n').split(',')

    # for each key
    for key in split_keys:

        # remove whitespace & push to fieldnames list
        if ' ' in key:
            edited_key = key.replace(" ", "").lower()
            fieldnames.append(edited_key)

        # remove underscores & push to fieldnames list
        elif '_' in key:
            edited_key = key.replace("_", "").lower()
            fieldnames.append(edited_key)

        # or push to fieldnames list
        else:
            edited_key = key.lower()
            fieldnames.append(edited_key)

    # convert the fieldnames list to a tuple
    fieldnames = tuple(fieldnames)

    reader = csv.DictReader(file, fieldnames = fieldnames)

    # parse CSV into JSON
    jsonOutput = json.dumps([row for row in reader])

    if args.usage == 'timeline':

        print "creating json for timeline"

        # create json for use with timeline
        data_to_write = '%s' % (jsonOutput)

        # get file name by stripping csv extension and rename as json
        json_flat_file = os.path.splitext(filename)[0] + '-timeline.json'

    else:
        print "creating json for handlebars template"

        # wrap the json for use with handlebars
        data_to_write = '{"objects": %s}' % jsonOutput

        # get file name by stripping csv extension and rename as json
        json_flat_file = os.path.splitext(filename)[0] + '-handlebars.json'

    # open output file
    new_file = open(json_flat_file, 'w')

    # write to the output file
    new_file.write(data_to_write)

    # close the output file
    new_file.close()

    # close the output file
    file.close()

    print '%s converted to %s \n' % (filename, json_flat_file)

    return

convertToJson(args.csv_filename, args.usage)