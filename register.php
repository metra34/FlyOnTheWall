<?php
	header('Content-Type: application/json');
	$reply=array();
	
	if ($_REQUEST['username']=='aa'){
		$reply['status']='ok';
		$reply['user']=$_REQUEST['username'];
	} else {
		$reply['status']='error: username already taken';	
	}
	/* try{
		$dbconn = pg_connect("host=localhost dbname=clemen47 user=clemen47 password=13222") or die('Could not connect: ' . pg_last_error());
		
		$result = pg_prepare($dbconn, "myQuery2", "select * from userinfo where username=$1 or email=$2;");
		$result = pg_execute($dbconn, "myQuery2", array($_REQUEST['usern'], $_REQUEST['email']));
		
		$row = pg_fetch_array($result);
		
		if ($row != null){
			if ($row['username']==$_REQUEST['usern']){
				$reply['status'] = "Error: username already exists";
			} else {
				$reply['status'] = "Error: email already exists";
			}
		} else {
			$result2 = pg_prepare($dbconn, "myQuery3", "insert into userinfo values($1, $2, $3, $4);");
			$result2 = pg_execute($dbconn, "myQuery3", array($_REQUEST['usern'], $_REQUEST['name'], $_REQUEST['email'], $_REQUEST['pass']));
			$_SESSION['username'] = $_REQUEST['usern'];
			$reply['status']='ok';
			pg_free_result($result2);
		}
	}catch{
		$reply['status']='Fatal Error';
	}
	pg_free_result($result); */
	
	leave:
		print json_encode($reply);
?>