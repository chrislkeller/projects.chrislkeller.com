csv_audit_and_backup
====================

Based on shell scripts authored by Jeff Severns Guntzel to help data journalists use Christopher Groskopf's 'csvkit' utility library to audit a csv file without opening it, and then backup and move the csv file to a project directory before working on it.

####Usage####

----

This scripts is based on Jeff's file structure, and assumes the save:

	data_files
		/DataInbox
			/NewData
		/DataFarm

**To use**

* Drop a csv file into BASEDIR/DataInbox/NewData and use the terminal to change to that directory.

		cd data_files/DataInbox/NewData

* Run the script using the <your_csv>.csv as a parameter.

* The script will take the csv file, audit it using csvkit, create an audit file, make a copy of the csv and move all three to a new directory in DataFarm based on the name of the csv file.

####Resources####

----

Jeff's scripts are here:

http://www.jsguntzel.com/skinnynotebook/2011/11/14/protecting-your-data-before-you-mess-with-it-another-shell-script-for-data-journalists/

http://www.jsguntzel.com/skinnynotebook/2011/10/28/super-quick-data-audit-with-this-csvkit-shell-script/

####Notes####

----

For this script to work, you must install [Christopher Groskopf](https://twitter.com/onyxfish)'s [csvkit](https://github.com/onyxfish/csvkit).