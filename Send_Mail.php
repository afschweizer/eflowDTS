<?php

date_default_timezone_set('Etc/UTC');

require 'PHPMailerAutoload.php';

//$pdfString = "dsfsdf";

//Create a new PHPMailer instance
$mail = new PHPMailer;
//Tell PHPMailer to use SMTP
$mail->isSMTP();
//Enable SMTP debugging
// 0 = off (for production use)
// 1 = client messages
// 2 = client and server messages
$mail->SMTPDebug = 2;
//Ask for HTML-friendly debug output
$mail->Debugoutput = 'html';
//Set the hostname of the mail server
$mail->Host = "smtpout.secureserver.net";
//Set the SMTP port number - likely to be 25, 465 or 587
$mail->Port = 25;
//Whether to use SMTP authentication
$mail->SMTPAuth = true;
//Username to use for SMTP authentication
$mail->Username = "info@eprac.com";
//Password to use for SMTP authentication
$mail->Password = "wolFe224";
//Set who the message is to be sent from
$mail->setFrom('DTS_TRACK@eprac.com', 'DTS Track');
//Set an alternative reply-to address
//$mail->addReplyTo('katherine.fallas@eprac.com', 'First Last');
//Set who the message is to be sent to
$mail->addAddress('yeisonfallas@gmail.com', 'John Doe');
//Set the subject line
$mail->Subject = 'PHPMailer SMTP test';
//Read an HTML message body from an external file, convert referenced images to embedded,
//convert HTML into a basic plain-text alternative body
$mail->msgHTML(file_get_contents('contents.html'), dirname(__FILE__));
//Replace the plain text body with one created manually
$mail->AltBody = 'This is a plain-text message body';
//Attach an image file
$mail->addAttachment('images/phpmailer_mini.png');

//$pdf_decoded = base64_decode ($pdfString);

//$mail->AddStringAttachment($pdf_decoded, 'BASE64.pdf');


//send the message, check for errors
if (!$mail->send()) {
    echo "Mailer Error: " . $mail->ErrorInfo;
} else {
    echo "Message sent!";
}
