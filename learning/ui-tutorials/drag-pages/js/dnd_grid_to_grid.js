/*!
 * Ext JS Library 3.0.0
 * Copyright(c) 2006-2009 Ext JS, LLC
 * licensing@extjs.com
 * http://www.extjs.com/license
 */
Ext.onReady(function(){

    var myData = {
		records : [
			{ storyslug : "0916SCHRENKER.TRIAL", storyline : "Lorem ipsum dolor sit amet, consectetur adipiscing elit. ", storywriter : "Bow", storyart : "No" },
			{ storyslug : "0916.Storyhere", storyline : "Sed at volutpat tortor. Vestibulum mi ligula", storywriter : "Vanessa", storyart : "No" },
			{ storyslug : "0916Storyhere1", storyline : "Phasellus augue ante, accumsan pretium feugiat vitae, elementum sit amet diam.", storywriter : "Christine", storyart : "Yes" },
			{ storyslug : "0916Storyhere2", storyline : "Aliquam euismod commodo nulla", storywriter : "Bob", storyart : "No" },
			{ storyslug : "0916Storyhere3", storyline : "Praesent dui leo, vulputate non egestas eu", storywriter : "Keith", storyart : "Pending" },
			{ storyslug : "0916Storyhere4", storyline : "Phasellus augue ante, accumsan pretium feugiat vitae, elementum sit amet diam.", storywriter : "Hinkel", storyart : "No" }
		]
	};


	// Generic fields array to use in both store defs.
	var fields = [
	   {name: 'storyslug', mapping : 'storyslug'},
	   {name: 'storyline', mapping : 'storyline'},
	   {name: 'storywriter', mapping : 'storywriter'},
	   {name: 'storyart', mapping : 'storyart'}
	];

    // create the data store
    var firstGridStore = new Ext.data.JsonStore({
        fields : fields,
		data   : myData,
		root   : 'records'
    });


	// Column Model shortcut array
	var cols = [
		{ id : 'storyslug', header: "Story Slug", width: 50, sortable: true, dataIndex: 'storyslug'},
		{header: "Line", width: 250, sortable: true, dataIndex: 'storyline'},
		{header: "Writer", width: 50, sortable: true, dataIndex: 'storywriter'},
		{header: "Art", width: 50, sortable: true, dataIndex: 'storyart'}
	];


	// declare the source Grid
    var firstGrid = new Ext.grid.GridPanel({
	ddGroup          : 'secondGridDDGroup',
        store            : firstGridStore,
        columns          : cols,
		enableDragDrop   : true,
        stripeRows       : true,
        autoExpandColumn : 'storyslug',
        width            : 500,
		region           : 'west',
        title            : 'Available Stories'
    });

    var secondGridStore = new Ext.data.JsonStore({
        fields : fields,
		root   : 'records'
    });

    // create the destination Grid
    var secondGrid = new Ext.grid.GridPanel({
	ddGroup          : 'firstGridDDGroup',
        store            : secondGridStore,
        columns          : cols,
	enableDragDrop   : true,
        stripeRows       : true,
        autoExpandColumn : 'storyslug',
        width            : 500,
	region           : 'center',
        title            : 'A1 Stories'
    });


	//Simple 'border layout' panel to house both grids
	var displayPanel = new Ext.Panel({
		width    : 1000,
		height   : 300,
		layout   : 'border',
		renderTo : 'panel',
		items    : [
			firstGrid,
			secondGrid
		],
		bbar    : [
			'->', // Fill
			{
				text    : 'Reset both grids',
				handler : function() {
					//refresh source grid
					firstGridStore.loadData(myData);

					//purge destination grid
					secondGridStore.removeAll();
				}
			}
		]
	});

	// used to add records to the destination stores
	var blankRecord =  Ext.data.Record.create(fields);

	/****
	* Setup Drop Targets
	***/
	// This will make sure we only drop to the view container
	var firstGridDropTargetEl =  firstGrid.getView().el.dom.childNodes[0].childNodes[1];
	var firstGridDropTarget = new Ext.dd.DropTarget(firstGridDropTargetEl, {
		ddGroup    : 'firstGridDDGroup',
		copy       : true,
		notifyDrop : function(ddSource, e, data){

			// Generic function to add records.
			function addRow(record, index, allItems) {

				// Search for duplicates
				var foundItem = firstGridStore.findExact('storyslug', record.data.name);
				// if not found
				if (foundItem  == -1) {
					firstGridStore.add(record);

					// Call a sort dynamically
					firstGridStore.sort('storyslug', 'ASC');

					//Remove Record from the source
					ddSource.grid.store.remove(record);
				}
			}

			// Loop through the selections
			Ext.each(ddSource.dragData.selections ,addRow);
			return(true);
		}
	});


	// This will make sure we only drop to the view container
	var secondGridDropTargetEl = secondGrid.getView().el.dom.childNodes[0].childNodes[1]

	var destGridDropTarget = new Ext.dd.DropTarget(secondGridDropTargetEl, {
		ddGroup    : 'secondGridDDGroup',
		copy       : false,
		notifyDrop : function(ddSource, e, data){

			// Generic function to add records.
			function addRow(record, index, allItems) {

				// Search for duplicates
				var foundItem = secondGridStore.findExact('storyslug', record.data.name);
				// if not found
				if (foundItem  == -1) {
					secondGridStore.add(record);
					// Call a sort dynamically
					secondGridStore.sort('storyslug', 'ASC');

					//Remove Record from the source
					ddSource.grid.store.remove(record);
				}
			}
			// Loop through the selections
			Ext.each(ddSource.dragData.selections ,addRow);
			return(true);
		}
	});
});
