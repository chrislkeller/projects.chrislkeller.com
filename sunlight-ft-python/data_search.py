#import libraries
import sunlight
import csv

#variables for the search
state_name = "wi"
chamber_name = "upper"

#pull API data
legis =  sunlight.openstates.legislators(
    state=state_name,
    chamber=chamber_name,
    )

#open csv writer
writer = csv.writer(open('legi.csv', 'wb', buffering=0), delimiter=';', quoting=csv.QUOTE_ALL)

#open loop
for legi in legis:

    geo_pre = legi['district']
    
    if len(geo_pre) == 1:
        item = "5500"
        
        #write csv rows
        writer.writerows([
            (item + legi['district'],
            legi['full_name'],
        	legi['last_name'],
        	legi['first_name'],
        	legi['middle_name'],
            legi['photo_url'],
        	legi['state'],
            legi['chamber'],
        	legi['party'],
            legi['district'])
        ])
    
    elif len(geo_pre) == 2:
        item = "550"

        #write csv rows
        writer.writerows([
            (item + legi['district'],
            legi['full_name'],
        	legi['last_name'],
        	legi['first_name'],
        	legi['middle_name'],
            legi['photo_url'],
        	legi['state'],
            legi['chamber'],
        	legi['party'],
            legi['district'])
        ])