<?php
	header('Content-Type: application/json');
	$reply=array();
	$valid_user = 'aa';
	$valid_password = 'bb';

	/* function check_login(){
		
		global $dbconn; // reference $dbconn from global scope vs create a new local
		
		$is_valid = false;
		$result = pg_prepare($dbconn, "myQuery1", "select username from userinfo WHERE username=$1 AND password1=$2;"); 
		# check result 
		$result = pg_execute($dbconn, "myQuery1", array($_REQUEST['user'], $_REQUEST['logPass']));
		$row = pg_fetch_array($result);
		if($row!=null) {
			$_SESSION['username'] = $_REQUEST['user'];
			$is_valid = true;
		}
		
		pg_free_result($result);
		
		return $is_valid;
		
	}

	$dbconn = pg_connect("host=localhost dbname=clemen47 user=clemen47 password=13222") or die('Could not connect: ' . pg_last_error());
	$someVar = check_login(); */
	if(isset($_REQUEST)){
		
		//do DB STUFF HERE TO FILL VALID USER AND VALID PASSWORD
		if ($_REQUEST['username']==$valid_user){
			if ($_REQUEST['password']==$valid_password){
				$reply['status']='ok';	
				$reply['username']=$_REQUEST['username'];
			} else {
				$reply['status']='error: incorrect password';
			}
		} else {
			$reply['status']='error: incorrect username';
		}
	}else{
			$reply['error: no request received'];
	}
	
	leave:
		print json_encode($reply);

?>