<?php
    $text = $_REQUEST['text'];
    $response = file_get_contents(
        'https://api.wolframalpha.com/v2/query?appid=2UPGQW-RGH5V5V49U&input=' . $text . '%20stock&format=image');
    print($response);
?>

