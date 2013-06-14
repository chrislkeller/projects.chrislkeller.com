#!/usr/bin/python
#
# Copyright (C) 2010 Google Inc.

""" Builds SQL strings.

Builds SQL strings to pass to FTClient query method.
"""

import re

__author__ = 'kbrisbin@google.com (Kathryn Hurley)'


class SQL:
  """ Helper class for building SQL queries """

  def showTables(self):
    """ Build a SHOW TABLES sql statement.

    Returns:
      the sql statement
    """
    return 'SHOW TABLES'

  def describeTable(self, table_id):
    """ Build a DESCRIBE <tableid> sql statement.

    Args:
      table_id: the ID of the table to describe

    Returns:
      the sql statement
    """
    return 'DESCRIBE %d' % (table_id)

  def createTable(self, table):
    """ Build a CREATE TABLE sql statement.

    Args:
      table: a dictionary representing the table. example:
        {
          "tablename":
            {
            "col_name1":"STRING",
            "col_name2":"NUMBER",
            "col_name3":"LOCATION",
            "col_name4":"DATETIME"
            }
        }

    Returns:
      the sql statement
    """

    table_name = table.keys()[0]
    cols_and_datatypes = ",".join(["'%s': %s" % (col[0], col[1]) 
                                   for col in table.get(table_name).items()])
    return "CREATE TABLE '%s' (%s)" % (table_name, cols_and_datatypes)


  def select(self, table_id, cols=None, condition=None):
    """ Build a SELECT sql statement.

    Args:
      table_id: the id of the table
      cols: a list of columns to return. If None, return all
      condition: a statement to add to the WHERE clause. For example,
        "age > 30" or "Name = 'Steve'". Use single quotes as per the API.

    Returns:
      the sql statement
    """
    stringCols = "*"
    if cols: stringCols = ("'%s'" % ("','".join(cols))) \
                          .replace("\'rowid\'", "rowid") \
                          .replace("\'ROWID\'", "ROWID")

    if condition: select = 'SELECT %s FROM %d WHERE %s' % (stringCols, table_id, condition)
    else: select = 'SELECT %s FROM %d' % (stringCols, table_id)
    return select


  def update(self, table_id, cols, values=None, row_id=None):
    """ Build an UPDATE sql statement.

    Args:
      table_id: the id of the table
      cols: list of columns to update
      values: list of the new values
      row_id: the id of the row to update

      OR if values is None and type cols is a dictionary -

      table_id: the id of the table
      cols: dictionary of column name to value pairs
      row_id: the id of the row to update

    Returns:
      the sql statement
    """
    if row_id == None: return None

    if type(cols) == type({}):
      updateStatement = ""
      count = 1
      for col,value in cols.iteritems():
        if type(value).__name__ == 'int':
          updateStatement = '%s%s=%d' % (updateStatement, col, value)
        elif type(value).__name__ == 'float':
          updateStatement = '%s%s=%f' % (updateStatement, col, value)
        else:
          updateStatement = "%s%s='%s'" % (updateStatement, col,
              value.encode('string-escape'))

        if count < len(cols): updateStatement = "%s," % (updateStatement)
        count += 1
  
      return "UPDATE %d SET %s WHERE ROWID = '%d'" % (table_id,
          updateStatement, row_id)

    else:
      if len(cols) != len(values): return None
      updateStatement = ""
      count = 1
      for i in range(len(cols)):
        updateStatement = "%s'%s' = " % (updateStatement, cols[i])
        if type(values[i]).__name__ == 'int':
          updateStatement = "%s%d" % (updateStatement, values[i])
        elif type(values[i]).__name__ == 'float':
          updateStatement = "%s%f" % (updateStatement, values[i])
        else:
          updateStatement = "%s'%s'" % (updateStatement, 
              values[i].encode('string-escape'))
  
        if count < len(cols): updateStatement = "%s," % (updateStatement)
        count += 1
  
      return "UPDATE %d SET %s WHERE ROWID = '%d'" % (table_id, updateStatement, row_id)

  def delete(self, table_id, row_id):
    """ Build DELETE sql statement.

    Args:
      table_id: the id of the table
      row_id: the id of the row to delete

    Returns:
      the sql statement
    """
    return "DELETE FROM %d WHERE ROWID = '%d'" % (table_id, row_id)


  def insert(self, table_id, values):
    """ Build an INSERT sql statement.

    Args:
      table_id: the id of the table
      values: dictionary of column to value. Example:
        {
        "col_name1":12,
        "col_name2":"mystring",
        "col_name3":"Mountain View",
        "col_name4":"9/10/2010"
        }

    Returns:
      the sql statement
    """
    stringValues = ""
    count = 1
    cols = values.keys()
    values = values.values()
    for value in values:
      if type(value).__name__=='int':
        stringValues = '%s%d' % (stringValues, value)
      elif type(value).__name__=='float':
        stringValues = '%s%f' % (stringValues, value)
      else:
        stringValues = "%s'%s'" % (stringValues, value.encode('string-escape'))
      if count < len(values): stringValues = "%s," % (stringValues)
      count += 1

    return 'INSERT INTO %d (%s) VALUES (%s)' % \
      (int(table_id), ','.join(["'%s'" % col for col in cols]), stringValues)

  def dropTable(self, table_id):
    """ Build DROP TABLE sql statement.

    Args:
      table_id: the id of the table

    Returns:
      the sql statement
    """
    return "DROP TABLE %d" % (table_id)


if __name__ == '__main__':
    pass



