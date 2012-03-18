#import libraries
import sunlight
import csv

#variables for the search
state_name = "wi"
chamber_name = "upper"

#variable for legi without photo
photo = "undefined.jpg"

#plan to ask for input to search API data
#state_name = raw_input("Which state do you want to search? (Hint: Use lowercase, two-letter abbreviation)")
#chamber_name = raw_input("Which chamber do you want to search? (Hint: Use upper for senate and lower for assembly)")

#pull API data
legis =  sunlight.openstates.legislators(
    state=state_name,
    chamber=chamber_name,
    )

#open csv writer
writer = csv.writer(open('legi.csv', 'wb', buffering=0), delimiter=';', quoting=csv.QUOTE_ALL)

print "Writing results to a CSV for you"

#open loop
for legi in legis:

    #check to see if key for photo is present in dict
    #sets any value to the photo variable
    #method thanks to chagan here: https://gist.github.com/2051340
    if 'photo_url' in legi:
        photo = legi['photo_url']

    geo_pre = legi['district']

    #not so elegant way of writing the state ID
    #needed for merging with shapefile
    #construct is state_code and legi_district
    #single digit district has two zeros between 
    #state_code and legi_district     
    if len(geo_pre) == 1:
        item = "5500"
        
        #write csv rows
        writer.writerows([
            (item + legi['district'],
            legi['full_name'],
        	legi['last_name'],
        	legi['first_name'],
        	legi['middle_name'],
            
            #variable for legi['photo_url'],
            photo,
        	
        	legi['state'],
            legi['chamber'],
        	legi['party'],
            legi['district'])
        ])

    #double digit district has one zero between 
    #state_code and legi_district       
    elif len(geo_pre) == 2:
        item = "550"

        #write csv rows
        writer.writerows([
            (item + legi['district'],
            legi['full_name'],
        	legi['last_name'],
        	legi['first_name'],
        	legi['middle_name'],
            
            #variable for legi['photo_url'],
            photo,
            
        	legi['state'],
            legi['chamber'],
        	legi['party'],
            legi['district'])
        ])

print "Finished"