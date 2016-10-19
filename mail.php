<?php
require(‘class.phpmailer.php’);
require(‘class.smtp.php’);

$mail = new PHPMailer();

$body = “Cuerpo del mensaje”;

$mail->IsSMTP(); 

// la dirección del servidor, p. ej.: smtp.servidor.com
$mail->Host = “direccion_servidor”;

// dirección remitente, p. ej.: no-responder@miempresa.com
$mail->From = “Dirección_remitente”;

// nombre remitente, p. ej.: "Servicio de envío automático"
$mail->FromName = “info@eprac.com”;

// asunto y cuerpo alternativo del mensaje
$mail->Subject = “Asunto”;
$mail->AltBody = “Cuerpo alternativo 
    para cuando el visor no puede leer HTML en el cuerpo”; 

// si el cuerpo del mensaje es HTML
$mail->MsgHTML($body);

// podemos hacer varios AddAdress
$mail->AddAddress(“kathy.f0611@gmail.com”, “katherine”);

// si el SMTP necesita autenticación
$mail->SMTPAuth = true;

// credenciales usuario
$mail->Username = “info@eprac.com”;
$mail->Password = “wolFe224”; 

if(!$mail->Send()) {
echo “Error enviando: ” . $mail->ErrorInfo;
} else {
echo “¡¡Enviado!!”;
}
?>