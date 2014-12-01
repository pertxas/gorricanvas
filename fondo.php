<html>
<head></head>
<?php
ini_set("display_errors",1);
$x=isset($_GET['x'])?(int)$_GET['x']>0?(int)$_GET['x']:8:8;
$y=isset($_GET['y'])?(int)$_GET['y']>0?(int)$_GET['y']:8:8;
$z=isset($_GET['z'])?(int)$_GET['z']>0?(int)$_GET['z']:8:8;
$colores=array(0,1,2,3,4,5,6,7);
$c=isset($_GET['c'])?(int)$_GET['c']%sizeof($colores):sizeof($colores)-1;
?>
<body style="background-image:url('mirror.php?x=<?php echo($x); ?>&y=<?php echo($y); ?>&z=<?php echo($z); ?>&c=<?php echo($c); ?>');">
<div style="background-color:#ffffff;display:inline-block;">
<form>
<?php
echo("x:<input type='text' size='2' id='x' name='x' value='".$x."'/><br/>");
echo("y:<input type='text' size='2' id='y' name='y' value='".$y."'/><br/>");
echo("z:<input type='text' size='2' id='z' name='z' value='".$z."'/><br/>");
echo("c:<input type='text' size='2' id='c' name='c' value='".$c."'/><br/>");
?>
<input type='submit' value='send'/>
</form>
</div>
</body>
</html>