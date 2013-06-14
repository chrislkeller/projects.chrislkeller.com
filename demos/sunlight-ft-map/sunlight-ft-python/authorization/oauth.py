#!/usr/bin/python
#
# Copyright (C) 2010 Google Inc.

""" OAuth 1.0 Authorization.

Uses python-oauth2 library to perform 3-way handshake.

1. Create a new instance OAuth 1.0
2. Call the generateAuthorizationURL method to create
the authorization URL
3. Once the user grants access
4. Call the authorize method to upgrade to an access
token.
"""

__author__ = 'kbrisbin@google.com (Kathryn Hurley)'

import oauth2
import urllib

OAUTH_SETTINGS = {
  'scope' : "https://www.googleapis.com/auth/fusiontables",
  'request_token_url':"https://www.google.com/accounts/OAuthGetRequestToken",
  'authorize_url':'https://www.google.com/accounts/OAuthAuthorizeToken',
  'access_token_url':'https://www.google.com/accounts/OAuthGetAccessToken',
}

class OAuth():

  def generateAuthorizationURL(self, consumer_key, consumer_secret, domain, callback_url=None):
    """ Fetch the OAuthToken and generate the authorization URL.
    Returns:
      the Authorization URL
    """

    consumer = oauth2.Consumer(consumer_key, consumer_secret)
    client = oauth2.Client(consumer)

    resp, content = client.request("%s?scope=%s" % (OAUTH_SETTINGS['request_token_url'], OAUTH_SETTINGS['scope']), "GET")
    if resp['status'] != '200': raise Exception("Invalid response %s." % resp['status'])

    urlparts = content.split("&")
    oauth_token = urllib.unquote_plus(urlparts[0].split("=")[1])
    oauth_token_secret = urllib.unquote_plus(urlparts[1].split("=")[1])

    if callback_url:
      auth_url = "%s?oauth_token=%s&scope=%s&domain=%s&oauth_callback=%s" % (OAUTH_SETTINGS['authorize_url'],
                                                                             oauth_token,
                                                                             OAUTH_SETTINGS['scope'],
                                                                             domain,
                                                                             callback_url)
    else:
      auth_url = "%s?oauth_token=%s&scope=%s&domain=%s" % (OAUTH_SETTINGS['authorize_url'],
                                                           oauth_token,
                                                           OAUTH_SETTINGS['scope'],
                                                           domain)
      
    return auth_url, oauth_token, oauth_token_secret


  def authorize(self, consumer_key, consumer_secret, oauth_token, oauth_token_secret):
    """ Upgrade OAuth to Access Token
    Returns:
      the oauth token
      the token secret
    """
    consumer = oauth2.Consumer(consumer_key, consumer_secret)
    token = oauth2.Token(oauth_token, oauth_token_secret)
    client = oauth2.Client(consumer, token)

    resp, content = client.request(OAUTH_SETTINGS['access_token_url'], "POST")
    
    urlparts = content.split("&")
    oauth_token = urllib.unquote_plus(urlparts[0].split("=")[1])
    oauth_token_secret = urllib.unquote_plus(urlparts[1].split("=")[1])
    
    return oauth_token, oauth_token_secret


