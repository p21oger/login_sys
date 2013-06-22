$(document).ready(welcomeStart);

function welcomeStart() {
    $('#loginButton').button();
    $('#logoutButton').button();

    $('#loginButton').click(doLogin);
    $('#logoutButton').click(doLogout);

    $('#createLink').click(doCreate);
    $('#remindLink').click(doRemind);


    $('#errorLabel').hide();
    $('#welcomeDiv').hide();
    //$('#createUserDiv').hide();



}


function doLogin() {
    $('#errorLabel').hide();
    var loginObj = {
	username:  $('#usernameText').val(),
	password:  $('#passwordText').val()
    };

    if (loginObj['username'] === "") {
    	$('#errorLabel').text("אנא הזן שם-משתמש");
    	$('#errorLabel').show();
    	$('#usernameText').focus();
    	return false;
    }
    if (loginObj['password'] === "") {
    	$('#errorLabel').text("אנא הזן סיסמה");
    	$('#errorLabel').show();
    	$('#passwordText').focus();
    	return false;
    }

    $.ajax({
	url : 'login-user.php',
	data : loginObj,
	type : 'POST',
	dataType : 'json'
    })
	.done(function(loginResult) {  loginTry(loginObj, loginResult);  })
	.fail(function() {
    	    $('#errorLabel').text("תקלה בשרת - נסו שנית מאוחר יותר");
    	    $('#errorLabel').show();
	});

    return false;
} // doLogin


function loginTry(loginObj, loginResult) {
    //alert(loginResult);
    if (loginResult === 'true'  ||  loginResult === 'logged') {
    	$('#loginDiv').hide();
	$('#loggeduser').text(loginObj["username"]);
    	$('#welcomeDiv').show()
    	    .hide()
    	    .fadeIn(1500);
	rep3();
    }

    // else if ((loginResult) === 'logged') {
    // 	$('#errorLabel').text("המשתמש כבר מחובר למערכת");
    // 	$('#errorLabel').show();
    // 	$('#usernameText').focus();
    // }

    else if ((loginResult) === 'false') {
	$('#errorLabel').text("משתמש זה אינו קיים במערכת");
	$('#errorLabel').show();
    	$('#usernameText').focus();
    }

} //loginTry




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



function doCreate() {
    $('#loginDiv').hide();
    $('#createUserDiv').show().hide().fadeIn(1500);

    //alert("kookoo");

    return false;
} // doCreateNew


function doRemind() {
    $('#loginDiv').hide();
    //$('#remindPasswordDiv').show().hide().fadeIn(1500);
    //alert("booboo");

    return false;
} // doForgotPassword
