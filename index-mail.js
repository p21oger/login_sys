// Update Email actions

// prepare dialog, hide other dialogs, clear fields
function prepareMail() {
    $('#loginDiv').hide();
    $('#welcomeDiv').hide();
    $('#createDiv').hide();
    $('#resetDiv').hide();
    $('#mailDiv').hide().fadeIn(500);
    $('#passwordDiv').hide();
    $('#deleteDiv').hide();

    $('#mailMail').val('');
}


// validate fields, hide/show errors/info
function clickMail() {
    $('#mailError').hide();
    if ($('#mailMail').val() === ""  ||  !validateEmail($('#mailMail').val())) {
	$('#mailError').text('אנא הזן כתובת דואר אלקטרוני חוקית').show();
	$('#mailMail').focus();
	return false;
    }

    // send request to server

    var mailObj = {
	username:  $('#loginUsername').val(),
	email:     $('#mailMail').val(),
    };
    //alert(JSON.stringify(mailObj));

    $.ajax({
	url : 'request-mail-update.php',
	data : mailObj,
	type : 'POST',
	dataType : 'json'
    })
	.done(function(mailResult) {
	    if (mailResult === 'true') {             // login the new user
		$('#mailMail').val('');              // clear dialog fields
		$('#welcomeUsername').text(mailObj["username"]);
		prepareWelcome();
		return false;
	    }
	    else if ((mailResult) === 'email-exists') {
		$('#mailError').text("כתובת דואר כבר קיימת במערכת").show();
		$('#mailMail').focus();
		return false;
	    }
	})
	.fail(function(mailResult) {
	    //alert(JSON.stringify(mailResult));
    	    $('#mailError').text("שם משתמש לא נמצא").show();
	});

    return false;
}
