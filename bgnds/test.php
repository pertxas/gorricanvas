<?php
ini_set("display_errors",1);
$x=isset($_GET['x'])?(int)$_GET['x']>0?(int)$_GET['x']:8:8;
$y=isset($_GET['y'])?(int)$_GET['y']>0?(int)$_GET['y']:8:8;
$z=isset($_GET['z'])?(int)$_GET['z']>0?(int)$_GET['z']:8:8;
$gd = imagecreatetruecolor($x*$z, $y*$z);
$colores[0]=imagecolorallocate($gd, 0, 0, 0);
$colores[1]=imagecolorallocate($gd, 255, 255, 255);
$colores[2]=imagecolorallocate($gd, 255, 0, 0);
$colores[3]=imagecolorallocate($gd, 0, 255, 0);
$colores[4]=imagecolorallocate($gd, 0, 0, 255);
$colores[5]=imagecolorallocate($gd, 255, 255, 0);
$colores[6]=imagecolorallocate($gd, 0, 255, 255);
$colores[7]=imagecolorallocate($gd, 255, 0, 255);
$c=isset($_GET['c'])?(int)$_GET['c']%sizeof($colores):sizeof($colores)-1;
for($i=0;$i<$x;$i++)
  {
  for($j=0;$j<$y;$j++)
    {
    $col=$colores[$j];
    for($m=0;$m<$z;$m++)
      {
      for($n=0;$n<$z;$n++)
        {
        imagesetpixel($gd, ($i*$z)+$m,($j*$z)+$n, $col);
        }
      }
    }
  }
header('Content-Type: image/png');
imagepng($gd);
//print_r($gd_sc);
?>