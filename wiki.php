<?php

    $text = $_REQUEST['text'];
    
    $response = file_get_contents(
        'https://en.wikipedia.org/w/api.php?action=parse&format=json&prop=text&section=0&page=' . $text . '&redirects=true&callback=?');
    print($response);

?>