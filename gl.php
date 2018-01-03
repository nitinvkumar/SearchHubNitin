<?php
    $text = $_REQUEST['text'];
    $response = file_get_contents(
        'https://www.googleapis.com/customsearch/v1?key=AIzaSyAtKY9P3HS-qXh6Uzt2De7NgwYB6AAg-iA&cx=005136518751823636487:g_hy-uwokei' . $text . '&redirects=true&callback=?');
    print($response);
?>

