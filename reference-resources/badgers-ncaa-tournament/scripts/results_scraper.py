#Import our modules or packages that we will need to scrape a website
import requests
from bs4 import BeautifulSoup
import csv
import logging
import time
import datetime

logger = logging.getLogger("root")
logging.basicConfig(
    format = "\033[1;36m%(levelname)s: %(filename)s (def %(funcName)s %(lineno)s): \033[1;37m %(message)s",
    level=logging.DEBUG
)

class RetrieveBadgerRecordsByYear(object):

    list_of_years = [
        "2015",
        #"2014",
        #"2013",
        #"2012",
        #"2011",
        #"2010",
        #"2009",
        #"2008",
        #"2007",
        #"2006",
        #"2005",
        #"2004",
        #"2003",
        #"2002",
    ]

    request_headers = {
        "From": "ckeller@scpr.org",
        "User-Agent": "Mozilla/5.0 (Windows; U; Windows NT 6.0; en-US) AppleWebKit/525.19 (KHTML, like Gecko) Chrome/1.0.154.53 Safari/525.19"
    }

    def _init(self, *args, **kwargs):
        """
        """
        for year in self.list_of_years:
            data = self._make_request_to_espn(year)
            if data == False:
                pass
            else:
                self._process_raw_html(data)

    def _make_request_to_espn(self, year):
        """
        """
        requested_page = "http://espn.go.com/mens-college-basketball/team/schedule?id=275&year=%s" % (year)
        try:
            print "Requesting Badgers game-by-game from %s" % (year)
            response = requests.get(requested_page, headers = self.request_headers)
            if response.status_code == 200:
                if response.content != None:
                    print "Received Badgers game-by-game"
                    return response.text
                else:
                    return False
            else:
                return False
        except Exception, exception:
            logger.error(exception)
            raise

    def _process_raw_html(self, html):
        """
        """
        # parse the html
        soup = BeautifulSoup(html)

        # isolate the div containing the table
        target_div = soup.find("div", {"class": "mod-content"})

        # isolate the table
        table = target_div.find("table")

        # find the rows
        rows = table.find_all("tr")

        # loop through the rows
        for row in rows:

            # grab the table cells from each row
            cells = row.find_all("td")

            # if the row isn't a header row
            if len(cells) > 1:
                opponent  = self._get_opponent(cells[1])
                game_meta  = self._get_game_meta(cells[2])
                date = cells[0].text.strip()
                record = cells[3].text.strip()

                row_data = [
                    date,
                    opponent,
                    game_meta["result"],
                    game_meta["score"],
                    game_meta["recap"],
                    record,
                ]

                logger.debug(row_data)

    def _get_opponent(self, opponent_cell):
        opponent = opponent_cell.find_all("li", {"class": "team-name"})
        if len(opponent) == 1:
            return opponent[0].text.strip()

    def _get_game_meta(self, recap_cell):
        game_meta = {}
        result_key = recap_cell.find_all("span")
        if len(result_key) == 1:
            if result_key[0].text.strip() == "W":
                game_meta["result"] = "Win"
            elif result_key[0].text.strip() == "L":
                game_meta["result"] = "Loss"
        score_key = recap_cell.find_all("li", {"class": "score"})
        if len(result_key) == 1:
            game_meta["score"] = score_key[0].text.strip()
            game_meta["recap"] = score_key[0].find("a")["href"]
        return game_meta


if __name__ == "__main__":
    task_run = RetrieveBadgerRecordsByYear()
    task_run._init()
    print "\nTask finished at %s\n" % str(datetime.datetime.now())
















        <td>Thu, Mar 26</td>,
        <td align="left"><ul class="game-schedule"><li class="game-status">vs</li><li class="team-logo-small logo-ncaa-small ncaa-small-153"><a href="http://espn.go.com/mens-college-basketball/team/_/id/153/north-carolina-tar-heels"></a></li><li class="team-name">(4) <a href="http://espn.go.com/mens-college-basketball/team/_/id/153/north-carolina-tar-heels">North Carolina</a>*</li></ul></td>,
        <td><ul class="game-schedule"><li class="game-status win"><span class="greenfont">W</span></li><li class="score"><a href="/ncb/recap?gameId=400786512">79-72</a></li></ul></td>,
        <td>34-3 (16-2)</td>
        """



        #skip the blank rows
        #assign the cell values to variables
        #title = cells[0].text.strip()
        #world_box_office = cells[1].text.strip()
        #international_box_office = cells[2].text.strip()
        #domestic_box_office = cells[3].text.strip()
        #world_cume = cells[4].text.strip()
        #international_cume = cells[5].text.strip()
        #domestic_cume = cells[6].text.strip()
        #international_distributor = cells[7].text.strip()
        #number_territories = cells[8].text.strip()
        #domestic_distributor = cells[9].text.strip()




        #open our output file
        #csvfile = open("movies.csv","wb")

        #point our csv.writer at the output file and specify the necessary parameters
        #output = csv.writer(csvfile, delimiter=',',quotechar='"',quoting=csv.QUOTE_MINIMAL)

        #write the variables out to a csv file
        #output.writerow([title, world_box_office, international_box_office, domestic_box_office, world_cume, international_cume, domestic_cume, international_distributor, number_territories, domestic_distributor])

        #close the csv file
        #csvfile.close()

        #winreg

