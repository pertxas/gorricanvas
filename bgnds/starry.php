<?php
ini_set("display_errors",1);
$x=isset($_GET['x'])?(int)$_GET['x']>0?(int)$_GET['x']:512:512;
$y=isset($_GET['y'])?(int)$_GET['y']>0?(int)$_GET['y']:512:512;
$z=isset($_GET['z'])?(int)$_GET['z']>0?(int)$_GET['z']:1:1;
$d=isset($_GET['d'])?(int)$_GET['d']>=0 && (int)$_GET['d']<=1000?(int)$_GET['d']:10:10;
$mx=isset($_GET['mx'])?(int)$_GET['mx']==1?1:0:0;
$my=isset($_GET['my'])?(int)$_GET['my']==1?1:0:0;
$t=isset($_GET['t'])?(int)$_GET['t']==1?1:0:0;
$w=($x*$z)+($mx*$x*$z);
$h=($y*$z)+($my*$y*$z);
$gd = imagecreatetruecolor($w, $h);
$colores[0]=imagecolorallocate($gd, 0, 0, 0);
$colores[1]=imagecolorallocate($gd, 255, 255, 255);
$colores[2]=imagecolorallocate($gd, 255, 0, 0);
$colores[3]=imagecolorallocate($gd, 0, 255, 0);
$colores[4]=imagecolorallocate($gd, 0, 0, 255);
$colores[5]=imagecolorallocate($gd, 255, 255, 0);
$colores[6]=imagecolorallocate($gd, 0, 255, 255);
$colores[7]=imagecolorallocate($gd, 255, 0, 255);
$c=isset($_GET['c'])?(int)$_GET['c']%sizeof($colores):sizeof($colores)-1;
$ns=(($x*$y)*$d)/1000;
for($i=0;$i<$ns;$i++)
  {
  $col=$colores[rand(1,$c)];
  $nx=rand(0,$x);
  $ny=rand(0,$y);
  for($m=0;$m<$z;$m++)
    {
    for($n=0;$n<$z;$n++)
      {
      imagesetpixel($gd, ($nx*$z)+$m,($ny*$z)+$n, $col);
      if ($mx==1) imagesetpixel($gd, ($w)-(($nx*$z)+$m)-1,($ny*$z)+$n, $col);
      if ($my==1) imagesetpixel($gd, ($nx*$z)+$m,($h)-(($ny*$z)+$n)-1, $col);
      if ($mx==1 && $my==1) imagesetpixel($gd, ($w)-(($nx*$z)+$m)-1,($h)-(($ny*$z)+$n)-1, $col);
      }
    }
  }
if ($t==1) imagecolortransparent($gd, $colores[0]);
header('Content-Type: image/png');
imagepng($gd);
//print_r($gd_sc);
?>