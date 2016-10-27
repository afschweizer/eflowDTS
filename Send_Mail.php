<?php
require 'Mail/PHPMailerAutoload.php';

include 'ConnectionMongo.php';

echo "Include";

$Coll_Mails = $db->Store_Mail_Status;
echo "Coll_Mails";
$Coll_Jobs = $db->Store_Jobs_Send;
echo "Coll_Jobs";
$List_Mails = $Coll_Mails->find(array("Status" => "PEND"));
echo "List_Mails";


foreach($List_Mails as $doc){
	echo "1 foreach";
	$PDF = $Coll_Jobs->findOne(array('_id' => new MongoId($doc->ID_PDF)),array("Certificate" => true,"Name" => true));
	echo "findOne";
	$String_PDF = str_replace("data:application/pdf;base64,", "", $PDF->Certificate->PDF);
	echo "String_PDF";
	$mail = new PHPMailer;
	echo "PHPMailer";
	$mail->isSMTP();
	echo "isSMTP";
	$mail->SMTPDebug = 0;
	echo "SMTPDebug";
	$mail->Debugoutput = 'html';
	echo "Debugoutput";
	$mail->Host = "smtpout.secureserver.net";
	echo "Host";
	$mail->Port = 25;
	echo "Port";
	$mail->SMTPAuth = true;
	echo "SMTPAuth";
	$mail->Username = "info@eprac.com";
	echo "Username";
	$mail->Password = "wolFe224";
	echo "Password";
	$mail->setFrom('DTS_TRACK@eprac.com', 'DTS Track');
	echo "setFrom";
	// $mail->addCC('yeison.fallas@eprac.com', 'Katherine Fallas');
	foreach($doc->Mails as $Contact){
		echo "2 foreach";
		$mail->addAddress($Contact->Value, $Contact->Description);
	}
	echo "end 2 foreach";
	$mail->Subject = $PDF->Name . ' ' . $doc->PDF_Date;
	echo "Subject";
	$mail->Body = "PDF";
	echo "Body";
	// $mail->AltBody = 'This is a plain-text message body';
	$pdf_decoded = base64_decode($String_PDF);
	echo "pdf_decoded";
	$mail->AddStringAttachment($pdf_decoded, 'BASE64.pdf');
	echo "AddStringAttachment";
	if (!$mail->send()){
		echo "No send";
		$List_Mails->update(array("_id"=> new MongoId($doc['_id'])), array('$set' => array("Status"  => "ERROR","Error_Message"  => $mail->ErrorInfo;)));
	}else{
		echo "send";
		$List_Mails->update(array("_id"=> new MongoId($doc['_id'])), array('$set' => array("Status"  => "SEND","PDF_Date_Send"  => date("Y-m-d"))));
	}
	
	}
	echo "end 1 foreach";

