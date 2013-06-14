#!/usr/bin/python
#
# Copyright (C) 2010 Google Inc.

""" Imports files.

Imports CSV files into Fusion Tables.
"""

__author__ = 'kbrisbin@google.com (Kathryn Hurley)'


from sql.sqlbuilder import SQL
import csv, time, sys, codecs



class Importer:
  def importFile(self, filename):
    pass

  def importMoreRows(self, filename):
    pass

class UTF8Recoder:
    """
    Iterator that reads an encoded stream and reencodes the input to UTF-8
    """
    def __init__(self, f, encoding):
        self.reader = codecs.getreader(encoding)(f)
 
    def __iter__(self):
        return self

    def next(self):
        return self.reader.next().encode("utf-8")

class UnicodeReader:
    """
    A CSV reader which will iterate over lines in the CSV file "f",
    which is encoded in the given encoding.
    """

    def __init__(self, f, dialect=csv.excel, encoding="utf-8", **kwds):
        f = UTF8Recoder(f, encoding)
        self.reader = csv.reader(f, dialect=dialect, **kwds)

    def next(self):
        row = self.reader.next()
        return [unicode(s, "utf-8").encode("utf-8") for s in row]

    def __iter__(self):
        return self

class CSVImporter(Importer):
  def __init__(self, ftclient):
    self.ftclient = ftclient

  def importFile(self, filename, encoding="utf-8", table_name=None, data_types=None, delimiter=','):
    """ Creates new table and imports data from CSV file """
    filehandle = UnicodeReader(open(filename, "rb"), encoding=encoding, delimiter=delimiter)
    cols = filehandle.next()
    if data_types: columns_and_types = dict(zip(cols, data_types))
    else: columns_and_types = dict([(c, "STRING") for c in cols])

    table = {}
    table[table_name or filename] = columns_and_types
    results = self.ftclient.query(SQL().createTable(table))
    table_id = int(results.split()[1])

    self._importRows(filehandle, table_id, cols)

    return table_id

  def importMoreRows(self, filename, table_id, encoding="utf-8", cols=[], delimiter=','):
    """ Imports more rows in a CSV file to an existing table. First row is a header """
    filehandle = UnicodeReader(open(filename, "rb"), encoding=encoding, delimiter=delimiter)
    if not cols:
      cols = filehandle.next()
    return self._importRows(filehandle, table_id, cols)

  def _importRows(self, filehandle, table_id, cols):
    """ Helper function to upload rows of data in a CSV file to a table """
    max_per_batch = 400
    queries = []
    rows = []
    for line in filehandle:
      values = dict(zip(cols, line))
      query = SQL().insert(table_id, values)
      queries.append(query)
      query_length = len(';'.join(queries))
      if query_length == max_per_batch or query_length > 1000000:
        if query_length > 1000000:
          full_query = ';'.join(queries[:-1])
          rows += self._import(full_query)
          queries = [queries[-1]]
        else:
          full_query = ';'.join(queries)
          rows += self._import(full_query)
          queries = []
        time.sleep(5)

    if len(queries) > 0:
      full_query = ';'.join(queries)
      rows += self._import(full_query)

    return rows

  def _import(self, full_query):
    rows = ''
    try:
      rows = self.ftclient.query(full_query).split("\n")[1:-1]
    except:
      print str(sys.exc_info()[1])
      print full_query + "\n"
      print 'trying again...'
      time.sleep(1)
      try:
        rows = self.ftclient.query(full_query).split("\n")[1:-1]
      except:
        print 'sorry, just couldn\'t do it'
        print str(sys.exc_info()[1])
        print full_query + "\n"

    return rows
    
if __name__ == "__main__":
  pass
