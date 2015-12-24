
(function(document) {

  var inputId = 'email-yui_3_17_2_22_1440713902689_8357-field';
  var $form = document.getElementById('formform')
  var $confirm = document.getElementById('formform2');
  var $input = document.getElementById(inputId);
  var $submitBtn = document.getElementById('email-submit-btn');
  
  $form.addEventListener('submit', function(e) {
    var email = $input.value;
    if(email && email.length) {
      e.preventDefault();

      var prevStyle = $submitBtn.style.display;
      $submitBtn.style.display = 'none';
      var xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function() {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
          $submitBtn.style.display = prevStyle;
          $form.style.display = 'none';
          $confirm.style.display = 'block';
        }
      };
      xhttp.open("POST", "/submit-email.php", true);
      xhttp.send('email=' + encodeURIComponent(email));
    }
  });

})(document);
