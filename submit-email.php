<?php

$API_KEY = getenv('MAILERLITE_KEY');
$listId = '6065355';

$post = array();
parse_str(file_get_contents('php://input'), $post);

if(isset($post['email']) && is_string($post['email']) && strlen($post['email']) > 0) {
  $email = $post['email'];
  $field_string = json_encode(array('email' => $email));

  $url = "https://api.mailerlite.com/api/v2/groups/$listId/subscribers";

  $ch = curl_init($url);
                                                                   
  curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "POST");
  curl_setopt($ch, CURLOPT_POSTFIELDS, $field_string);
  curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

  curl_setopt($ch, CURLOPT_HTTPHEADER, array(
    "X-MailerLite-ApiKey: $API_KEY",
    "Content-Type: application/json",
    "Content-Length: " . strlen($field_string),
  ));

  $result = curl_exec($ch);
}
