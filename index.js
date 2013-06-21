$(document).ready(rep3);

function rep3() {

    $.getJSON("logged-users.php", function(loggedusers) {
	$("#infousers").find("tr:gt(0)").remove(); // clear all rows except first
	$.each(loggedusers, function(key, val) {
	    var useritem = '<tr align="center" id="' + key + '"><td>' + val.uip + '</td><td>' + val.uupdate + '</td><td>' + val.utime + '</td><td>' + val.uname + '</td></tr>';
	    $("#infousers").append(useritem);
	});
    });

    //$("#t_username").val($.now());

    setTimeout(rep3, 3000);
};


$(function() {
    $('.error').hide();

    $("#loginButton").button();

    $("#loginButton").click(function() {
	$('.error').hide();
	var username = $("input#usernameText").val();
	if (username == "") {
	    $("label#errorLabel").text("שם משתמש אינו תקין");
	    $("label#errorLabel").show();
	    $("input#usernameText").focus();
	    return false;
	}

	var password = $("input#passwordText").val();
	if (password == "") {
	    $("label#errorLabel").text("נא להזין סיסמה");
	    $("label#errorLabel").show();
	    $("input#passwordText").focus();
	    return false;
	}


	var dataString = 'username=' + username + '&password=' + password;
	//alert (dataString);return false;
	$.ajax({
	    type: "POST",
	    url: "login.php",
	    data: dataString,
	    success: function() {
		$('#contact_form').html("<div id='message'></div>");
		$('#message').html("<h2>Contact Form Submitted!</h2>")
		    .append("<p>We will be in touch soon.</p>")
		    .hide()
		    .fadeIn(1500, function() {
			$('#message').append("<img id='checkmark' src='images/check.png' />");
		    });
	    }
	});
	return false;


    }); // loginButton.click

});













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
