'''
Created on Jan 10, 2012
@author: Kathryn Hurley
'''

# python data_import.py christopherlawrencekeller@gmail.com legi.csv 3114062

from authorization.clientlogin import ClientLogin
from sql.sqlbuilder import SQL
import ftclient
from fileimport.fileimporter import CSVImporter
import time
import traceback

if __name__ == "__main__":

  import sys, getpass
  try:
    username = sys.argv[1]
    filepath = sys.argv[2]
    tableid = sys.argv[3]
  except:
    print 'Usage: python data_import.py <username> <filepath> <tableid>'
    sys.exit()
  password = getpass.getpass("Enter your password: ")

  try:
    token = ClientLogin().authorize(username, password)
    ft_client = ftclient.ClientLoginFTClient(token)
  except:
    print 'oops, couldn\'t log you in. Check your username and password'
    sys.exit()

  while True:
    #import a table from CSV file
    ft_client.query('DELETE FROM ' + tableid)
    cols = ["GEOID",
      "full_name",
      "last_name",
      "first_name",
      "middle_name",
      "photo_url",
      "state",
      "chamber",
      "party",
      "district"]
    response = CSVImporter(ft_client).importMoreRows(filepath, tableid, cols=cols, delimiter=';')
    print response

    # sleep for 2 minutes
    time.sleep(120)