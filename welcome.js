$(document).ready(welcomeStart);

function welcomeStart() {
    $('#loginButton').button();
    $('#logoutButton').button();

    $('#errorLabel').hide();
    $('#welcomeDiv').hide();

    $('#loginButton').click(doLogin);
}


function doLogin() {
    $('#errorLabel').hide();
    var loginObj = {
	username: $('#usernameText').val(),
	password: $('#passwordText').val()
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
	.done(function(loginResult) { loginTry(loginObj, loginResult); })
	.fail(function() {
    	    $('#errorLabel').text("תקלה בשרת - נסו שנית מאוחר יותר");
    	    $('#errorLabel').show();
	});

    return false;
} // doLogin


function loginTry(loginObj, loginResult) {
    if ((loginResult) === 'true') {
    	$('#loginDiv').hide();
	$('#loggeduser').text(loginObj["username"]);
    	$('#welcomeDiv').show()
    	    .hide()
    	    .fadeIn(1500);
	rep3();
    }
    else {
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

    //$('#t_username').val($.now());

    // var myDate = new Date();
    // var displayDate = (myDate.getHours() + ':' + myDate.getMinutes() + ':' + myDate.getSeconds() + ' ' + myDate.getDate() + '/' + (myDate.getMonth()+1) + '/' + myDate.getFullYear());
    // $('#loggeduser').text(displayDate);


    setTimeout(rep3, 3000);
}
