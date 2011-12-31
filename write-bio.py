import itertools
import requests
import lxml
from lxml import html
from django.utils.encoding import smart_str, smart_unicode

#opens text file for output, names it output
#file = open('output.txt', 'w')

endpoint = 99
district = 1

while district <= endpoint:

	#search URL and assign to variable r
	r = requests.get('http://legis.wisconsin.gov/w3asp/contact/legislatorpages.aspx?house=Assembly&district=' + str(district) + '&display=bio')
	
	#r = requests.get('http://legis.wisconsin.gov/w3asp/contact/legislatorpages.aspx?house=Assembly&district=' + str(district))

	#create variable tree from r's content
	tree = lxml.html.fromstring(r.content)

	#search the tree for the given element
	#elements = tree.get_element_by_id('ctl00_C_lblBio')
	
	elements = tree.cssselect("div.indent span")

	#for each element in the variable
	for el in elements:

		#set data to the content
		data = el.text_content().strip()

		#display the data
		print data

		#write the data to the file
		#file.write(data)

		district = district + 1

#close the file	
#file.close()