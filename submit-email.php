<?php

include dirname(__FILE__).'/mailerlite/Base/RestBase.php';
include dirname(__FILE__).'/mailerlite/Base/Rest.php';
include dirname(__FILE__).'/mailerlite/Subscribers.php';
$API_KEY = getenv('MAILERLITE_KEY');

$ML_Subscribers = new MailerLite\Subscribers($API_KEY);

$post = array();
parse_str(file_get_contents('php://input'), $post);

if(isset($post['email']) && is_string($post['email']) && strlen($post['email']) > 0) {
  $email = $post['email'];
  $subscriber = array('email' => $email);
  $ML_Subscribers->setId($listId)->setAutoresponders(true)->add($subscriber);
}
