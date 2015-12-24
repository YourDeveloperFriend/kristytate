
(function(document) {

  var $form = document.getElementById('formform')
  var $input = document.getElementById('email-yui_3_17_2_22_1440713902689_8357-field');
  
  $form.addEventListener('submit', function(e) {
    e.preventDefault();
    alert('submit to mailchimp! ' + $input.value);
  });

})(document);
