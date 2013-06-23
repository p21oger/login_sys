// Create New User actions

// prepare dialog, hide other dialogs, clear fields
function prepareCreate() {
    $('#loginDiv').hide();
    $('#welcomeDiv').hide();
    $('#createDiv').hide().fadeIn(500);
    $('#resetDiv').hide();
    $('#mailDiv').hide();
    $('#passwordDiv').hide();
    $('#deleteDiv').hide();

    $('#createUsername').val('');
    $('#createPassword').val('');
    $('#createEmail').val('');
}


// validate fields, hide/show errors/info
function clickCreate() {
    $('#createError').hide();
    if ($('#createUsername').val() === "") {
	$('#createError').text('אנא הזן שם-משתמש').show();
	$('#createUsername').focus();
	return false;
    }
    if ($('#createPassword').val() === ""  ||  $('#createPassword').val() !== $('#createPassword_').val()) {
	$('#createError').text('סיסמה לא תקינה').show();
	$('#createPassword').focus();
	return false;
    }
    if (!validateEmail($('#createEmail').val())) {
	$('#createError').text('דואר אלקטרוני לא תקין').show();
	$('#createEmail').focus();
	return false;
    }

    // send request to server

    var createObj = {
	username:  $('#createUsername').val(),
	password:  $('#createPassword').val(),
	email:     $('#createEmail').val(),
    };

    $.ajax({
	url : 'request-create-user.php',
	data : createObj,
	type : 'POST',
	dataType : 'json'
    })
	.done(function(createResult) {
	    if (createResult === 'true') {             // login the new user
		$('#loginUsername').val($('#createUsername').val());
		$('#loginPassword').val($('#createPassword').val());
		$('#createUsername').val('');          // clear dialog fields
		$('#createPassword').val('');
		$('#createPassword_').val('');
		$('#createEmail').val('');
		clickLogin();			       // imitate login-click
		return false;
	    }
	    else if ((createResult) === 'exists') {
		$('#createError').text("שם המשתמש כבר קיים במערכת").show();
		$('#createUsername').focus();
		$('#createPassword').val('');
		$('#createPassword_').val('');
	    }
	    else if ((createResult) === 'email-exists') {
		$('#createError').text("כתובת דואר כבר קיימת במערכת").show();
		$('#createEmail').focus();
		$('#createPassword').val('');
		$('#createPassword_').val('');
	    }
	})
	.fail(function(createResult) {
	    //alert(JSON.stringify(createResult));
    	    $('#createError').text("תקלה בשרת - נסו שנית מאוחר יותר").show();
	});

    return false;
}
