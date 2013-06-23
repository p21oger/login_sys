// Login actions

// prepare dialog, hide other dialogs, clear fields
function prepareLogin() {
    $('#loginDiv').hide().fadeIn(500);
    $('#welcomeDiv').hide();
    $('#createDiv').hide();
    $('#resetDiv').hide();
    $('#mailDiv').hide();
    $('#passwordDiv').hide();
    $('#deleteDiv').hide();

    //$('#loginUsername').text('');
    $('#loginPassword').text('');
}


// validate fields, hide/show errors/info
function clickLogin() {
    $('#loginError').hide();
    if ($('#loginUsername').val() === "") {
    	$('#loginError').text("אנא הזן שם-משתמש").show();
    	$('#loginUsername').focus();
    	return false;
    }
    if ( $('#loginPassword').val() === "") {
    	$('#loginError').text("אנא הזן סיסמה").show();
    	$('#loginPassword').focus();
    	return false;
    }

    // send request to server

    var loginObj = {
	username:  $('#loginUsername').val(),
	password:  $('#loginPassword').val()
    };

    $.ajax({
	url : 'request-login.php',
	data : loginObj,
	type : 'POST',
	dataType : 'json'
    })
	.done(function(loginResult) {
	    if (loginResult === 'true'  ||  loginResult === 'logged') {
		$('#loginPassword').val('');
		$('#welcomeUsername').text(loginObj["username"]);
		prepareWelcome();
	    }
	    else if ((loginResult) === 'false') {
		$('#loginError').text("משתמש זה אינו קיים במערכת").show();
    		$('#loginUsername').focus();
	    }
	})
	.fail(function(loginResult) {
	    //alert(JSON.stringify(loginResult));
    	    $('#loginError').text("תקלה בשרת - נסו שנית מאוחר יותר").show();
	});

    return false;
} // clickLogin
