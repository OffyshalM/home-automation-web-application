<?php

function sendWhatsappNotification($fullName, $email, $product, $whatsappNumber, $message) {
    $instanceId = $_ENV['ULTRAMSG_INSTANCE_ID'];
    $token = $_ENV['ULTRAMSG_TOKEN'];
    $recipient = $_ENV['ULTRAMSG_RECIPIENT'];

    $url = "https://api.ultramsg.com/$instanceId/messages/chat";

    $text = "*FUTURICA AUTOMATIONS AND INTEGRATED SERVICES LIMITED*\n\n"
          . "*📩 NEW QUOTE REQUEST*\n\n"
          . "*👤 NAME:* $fullName\n"
          . "*✉️ EMAIL:* $email\n"
          . "*🛠️ PRODUCT:* $product\n"
          . "*📱  WHATSAPP NUMBER:* $whatsappNumber\n\n"
          . "*💬 MESSAGE:* " . mb_strtoupper($message) . "";

    $params = [
        "token" => $token,
        "to" => $recipient,
        "body" => $text,
    ];

    $curl = curl_init();
    curl_setopt_array($curl, [
        CURLOPT_URL => $url,
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_ENCODING => "",
        CURLOPT_MAXREDIRS => 10,
        CURLOPT_TIMEOUT => 30,
        CURLOPT_SSL_VERIFYHOST => 0,
        CURLOPT_SSL_VERIFYPEER => 0,
        CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
        CURLOPT_CUSTOMREQUEST => "POST",
        CURLOPT_POSTFIELDS => http_build_query($params),
        CURLOPT_HTTPHEADER => [
            "content-type: application/x-www-form-urlencoded"
        ],
    ]);

    $response = curl_exec($curl);
    $err = curl_error($curl);
    curl_close($curl);

    if ($err) {
        error_log("UltraMsg cURL error: $err");
    } else {
        error_log("UltraMsg response: $response");
    }
}