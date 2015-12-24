
(function(document, window, books) {
  var $summaryList = document.getElementById('content-placement');
  var template = document.getElementById('kristy-template').innerText;
  var books = BOOKS;

  var anchorClass = 'summary-thumbnail-container';
  var imgClass = 'summary-thumbnail-image';
  var descriptionClass = 'summary-excerpt';

  var masonry = buffer(masonryRaw, 50);
  var $divs = [];

  insertBooks();

  window.onresize = masonry;

  function insertBooks() {
    $summaryList.innerHTML = '';

    $divs = map(books, function(book) {
      var $div = document.createElement('div');
      $div.className = [
        'summary-item',
        'summary-item-record-type-image',
        'sqs-gallery-design-autocolumns-slide',
        'summary-item-has-cats',
        'summary-item-has-tags',
        'summary-item-has-author',
        'summary-item-has-comments-enabled',
        'positioned sqs-active-slide',
      ].join(' ');
      $div.style.width = '280px';
      $div.innerHTML = template;
      var $link, $description, $img;
      digNodes($div, function(node) {
        if(node.tagName != null) {
          var className = node.className;
          if(startsWith(className, anchorClass)) {
            $link = node;
          }
          if(startsWith(className, descriptionClass)) {
            $description = node;
          }
          if(startsWith(className, imgClass)) {
            $img = node;
          }
        }
      });
      $link.setAttribute('href', book.href);
      $img.setAttribute('src', '/resized/' + book.image + '.jpg?a=' + Date.now());
      $img.onload = masonry;
      forEach(book.description, function(desc) {
        var $p = document.createElement('p');
        $p.innerText = desc;
        $description.appendChild($p);
      });
      $summaryList.appendChild($div);
      return $div;
    });
    masonry();
  };

  function masonryRaw() {
    var minWidth = 280;
    var containerWidth = $summaryList.offsetWidth;
    var numColumns = 1;
    for(; true; numColumns++) {
      if(numColumns * minWidth > containerWidth) {
        numColumns--;
        break;
      }
    }
    var columnSpacing = containerWidth / numColumns;
    var columns = times(numColumns, 0);
    forEach($divs, function($div) {
      var column = reduce(columns, function(minIndex, height, index, arr) {
        if(minIndex === null || arr[minIndex] > height) {
          return index;
        }
        return minIndex;
      }, null);
      $div.style.top = columns[column] + 'px';
      $div.style.left = (column * columnSpacing) + 'px';
      columns[column] += 10 + $div.offsetHeight;
    });
    $summaryList.style.height = max(columns) + 'px';
  };

  function times(times, input) {
    var array = [];
    for(var i = 0; i < times; i++) {
      array.push(input);
    }
    return array;
  };

  function max(arr) {
    return reduce(arr, function(max, value) {
      return max > value ? max : value;
    }, 0);
  };

  function buffer(fn, ms) {
    var timeout = null;
    return function() {
      if(timeout) {
        clearTimeout(timeout);
      }
      timeout = setTimeout(fn, ms);
    };
  };

  function digNodes(node, fn) {
    forEach(node.childNodes, function(node) {
      fn(node);
      digNodes(node, fn);
    });
  };

  function startsWith(str, starter) {
    return str.indexOf(starter) === 0;
  }

  function forEach(arr, fn) {
    var i = 0;
    var len = arr.length;
    for(i = 0; i < len; i++) {
      if(false === fn(arr[i], i, arr)) {
        break;
      }
    }
  };

  function map(arr, fn) {
    return reduce(arr, function(mapped, a, b, c) {
      mapped.push(fn(a, b, c));
      return mapped;
    }, []);
  };

  function reduce(arr, fn, reducer) {
    forEach(arr, function(a, b, c) {
      reducer = fn(reducer, a, b, c);
    });
    return reducer;
  };

  function find(arr, fn) {
    var index = findIndex(arr, fn);
    return arr[index];
  };
  function findIndex(arr, fn) {
    var found = -1;
    forEach(arr, function(a, index, c) {
      if(fn(a, index, c)) {
        found = index;
        return false;
      }
    });
    return found;
  };
})(document, window, BOOKS);

