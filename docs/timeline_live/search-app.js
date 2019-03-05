
var search = instantsearch({
  // Replace with your own values
  appId: 'D8VGN4PNJ1',
  apiKey: 'ddf789270064fbfe6bda438a87cafd02', // search only API key, no ADMIN key
  indexName: 'timeline_of_events',
  urlSync: true,
  searchParameters: {
    hitsPerPage: 200
  }
});

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
      container: '#weekday-refinement',
      attributeName: 'weekday',
      templates: {
        header: 'Day of the week'
      }
    })
  );

  search.addWidget(
  instantsearch.widgets.rangeSlider({
    container: '#date-slider',
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
	man: 1356998400,
	max: 1501545600,
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
