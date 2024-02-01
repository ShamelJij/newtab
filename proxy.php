<?php
header('Access-Control-Allow-Origin: *'); // Allow requests from any origin (adjust as needed)
header('Content-Type: text/xml');

$targetUrl = 'https://militarywatchmagazine.com/feeds/headlines.xml';

// Fetch data from the target URL
$ch = curl_init($targetUrl);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
$data = curl_exec($ch);
curl_close($ch);

// Output the fetched data
echo $data;
?>
