<p>Further stripping down the <a href="https://github.com/chrislkeller/Fusion-Tables-To-Highcharts">Fusion-Tables-To-Highcharts project</a>, this uses <a href="http://www.google.com/fusiontables/">Google Fusion Tables</a> as a data backend to draw a chart that uses the <a href="http://www.highcharts.com/">Highcharts.js</a> library.</p>
<p><a href="http://www.projects.chrislkeller.com/ft-highcharts/" target="blank">Unlike the previous project</a>, this doesn't rely on a map click event to draw the chart, allowing this Fusion Table...</p>
<!-- <p><img class="posterous_plugin_object posterous_plugin_object_image" src="http://getfile1.posterous.com/getfile/files.posterous.com/temp-2011-12-12/ppEcbdDyJcekziiGaCkdDumcEHgColbIrboHFgpbjvuqxAghDwbhhtHxCFwA/Screen_Shot_2011-12-12_at_9.24.12_PM.png" alt="" width="400" /></p> -->
<p>... to become this column chart ...</p>
<!-- <p><img class="posterous_plugin_object posterous_plugin_object_image" src="http://getfile0.posterous.com/getfile/files.posterous.com/temp-2011-12-12/pkvwvBjaCmgggwFrrxllBegtJpnkFnfkshExtfaxFAIHdJJhApzjBnaEwcve/Screen_Shot_2011-12-12_at_9.23.48_PM.png" alt="" width="400" /></p> -->
<p>... or a bar chart ...</p>
<!-- <p><img class="posterous_plugin_object posterous_plugin_object_image" src="http://getfile4.posterous.com/getfile/files.posterous.com/temp-2011-12-12/hJhjetukDileJehvHAphGriCtcGgslfqHbpvptoyFphzruCJoCHqrFpmncmb/Screen_Shot_2011-12-12_at_9.40.25_PM.png" alt="" width="400" /></p> -->
<p>... or a line chart ...</p>
<!-- <p><img class="posterous_plugin_object posterous_plugin_object_image" src="http://getfile8.posterous.com/getfile/files.posterous.com/temp-2011-12-12/bjCBEesidjidADJGvHcvamlvnDzcdvciqewnwhBEagbfEphqJzfyDBeElyFg/Screen_Shot_2011-12-12_at_9.40.53_PM.png" alt="" width="400" /></p> -->
<p>I've been interested in finding an easy to use datasource for these charts since <a href="http://host.madison.com/wsj/" target="blank">Wisconsin State Journal</a> multimedia and graphics gurus Jason Klein and Laura Sparks started to use the <a href="http://www.highcharts.com/" target="blank">Highcharts javascript library</a> to produce data visuals that could be used in print, on the web and on tablets.</p>
<p>The "problem" to solve is two-fold:</p>
<ul>
<li>It's nearly a must to be able to keep track of the historical business data that we're <a href="http://host.madison.com/wsj/business/data/financial/" target="_blank">adding to highcharts visuals</a>.</li>
<li>Because this data is often in the hands of the reporter, the method for updating the charts needs to be ultra simple, and involve touching a little code as possible.</li>
</ul>
<p>From here I'm thinking of learning from <a href="https://twitter.com/#!/kevinschaul" target="_blank">Kevin Schaul's</a> recent <a href="http://www.kevinschaul.com/2011/12/06/box-chart-maker/" target="_blank">project</a>, the <a href="http://www.kevinschaul.com/projects/box-chart-maker/" target="_blank">box-chart-maker</a>, which has a great user-interface that will generate the code needed, and ideally figure out a way to write to and update data housed in a Fusion Table, at least by the time Wisconsin has what could be the first of six potential election nights in 2012.</p>
<p class="small"><a href="http://www.projects.chrislkeller.com/ft-as-highcharts-datasource">View the demo</a>.<br /> <a href="https://github.com/chrislkeller/ft-as-highcharts-datasource">Fork the repo</a>.</p>

Chris K.

<hr />

License: The MIT License