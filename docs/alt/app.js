
var search = instantsearch({
  // Replace with your own values
  appId: 'DTH6V8NWJ2',
  apiKey: 'fd1f8a02a87cf784faf55a8a686700e7', // search only API key, no ADMIN key
  indexName: 'texts',
  urlSync: true,
  searchParameters: {
    hitsPerPage: 100
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



// Add this after the other search.addWidget() calls
search.addWidget(
  instantsearch.widgets.pagination({
    container: '#pagination'
  })
);


// Add this after all the search.addWidget() calls
search.start();

function myfunction() {
	document.body.style.background = "blue";
	
}

/*function myfunction() {
	var x = document.getElementsByClassName("hit-category-breadcrumb");
	var i;
		for (i = 0; i < x.length; i++) {
		x[i].style.backgroundColor = "red";
	}
}*/