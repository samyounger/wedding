$(document).ready(function() {
  // Initialize lunr with the fields to be searched, plus the boost.
  window.idx = lunr(function () {
    this.ref('id');
    this.field('title'), { boost: 10 };
    this.field('content');
    this.field('author');
    this.field('categories');
    this.field('date');

    this.pipeline.remove(lunr.stemmer)
    this.pipeline.remove(lunr.stopWordFilter)
  });

  // Get the generated search_data.json file so lunr.js can search it locally.
  window.data = $.getJSON('/search_data.json');

  // Wait for the data to load and add it to lunr
  window.data.then(function(loaded_data){
    $.each(loaded_data, function(index, value){
      window.idx.add({
        id: index,
        title: value.title,
        categories: value.categories,
        content: value.content,
        author: value.author,
        date: value.date
      });
    });
  });

  // // Event when the the input box is changed
  $(document).on('change keyup', '#search_box', function(event) {
    let boxValue = $("#search_box").val();
    if (boxValue !== "") {
      $("#defaultPostList").css({ display: "none" })
      let results = window.idx.search(boxValue); // Get lunr to perform a search
      display_search_results(results); // Hand the results off to be displayed
    } else {
      $("#search_results li").remove();
      $("#defaultPostList").css({ display: "unset" })
    }
  });

  function display_search_results(results) {
    const $search_results = $("#search_results");

    // Wait for data to load
    window.data.then(function(loaded_data) {

      // Are there any results?
      if (results.length) {
        $search_results.empty(); // Clear any old results

        // Iterate over the results
        results.forEach(function(result) {
          let post = loaded_data[result.ref];

          // Build a snippet of HTML for this result
          let appendString = `
          <li>
            <div class="postDate"><time>${post.date}</time></div>
            <div class="postHead">
              <h3><a href=${post.url}>${post.title}</a></h3>
            </div>
          </li>
          `;

          // Add the snippet to the collection of results.
          $search_results.append(appendString);
        });
      } else {
        // If there are no results, let the user know.
        $search_results.html('<li>No results found</li>');
      }
    });
  }
});
