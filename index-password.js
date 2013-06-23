// Update Password actions

// prepare dialog, hide other dialogs, clear fields
function preparePassword() {
    $('#loginDiv').hide();
    $('#welcomeDiv').hide();
    $('#createDiv').hide();
    $('#resetDiv').hide();
    $('#mailDiv').hide();
    $('#passwordDiv').hide().fadeIn(500);
    $('#deleteDiv').hide();

    $('#passwordPassword').val('');
    $('#passwordPassword_').val('');
}


// validate fields, hide/show errors/info
function clickPassword() {
    $('#passwordError').hide();
    if ($('#passwordPassword').val() === ""  ||  $('#passwordPassword').val() !== $('#passwordPassword_').val()) {
	$('#passwordError').text('הסיסמה אינה תקינה').show();
	$('#passwordPassword').focus();
	return false;
    }

    // send request to server

    var passwordObj = {
	username:  $('#loginUsername').val(),
	password:     $('#passwordPassword').val(),
    };
    //alert(JSON.stringify(passwordObj));

    $.ajax({
	url : 'request-password-update.php',
	data : passwordObj,
	type : 'POST',
	dataType : 'json'
    })
	.done(function(passwordResult) {
	    if (passwordResult === 'true') {             // login the new user
		$('#passwordPassword').val('');              // clear dialog fields
		$('#passwordPassword_').val('');
		$('#welcomeUsername').text(passwordObj["username"]);
		prepareWelcome();
		return false;
	    }
	})
	.fail(function(passwordResult) {
	    //alert(JSON.stringify(passwordResult));
    	    $('#passwordError').text("שם משתמש לא נמצא").show();
	});

    return false;
}
