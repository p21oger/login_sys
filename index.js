$(document).ready(welcomeStart);

function welcomeStart() {
    $('#loginButton').button();
    $('#logoutButton').button();
    $('#newUserButton').button();
    $('#resetPasswordButton').button();

    $('#loginButton').click(doLogin);
    $('#logoutButton').click(doLogout);
    $('#newUserButton').click(doCreateUser);
    // $('#resetPasswordButton').click(doResetPassword);


    $('#createLink').click(goCreateUser);
    $('#resetLink').click(goResetPassword);
    // $('#mailLink').click(goUpdateMAil);
    // $('#passwordLink').click(goChangePassword);


    $('#loginErrorLabel').hide();
    $('#createUserErrorLabel').hide();
    $('#resetPasswordErrorLabel').hide();


    $('#loginDiv').show();
    $('#welcomeDiv').hide();
    $('#createUserDiv').hide();
    $('#resetPasswordDiv').hide();
}


function doLogin() {
    $('#loginErrorLabel').hide();
    if ($('#usernameText').val() === "") {
    	$('#loginErrorLabel').text("אנא הזן שם-משתמש").show();
    	$('#usernameText').focus();
    	return false;
    }
    if ( $('#passwordText').val() === "") {
    	$('#loginErrorLabel').text("אנא הזן סיסמה");
    	$('#loginErrorLabel').show();
    	$('#passwordText').focus();
    	return false;
    }

    var loginObj = {
	username:  $('#usernameText').val(),
	password:  $('#passwordText').val()
    };

    $.ajax({
	url : 'login-user.php',
	data : loginObj,
	type : 'POST',
	dataType : 'json'
    })
	.done(function(loginResult) {
	    //alert(loginResult);
	    if (loginResult === 'true'  ||  loginResult === 'logged') {
    		$('#loginDiv').hide();
		$('#loggeduser').text(loginObj["username"]);
    		$('#welcomeDiv').show().hide().fadeIn(1500);
		rep3();
	    }
	    // else if ((loginResult) === 'logged') {
	    // 	$('#loginErrorLabel').text("המשתמש כבר מחובר למערכת");
	    // 	$('#loginErrorLabel').show();
	    // 	$('#usernameText').focus();
	    // }
	    else if ((loginResult) === 'false') {
		$('#loginErrorLabel').text("משתמש זה אינו קיים במערכת");
		$('#loginErrorLabel').show();
    		$('#usernameText').focus();
	    }
	})
	.fail(function() {
    	    $('#errorLabel').text("תקלה בשרת - נסו שנית מאוחר יותר").show();
	});

    return false;
} // doLogin



function doLogout() {
    //clearTimeout(tout);
    var logoutObj = {
	username:  $('#loggeduser').text()
    };

    $.ajax({
	url : 'logout-user.php',
	data : logoutObj,
	type : 'POST',
	dataType : 'json'
    })
	.done(function(logoutResult) {
	    $('#loggeduser').text('');
	    //$('#usernameText').val();
	    $('#passwordText').val('');

    	    $('#loginDiv').show()
    		.hide()
    		.fadeIn(1500);
    	    $('#welcomeDiv').hide();

	    //rep3();

    	    $('#errorLabel').text("להתראות " + logoutObj['username']);
    	    $('#errorLabel').show();
    	    $('#usernameText').focus();
	})
	.fail(function() {
    	    //$('#errorLabel').text("תקלה בשרת - נסו שנית מאוחר יותר");
    	    //$('#errorLabel').show();
	});

    return false;


} // doLogout




function goCreateUser() {	// display create-user dialog
    $('#loginDiv').hide();
    $('#welcomeDiv').hide();
    $('#resetPasswordDiv').hide();
    $('#createUserDiv').show().hide().fadeIn(500);
    return false;
}



function doCreateUser() {
    $('#createUserErrorLabel').hide();

    if ($('#newNameText').val() === "") {
	$('#createUserErrorLabel').text('אנא הזן שם-משתמש').show();
	$('#newNameText').focus();
	return false;
    }
    if ($('#newPasswordText').val() === ""  ||  $('#newPasswordText').val() !== $('#newPassword_Text').val()) {
	$('#createUserErrorLabel').text('סיסמה לא תקינה').show();
	$('#newPasswordText').focus();
	return false;
    }
    if (!validateEmail($('#newMailText').val())) {
	$('#createUserErrorLabel').text('דואר אלקטרוני לא תקין').show();
	$('#newMailText').focus();
	return false;
    }

    var newUserObj = {
	username:  $('#newNameText').val(),
	password:  $('#newPasswordText').val(),
	email:     $('#newMailText').val()
    };

    $.ajax({
	url : 'create-user.php',
	data : loginObj,
	type : 'POST',
	dataType : 'json'
    })
	.done(function(loginResult) {
	    //alert(loginResult);
	    if (loginResult === 'true') {
		$('#newNameText').text(''); // clear new user fields
		$('#newPasswordText').text('');
		$('#newMailText').text('')
		$('#usernameText').text(''); // prepare login fields
		$('#passwordText').text('');
		$('#createUserDiv').hide(); // hide this dialog and login
		doLogin();
	    }
	    else if ((loginResult) === 'exists') {
		$('#createUserErrorLabel').text("שם המשתמש כבר קיים במערכת").show();
    		$('#newnameText').focus();
	    }
	})
	.fail(function() {
    	    $('#createUserErrorLabel').text("תקלה בשרת - נסו שנית מאוחר יותר").show();
	});



    return false;
}


function goResetPassword() {	// display reset-password dialog
    $('#loginDiv').hide();
    $('#welcomeDiv').hide();
    $('#createUserDiv').hide();
    $('#resetPasswordDiv').show().hide().fadeIn(500);
    return false;
}





function validateEmail($email) {
    var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
    if(!emailReg.test($email))
	return false;
    return true;
}



function rep3() {
    $.getJSON("logged-users.php", function(loggedusers) {
	$('#loggedUsersTable').find("tr:gt(0)").remove(); // clear all rows except first
	$.each(loggedusers, function(key, val) {
	    var useritem = '<tr align="center" id="' + key + '"><td>' + val.uip + '</td><td>' + val.uupdate + '</td><td>' + val.utime + '</td><td>' + val.uname + '</td></tr>';
	    $('#loggedUsersTable').append(useritem);
	});
    });

    var tout = setTimeout(rep3, 3000);

    //$('#t_username').val($.now());
    // var myDate = new Date();
    // var displayDate = (myDate.getHours() + ':' + myDate.getMinutes() + ':' + myDate.getSeconds() + ' ' + myDate.getDate() + '/' + (myDate.getMonth()+1) + '/' + myDate.getFullYear());
    //timelogin: myDate.getHours() + ':' + myDate.getMinutes() + ':' + myDate.getSeconds() + ' ' + myDate.getDate() + '/' + (myDate.getMonth()+1) + '/' + myDate.getFullYear(),
    // $('#loggeduser').text(displayDate);


} // rep3
