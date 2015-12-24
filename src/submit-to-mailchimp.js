
(function(document) {

  var $form = document.getElementById('formform')
  var $input = document.getElementById('email-yui_3_17_2_22_1440713902689_8357-field');
  
  $form.addEventListener('submit', function(e) {
    var email = $input.value;
    if(email && email.length) {
      e.preventDefault();

      var xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function() {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
          alert('booya!');
        }
      };
      xhttp.open("POST", "/submit-email.php", true);
      xhttp.send('email=' + encodeURIComponent(email));
    }
  });

})(document);
