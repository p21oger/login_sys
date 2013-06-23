// Delete user actions

// prepare dialog, hide other dialogs, clear fields
function prepareDelete() {
    $('#loginDiv').hide();
    $('#welcomeDiv').hide();
    $('#createDiv').hide();
    $('#resetDiv').hide();
    $('#mailDiv').hide();
    $('#passwordDiv').hide();
    $('#deleteDiv').hide().fadeIn(500);

    $('#deleteError').text("האם ברצונך למחוק את " + $('#loginUsername').val() + "?").show();
}


// validate fields, hide/show errors/info
function clickDelete() {

    // send request to server

    var deleteObj = {
	username:  $('#loginUsername').val(),
    };
    //alert(JSON.stringify(deleteObj));

    $.ajax({
	url : 'request-user-delete.php',
	data : deleteObj,
	type : 'POST',
	dataType : 'json'
    })
	.done(function(deleteResult) {
	    if (deleteResult === 'true') {
		$('#welcomeUsername').text('');
    		$('#loginError').text("להתראות " + deleteObj['username']).show();
    		$('#loginUsername').focus();
		prepareLogin();
	    }
	})
	.fail(function(deleteResult) {
	    //alert(JSON.stringify(deleteResult));
    	    $('#deleteError').text("שם משתמש לא נמצא").show();
	});

    return false;
}
