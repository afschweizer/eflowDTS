<?php
require 'Mail/PHPMailerAutoload.php';

include 'ConnectionMongo.php';

$Coll_Mails = $db->Store_Mail_Status;
$Coll_Jobs = $db->Store_Jobs_Send;
$List_Mails = $Coll_Mails->find(array("Status" => "PEND"));

foreach($List_Mails as $doc){
	
	$PDF = $Coll_Jobs->findOne(array('_id' => new MongoId($doc->ID_PDF)),array("Certificate" => true,"Name" => true));
	
	$String_PDF = str_replace("data:application/pdf;base64,", "", $PDF->Certificate->PDF);
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
	// $mail->addCC('yeison.fallas@eprac.com', 'Katherine Fallas');
	foreach($doc->Mails as $Contact){
		$mail->addAddress($Contact->Value, $Contact->Description);
	}
	$mail->Subject = $PDF->Name . ' ' . $doc->PDF_Date;
	$mail->Body = "PDF";
	// $mail->AltBody = 'This is a plain-text message body';
	$pdf_decoded = base64_decode($String_PDF);
	$mail->AddStringAttachment($pdf_decoded, 'BASE64.pdf');
	if (!$mail->send()){
		$List_Mails->update(array("_id"=> new MongoId($doc['_id'])), array('$set' => array("Status"  => "ERROR","Error_Message"  => $mail->ErrorInfo;)));
	}else{
		$List_Mails->update(array("_id"=> new MongoId($doc['_id'])), array('$set' => array("Status"  => "SEND","PDF_Date_Send"  => date("Y-m-d"))));
	}
	
	}

echo "Listo!";

?>