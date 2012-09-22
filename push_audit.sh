#!/bin/bash

###################################
#  CSV Data Audit & Backup
#  Filename: push_audit.sh
#
#  Hacked on by Chris Keller and based on shell scripts authored by Jeff Severns Guntzel to help data journalists
#+ use Christopher Groskopf's 'csvkit' utility library to audit a csv file without opening it, and then backup and
#+ move the csv file to a project directory before working on it.
#
# Jeff's scripts are here:
#+ http://www.jsguntzel.com/skinnynotebook/2011/11/14/protecting-your-data-before-you-mess-with-it-another-shell-script-for-data-journalists/
#+ http://www.jsguntzel.com/skinnynotebook/2011/10/28/super-quick-data-audit-with-this-csvkit-shell-script/
#
#  Important: For this script to work, you must install csvkit,
#+ which you will find at https://github.com/onyxfish/csvkit.
#
# This is also based on Jeff's file structure:
#+ <base_directory>
#+      /DataInbox
#+          /NewData
#+      /DataFarm
#
# Set your BASEDIR in the variables below
###################################

# usage: push_audit.sh <name_of_csv_file>
usage () { echo "${0##*/} inputfile"; exit 1; }
(($#==1)) || usage

# set variables for input
INPUTFILE="$1"
OUTPUTFILE="${1%.*}_abstract.txt"
NEWDIRECTORY="${1%.*}"
BASEDIR="$HOME/Programming/1personal/data_files/DataFarm/$NEWDIRECTORY"

# begin use csv kit to <audit_input> and create <audit_output_file>
cat <<EOF >$OUTPUTFILE
Abstract for $1, $(date "+generated on %m/%d/%y at %H:%M:%S")

-----------------
INTRODUCTION & SUMMARY
-----------------

-----------------
DATA QUERIES
-----------------

-----------------
DATA AUDIT
-----------------

-- Column Names --
------------------------
$(csvcut -n $INPUTFILE)

-- First Ten Rows of First Five Columns --
-------------------------------------------------
$(csvcut -c 1,2,3,4,5 $INPUTFILE | head -n 10)

-- Column Stats --
----------------------
$(csvcut $INPUTFILE | csvstat)

-- End Audit --
EOF
# end use csv kit to <audit_input> and create <audit_output_file>

# make Data & ProtectedOrig directories beneath $NEWDIRECTORY in $BASEDIR
/bin/mkdir -p $BASEDIR/{ProtectedOrig,Data}

# Copy <audit_input> and <audit_output_file> into <new directory>/Data
ditto $1/ Original_$1
mv "$1" $BASEDIR/Data
mv "$OUTPUTFILE" $BASEDIR

# Copy <audit_input> into <new directory>/ProtectedOrig
mv "Original_$1" $BASEDIR/ProtectedOrig