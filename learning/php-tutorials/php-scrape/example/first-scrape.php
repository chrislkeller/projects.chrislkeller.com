<?php

// pull in simple dom library
include_once('../simple_html_dom.php');

// begin function
function scrapingMadPolice($url) {

    // Create DOM from URL
    $html = file_get_html($url);

    // find the table containing the data
    foreach($html->find('table[id=list]') as $dataTable)

        // find find each row and loop through the cells
        foreach($dataTable->find('tr') as $dataRow) {
            $item['incidentDate'] = trim($dataRow->find('td', 0)->plaintext);
            //$item['incidentType'] = trim($dataRow->find('td', 1)->plaintext);
            $item['incidentLink'] = trim($dataRow->find('td', 1)->innertext);
            $item['incidentCase'] = trim($dataRow->find('td', 2)->plaintext);
            $item['incidentAddress'] = trim($dataRow->find('td', 3)->plaintext);
            $ret[] = $item;
        }

    // clean up memory
    $html->clear();
    unset($html);

    // return data
    return $ret;
};


// run the function
$ret = scrapingMadPolice('http://www.cityofmadison.com/incidentReports/incidentlist.cfm?a=71');

    foreach($ret as $v) {
        echo $v['incidentDate'].'<br />';
        //echo $v['incidentType'].'<br />';
        echo $v['incidentLink'].'<br />';
        echo $v['incidentCase'].'<br />';
        echo $v['incidentAddress'].'<br />';
    }

?>