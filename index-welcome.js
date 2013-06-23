// Login actions

// prepare dialog, hide other dialogs, clear fields
function prepareWelcome() {
    $('#loginDiv').hide();
    $('#welcomeDiv').hide().fadeIn(500);
    $('#createDiv').hide();
    $('#resetDiv').hide();

    rep3();
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
	    prepareLogin();
	})
	.fail(function() {
	});

    return false;
} // clickWelcome
