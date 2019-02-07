
const searchClient = algoliasearch('D8VGN4PNJ1', '4270d4a67285f5c67de12baa23164f98');

const search = instantsearch({
  indexName: 'timeline_of_events',
  searchClient,
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

var hitTemplate =
  '<article class="hit" id="{{unix_timestamp}}">' +
      '<div class="hit-content">' +
        '<p class="hit-category-breadcrumb">{{date}} {{day_of_week}}</p>' +
      '</div>' +
	  '<div class="hit-image">' +
        '<p class="hit-category-breadcrumb">{{#helpers.highlight}}{ "attribute": "event" }{{/helpers.highlight}} </p>' +
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

// Add this after the previous JavaScript code
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
  
    search.addWidget(
    instantsearch.widgets.refinementList({
      container: '#weekday-refinement',
      attribute: 'day_of_week',
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
