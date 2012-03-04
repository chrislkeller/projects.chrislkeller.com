#!/usr/bin/python
#
# Copyright (C) 2010 Google Inc.

""" ClientLogin.
"""

__author__ = 'kbrisbin@google.com (Kathryn Hurley)'

import urllib, urllib2

URL = "https://www.google.com/fusiontables/api/query"

class ClientLogin():
  def authorize(self, username, password):
    auth_uri = 'https://www.google.com/accounts/ClientLogin'
    authreq_data = urllib.urlencode({
        'Email': username,
        'Passwd': password,
        'service': 'fusiontables',
        'accountType': 'HOSTED_OR_GOOGLE'})
    auth_req = urllib2.Request(auth_uri, data=authreq_data)
    auth_resp = urllib2.urlopen(auth_req)
    auth_resp_body = auth_resp.read()

    auth_resp_dict = dict(
        x.split('=') for x in auth_resp_body.split('\n') if x)
    return auth_resp_dict['Auth']

class FTClient():

  def __init__(self, token):
    self.auth_token = token

  def _get(self, query):
    headers = {
      'Authorization': 'GoogleLogin auth=' + self.auth_token,
    }
    serv_req = urllib2.Request(url="%s?%s" % (URL, query),
                               headers=headers)
    serv_resp = urllib2.urlopen(serv_req)
    return serv_resp.read()

  def _post(self, query):
    headers = {
      'Authorization': 'GoogleLogin auth=' + self.auth_token,
      'Content-Type': 'application/x-www-form-urlencoded',
    }

    serv_req = urllib2.Request(url=URL, data=query, headers=headers)
    serv_resp = urllib2.urlopen(serv_req)
    return serv_resp.read()

  def query(self, query, request_type=None):
    """ Issue a query to the Fusion Tables API and return the result. """

    #encode to UTF-8
    try: query = query.encode("utf-8")
    except: query = query.decode('raw_unicode_escape').encode("utf-8")

    lowercase_query = query.lower()
    if lowercase_query.startswith("select") or \
       lowercase_query.startswith("describe") or \
       lowercase_query.startswith("show") or \
       request_type=="GET":

      return self._get(urllib.urlencode({'sql': query}))

    else:
      return self._post(urllib.urlencode({'sql': query}))

if __name__ == "__main__":
  auth_token = ClientLogin().authorize("<username>", "<password>")
  client = FTClient(auth_token)
  print client.query("SHOW TABLES")
