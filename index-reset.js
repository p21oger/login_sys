// Reset Password actions

// prepare dialog, hide other dialogs, clear fields
function prepareReset() {
    $('#loginDiv').hide();
    $('#welcomeDiv').hide();
    $('#createDiv').hide();
    $('#resetDiv').hide().fadeIn(500);
    $('#mailDiv').hide();
    $('#passwordDiv').hide();
    $('#deleteDiv').hide();

    $('#resetEmail').val('');
}



// validate fields, hide/show errors/info
function clickReset() {
    $('#resetError').hide();
    if ($('#resetEmail').val() === ""  ||  !validateEmail($('#resetEmail').val())) {
    	$('#resetError').text("אנא הזן כתובת דואר אלקטרוני חוקית").show();
	$('#resetEmail').focus();
    	return false;
    }

    // send request to server

    var resetObj = {
	email:  $('#resetEmail').val(),
    };

    $.ajax({
	url : 'request-password-reset.php',
	data : resetObj,
	type : 'POST',
	dataType : 'json'
    })
	.done(function(resetResult) {
	    if (resetResult === 'true') {
		$('#resetEmail').val('');
    		$('#loginError').text("קישור לאיפוס הסיסמה נשלח בהצלחה").show();
		prepareLogin();
	    }
	})
	.fail(function() {
    	    $('#resetError').text("תקלה בשרת - נסו שנית מאוחר יותר").show();
	});

    return false;
} // clickReset
