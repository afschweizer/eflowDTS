<?php

date_default_timezone_set('Etc/UTC');

require 'Mail/PHPMailerAutoload.php';

$mail = new PHPMailer;

$mail->isSMTP();

$mail->SMTPDebug = 0;

$mail->Debugoutput = 'html';

$mail->Host = "smtpout.secureserver.net";

$mail->Port = 25;

$mail->SMTPAuth = true;

$mail->Username = "info@eprac.com";

$mail->Password = "wolFe224";

$mail->setFrom('DTS_TRACK@eprac.com', 'DTS Track');

//$mail->addReplyTo('katherine.fallas@eprac.com', 'Katherine Fallas');

$mail->addAddress('yeisonfallas@gmail.com', 'Yeison Fallas');

$mail->Subject = 'Testing';

$mail->Body = "Hola Mundo!.";

$mail->AltBody = 'This is a plain-text message body';

if (!$mail->send()) {
    echo "Mailer Error: " . $mail->ErrorInfo;
} else {
    echo "Message sent!";
}
