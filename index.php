<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="utf-8">
    <meta name="viewpoint" content="width=device-width">
    <title>ワンナイト人狼</title>
    <link rel="stylesheet" type="text/css" href="main.css">
    <script type="text/javascript" src="zinrou.js"></script>
</head>
<body>

<!-- Top -->
<div id="top">
<div>
<h1>ワンナイト人狼</h1>
</div>

<input type="button" id="btn_lobby" value="村に参加"><br/><br/>
<input type="button" id="btn_making" value="村を作る"><br/>
</div>


<!-- Making -->
<div id ="making">
村の名前を入力してください<br/>
<input type="text" id="txt_villageName"><br/><br/>
必要ならパスワードを設定してください<br/>
<input type="text" id="txt_villagePassword"><br/><br/>

観戦モード<br/>
<table>
    <tr>
        <td>
            <input type="button" id="btn_spectatorYes" value="あり">
        </td>
        <td>
            <input type="button" id="btn_spectatorNo" value="なし">
        </td>
    </tr>
</table><br/>

<input type="button" id="btn_decideInMaking" value="決定"><br/><br/>
<input type="button" id="btn_backInMaking" value="戻る"><br/>
</div>


<!-- Lobby -->
<div id ="lobby">
村一覧<br/>

<table class="border">
    <tr>
        <td>
            <div id="box_villageList"></div>
        </td>
    </tr>
</table>
<input type="button" id="btn_updateInLobby" value="更新"><br/><br/><br/>

<input type="button" id="btn_decideInLobby" value="決定"><br/><br/>
<input type="button" id="btn_backInLobby" value="戻る"><br/>
</div>


<!-- Participation -->
<div id ="participation">
<div id="scrn_villageName"></div><br/>

あなたの名前を入力してください<br/>
<input type="text" id="txt_participantName"><br/><br/>
<input type="button" id="btn_participationAsPlayer" value="プレイヤー参加"><br/><br/>
<input type="button" id="btn_participationAsSpectator" value="観戦者参加"><br/><br/>
<input type="button" id="btn_backInParticipation" value="戻る"><br/>
</div>


<!-- Waiting -->
<div id ="waiting">
<div class="scrn_villageName"></div>

<table>
    <tr>
        <td>
            プレイヤー
        </td>
        <td>
            観戦者
        </td>
    </tr>
    <tr>
        <td class="border">
            <div id="box_playerListInWaiting"></div>
        </td>
        <td class="border">
            <div id="box_spectatorListInWaiting"></div>
        </td>
    </tr>
</table>
<br/>
村構成<br/>

<table>
    <tr>
        <td>村人</td>
        <td><input type="button" id="btn_decrementOfNumberOfVillager" value="－"></td>
        <td><div id="scrn_numberOfVillagerInWaiting"></div></td>
        <td><input type="button" id="btn_incrementOfNumberOfVillager" value="＋"></td>
    </tr>
    <tr>
        <td>人狼</td>
        <td><input type="button" id="btn_decrementOfNumberOfWerewolf" value="－"></td>
        <td><div id="scrn_numberOfWerewolfInWaiting"></div></td>
        <td><input type="button" id="btn_incrementOfNumberOfWerewolf" value="＋"></td>
    </tr>
    <tr>
        <td>占い師</td>
        <td><input type="button" id="btn_decrementOfNumberOfFortuneteller" value="－"></td>
        <td><div id="scrn_numberOfFortunetellerInWaiting"></div></td>
        <td><input type="button" id="btn_incrementOfNumberOfFortuneteller" value="＋"></td>
    </tr>
    <tr>
        <td>怪盗</td>
        <td><input type="button" id="btn_decrementOfNumberOfThief" value="－"></td>
        <td><div id="scrn_numberOfThiefInWaiting"></div></td>
        <td><input type="button" id="btn_incrementOfNumberOfThief" value="＋"></td>
    </tr>
    <tr>
        <td>狂人</td>
        <td><input type="button" id="btn_decrementOfNumberOfMadman" value="－"></td>
        <td><div id="scrn_numberOfMadmanInWaiting"></div></td>
        <td><input type="button" id="btn_incrementOfNumberOfMadman" value="＋"></td>
    </tr>
    <tr>
        <td>てるてる</td>
        <td><input type="button" id="btn_decrementOfNumberOfHanging" value="－"></td>
        <td><div id="scrn_numberOfHangingInWaiting"></div></td>
        <td><input type="button" id="btn_incrementOfNumberOfHanging" value="＋"></td>
    </tr>
    <tr>
        <td>残り</td>
        <td></td>
        <td><div id="scrn_left"></div></td>
        <td></td>
    </tr>
</table>
<br/>
<br/>
話し合い時間
<br/>
<table>
    <tr>
        <td><input type="button" id="btn_decrementOfTalkingTime" value="－"></td>
        <td><div id="scrn_talkingTimeInWaiting"></div></td>
        <td><input type="button" id="btn_incrementOfTalkingTime" value="＋"></td>
    </tr>
</table>
<br/>
<br/>
<input type="button" id="btn_gameStart" value="ゲーム開始"><br/><br/>
<input type="button" id="btn_backInWaiting" value="村を出る"><br/>
</div>


<!-- Action -->
<div id="action">
<div id="scrn_yourPosition"></div>
<br/>
<div id="box_OK"><input type="button" id="btn_OK" value="OK"></div>
<div id="box_selectionInAction"></div>
<br/>
<br/>
<input type="button" id="btn_notification" value="次へ"><br/>
</div>


<!-- Notification -->
<div id="notification">
<div id="scrn_notification"></div>
<br/>
<br/>
<input type="button" id="btn_daytime" value="昼のフェーズへ"><br/>
</div>


<!-- Night -->
<div id="night">
<div id="box_playerListInNight"></div>
<br/>
<br/>
<div id="box_resultOfFortunetellerInNight"></div>
<br/>
<br/>
<div id="box_resultOfThiefInNight"></div>
</div>


<!-- Daytime -->
<div id="daytime">
残り時間<br/>
<div id="scrn_remainingTime"></div>
<div id="box_extension"><input type="button" id="btn_extension" value="延長"></div>
<br/>
<br/>
<table>
    <tr>
        <td>
            プレイヤー
        </td>
        <td>
            観戦者
        </td>
    </tr>
    <tr>
        <td class="border">
            <div id="box_playerListInDaytime"></div>
        </td>
        <td class="border">
            <div id="box_spectatorListInDaytime"></div>
        </td>
    </tr>
</table>
<br/>
<br/>
役職<br/>
<table>
    <tr>
        <td>村人：</td>
        <td><div id="scrn_numberOfVillagerInDaytime"></div></td>
        <td>  人狼：</td>
        <td><div id="scrn_numberOfWerewolfInDaytime"></div></td>
    </tr>
    <tr>
        <td>占い師：</td>
        <td><div id="scrn_numberOfFortunetellerInDaytime"></div></td>
        <td>  怪盗：</td>
        <td><div id="scrn_numberOfThiefInDaytime"></div></td>
    </tr>
    <tr>
        <td>狂人：</td>
        <td><div id="scrn_numberOfMadmanInDaytime"></div></td>
        <td>  てるてる：</td>
        <td><div id="scrn_numberOfHangingInDaytime"></div></td>
    </tr>
</table>
<br/>
<br/>
<input type="button" id="btn_talksEnd" value="話し合い終了"><br/><br/>
<input type="button" id="btn_confirmation" value="役職確認"><br/>
</div>


<!-- Execution -->
<div id="execution">
<div id="scrn_execution"></div>
<br/>
<div id="box_selectionInExecution"></div>
<br/>
<br/>
<input type="button" id="btn_result" value="結果発表へ"><br/>
</div>


<!-- Result -->
<div id="result">
<div class="scrn_villageName"></div>
<br/>
<div id="scrn_winnerOrLoser"></div>
<br/>
<div id="scrn_winnerSide"></div>
<br/>
<div id="box_playerListInResult"></div>
<br/>
<div id="box_resultOfFortunetellerInResult"></div>
<br/>
<div id="box_resultOfThiefInResult"></div>
<br/>
<input type="button" id="btn_nextNight" value="次の夜へ"><br/><br/>
<input type="button" id="btn_exitInResult" value="終了"><br/>
</div>
</body>
</html>
