<html lang="he">
  <head>
    <META HTTP-EQUIV="Content-Type" CONTENT="text/html; charset=utf-8">
    <title>login mini-site</title>
    <link href="Alef-Webfont/stylesheet.css" rel="stylesheet">
    <link href="mini-site.css" rel="stylesheet">
    <link href="jquery-ui-1.10.3.custom/css/ui-lightness/jquery-ui-1.10.3.custom.css" rel="stylesheet">
    <script src="jquery-ui-1.10.3.custom/js/jquery-1.9.1.js"></script>
    <script src="jquery-ui-1.10.3.custom/js/jquery-ui-1.10.3.custom.js"></script>
    <script src="index.js"></script>
  </head>

  <body>
    <div class="dc_center" id="wrapper">
      <form method="post" action="ss">
	<h2 class="dc_center" id="d_welcome">mini-site ברוכים הבאים ל</h2>

	<br>

	<div class="dc_center" id="d_title">
	  <span class="s_l"><span class="s_small"><a href="#">צור חשבון</a></span></span>
	  <span class="s_r">:התחבר למערכת</span>
	</div>
	<div class="dc_center" id="d_username">
	  <span class="s_l"><input id="t_username" size=10></span>
	  <span class="s_r">:שם משתמש</span>
	</div>
	<div class="dc_center" id="d_password">
	  <span class="s_l"><input type="password" id="p_password" size=10><br><a href="#"><span class="s_small">שכחתי סיסמה</span></a></span>
	  <span class="s_r">:סיסמה</span>
	</div>
	<div class="dc_center s_small" id="d_submit"><button id="login">התחבר</button></div>
      </form>
    </div>

    <br>

    <table class="dc_center" id="infousers">
      <tr>
	<th>IP כתובת</th>
	<th>זמן עדכון אחרון</th>
	<th>זמן התחברות</th>
	<th>שם משתמש</th>
      </tr>
    </table>

  </body>
</html>
