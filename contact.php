
<?php
declare(strict_types=1);

session_start();

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    exit('Method not allowed.');
}

// Basic honeypot spam check
if (!empty($_POST['website'] ?? '')) {
    exit('Message received.');
}

$name = trim((string) ($_POST['name'] ?? ''));
$email = trim((string) ($_POST['email'] ?? ''));
$subject = trim((string) ($_POST['subject'] ?? ''));
$message = trim((string) ($_POST['message'] ?? ''));

if (
    $name === '' ||
    !filter_var($email, FILTER_VALIDATE_EMAIL) ||
    $subject === '' ||
    $message === '' ||
    strlen($name) > 100 ||
    strlen($email) > 254 ||
    strlen($subject) > 150 ||
    strlen($message) > 5000
) {
    http_response_code(400);
    exit('Please enter valid information in all fields.');
}

/*
 * CHANGE THIS to your own email address.
 * The server must be configured to send email.
 */
$recipient = 'amosemulwa08@gmail.com';

$safeSubject = preg_replace('/[\r\n]+/', ' ', $subject);
$mailSubject = 'Portfolio contact: ' . $safeSubject;

$mailBody =
    "New message from your portfolio website\n\n" .
    "Name: " . $name . "\n" .
    "Email: " . $email . "\n" .
    "Subject: " . $safeSubject . "\n\n" .
    "Message:\n" . $message . "\n";

$headers = [
    'From' => $recipient,
    'Reply-To' => $email,
    'Content-Type' => 'text/plain; charset=UTF-8'
];

if (mail($recipient, $mailSubject, $mailBody, $headers)) {
    header('Location: index.html?contact=success#contact');
    exit;
}

http_response_code(500);
exit('Sorry, your message could not be sent. Please try again later.');
?>
