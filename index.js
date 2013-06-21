//$(document).ready(rep3);

function rep3() {

    $.getJSON("logged-users.php", function(loggedusers) {
	$('#infousers').find("tr:gt(0)").remove(); // clear all rows except first
	$.each(loggedusers, function(key, val) {
	    var useritem = '<tr align="center" id="' + key + '"><td>' + val.uip + '</td><td>' + val.uupdate + '</td><td>' + val.utime + '</td><td>' + val.uname + '</td></tr>';
	    $('#infousers').append(useritem);
	});
    });

    //$('#t_username').val($.now());

    setTimeout(rep3, 3000);
};


$(function() {
    $('.error').hide();
    $('#welcomeDiv').hide();

    $('#loginButton').button();
    $('#logoutButton').button();


    $('#loginButton').click(function() {
	$('.error').hide();
	var username = $('#usernameText').val();
	if (username === "") {
	    $('#errorLabel').text("שם משתמש אינו תקין");
	    $('#errorLabel').show();
	    $('#usernameText').focus();
	    return false;
	}

	var password = $('#passwordText').val();
	if (password === "") {
	    $('#errorLabel').text("נא להזין סיסמה");
	    $('#errorLabel').show();
	    $('#passwordText').focus();
	    return false;
	}


	var dataString = 'username=' + username + '&password=' + password;
	//alert (dataString);return false;
	$.ajax({
	    type: "POST",
	    url: "login-user.php",
	    data: dataString,
	    success: function() {
		$('#loginDiv').hide();
		$('#welcomeDiv').show()
		    .hide()
		    .fadeIn(1500);
		rep3();
	    },
	    error: function() {
		alert (dataString);return false;
		$('#errorLabel').text("פרטי משתמש אינם נכונים");
		$('#errorLabel').show();
		$('#usernameText').focus();
		return false;
	    }
	});
	return false;


    }); // loginButton.click

});





function validateEmail($email){
    var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
    if(!emailReg.test($email)){
	return false;
    }else{
	return true;
    }
}

$(function(){
    $('.fail').hide();
    $(".submit").click(function(){
	var email = $("#email").val();
	if ( !validateEmail(email)){
	    $('.fail').append("

Please enter email
");
	    $('.fail').show();
	    $("#email").focus();
	    return false;
	}







/*

    // var $newrow = "<tr align=\"center\" id=\"user" + $counter + "\"><td>" + $counter + "</td><td></td><td></td><td>kookoo</td></tr>";
    // add_user_row($newrow);
    // del_user_row();
    // $counter++;


function add_user_row($newrow) {
    $("#infousers").append($newrow);
    $("#user" + ($counter)).hide();
    $("#user" + ($counter)).fadeIn();
}

function del_user_row() {
    $("#user" + ($counter-2)).fadeOut();
    $("#user" + ($counter-3)).remove();
}




$.ajax({
    url : 'post.php',						// the URL for the request
    data : { id : 123 },					// the data to send (will be converted to a query string)
    type : 'POST',						// POST or GET
    dataType : 'json',						// the type of data we expect back
    success : function(json) {					// code to run if the request succeeds; the response is passed to the function
	$('<h1/>').text(json.title).appendTo('body');
	$('<div class="content"/>')
	    .html(json.html).appendTo('body');
    },
    error : function(xhr, status) {				// code to run if the request fails; the raw request and status codes are passed to the function
	alert('Sorry, there was a problem!');
    },
    complete : function(xhr, status) {				// code to run regardless of success or failure
	alert('The request is complete!');
    }
});

$.getJSON({
    url : 'post.php',						// the URL for the request
    data : { id : 123 },					// the data to send (will be converted to a query string)
    success : function(json) {					// code to run if the request succeeds; the response is passed to the function
	$('<h1/>').text(json.title).appendTo('body');
	$('<div class="content"/>')
	    .html(json.html).appendTo('body');
    },

});
*/
