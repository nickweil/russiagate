
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
      attributeName: 'day_of_week',
      templates: {
        header: 'Day of the week'
      }
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
