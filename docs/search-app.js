'use strict';
/* global instantsearch */

var search = instantsearch({
  appId: 'DTH6V8NWJ2',
  apiKey: 'fd1f8a02a87cf784faf55a8a686700e7', // search only API key, no ADMIN key
  indexName: 'texts',
  routing: true,
  searchParameters: {
    hitsPerPage: 100
  }
});

// SEARCH BOX
search.addWidget(
  instantsearch.widgets.searchBox({
    container: '#search-input',
	placeholder: 'search...'
  })
);

search.on('render', function() {
  $('.hit-image img').addClass('transparent');
  $('.hit-image img').one('load', function() {
      $(this).removeClass('transparent');
  }).each(function() {
      if(this.complete) $(this).load();
  });
});

var hitTemplate =
  '<article class="hit" id="{{unixtimestamp}}">' +
      '<div class="hit-content">' +
        '<p class="hit-category-breadcrumb">{{{date}}} {{{weekday}}}</p>' +
      '</div>' +
      '<div class="hit-sender">' +
        '<img src="{{senderimgurl}}" alt="{{sender}}">' +
      '</div>' +
	  '<div class="hit-image">' +
        '<img src="{{textimgurl}}" alt="{{date}}">' +
      '</div>' +
  '</article>';

var noResultsTemplate =
  '<div class="text-center">No results found matching <strong>{{query}}</strong>.</div>';

var menuTemplate =
  '<a href="javascript:void(0);" class="facet-item {{#isRefined}}active{{/isRefined}}"><span class="facet-name"><i class="fa fa-angle-right"></i> {{label}}</span class="facet-name"></a>';

var facetTemplateCheckbox =
  '<a href="javascript:void(0);" class="facet-item">' +
    '<input type="checkbox" class="{{cssClasses.checkbox}}" value="{{label}}" {{#isRefined}}checked{{/isRefined}} />{{label}}' +
    '<span class="facet-count">({{count}})</span>' +
  '</a>';

var facetTemplateColors =
  '<a href="javascript:void(0);" data-facet-value="{{label}}" class="facet-color {{#isRefined}}checked{{/isRefined}}"></a>';

// HITS
search.addWidget(
  instantsearch.widgets.hits({
    container: '#hits',
	hitsPerPage: 100,
    templates: {
      item: hitTemplate,
      empty: noResultsTemplate
    }
  })
);

// BATCH REFINEMENT  
search.addWidget(
    instantsearch.widgets.refinementList({
      container: '#batch-refinement',
      attributeName: 'batch',
      templates: {
        header: 'Batch',
		item: menuTemplate
      }
    })
  );
  
// SENDER REFINEMENT  
search.addWidget(
    instantsearch.widgets.refinementList({
      container: '#sender-refinement',
      attributeName: 'sender',
      templates: {
        header: 'Sender',
		item: menuTemplate
      }
    })
  );

// WEEKDAY REFINEMENT  
search.addWidget(
    instantsearch.widgets.refinementList({
      container: '#weekday-refinement',
      attributeName: 'weekday',
      templates: {
        header: 'Day of the week',
		item: menuTemplate
      }
    })
  );


// PAGINATION
search.addWidget(
  instantsearch.widgets.pagination({
    container: '#pagination',
	padding: 8,
	autoHideContainer: true
  })
);


// Add this after all the search.addWidget() calls
search.start();
