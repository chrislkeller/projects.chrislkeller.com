#!/usr/bin/python
#
# Copyright (C) 2010 Google Inc.

""" OAuth Example.

Demonstrates use of the OAuth FT Client.
"""

__author__ = 'kbrisbin@google.com (Kathryn Hurley)'


from authorization.oauth import OAuth
from sql.sqlbuilder import SQL
import ftclient
from fileimport.fileimporter import CSVImporter


if __name__ == "__main__":
  import sys, getpass
  consumer_key = sys.argv[1]
  consumer_secret = getpass.getpass("Enter your secret: ")
  
  url, token, secret = OAuth().generateAuthorizationURL(consumer_key, consumer_secret, consumer_key)
  print "Visit this URL in a browser: "
  print url
  raw_input("Hit enter after authorization")
  
  token, secret = OAuth().authorize(consumer_key, consumer_secret, token, secret)
  oauth_client = ftclient.OAuthFTClient(consumer_key, consumer_secret, token, secret)

  #show tables
  results = oauth_client.query(SQL().showTables())
  print results
  
  #create a table
  table = {'tablename':{'strings':'STRING', 'numbers':'NUMBER', 'locations':'LOCATION'}}
  tableid = int(oauth_client.query(SQL().createTable(table)).split("\n")[1])
  print tableid
  
  #insert row into table
  rowid = int(oauth_client.query(SQL().insert(tableid, {'strings':'mystring', 'numbers': 12, 'locations':'Palo Alto, CA'})).split("\n")[1])
  print rowid

  #show row
  print oauth_client.query(SQL().select(tableid, None, "numbers=12"))

  #update row using 2 lists
  print oauth_client.query(SQL().update(tableid, ['strings'], ['mystring2'], rowid))
  print oauth_client.query(SQL().select(tableid))

  #update row using dictionary of values
  print oauth_client.query(SQL().update(tableid, cols={'strings': 'mystring3'}, row_id=rowid))
  print oauth_client.query(SQL().select(tableid))
  
  #show rows
  print oauth_client.query(SQL().select(tableid, None, "numbers=12"))
  
  #delete row
  print oauth_client.query(SQL().delete(tableid, rowid))
  
  #drop table
  print oauth_client.query(SQL().dropTable(tableid))
  
  
  #import a table from CSV file
  tableid = int(CSVImporter(oauth_client).importFile("data.csv"))
  print tableid
  
  #drop table
  print oauth_client.query(SQL().dropTable(tableid))
  