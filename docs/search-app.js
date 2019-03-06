
var search = instantsearch({
  // Replace with your own values
  appId: 'DTH6V8NWJ2',
  apiKey: 'fd1f8a02a87cf784faf55a8a686700e7', // search only API key, no ADMIN key
  indexName: 'texts',
  routing: true,
  searchParameters: {
    hitsPerPage: 200
  }
});

/*texts.setSettings({
  paginationLimitedTo: 5000
});*/

// Add this after the previous JavaScript code
search.addWidget(
  instantsearch.widgets.searchBox({
    container: '#search-input'
  })
);

// Add this after the previous JavaScript code
search.addWidget(
  instantsearch.widgets.hits({
    container: '#hits',
    templates: {
      item: document.getElementById('hit-template').innerHTML,
      empty: "We didn't find any results for the search <em>\"{{query}}\"</em>"
    }
  })
);

search.addWidget(
    instantsearch.widgets.refinementList({
      container: '#batch-refinement',
      attributeName: 'batch',
      templates: {
        header: 'Batch'
      }
    })
  );
  
  search.addWidget(
    instantsearch.widgets.refinementList({
      container: '#sender-refinement',
      attributeName: 'sender',
      templates: {
        header: 'Sender'
      }
    })
  );
  
    search.addWidget(
    instantsearch.widgets.refinementList({
      container: '#weekday-refinement',
      attributeName: 'weekday',
      templates: {
        header: 'Day of the week'
      }
    })
  );

  search.addWidget(
  instantsearch.widgets.rangeSlider({
    container: '#date-range',
    attributeName: 'unixtimestamp',
    templates: {
      header: 'Date Filter'
    },
    tooltips: {
      format: function(rawValue) {
		var unix_timestamp = rawValue;
		var months_arr = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
		var date = new Date(unix_timestamp*1000);
		var year = date.getFullYear().toString().substring(2);
		var month = months_arr[date.getMonth()];
		var convdate = month+year;
		return convdate;
      }
    },
	pips: false,
  })
  );

// Add this after the other search.addWidget() calls
search.addWidget(
  instantsearch.widgets.pagination({
    container: '#pagination',
	padding: 8,
	autoHideContainer: true
  })
);


// Add this after all the search.addWidget() calls
search.start();
