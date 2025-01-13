<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

function fetchMenuHtml($url) {
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
    curl_setopt($ch, CURLOPT_USERAGENT, 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36');
    $html = curl_exec($ch);
    if (curl_errno($ch)) {
        echo 'cURL error: ' . curl_error($ch);
        curl_close($ch);
        return false;
    }
    curl_close($ch);
    return $html;
}

function parseMenu($html) {
    $dom = new DOMDocument();
    @$dom->loadHTML($html);
    $xpath = new DOMXPath($dom);
    $menuItems = [];
    $currentDay = '';
    $currentDate = '';
    $currentItems = [];
    
    $startDate = new DateTime();

    if ($startDate->format('N') >= 6) {
        $startDate->modify('next monday');
    }

    $rows = $xpath->query('//div[contains(@class, "foodTable")]//table//tr');
    $dayOffset = 0;

    foreach ($rows as $row) {
        $typeNode = $xpath->query('.//td[contains(@class, "foodTableType")]', $row);
        $descriptionNode = $xpath->query('.//td[last()]', $row);

        if ($typeNode->length > 0 && $descriptionNode->length > 0) {
            $type = trim($typeNode->item(0)->textContent);
            $description = trim($descriptionNode->item(0)->textContent);

            if ($type == 'Bageta 1' || $type == 'Bageta 2') {
                continue;
            }

            if ($type == 'Polévka') {
                if ($currentDay) {
                    $menuItems[] = ['day' => $currentDay, 'date' => $currentDate, 'items' => $currentItems];
                }

                $currentDate = $startDate->format('d. m. Y');
                $currentDay = $startDate->format('l');
                $currentItems = [];
                $dayOffset++;
                
                $startDate->modify('+1 weekday');
            }

            if (isset($currentItems)) {
                $currentItems[] = ['type' => $type, 'description' => $description];
            }
        }
    }

    if ($currentDay) {
        $menuItems[] = ['day' => $currentDay, 'date' => $currentDate, 'items' => $currentItems];
    }

    return $menuItems;
}

$url = 'http://jidelna.pleas.cz:8099/orders/index.aspx';

$html = fetchMenuHtml($url);

$menuItems = [];
if ($html !== false) {
    $menuItems = parseMenu($html);
}

header('Content-Type: application/json');
echo json_encode($menuItems);
?>