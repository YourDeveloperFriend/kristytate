<?php

include dirname(__FILE__).'/mailerlite/src/Common/ApiConstants.php';
include dirname(__FILE__).'/mailerlite/src/Common/RestClient.php';
include dirname(__FILE__).'/mailerlite/src/MailerLite.php';

$API_KEY = getenv('MAILERLITE_KEY');
$listId = '6065355';

$ML_Subscribers = new MailerLite\Subscribers($API_KEY);

$post = array();
parse_str(file_get_contents('php://input'), $post);

if(isset($post['email']) && is_string($post['email']) && strlen($post['email']) > 0) {
  $email = $post['email'];
  $field_string = 'email=' . urlencode($email);

  $url = "https://api.mailerlite.com/api/v2/groups/$listId/subscribers";


  $ch = curl_init();

  curl_setopt($ch, CURLOPT_HTTPHEADER, array(
    'X-MailerLite-ApiKey' => $API_KEY,
    'Content-Type' => 'application/x-www-form-urlencoded'
  ));

  curl_setopt($ch,CURLOPT_URL,$url);
  curl_setopt($ch,CURLOPT_POST,1);
  curl_setopt($ch,CURLOPT_POSTFIELDS,$fields_string);

  $result = curl_exec($ch);
  print $result;
}
