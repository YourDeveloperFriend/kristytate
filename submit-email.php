<?php

include dirname(__FILE__).'/mailchimp.php';
$api = 'f1440ab2ace46f27a645bdbc67ef381e-us4';
$listid = 'e67c1c8c5f';

$mailchimp = new \Drewm\MailChimp($api);
$post = array();
parse_str(file_get_contents('php://input'), $post);

if(isset($post['email']) && is_string($post['email']) && strlen($post['email']) > 0) {
  $email = $post['email'];
  $result = $mailchimp->call('lists/subscribe', array(
    'id' => $listid,
    'email' => array('email' => $email),
    'double_optin' => false,
    'update_existing' => true,
    'replace_interests' => false,
    'send_welcome' => false,
  ));
  print_r($result);
}
