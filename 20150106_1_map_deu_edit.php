<?php

$file = "test.csv";

$row = 1;
if (($handle = fopen($file, "r")) !== FALSE) {
    while (($data = fgetcsv($handle, 1000, ",")) !== FALSE) {
        $num = count($data);
        //echo "<p> $num Felder in Zeile $row: <br /></p>\n";
        $array[($row-1)] = $data[1];	
		$row++;
		echo $data[1] . "<br />\n";
		//        for ($c=0; $c < $num; $c++) {
//            echo $data[$c] . "<br />\n";
//        }
    }
	print_r($array[0]);
    fclose($handle);
}

$text = "Erste Zeile";
$text1 = "Zweite Zeile";
$text2 = "Dritte Zeile";

//$handler = fopen($file,"w"); 

//$current = file_get_contents($file);
//$current = file_get_contents($file);
//echo "eingelesen: ".$current;

$list = array (
    array('text', $text),
    array('text1', $text1),
    array('text2', $text2)
);

/*$fp = fopen('test.csv', 'w');
echo "--- ".$fp;
foreach ($list as $fields) {
    fputcsv($fp, $fields);
}

fclose($fp);

//file_put_contents($file, $text);
//echo $text;
/*
$alle = "$text\r\n$text1\r\n$text2\r\n";

fwrite($handler, $text);
fwrite($handler, "\n");
fwrite($handler, $text1);
fwrite($handler, $text2);

fclose($handler); // Datei schließen
*/
?>