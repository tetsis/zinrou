<!DOCTYPE html>

<html lang="ja">

<head>
    <meta charaset="UTF-8">
    <title>ワンナイト人狼：コメント</title>
    <link rel = "stylesheet" href = "main.css">
</head>

<body>
<div id="comment">
<?php
    if ($_POST[btn_commentSubmit]) {
        error_log("COMMENT: ". $_POST[txa_comment]. "\n", 3, '/var/log/zinrou.log');
        print "コメントが送信されました<br/>";
        print "ご協力ありがとうございました<br/><br/>";
    }
?>
開発者へのコメントを書いてください
<br/>
<form action = 'comment.php' method = 'post'>
    <textarea name="txa_comment"></textarea>
    <br/>
    <input type = 'submit' name = 'btn_commentSubmit' value = '送信'/>
    <br/>
    <br/>
</form>

<form action = './' method = 'post'>
    <input type = 'submit' name = 'btn_back' value = '戻る'/>
</form>

</div>
</body>

</html>
