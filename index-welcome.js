// Login actions

// prepare dialog, hide other dialogs, clear fields
function prepareWelcome() {
    $('#loginDiv').hide();
    $('#welcomeDiv').hide().fadeIn(500);
    $('#createDiv').hide();
    $('#resetDiv').hide();
}


// validate fields, hide/show errors/info
function clickWelcome() {

    // send request to server

    var welcomeObj = {
	username:  $('#welcomeUsername').text()
    };

    $.ajax({
	url : 'request-logout.php',
	data : welcomeObj,
	type : 'POST',
	dataType : 'json'
    })
	.done(function(welcomeResult) {
	    $('#welcomeUsername').text('');
    	    $('#loginError').text("להתראות " + welcomeObj['username']).show();
    	    $('#loginUsername').focus();

	    //clearTimeout(tout);
	    //~rep3();

	    prepareLogin();
	})
	.fail(function() {
	});

    return false;
} // clickWelcome
