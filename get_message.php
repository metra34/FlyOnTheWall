<?php
	$file_name_prefix="23_24";
	$file_name=$file_name_prefix . ".txt";
	$file_lock=$file_name_prefix . ".lck";

	$fpLock=fopen($file_lock, 'w');
	if (flock($fpLock, LOCK_SH)) { // shared lock
		$messages=False;
		$s=@file_get_contents($file_name); // same as fopen, read all contents, fclose
		if($s){
			$messages=unserialize($s);
		}
		if(!$messages){
			$messages=array();
		}

		flock($fpLock, LOCK_UN); // unlock the lock file
		fclose($fpLock);
	}
	for($i=count($messages)-1; $i>=0; $i=$i-1)
	{
		echo("$messages[$i] <br/>");
	}
	
	/* foreach($messages as $value ){
		echo("$value <br/>");
	} */
?>
