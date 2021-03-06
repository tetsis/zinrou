var state;
var spectatorFlag;
var selectedVillageId;
var selectedVillagePasswordFlag;
var villageId;
var villageName;
var attribute;
var id;
var position;
var playerArray;
var resultOfFortunetellerArray;
var resultOfThiefArray;
var numberOfPositionArray;
var numberOfLeft;
var talkingTime;
var remaingTime;
var selectionId;
var selectionName;
var selectionPosition;
var buddyNameArray;
var positionArray;
var timer;
var peaceFlag;

playerArray = [];
resultOfFortunetellerArray = [];
resultOfThiefArray = [];
numberOfPositionArray = [];
buddyNameArray = [];
positionArray = [
    'VILLAGER',
    'WEREWOLF',
    'FORTUNETELLER',
    'THIEF',
    'MADMAN',
    'HANGING'
];

//汎用関数
//stateの画面を表示
function displayState(state) {
    console.log('ENTER: displayState, state: ' + state);
    document.getElementById('top').style.display = 'none';
    document.getElementById('making').style.display = 'none';
    document.getElementById('lobby').style.display = 'none';
    document.getElementById('participation').style.display = 'none';
    document.getElementById('waiting').style.display = 'none';
    document.getElementById('action').style.display = 'none';
    document.getElementById('notification').style.display = 'none';
    document.getElementById('night').style.display = 'none';
    document.getElementById('daytime').style.display = 'none';
    document.getElementById('selection').style.display = 'none';
    document.getElementById('execution').style.display = 'none';
    document.getElementById('result').style.display = 'none';
    switch (state) {
        case 'TOP':
            document.getElementById('top').style.display = 'block';
            break;
        case 'MAKING':
            document.getElementById('making').style.display = 'block';
            break;
        case 'LOBBY':
            document.getElementById('lobby').style.display = 'block';
            break;
        case 'PARTICIPATION':
            document.getElementById('participation').style.display = 'block';
            break;
        case 'WAITING':
            document.getElementById('waiting').style.display = 'block';
            break;
        case 'ACTION':
            document.getElementById('action').style.display = 'block';
            break;
        case 'NOTIFICATION':
            document.getElementById('notification').style.display = 'block';
            break;
        case 'NIGHT':
            document.getElementById('night').style.display = 'block';
            break;
        case 'DAYTIME':
            document.getElementById('daytime').style.display = 'block';
            break;
        case 'SELECTION':
            document.getElementById('selection').style.display = 'block';
            break;
        case 'EXECUTION':
            document.getElementById('execution').style.display = 'block';
            break;
        case 'RESULT':
            document.getElementById('result').style.display = 'block';
            break;
    }
    //最上部へスクロール
    window.scrollTo(0, 0);
}

//buttonIdのボタンを選択されたという表示に設定
function selectButton(buttonId) {
    document.getElementById(buttonId).style.background = 'blue';
    document.getElementById(buttonId).style.color = 'white';
}

//buttonIdのボタンを選択されていないという表示に設定
function notSelectButton(buttonId) {
    document.getElementById(buttonId).style.background = '';
    document.getElementById(buttonId).style.color = '';
}

//elementIdの要素を選択されたという表示に設定
function selectedElement(elementId) {
    document.getElementById(elementId).style.background = 'blue';
    document.getElementById(elementId).style.color = 'white';
}

//elementIdの要素を選択されていないという表示に設定
function notSelectedElement(elementId) {
    document.getElementById(elementId).style.background = '';
    document.getElementById(elementId).style.color = '';
}

//タイマーを更新
function updateTimer() {
    console.log('ENTER: updateTimer');
    var screen = document.getElementById('scrn_remainingTime');
    if (remaingTime > 0) {
        remaingTime--;
        var minute = parseInt(remaingTime / 60);
        var second = remaingTime % 60;
        document.getElementById('box_extension').style.display = 'none';
        screen.innerHTML = minute + ' : ' + ('00' + second).slice(-2);
        screen.style.display = 'block';
    }
    else {
        screen.style.display = 'none';
        document.getElementById('box_extension').style.display = 'block';
        clearInterval(timer);
    }
}

//役職IDから役職名（日本語）を取得
function getPositionNameInJapanese(position) {
    var positionString = '';
    switch (position) {
        case 'VILLAGER':
            positionString = '村人';
            break;
        case 'WEREWOLF':
            positionString = '人狼';
            break;
        case 'FORTUNETELLER':
            positionString = '占い師';
            break;
        case 'THIEF':
            positionString = '怪盗';
            break;
        case 'MADMAN':
            positionString = '狂人';
            break;
        case 'HANGING':
            positionString = 'てるてる';
            break;
    }

    return positionString;
}

//役職IDから役職名（英語）を取得
function getPositionNameInEnglish(position) {
    var positionString = '';
    switch (position) {
        case 'VILLAGER':
            positionString = 'Villager';
            break;
        case 'WEREWOLF':
            positionString = 'Werewolf';
            break;
        case 'FORTUNETELLER':
            positionString = 'Fortuneteller';
            break;
        case 'THIEF':
            positionString = 'Thief';
            break;
        case 'MADMAN':
            positionString = 'Madman';
            break;
        case 'HANGING':
            positionString = 'Hanging';
            break;
    }

    return positionString;
}

//プレイヤーIDからプレイヤー名を取得
function getPlayer(id) {
    for (var i = 0; i < playerArray.length; i++) {
        if (playerArray[i].id == id) {
            return playerArray[i];
        }
    }

    return null;
}

//ローカルストレージに保存
function setStorageData(villageId, attribute, id) {
    console.log('ENTER: setStorageData');
    var dataArray = {
        villageId: villageId,
        attribute: attribute,
        id: id
    };
    var data = JSON.stringify(dataArray);
    window.localStorage.setItem("data", data);
}

//サーバにメッセージを送信
function sendMessage(messageArray) {
    var message = JSON.stringify(messageArray);
    websocket.send(message);
    console.log('SEND: ' + message);
}

//占い結果の文字列を取得
function getResultOfFortunetellerString(fortunetellerId, selectionId) {
    var fortunetellerName = getPlayer(fortunetellerId).name;
    var resultString = '';
    if (selectionId == -1) {
        resultString = fortunetellerName + ' は場を占いました';
    }
    else {
        var selectionName = getPlayer(selectionId).name;
        resultString = fortunetellerName + ' は ' + selectionName + ' を占いました';
    }
    return resultString;
}

//交換結果の文字列を取得
function getResultOfThiefString(thiefId, selectionId) {
    var thiefName = getPlayer(thiefId).name;
    var resultString = '';
    if (selectionId == -1) {
        resultString = thiefName + ' は役職を交換しませんでした';
    }
    else {
        var selectionName = getPlayer(selectionId).name;
        resultString = thiefName + ' は ' + selectionName + ' と役職を交換しました';
    }
    return resultString;
}

//結果を設定
function setResult(messageArray) {
    selectionName = messageArray['name'];
    selectionPosition = messageArray['position'];
}

//場の役職を設定
function setResultOfField(messageArray) {
    position1 = messageArray['position1'];
    position2 = messageArray['position2'];
}

//仲間を設定
function setBuddy(messageArray) {
    var name = messageArray['name'];
    buddyNameArray.push(name);
}

//行動結果の通知を取得
function getResultOfAction(position) {
    var resultString = '';
    switch (position) {
        case 'VILLAGER':
            resultString += '仲間の村人と一緒に村を守りましょう';
            break;
        case 'WEREWOLF':
            resultString += '仲間の人狼は';
            if (buddyNameArray.length >= 1) {
                for (var i = 0; i < buddyNameArray.length; i++) {
                    if (i == 0) {
                        resultString += ' ';
                    }
                    else {
                        resultString += ' と ';
                    }
                    resultString += buddyNameArray[i];
                }
                resultString += ' です';
            }
            else {
                resultString += 'いませんでした';
            }
            break;
        case 'FORTUNETELLER':
            if (selectionPosition == -1) {
                var position1String = getPositionNameInJapanese(position1);
                var position2String = getPositionNameInJapanese(position2);
                resultString += '場の役職は ' + position1String + ' と ' + position2String + ' です';
            }
            else {
                var positionString = getPositionNameInJapanese(selectionPosition);
                resultString += selectionName + ' は ' + positionString + ' です';
            }
            break;
        case 'THIEF':
            if (selectionPosition == -1) {
                resultString += '誰とも役職を交換しませんでした';
            }
            else {
                var positionString = getPositionNameInJapanese(selectionPosition);
                resultString += selectionName + ' の ' + positionString + ' と役職を交換しました';
            }
            break;
        case 'MADMAN':
                resultString += '村を混乱に陥れて人狼が有利になるように行動しましょう';
            break;
        case 'HANGING':
                resultString += '村人から吊られるように行動しましょう';
            break;
    }

    return resultString;
}

//ロード時の処理
window.addEventListener('load',
    function (event) {
        console.log('ENTER: addEventListener');
        displayState(-1);
        var hostname = window.location.hostname;
        var wsUri = 'ws://' + hostname + ':9000';
        websocket = new ReconnectingWebSocket(wsUri);
        websocket.maxReconnectInterval = 10000;

        websocket.onopen = function(ev) {};

        //#### Message received from server?
        websocket.onmessage = function(ev) {
            var messageArray = JSON.parse(ev.data); //PHP sends Json data
            console.log('RECEIVE: ' + JSON.stringify(messageArray));
            var type = messageArray['type'];
            if (type == 'system') {
                state = messageArray['state'];
                var message = messageArray['message'];
                switch (state) {
                    case 'CONNECTION':
                        switch (message) {
                            case 'query':
                                queryData();
                                break;
                            case 'delete':
                                deleteData();
                                break;
                        }
                        break;
                    case 'TOP':
                        switch (message) {
                            case 'display':
                                displayTop();
                                break;
                        }
                        break;
                    case 'MAKING':
                        switch (message) {
                            case 'display':
                                displayMaking();
                                break;
                            case 'reject':
                                rejectVillageName();
                                break;
                        }
                        break;
                    case 'LOBBY':
                        switch (message) {
                            case 'display':
                                displayLobby();
                                break;
                            case 'add':
                                addVillage(messageArray);
                                break;
                            case 'notExist':
                                notExistVillage();
                                break;
                            case 'delete':
                                deleteVillage();
                                break;
                            case 'reject':
                                rejectPassword();
                                break;
                        }
                        break;
                    case 'PARTICIPATION':
                        switch (message) {
                            case 'display':
                                displayParticipation(messageArray);
                                break;
                            case 'reject':
                                rejectName();
                                break;
                            case 'exceedNumberOfPlayer':
                                exceedNumberOfPlayer();
                                break;
                            case 'alreadyStarted':
                                alreadyStarted();
                                break;
                        }
                        break;
                    case 'WAITING':
                        switch (message) {
                            case 'init':
                                initInWaiting(messageArray);
                                break;
                            case 'display':
                                displayWaiting();
                                break;
                            case 'displayByCessation':
                                displayByCessation(messageArray);
                                break;
                            case 'add':
                                addParticipant(messageArray);
                                break;
                            case 'del':
                                delParticipant(messageArray);
                                break;
                            case 'setNumberOfPosition':
                                setNumberOfPositionInWaiting(messageArray);
                                break;
                            case 'setTalkingTime':
                                setTalkingTimeInWaiting(messageArray);
                                break;
                            case 'setGameStart':
                                setGameStart(messageArray);
                                break;
                        }
                        break;
                    case 'ACTION':
                        switch (message) {
                            case 'init':
                                initInAction(messageArray);
                                break;
                            case 'display':
                                displayAction();
                                break;
                            case 'setPlayer':
                                setPlayerInAction(messageArray);
                                break;
                        }
                        break;
                    case 'NOTIFICATION':
                        switch (message) {
                            case 'init':
                                initInNotification(messageArray);
                                break;
                            case 'display':
                                displayNotification();
                                break;
                            case 'setResult':
                                setResultInNotification(messageArray);
                                break;
                            case 'setResultOfField':
                                setResultOfFieldInNotification(messageArray);
                                break;
                            case 'setBuddy':
                                setBuddyInNotification(messageArray);
                                break;
                        }
                        break;
                    case 'NIGHT':
                        switch (message) {
                            case 'init':
                                initInNight();
                                break;
                            case 'display':
                                displayNight();
                                break;
                            case 'setPositionOfPlayer':
                                setPositionOfPlayerInNight(messageArray);
                                break;
                            case 'setResultOfFortuneteller':
                                setResultOfFortunetellerInNight(messageArray);
                                break;
                            case 'setResultOfThief':
                                setResultOfThiefInNight(messageArray);
                                break;
                        }
                        break;
                    case 'DAYTIME':
                        switch (message) {
                            case 'init':
                                initInDaytime(messageArray);
                                break;
                            case 'display':
                                displayDaytime();
                                break;
                            case 'setPlayer':
                                setPlayerInDaytime(messageArray);
                                break;
                            case 'setSpectator':
                                setSpectatorInDaytime(messageArray);
                                break;
                            case 'setNumberOfPosition':
                                setNumberOfPositionInDaytime(messageArray);
                                break;
                            case 'setRemainingTime':
                                setRemainingTimeInDaytime(messageArray);
                                break;
                            case 'setTalksEnd':
                                setTalksEnd(messageArray);
                                break;
                            case 'setPositionOfPlayer':
                                setPositionOfPlayerInDaytime(messageArray);
                                break;
                            case 'setResultOfFortuneteller':
                                setResultOfFortunetellerInDaytime(messageArray);
                                break;
                            case 'setResultOfThief':
                                setResultOfThiefInDaytime(messageArray);
                                break;
                            case 'setResult':
                                setResultInDaytime(messageArray);
                                break;
                            case 'setResultOfField':
                                setResultOfFieldInDaytime(messageArray);
                                break;
                            case 'setBuddy':
                                setBuddyInDaytime(messageArray);
                                break;
                        }
                        break;
                    case 'SELECTION':
                        switch (message) {
                            case 'init':
                                initInSelection(messageArray);
                                break;
                            case 'display':
                                displaySelection();
                                break;
                            case 'setPlayer':
                                setPlayerInSelection(messageArray);
                                break;
                        }
                        break;
                    case 'EXECUTION':
                        switch (message) {
                            case 'init':
                                initInExecution(messageArray);
                                break;
                            case 'display':
                                displayExecution();
                                break;
                            case 'setHanging':
                                setHangingInExecution(messageArray);
                                break;
                            case 'setPlayer':
                                setPlayerInExecution(messageArray);
                                break;
                        }
                        break;
                    case 'RESULT':
                        switch (message) {
                            case 'init':
                                initInResult(messageArray);
                                break;
                            case 'display':
                                displayResult();
                                break;
                            case 'setWinnerOrLoser':
                                setWinnerOrLoser(messageArray);
                                break;
                            case 'setResultOfPlayer':
                                setResultOfPlayerInResult(messageArray);
                                break;
                            case 'setResultOfFortuneteller':
                                setResultOfFortunetellerInResult(messageArray);
                                break;
                            case 'setResultOfThief':
                                setResultOfThiefInResult(messageArray);
                                break;
                        }
                        break;
                }
            }
        };

        ////Top////
        document.getElementById('btn_lobby').addEventListener('click', clickLobby, false);
        document.getElementById('btn_making').addEventListener('click', clickMaking, false);

        ////Making////
        document.getElementById('btn_spectatorYes').addEventListener('click', clickSpectatorYes, false);
        document.getElementById('btn_spectatorNo').addEventListener('click', clickSpectatorNo, false);
        document.getElementById('btn_decideInMaking').addEventListener('click', clickDecideInMaking, false);
        document.getElementById('btn_backInMaking').addEventListener('click', clickBackInMaking, false);

        ////Lobby////
        document.getElementById('btn_updateInLobby').addEventListener('click', clickUpdateInLobby, false);
        document.getElementById('btn_decideInLobby').addEventListener('click', clickDecideInLobby, false);
        document.getElementById('btn_backInLobby').addEventListener('click', clickBackInLobby, false);

        ////Participation////
        document.getElementById('btn_participationAsPlayer').addEventListener('click', clickParticipationAsPlayer, false);
        document.getElementById('btn_participationAsSpectator').addEventListener('click', clickParticipationAsSpectator, false);
        document.getElementById('btn_backInParticipation').addEventListener('click', clickBackInParticipation, false);

        ////Waiting////
        document.getElementById('btn_decrementOfNumberOfVillager').addEventListener('click', function(){clickNumberOfPosition(false, 'VILLAGER')}, false);
        document.getElementById('btn_incrementOfNumberOfVillager').addEventListener('click', function(){clickNumberOfPosition(true, 'VILLAGER')}, false);
        document.getElementById('btn_decrementOfNumberOfWerewolf').addEventListener('click', function(){clickNumberOfPosition(false, 'WEREWOLF')}, false);
        document.getElementById('btn_incrementOfNumberOfWerewolf').addEventListener('click', function(){clickNumberOfPosition(true, 'WEREWOLF')}, false);
        document.getElementById('btn_decrementOfNumberOfFortuneteller').addEventListener('click', function(){clickNumberOfPosition(false, 'FORTUNETELLER')}, false);
        document.getElementById('btn_incrementOfNumberOfFortuneteller').addEventListener('click', function(){clickNumberOfPosition(true, 'FORTUNETELLER')}, false);
        document.getElementById('btn_decrementOfNumberOfThief').addEventListener('click', function(){clickNumberOfPosition(false, 'THIEF')}, false);
        document.getElementById('btn_incrementOfNumberOfThief').addEventListener('click', function(){clickNumberOfPosition(true, 'THIEF')}, false);
        document.getElementById('btn_decrementOfNumberOfMadman').addEventListener('click', function(){clickNumberOfPosition(false, 'MADMAN')}, false);
        document.getElementById('btn_incrementOfNumberOfMadman').addEventListener('click', function(){clickNumberOfPosition(true, 'MADMAN')}, false);
        document.getElementById('btn_decrementOfNumberOfHanging').addEventListener('click', function(){clickNumberOfPosition(false, 'HANGING')}, false);
        document.getElementById('btn_incrementOfNumberOfHanging').addEventListener('click', function(){clickNumberOfPosition(true, 'HANGING')}, false);
        document.getElementById('btn_decrementOfTalkingTime').addEventListener('click', function(){clickTalkingTime(false)}, false);
        document.getElementById('btn_incrementOfTalkingTime').addEventListener('click', function(){clickTalkingTime(true)}, false);
        document.getElementById('btn_gameStart').addEventListener('click', clickGameStart, false);
        document.getElementById('btn_backInWaiting').addEventListener('click', clickBackInWaiting, false);

        ////Action////
        document.getElementById('btn_OK').addEventListener('click', clickOK, false);
        document.getElementById('btn_notification').addEventListener('click', clickNotification, false);
        document.getElementById('btn_exitInAction').addEventListener('click', clickExitInAction, false);

        ////Notification////
        document.getElementById('btn_talksStart').addEventListener('click', clickTalksStart, false);
        document.getElementById('btn_exitInNotification').addEventListener('click', clickExitInNotification, false);

        ////Daytime////
        document.getElementById('btn_extension').addEventListener('click', clickExtension, false);
        document.getElementById('btn_talksEnd').addEventListener('click', clickTalksEnd, false);
        document.getElementById('btn_confirmation').addEventListener('click', clickConfirmation, false);
        document.getElementById('btn_exitInDaytime').addEventListener('click', clickExitInDaytime, false);

        ////Selection////
        document.getElementById('btn_execution').addEventListener('click', clickExecution, false);
        document.getElementById('btn_exitInSelection').addEventListener('click', clickExitInSelection, false);

        ////Execution////
        document.getElementById('btn_result').addEventListener('click', clickResult, false);

        //Result////
        document.getElementById('btn_nextNight').addEventListener('click', clickNextNight, false);
        document.getElementById('btn_exitInResult').addEventListener('click', clickExitInResult, false);
    }
, false);



//クリック関数
////Top////
//「村に参加」をクリック
function clickLobby() {
    console.log('ENTER: clickLobby');
    document.getElementById('btn_lobby').disabled = true;
    //サーバに送信
    var messageArray = {
        type: 'system',
        state: 'TOP',
        message: 'lobby'
    };
    sendMessage(messageArray);
}

//「村を作成」をクリック
function clickMaking() {
    console.log('ENTER: clickMaking');
    document.getElementById('btn_making').disabled = true;
    //サーバに送信
    var messageArray = {
        type: 'system',
        state: 'TOP',
        message: 'making'
    };
    sendMessage(messageArray);
}


////Making////
//観戦者ありをクリック
function clickSpectatorYes() {
    console.log('ENTER: clickSpectatorYes');
    selectButton('btn_spectatorYes');
    notSelectButton('btn_spectatorNo');
    spectatorFlag = true;
}

//観戦者なしをクリック
function clickSpectatorNo() {
    console.log('ENTER: clickSpectatorNo');
    selectButton('btn_spectatorNo');
    notSelectButton('btn_spectatorYes');
    spectatorFlag = false;
}

//「決定」をクリック
function clickDecideInMaking() {
    console.log('ENTER: clickDecideInLobby');
    var name = document.getElementById('txt_villageName').value;
    var password = document.getElementById('txt_villagePassword').value;
    if (name == "") {
        alert('名前を入力してください');
    }
    else {
        document.getElementById('btn_decideInMaking').disabled = true;
        if (password !== "") {
            password = MD5_hash(password);
        }
        //サーバに送信
        var messageArray = {
            type: 'system',
            state: 'MAKING',
            message: 'decide',
            name: name,
            password: password,
            spectatorFlag: spectatorFlag
        };
        sendMessage(messageArray);
    }
}

//「戻る」をクリック
function clickBackInMaking() {
    console.log('ENTER: clickBackInMaking');
    document.getElementById('btn_backInMaking').disabled = true;
    //サーバに送信
    var messageArray = {
        type: 'system',
        state: 'MAKING',
        message: 'back'
    };
    sendMessage(messageArray);
}


////Lobby////
//村をクリック
function clickSelectionInLobby(id, flag) {
    console.log('ENTER: clickSelectionInLobby, id: ' + id + ', flag: ' + flag);
    var buttonId;
    if (selectedVillageId != -1) {
        buttonId = 'btn_village' + selectedVillageId;
        notSelectButton(buttonId);
    }
    selectedVillageId = id;
    selectedVillagePasswordFlag = flag;

    buttonId = 'btn_village' + selectedVillageId;
    selectButton(buttonId);
    document.getElementById('btn_decideInLobby').disabled = false;
}

//「更新」をクリック
function clickUpdateInLobby() {
    console.log('ENTER: clickUpdateInLobby');
    document.getElementById('btn_updateInLobby').disabled = true;
    document.getElementById('btn_decideInLobby').disabled = true;
    document.getElementById('box_villageList').textContent = null;
    selectedVillageId = -1;
    //サーバに送信
    var messageArray = {
        type: 'system',
        state: 'LOBBY',
        message: 'update'
    };
    sendMessage(messageArray);
}

//「決定」をクリック
function clickDecideInLobby() {
    console.log('ENTER: clickDecideInLobby');
    if (selectedVillageId == -1) {
        alert('参加する村を選択してください');
    }
    else {
        var password = '';
        if (selectedVillagePasswordFlag == true) {
            password = prompt('パスワードを入力してください');
        }
        if (password != null) {
            //ボタンの設定
            document.getElementById('btn_decideInLobby').disabled = true;
            if (password !== "") {
                password = MD5_hash(password);
            }
            //サーバに送信
            var messageArray = {
                type: 'system',
                state: 'LOBBY',
                message: 'decide',
                villageId: selectedVillageId,
                password: password
            };
            sendMessage(messageArray);
        }
    }
}

//「戻る」をクリック
function clickBackInLobby() {
    console.log('ENTER: clickBackInLobby');
    document.getElementById('btn_backInLobby').disabled = true;
    //サーバに送信
    var messageArray = {
        type: 'system',
        state: 'LOBBY',
        message: 'back'
    };
    sendMessage(messageArray);
}


////Participation////
//「プレイヤー参加」をクリック
function clickParticipationAsPlayer() {
    console.log('ENTER: clickParticipationAsPlayer');
    var name = document.getElementById('txt_participantName').value;
    if (name == "") {
        alert('名前を入力してください');
    }
    else {
        document.getElementById('btn_participationAsPlayer').disabled = true;
        //サーバに送信
        var messageArray = {
            type: 'system',
            state: 'PARTICIPATION',
            message: 'participateAsPlayer',
            villageId: villageId,
            name: name
        };
        sendMessage(messageArray);
    }
}

//「観戦者参加」をクリック
function clickParticipationAsSpectator() {
    console.log('ENTER: clickParticipationAsSpectator');
    var name = document.getElementById('txt_participantName').value;
    if (name == "") {
        alert('名前を入力してください');
    }
    else {
        document.getElementById('btn_participationAsSpectator').disabled = true;
        //サーバに送信
        var messageArray = {
            type: 'system',
            state: 'PARTICIPATION',
            message: 'participateAsSpectator',
            villageId: villageId,
            name: name
        };
        sendMessage(messageArray);
    }
}

//「戻る」をクリック
function clickBackInParticipation() {
    console.log('ENTER: clickBackInParticipation');
    document.getElementById('btn_backInParticipation').disabled = true;
    //サーバに送信
    var messageArray = {
        type: 'system',
        state: 'PARTICIPATION',
        message: 'back',
        villageId: villageId
    };
    sendMessage(messageArray);
}


////Waiting////
//役職の人数をクリック
function clickNumberOfPosition(incrementOrDecrement, position) {
    console.log('ENTER: clickNumberOfPosition, position: ' + position + ', incrementOrDecrement: ' + incrementOrDecrement);
    var buttonId;
    var positionString = getPositionNameInEnglish(position);
    if (incrementOrDecrement == true) {
        buttonId = 'btn_incrementOfNumberOf' + positionString;
        document.getElementById(buttonId).disabled = true;
        numberOfPositionArray[position]++;
    }
    else {
        buttonId = 'btn_decrementOfNumberOf' + positionString;
        document.getElementById(buttonId).disabled = true;
        numberOfPositionArray[position]--;
    }
    //サーバに送信
    var messageArray = {
        type: 'system',
        state: 'WAITING',
        message: 'setNumberOfPosition',
        villageId: villageId,
        position: position,
        number: numberOfPositionArray[position]
    };
    sendMessage(messageArray);
}

//話し合い時間をクリック
function clickTalkingTime(incrementOrDecrement) {
    console.log('ENTER: clickTalkingTime, incrementOrDecrement: ' + incrementOrDecrement);
    if (incrementOrDecrement == true) {
        document.getElementById('btn_incrementOfTalkingTime').disabled = true;
        talkingTime++;
    }
    else {
        document.getElementById('btn_decrementOfTalkingTime').disabled = true;
        talkingTime--;
    }
    //サーバに送信
    var messageArray = {
        type: 'system',
        state: 'WAITING',
        message: 'setTalkingTime',
        villageId: villageId,
        time: talkingTime
    };
    sendMessage(messageArray);
}

//「ゲーム開始」をクリック
function clickGameStart() {
    console.log('ENTER: clickGameStart');
    if (playerArray.length <= 2) {
        alert('ゲームを始めるには3人以上必要です');
    }
    else if (numberOfLeft >= 1) {
        alert('役職人数の配分を行ってください');
    }
    else if (talkingTime == 0) {
        alert('役職人数の配分を行ってください');
    }
    else {
        document.getElementById('btn_gameStart').disabled = true;
        //サーバに送信
        var messageArray = {
            type: 'system',
            state: 'WAITING',
            message: 'gameStart',
            villageId: villageId,
            id: id
        };
        sendMessage(messageArray);
    }
}

//「戻る」をクリック
function clickBackInWaiting() {
    console.log('ENTER: clickBackInWaiting');
    document.getElementById('btn_backInWaiting').disabled = true;
    //サーバに送信
    var messageArray = {
        type: 'system',
        state: 'WAITING',
        message: 'back',
        villageId: villageId,
        attribute: attribute,
        id: id
    };
    sendMessage(messageArray);
}


////Action////
//「OK」をクリック
function clickOK() {
    console.log('ENTER: clickOK');
    document.getElementById('btn_notification').disabled = false;
}

//選択プレイヤーをクリック
function clickSelectionInAction(selectionId) {
    console.log('ENTER: clickSelectionInAction, selectionId: ' + selectionId);
    var buttonId;
    if (this.selectionId != -2) {
        buttonId = 'btn_selectionInAction' + this.selectionId;
        notSelectButton(buttonId);
    }
    this.selectionId = selectionId;
    buttonId = 'btn_selectionInAction' + this.selectionId;
    selectButton(buttonId);
    document.getElementById('btn_notification').disabled = false;
}

//「次へ」をクリック
function clickNotification() {
    console.log('ENTER: clickNotification');
    if (((position == 'FORTUNETELLER') || (position == 'THIEF')) && selectionId == -2) {
        alert('プレイヤーを選択してください');
    }
    else {
        document.getElementById('btn_notification').disabled = true;
        var buttons = document.getElementById('box_selectionInAction').childNodes;
        for (var i = 0; i < buttons.length; i++) {
            buttons[i].disabled = true;
        }
        //サーバに送信
        var messageArray = {
            type: 'system',
            state: 'ACTION',
            message: 'notification',
            villageId: villageId,
            id: id,
            selectionId: selectionId
        };
        sendMessage(messageArray);
    }
}

//「ゲーム終了」をクリック
function clickExitInAction() {
    console.log('ENTER: clickExitInAction');
    var result = confirm('ゲームを終了します\n本当によろしいですか？');
    if (result) {
        document.getElementById('btn_exitInAction').disabled = true;
        //サーバに送信
        var messageArray = {
            type: 'system',
            state: 'ACTION',
            message: 'exit',
            villageId: villageId,
            id: id
        };
        sendMessage(messageArray)
    }
}

////Notification////
//「昼のフェーズへ」をクリック
function clickTalksStart() {
    console.log('ENTER: clickTalksStart');
    document.getElementById('btn_talksStart').disabled = true;
    //サーバに送信
    var messageArray = {
        type: 'system',
        state: 'NOTIFICATION',
        message: 'talksStart',
        villageId: villageId,
        id: id
    };
    sendMessage(messageArray);
}

//「ゲーム終了」をクリック
function clickExitInNotification() {
    console.log('ENTER: clickExitInNotification');
    var result = confirm('ゲームを終了します\n本当によろしいですか？');
    if (result) {
        document.getElementById('btn_exitInNotification').disabled = true;
        //サーバに送信
        var messageArray = {
            type: 'system',
            state: 'NOTIFICATION',
            message: 'exit',
            villageId: villageId,
            id: id
        };
        sendMessage(messageArray)
    }
}


////Daytime////
//「延長」をクリック
function clickExtension() {
    console.log('ENTER: clickExtension');
    document.getElementById('btn_extension').disabled = true;
    //サーバに送信
    var messageArray = {
        type: 'system',
        state: 'DAYTIME',
        message: 'extension',
        villageId: villageId,
        id: id
    };
    sendMessage(messageArray);
}

//「話し合い終了」をクリック
function clickTalksEnd() {
    console.log('ENTER: clickTalksEnd');
    document.getElementById('btn_talksEnd').disabled = true;
    clearInterval(timer);
    //サーバに送信
    var messageArray = {
        type: 'system',
        state: 'DAYTIME',
        message: 'talksEnd',
        villageId: villageId,
        id: id
    };
    sendMessage(messageArray);
}

//「役職確認」をクリック
function clickConfirmation() {
    console.log('ENTER: clickConfirmation');
    var popupString = '役職確認\n';
    switch (attribute) {
        case 'PLAYER':
            popupString += 'あなたは' + getPositionNameInJapanese(position) + 'です\n';
            popupString += getResultOfAction(position);
            break;
        case 'SPECTATOR':
            for (var i = 0; i < playerArray.length; i++) {
                var positionString = getPositionNameInJapanese(playerArray[i].position);
                popupString += playerArray[i].name + 'の役職は' + positionString + 'です\n';
            }
            if (resultOfFortunetellerArray.length > 0) {
                popupString += '\n';
                popupString += '占い結果\n';
                for (var i = 0; i < resultOfFortunetellerArray.length; i++) {
                    popupString += getResultOfFortunetellerString(resultOfFortunetellerArray[i].id, resultOfFortunetellerArray[i].selectionId);
                    popupString += '\n';
                }
            }
            if (resultOfThiefArray.length > 0) {
                popupString += '\n';
                popupString += '交換結果\n';
                for (var i = 0; i < resultOfThiefArray.length; i++) {
                    popupString += getResultOfThiefString(resultOfThiefArray[i].id, resultOfThiefArray[i].selectionId);
                    popupString += '\n';
                }
            }
            break;
    }
    alert(popupString);
}

//「ゲーム終了」をクリック
function clickExitInDaytime() {
    console.log('ENTER: clickExitInDaytime');
    var result = confirm('ゲームを終了します\n本当によろしいですか？');
    if (result) {
        document.getElementById('btn_exitInDaytime').disabled = true;
        //サーバに送信
        var messageArray = {
            type: 'system',
            state: 'DAYTIME',
            message: 'exit',
            villageId: villageId,
            id: id
        };
        sendMessage(messageArray)
    }
}


////Selection////
//吊るプレイヤーをクリック
function clickSelectionInSelection(selectionId) {
    console.log('ENTER: clickSelectionInSelection, selectionId: ' + selectionId);
    var buttonId;
    if (this.selectionId != -2) {
        buttonId = 'btn_selectionInSelection' + this.selectionId;
        notSelectButton(buttonId);
    }
    this.selectionId = selectionId;
    buttonId = 'btn_selectionInSelection' + this.selectionId;
    selectButton(buttonId);
    document.getElementById('btn_execution').disabled = false;
}

//「吊る」ボタンをクリック
function clickExecution() {
    console.log('ENTER: clickExecution');
    if (selectionId == -2) {
        alert('吊るプレイヤーを選択してください');
    }
    else {
        document.getElementById('btn_execution').disabled = true;
        var buttons = document.getElementById('box_selectionInSelection').childNodes;
        for (var i = 0; i < buttons.length; i++) {
            buttons[i].disabled = true;
        }
        //サーバに送信
        var messageArray = {
            type: 'system',
            state: 'SELECTION',
            message: 'execution',
            villageId: villageId,
            id: id,
            hangingId: selectionId
        };
        sendMessage(messageArray);
    }
}

//「ゲーム終了」をクリック
function clickExitInSelection() {
    console.log('ENTER: clickExitInSelection');
    var result = confirm('ゲームを終了します\n本当によろしいですか？');
    if (result) {
        document.getElementById('btn_exitInSelection').disabled = true;
        //サーバに送信
        var messageArray = {
            type: 'system',
            state: 'SELECTION',
            message: 'exit',
            villageId: villageId,
            id: id
        };
        sendMessage(messageArray)
    }
}


////Execution////
//「結果発表へ」をクリック
function clickResult() {
    console.log('ENTER: clickResult');
    document.getElementById('btn_result').disabled = true;
    //サーバに送信
    var messageArray = {
        type: 'system',
        state: 'EXECUTION',
        message: 'result',
        villageId: villageId,
        attribute: attribute,
        id: id
    };
    sendMessage(messageArray);
}


////Result////
//「次の夜へ」をクリック
function clickNextNight() {
    console.log('ENTER: clickNextNight');
    document.getElementById('btn_nextNight').disabled = true;
    //サーバに送信
    var messageArray = {
        type: 'system',
        state: 'RESULT',
        message: 'nextNight',
        villageId: villageId
    };
    sendMessage(messageArray);
}

//「終了」をクリック
function clickExitInResult() {
    console.log('ENTER: clickExitInResult');
    document.getElementById('btn_exitInResult').disabled = true;
    //サーバに送信
    var messageArray = {
        type: 'system',
        state: 'RESULT',
        message: 'exit',
        villageId: villageId
    };
    sendMessage(messageArray);
}



//サーバからの通信関数
////Connection////
//データを要求
function queryData() {
    console.log('ENTER: queryData');
    //ローカルストレージから取得
    var data = window.localStorage.getItem("data");
    if (data != null) {
        var dataArray = JSON.parse(data);
        villageId = dataArray['villageId'];
        attribute = dataArray['attribute'];
        id = dataArray['id'];
        //サーバに送信
        var messageArray = {
            type: 'system',
            state: 'CONNECTION',
            message: 'reply',
            villageId: villageId,
            attribute: attribute,
            id: id
        };
        sendMessage(messageArray);
    }
    else {
        //サーバに送信
        var messageArray = {
            type: 'system',
            state: 'CONNECTION',
            message: 'none'
        };
        sendMessage(messageArray);
    }
}

//データを削除
function deleteData() {
    console.log('ENTER: deleteData');
    //ローカルストレージから削除
    var data = window.localStorage.getItem("data");
    if (data != null) {
        window.localStorage.removeItem("data");
    }
}

////Top////
//トップ画面を表示
function displayTop() {
    console.log('ENTER: displayTop');
    document.getElementById('btn_lobby').disabled = false;
    document.getElementById('btn_making').disabled = false;
    displayState('TOP');
}


////Making////
//村作成画面を表示
function displayMaking() {
    console.log('ENTER: displayMaking');
    spectatorFlag = true;
    selectButton('btn_spectatorYes');
    notSelectButton('btn_spectatorNo');
    document.getElementById('btn_decideInMaking').disabled = false;
    document.getElementById('btn_backInMaking').disabled = false;
    displayState('MAKING');
}

//村名重複により拒否
function rejectVillageName() {
    console.log('ENTER: rejectVillageName');
    alert('同じ名前の村が既に存在しています\n別の名前で作り直してください');
    document.getElementById('txt_villageName').value = '';
    document.getElementById('btn_decideInMaking').disabled = false;
}


////Lobby////
//村一覧画面を表示
function displayLobby() {
    console.log('ENTER: displayLobby');
    selectedVillageId = -1;
    document.getElementById('box_villageList').textContent = null;
    document.getElementById('btn_updateInLobby').disabled = false;
    document.getElementById('btn_decideInLobby').disabled = true;
    document.getElementById('btn_backInLobby').disabled = false;
    displayState('LOBBY');
}

//村を追加
function addVillage(messageArray) {
    console.log('ENTER: addVillage, messageArray: ' + JSON.stringify(messageArray));
    villageId = messageArray['villageId'];
    villageName = messageArray['villageName'];
    var passwordFlag = messageArray['passwordFlag'];
    var box = document.getElementById('box_villageList');
    var element = document.createElement('button');
    element.id = 'btn_village' + villageId;
    element.className = 'btn btn-raised btn-default btn_selection';
    element.type = 'button';
    element.innerHTML = villageName;
    var id = villageId;
    element.addEventListener('click', function(){clickSelectionInLobby(id, passwordFlag)}, false);
    box.appendChild(element);
    document.getElementById('btn_updateInLobby').disabled = false;
}

//参加できる村がない
function notExistVillage() {
    console.log('ENTER: notExistVillage');
    document.getElementById('btn_updateInLobby').disabled = false;
}

//村が既に削除されていることにより拒否
function deleteVillage() {
    console.log('ENTER: deleteVillage');
    alert('選択した村は既に廃村になっています');
    document.getElementById('btn_decideInLobby').disabled = false;
}

//パスワードが違うことにより拒否
function rejectPassword() {
    console.log('ENTER: rejectPassword');
    alert('パスワードが間違っています');
    document.getElementById('btn_decideInLobby').disabled = false;
}


////Participation////
//村参加画面を表示
function displayParticipation(messageArray) {
    console.log('ENTER: displayParticipation, messageArray: ' + JSON.stringify(messageArray));
    villageId = messageArray['villageId'];
    villageName = messageArray['villageName'];
    spectatorFlag = messageArray['spectatorFlag'];
    document.getElementById('scrn_villageNameInParticipation').innerHTML = villageName + ' 村';
    if (spectatorFlag == true) {
        document.getElementById('btn_participationAsSpectator').disabled = false;
    }
    else {
        document.getElementById('btn_participationAsSpectator').disabled = true;
    }
    document.getElementById('btn_participationAsPlayer').disabled = false;
    document.getElementById('btn_backInParticipation').disabled = false;
    displayState('PARTICIPATION');
}

//参加者名重複により拒否
function rejectName() {
    console.log('ENTER: rejectName');
    alert('同じ名前の参加者がいます\n違う名前で参加してください');
    if (spectatorFlag == true) {
        document.getElementById('btn_participationAsSpectator').disabled = false;
    }
    else {
        document.getElementById('btn_participationAsSpectator').disabled = true;
    }
    document.getElementById('btn_participationAsPlayer').disabled = false;
}

//プレイヤー人数超過により拒否
function exceedNumberOfPlayer() {
    console.log('ENTER: exceedNumberOfPlayer');
    alert('この村のプレイヤーが制限人数の7人に達しています\n村をもう1つ作って遊ぶことをおすすめします');
    displayTop();
}

//ゲームが既に開始していることにより拒否
function alreadyStarted() {
    console.log('ENTER: alreadyStarted');
    alert('既にゲームが開始しています');
    displayTop();
}


////Waiting////
//初期化
function initInWaiting(messageArray) {
    console.log('ENTER: initInWaiting, messageArray: ' + JSON.stringify(messageArray));
    playerArray = [];
    numberOfPositionArray = [];
    numberOfLeft = 0;
    talkingTime = 0;
    villageId = messageArray['villageId'];
    villageName = messageArray['villageName'];
    attribute = messageArray['attribute'];
    id = messageArray['id'];
    document.getElementById('scrn_villageNameInWaiting').innerHTML = villageName + ' 村';
    document.getElementById('tbody_playerListInWaiting').textContent = null;
    document.getElementById('tbody_spectatorListInWaiting').textContent = null;
    switch (attribute) {
        case 'PLAYER':
            document.getElementById('btn_gameStart').disabled = false;
            break;
        case 'SPECTATOR':
            document.getElementById('btn_gameStart').disabled = true;
            document.getElementById('btn_decrementOfNumberOfVillager').disabled = true;
            document.getElementById('btn_incrementOfNumberOfVillager').disabled = true;
            document.getElementById('btn_decrementOfNumberOfWerewolf').disabled = true;
            document.getElementById('btn_incrementOfNumberOfWerewolf').disabled = true;
            document.getElementById('btn_decrementOfNumberOfFortuneteller').disabled = true;
            document.getElementById('btn_incrementOfNumberOfFortuneteller').disabled = true;
            document.getElementById('btn_decrementOfNumberOfThief').disabled = true;
            document.getElementById('btn_incrementOfNumberOfThief').disabled = true;
            document.getElementById('btn_decrementOfNumberOfMadman').disabled = true;
            document.getElementById('btn_incrementOfNumberOfMadman').disabled = true;
            document.getElementById('btn_decrementOfNumberOfHanging').disabled = true;
            document.getElementById('btn_incrementOfNumberOfHanging').disabled = true;
            document.getElementById('btn_decrementOfTalkingTime').disabled = true;
            document.getElementById('btn_incrementOfTalkingTime').disabled = true;
            break;
    }
    document.getElementById('btn_backInWaiting').disabled = false;
    //ローカルストレージに保存
    setStorageData(villageId, attribute, id);
}

//待機画面を表示
function displayWaiting() {
    console.log('ENTER: displayWaiting');
    displayState('WAITING');
}

//ゲーム途中終了による待機画面を表示
function displayByCessation(messageArray) {
    console.log('ENTER: displayByCessation, messageArray: ' + JSON.stringify(messageArray));
    var name = messageArray['name'];
    if (timer != null) {
        clearInterval(timer);
    }
    alert(name + 'によりゲームを終了しました');
}

//参加者を追加
function addParticipant(messageArray) {
    console.log('ENTER: addParticipant, messageArray: ' + JSON.stringify(messageArray));
    var tbody = null;
    var tr;
    var td;
    var attribute = messageArray['attribute'];
    var id = messageArray['id'];
    var name = messageArray['name'];
    switch (attribute) {
        case 'PLAYER':
            var player = {id: id, name: name};
            playerArray.push(player);
            tbody = document.getElementById('tbody_playerListInWaiting');
            tr = document.createElement('tr');
            td = document.createElement('td');
            tr.id = 'tr_playerListInWaiting' + id;
            td.innerHTML = name;
            tr.appendChild(td);
            tbody.appendChild(tr);
            updateNumberOfPosition();
            break;
        case 'SPECTATOR':
            tbody = document.getElementById('tbody_spectatorListInWaiting');
            tr = document.createElement('tr');
            td = document.createElement('td');
            tr.id = 'tr_spectatorListInWaiting' + id;
            td.innerHTML = name;
            tr.appendChild(td);
            tbody.appendChild(tr);
            break;
    }
}

//参加者を削除
function delParticipant(messageArray) {
    console.log('ENTER: delParticipant, messageArray: ' + JSON.stringify(messageArray));
    var tbody;
    var tr;
    var attribute = messageArray['attribute'];
    var id = messageArray['id'];
    switch (attribute) {
        case 'PLAYER':
            var number = -1;
            for (var i = 0; i < playerArray.length; i++) {
                if (playerArray[i].id == id) {
                    number = i;
                    break;
                }
            }
            if (number != -1) {
                playerArray.splice(number, 1);
                tbody = document.getElementById('tbody_playerListInWaiting');
                tr = document.getElementById('tr_playerListInWaiting' + id);
                if (tr != null) {
                    tbody.removeChild(tr);
                }
                updateNumberOfPosition();
            }
            break;
        case 'SPECTATOR':
                tbody = document.getElementById('tbody_spectatorListInWaiting');
                tr = document.getElementById('tr_spectatorListInWaiting' + id);
                if (tr != null) {
                    tbody.removeChild(tr);
                }
            break;
    }
}

//役職の人数を設定
function setNumberOfPositionInWaiting(messageArray) {
    console.log('ENTER: setNumberOfPositionInWaiting, messageArray: ' + JSON.stringify(messageArray));
    var divId;
    var buttonId;
    var position = messageArray['position'];
    var number = messageArray['number'];
    numberOfPositionArray[position] = number;
    var positionString = getPositionNameInEnglish(position);
    divId = 'scrn_numberOf' + positionString + 'InWaiting';
    document.getElementById(divId).innerHTML = number + '人';
    updateNumberOfPosition();
}

//話し合い時間を設定
function setTalkingTimeInWaiting(messageArray) {
    console.log('ENTER: setTalkingTimeInWaiting, messageArray: ' + JSON.stringify(messageArray));
    var time = messageArray['time'];
    talkingTime = time;
    document.getElementById('scrn_talkingTimeInWaiting').innerHTML = time + ' 分';
    if (attribute == 'PLAYER') {
        document.getElementById('btn_incrementOfTalkingTime').disabled = false;
        if (time <= 1) {
            document.getElementById('btn_decrementOfTalkingTime').disabled = true;
        }
        else {
            document.getElementById('btn_decrementOfTalkingTime').disabled = false;
        }
    }
}

//「ゲーム開始」をクリックしたプレイヤーがいた
function setGameStart(messageArray) {
    console.log('ENTER: setGameStart, messageArray: ' + JSON.stringify(messageArray));
    var id = messageArray['id'];
    var elementId = 'tr_playerListInWaiting' + id;
    selectedElement(elementId);
}

//役職の人数を更新
function updateNumberOfPosition() {
    var sum = 0;
    for (var i = 0; i < positionArray.length; i++) {
        sum += numberOfPositionArray[positionArray[i]];
    }
    numberOfLeft = playerArray.length + 2 - sum;
    document.getElementById('scrn_left').innerHTML = numberOfLeft + '人';
    if (attribute == 'PLAYER') {
        if (numberOfLeft <= 0) {
            document.getElementById('btn_incrementOfNumberOfVillager').disabled = true;
            document.getElementById('btn_incrementOfNumberOfWerewolf').disabled = true;
            document.getElementById('btn_incrementOfNumberOfFortuneteller').disabled = true;
            document.getElementById('btn_incrementOfNumberOfThief').disabled = true;
            document.getElementById('btn_incrementOfNumberOfMadman').disabled = true;
            document.getElementById('btn_incrementOfNumberOfHanging').disabled = true;
        }
        else {
            document.getElementById('btn_incrementOfNumberOfVillager').disabled = false;
            document.getElementById('btn_incrementOfNumberOfWerewolf').disabled = false;
            document.getElementById('btn_incrementOfNumberOfFortuneteller').disabled = false;
            if (numberOfPositionArray['THIEF'] >= 1) {
                document.getElementById('btn_incrementOfNumberOfThief').disabled = true;
            }
            else {
                document.getElementById('btn_incrementOfNumberOfThief').disabled = false;
            }
            document.getElementById('btn_incrementOfNumberOfMadman').disabled = false;
            if (numberOfPositionArray['HANGING'] >= 1) {
                document.getElementById('btn_incrementOfNumberOfHanging').disabled = true;
            }
            else {
                document.getElementById('btn_incrementOfNumberOfHanging').disabled = false;
            }
        }
        for (var i = 0; i < positionArray.length; i++) {
            positionString = getPositionNameInEnglish(positionArray[i]);
            buttonId = 'btn_decrementOfNumberOf' + positionString;
            if (numberOfPositionArray[positionArray[i]] <= 0) {
                document.getElementById(buttonId).disabled = true;
            }
            else {
                document.getElementById(buttonId).disabled = false;
            }
        }
    }
}


////Action////
//初期化
function initInAction(messageArray) {
    console.log('ENTER: initInAction, messageArray: ' + JSON.stringify(messageArray));
    selectionId = -2;
    document.getElementById('btn_OK').disabled = false;
    document.getElementById('box_selectionInAction').textContent = null;
    villageId = messageArray['villageId'];
    id = messageArray['id'];
    position = messageArray['position'];
    var positionString = 'あなたは' + getPositionNameInJapanese(position) + 'です';
    switch (position) {
        case 'VILLAGER':
            document.getElementById('scrn_yourPosition').innerHTML = positionString;
            document.getElementById('box_OK').style.display = 'block';
            document.getElementById('box_selectionInAction').style.display = 'none';
            break;
        case 'WEREWOLF':
            document.getElementById('scrn_yourPosition').innerHTML = positionString;
            document.getElementById('box_OK').style.display = 'block';
            document.getElementById('box_selectionInAction').style.display = 'none';
            break;
        case 'FORTUNETELLER':
            document.getElementById('scrn_yourPosition').innerHTML = positionString + '<br/>占うプレイヤーを選んでください';
            document.getElementById('box_OK').style.display = 'none';
            document.getElementById('box_selectionInAction').style.display = 'block';
            break;
        case 'THIEF':
            document.getElementById('scrn_yourPosition').innerHTML = positionString + '<br/>役職を交換するプレイヤーを選んでください';
            document.getElementById('box_OK').style.display = 'none';
            document.getElementById('box_selectionInAction').style.display = 'block';
            break;
        case 'MADMAN':
            document.getElementById('scrn_yourPosition').innerHTML = positionString;
            document.getElementById('box_OK').style.display = 'block';
            document.getElementById('box_selectionInAction').style.display = 'none';
            break;
        case 'HANGING':
            document.getElementById('scrn_yourPosition').innerHTML = positionString;
            document.getElementById('box_OK').style.display = 'block';
            document.getElementById('box_selectionInAction').style.display = 'none';
            break;
    }
    document.getElementById('btn_notification').disabled = true;
    document.getElementById('btn_exitInAction').disabled = false;
    //ローカルストレージに保存
    setStorageData(villageId, attribute, id);
}

//行動画面を表示
function displayAction() {
    console.log('ENTER: displayAction');
    //占い師と怪盗は選択ボタンの最後にボタンを追加
    if (((position == 'FORTUNETELLER') || (position == 'THIEF'))) {
        var box = document.getElementById('box_selectionInAction');
        var element = document.createElement('button');
        var id = -1
        element.id = 'btn_selectionInAction' + id;
        element.className = 'btn btn-raised btn-default btn_selection';
        element.type = 'button';
        switch (position) {
            case 'FORTUNETELLER':
                element.innerHTML = '場を占う';
                break;
            case 'THIEF':
                element.innerHTML = '交換しない';
                break;
        }
        element.addEventListener('click', function(){clickSelectionInAction(id)}, false);
        box.appendChild(element);
    }
    displayState('ACTION');
}

//選択するプレイヤーを追加
function setPlayerInAction(messageArray) {
    console.log('ENTER: setPlayerInAction, messageArray: ' + JSON.stringify(messageArray));
    var id = messageArray['id'];
    var name = messageArray['name'];
    var box = document.getElementById('box_selectionInAction');
    var element = document.createElement('button');
    element.id = 'btn_selectionInAction' + id;
    element.className = 'btn btn-raised btn-default btn_selection';
    element.type = 'button';
    element.innerHTML = name;
    element.addEventListener('click', function(){clickSelectionInAction(id)}, false);
    box.appendChild(element);
}


////Notification////
//初期化
function initInNotification(messageArray) {
    console.log('ENTER: initInNotification, messageArray: ' + JSON.stringify(messageArray));
    buddyNameArray = [];
    selectionName = '';
    selectionPosition = -1;
    position1 = -1;
    position2 = -1;
    villageId = messageArray['villageId'];
    id = messageArray['id'];
    position = messageArray['position'];
    document.getElementById('btn_talksStart').disabled = false;
    document.getElementById('btn_exitInNotification').disabled = false;
}

//通知画面を表示
function displayNotification() {
    console.log('ENTER: displayNotification');
    var resultString = getResultOfAction(position);
    document.getElementById('scrn_notification').innerHTML = resultString;
    displayState('NOTIFICATION');
}

//結果を設定
function setResultInNotification(messageArray) {
    console.log('ENTER: setResultInNotification, messageArray: ' + JSON.stringify(messageArray));
    setResult(messageArray);
}

//場の役職を設定
function setResultOfFieldInNotification(messageArray) {
    console.log('ENTER: setResultOfFieldInNotification, messageArray: ' + JSON.stringify(messageArray));
    setResultOfField(messageArray);
}

//仲間を設定
function setBuddyInNotification(messageArray) {
    console.log('ENTER: setBuddyInNotification, messageArray: ' + JSON.stringify(messageArray));
    setBuddy(messageArray);
}


////Night////
//初期化
function initInNight() {
    console.log('ENTER: initInNight');
    playerArray = [];
    document.getElementById('tbody_playerListInNight').textContent = null;
    document.getElementById('tbody_resultOfFortunetellerInNight').textContent = null;
    document.getElementById('tbody_resultOfThiefInNight').textContent = null;
    //ローカルストレージに保存
    setStorageData(villageId, attribute, id);
}

//夜の画面を表示
function displayNight() {
    console.log('ENTER: displayNight');
    displayState('NIGHT');
}

//プレイヤーの役職を設定
function setPositionOfPlayerInNight(messageArray) {
    console.log('ENTER: setPositionOfPlayerInNight, messageArray: ' + JSON.stringify(messageArray));
    var id = messageArray['id'];
    var name = messageArray['name'];
    var position = messageArray['position'];
    var player = {id: id, name: name, position: position};
    playerArray.push(player);
    var positionString = getPositionNameInJapanese(position);

    var tbody = document.getElementById('tbody_playerListInNight');
    var tr = document.createElement('tr');
    var td = document.createElement('td');
    td.innerHTML = name;
    tr.appendChild(td);

    td = document.createElement('td');
    td.innerHTML = positionString;
    tr.appendChild(td);
    tbody.appendChild(tr);
}

//占い結果を設定
function setResultOfFortunetellerInNight(messageArray) {
    console.log('ENTER: setResultOfFortunetellerInNight, messageArray: ' + JSON.stringify(messageArray));
    var id = messageArray['id'];
    var selectionId = messageArray['selectionId'];
    var tbody = document.getElementById('tbody_resultOfFortunetellerInNight');
    var tr = document.createElement('tr');
    var td = document.createElement('td');
    tr.id = 'tr_resultOfFortunetellerInNight' + id;
    td.innerHTML = getResultOfFortunetellerString(id, selectionId);
    tr.appendChild(td);
    tbody.appendChild(tr);
}

//交換結果を設定
function setResultOfThiefInNight(messageArray) {
    console.log('ENTER: setResultOfThiefInNight, messageArray: ' + JSON.stringify(messageArray));
    var id = messageArray['id'];
    var selectionId = messageArray['selectionId'];
    var tbody = document.getElementById('tbody_resultOfThiefInNight');
    var tr = document.createElement('tr');
    var td = document.createElement('td');
    tr.id = 'tr_resultOfThiefInNight' + id;
    td.innerHTML = getResultOfThiefString(id, selectionId);
    tr.appendChild(td);
    tbody.appendChild(tr);
}


////Daytime////
//初期化
function initInDaytime(messageArray) {
    console.log('ENTER: initInDaytime, messageArray: ' + JSON.stringify(messageArray));
    buddyNameArray = [];
    selectionName = '';
    selectionPosition = -1;
    position1 = -1;
    position2 = -1;
    playerArray = [];
    numberOfPositionArray = [];
    talkingTime = 3;
    resultOfFortunetellerArray = [];
    resultOfThiefArray = [];
    document.getElementById('scrn_remainingTime').style.display = 'none';
    document.getElementById('box_extension').style.display = 'none';
    document.getElementById('btn_extension').disabled = false;
    document.getElementById('btn_confirmation').disabled = false;
    document.getElementById('tbody_playerListInDaytime').textContent = null;
    document.getElementById('tbody_spectatorListInDaytime').textContent = null;
    villageId = messageArray['villageId'];
    attribute = messageArray['attribute'];
    id = messageArray['id'];
    switch (attribute) {
        case 'PLAYER':
            position = messageArray['position'];
            document.getElementById('btn_talksEnd').disabled = false;
            document.getElementById('btn_exitInDaytime').disabled = false;
            break;
        case 'SPECTATOR':
            document.getElementById('btn_talksEnd').disabled = true;
            document.getElementById('btn_exitInDaytime').disabled = true;
            break;
    }
}

//昼の画面を表示
function displayDaytime() {
    console.log('ENTER: displayDaytime');
    displayState('DAYTIME');
}

//プレイヤーを設定
function setPlayerInDaytime(messageArray) {
    console.log('ENTER: setPlayerInDaytime, messageArray: ' + JSON.stringify(messageArray));
    var id = messageArray['id'];
    var name = messageArray['name'];
    var player = {id: id, name: name, position: -1};
    playerArray.push(player);
    var tbody = document.getElementById('tbody_playerListInDaytime');
    var tr = document.createElement('tr');
    var td = document.createElement('td');
    tr.id = 'tr_playerListInDaytime' + id;
    td.innerHTML = name;
    tr.appendChild(td);
    tbody.appendChild(tr);
}

//観戦者を設定
function setSpectatorInDaytime(messageArray) {
    console.log('ENTER: setSpectatorInDaytime, messageArray: ' + JSON.stringify(messageArray));
    var id = messageArray['id'];
    var name = messageArray['name'];
    var tbody = document.getElementById('tbody_spectatorListInDaytime');
    var tr = document.createElement('tr');
    var td = document.createElement('td');
    tr.id = 'tr_spectatorListInDaytime' + id;
    td.innerHTML = name;
    tr.appendChild(td);
    tbody.appendChild(tr);
}

//役職の人数を設定
function setNumberOfPositionInDaytime(messageArray) {
    console.log('ENTER: setNumberOfPositionInDaytime, messageArray: ' + JSON.stringify(messageArray));
    var position = messageArray['position'];
    var number = messageArray['number'];
    numberOfPositionArray[position] = number;
    var positionString = getPositionNameInEnglish(position);
    var elementId = 'scrn_numberOf' + positionString + 'InDaytime';
    document.getElementById(elementId).innerHTML = number + '人';
}

//話し合い時間を設定
function setRemainingTimeInDaytime(messageArray) {
    console.log('ENTER: setRemainingTimeInDaytime, messageArray: ' + JSON.stringify(messageArray));
    var time = messageArray['time'];
    remaingTime = time;
    timer = setInterval(updateTimer, 1000);
}

//「話し合い終了」をクリックしたプレイヤーがいた
function setTalksEnd(messageArray) {
    console.log('ENTER: setTalksEnd, messageArray: ' + JSON.stringify(messageArray));
    var id = messageArray['id'];
    var elementId = 'tr_playerListInDaytime' + id;
    selectedElement(elementId);
}

//プレイヤーの役職を設定
function setPositionOfPlayerInDaytime(messageArray) {
    console.log('ENTER: setPositionOfPlayerInDaytime, messageArray: ' + JSON.stringify(messageArray));
    var id = messageArray['id'];
    var position = messageArray['position'];
    for (var i = 0; i < playerArray.length; i++) {
        if (playerArray[i].id == id) {
            playerArray[i].position = position;
            break;
        }
    }
}

//占い結果を設定
function setResultOfFortunetellerInDaytime(messageArray) {
    console.log('ENTER: setResultOfFortunetellerInDaytime, messageArray: ' + JSON.stringify(messageArray));
    var id = messageArray['id'];
    var selectionId = messageArray['selectionId'];
    var array = {id: id, selectionId: selectionId};
    resultOfFortunetellerArray.push(array);
}

//交換結果を設定
function setResultOfThiefInDaytime(messageArray) {
    console.log('ENTER: setResultOfThiefInDaytime, messageArray: ' + JSON.stringify(messageArray));
    var id = messageArray['id'];
    var selectionId = messageArray['selectionId'];
    var array = {id: id, selectionId: selectionId};
    resultOfThiefArray.push(array);
}

//結果を設定
function setResultInDaytime(messageArray) {
    console.log('ENTER: setResultInDaytime, messageArray: ' + JSON.stringify(messageArray));
    setResult(messageArray);
}

//場の役職を設定
function setResultOfFieldInDaytime(messageArray) {
    console.log('ENTER: setResultOfFieldInDaytime, messageArray: ' + JSON.stringify(messageArray));
    setResultOfField(messageArray);
}

//仲間を設定
function setBuddyInDaytime(messageArray) {
    console.log('ENTER: setBuddyInDaytime, messageArray: ' + JSON.stringify(messageArray));
    setBuddy(messageArray);
}


////Selection////
//初期化
function initInSelection(messageArray) {
    console.log('ENTER: initInSelection, messageArray: ' + JSON.stringify(messageArray));
    selectionId = -2;
    document.getElementById('box_selectionInSelection').textContent = null;
    villageId = messageArray['villageId'];
    attribute = messageArray['attribute'];
    id = messageArray['id'];
    switch (attribute) {
        case 'PLAYER':
            document.getElementById('scrn_selection').innerHTML = '吊る人を選択してください';
            document.getElementById('btn_execution').disabled = false;
            document.getElementById('btn_exitInSelection').disabled = false;
            break;
        case 'SPECTATOR':
            document.getElementById('scrn_selection').innerHTML = 'プレイヤーが吊る人を選択しています';
            document.getElementById('btn_execution').disabled = true;
            document.getElementById('btn_exitInSelection').disabled = true;
            break;
    }
}

//吊る人選択画面を表示
function displaySelection() {
    console.log('ENTER: displaySelection');
    displayState('SELECTION');
}

//選択するプレイヤーを設定
function setPlayerInSelection(messageArray) {
    console.log('ENTER: setPlayerInSelection, messageArray: ' + JSON.stringify(messageArray));
    var id = messageArray['id'];
    var name = messageArray['name'];
    var box = document.getElementById('box_selectionInSelection');
    var element = document.createElement('button');
    element.id = 'btn_selectionInSelection' + id;
    element.className = 'btn btn-raised btn-default btn_selection';
    element.type = 'button';
    element.innerHTML = name;
    element.addEventListener('click', function(){clickSelectionInSelection(id)}, false);
    box.appendChild(element);
}


////Execution////
//初期化
function initInExecution(messageArray) {
    console.log('ENTER: initInExecution, messageArray: ' + JSON.stringify(messageArray));
    playerArray = [];
    document.getElementById('tbody_execution').textContent = null;
    document.getElementById('tbody_playerListInExecution').textContent = null;
    villageId = messageArray['villageId'];
    attribute = messageArray['attribute'];
    id = messageArray['id'];
    peaceFlag = true;
    document.getElementById('btn_result').disabled = false;
}

//処刑画面を表示
function displayExecution() {
    console.log('ENTER: displayExecution');
    if (peaceFlag == true) {
        document.getElementById('th_execution').innerHTML = '平和村';
    }
    else {
        document.getElementById('th_execution').innerHTML = '吊られた人';
    }
    for (var i = 0; i < playerArray.length; i++) {
        var hangingName = getPlayer(playerArray[i].hangingId).name;
        var tbody = document.getElementById('tbody_playerListInExecution');
        var tr = document.createElement('tr');
        var td = document.createElement('td');
        td.innerHTML = playerArray[i].name;
        tr.appendChild(td);

        td = document.createElement('td');
        td.innerHTML = hangingName;
        tr.appendChild(td);
        tbody.appendChild(tr);
    }
    displayState('EXECUTION');
}

//処刑されたプレイヤーを設定
function setHangingInExecution(messageArray) {
    console.log('ENTER: setHangingInExecution, messageArray: ' + JSON.stringify(messageArray));
    var id = messageArray['id'];
    var name = messageArray['name'];
    var tbody = document.getElementById('tbody_execution');
    var tr = document.createElement('tr');
    var td = document.createElement('td');
    tr.id = 'tr_execution' + id;
    td.innerHTML = name;
    tr.appendChild(td);
    tbody.appendChild(tr);
    peaceFlag = false;
}

//プレイヤーの設定
function setPlayerInExecution(messageArray) {
    var id = messageArray['id'];
    var name = messageArray['name'];
    var hangingId = messageArray['hangingId'];
    var array = {id: id, name: name, hangingId: hangingId};
    playerArray.push(array);
}


////Result////
//初期化
function initInResult(messageArray) {
    console.log('ENTER: initInResult, messageArray: ' + JSON.stringify(messageArray));
    playerArray = [];
    resultOfFortunetellerArray = [];
    resultOfThiefArray = [];
    document.getElementById('tbody_villagerListInResult').textContent = null;
    document.getElementById('tbody_fortunetellerListInResult').textContent = null;
    document.getElementById('tbody_theifListInResult').textContent = null;
    document.getElementById('tbody_werewolfListInResult').textContent = null;
    document.getElementById('tbody_madmanListInResult').textContent = null;
    document.getElementById('tbody_hangingListInResult').textContent = null;
    document.getElementById('tbody_pointList').textContent = null;
    villageId = messageArray['villageId'];
    attribute = messageArray['attribute'];
    id = messageArray['id'];
    side = messageArray['side'];
    var sideString = '';
    switch (side) {
        case 'VILLAGER':
            sideString = '勝者は村人サイドです';
            break;
        case 'WEREWOLF':
            sideString = '勝者は人狼サイドです';
            break;
        case 'HANGING':
            sideString = '勝者はてるてるサイドです';
            break;
        case 'PEACE':
            sideString = '平和村です';
            break;
    }
    document.getElementById('scrn_winnerSide').innerHTML = sideString;
    document.getElementById('box_villagerSide').style.display = 'none';
    document.getElementById('box_werewolfSide').style.display = 'none';
    document.getElementById('box_hangingSide').style.display = 'none';
    document.getElementById('box_villager').style.display = 'none';
    document.getElementById('box_werewolf').style.display = 'none';
    document.getElementById('box_fortuneteller').style.display = 'none';
    document.getElementById('box_thief').style.display = 'none';
    document.getElementById('box_madman').style.display = 'none';
    switch (attribute) {
        case 'PLAYER':
            document.getElementById('btn_nextNight').disabled = false;
            document.getElementById('scrn_winnerOrLoser').style.display = 'block';
            break;
        case 'SPECTATOR':
            document.getElementById('btn_nextNight').disabled = true;
            document.getElementById('scrn_winnerOrLoser').style.display = 'none';
            break;
    }
    document.getElementById('btn_exitInResult').disabled = false;
}

//結果発表画面を表示
function displayResult() {
    console.log('ENTER: displayResult');
    for (var i = 0; i < playerArray.length; i++) {
        var hangingName = getPlayer(playerArray[i].hangingId).name;
        var tbody;
        var tr;
        var td;
        switch (playerArray[i].position) {
            case "VILLAGER":
                tbody = document.getElementById('tbody_villagerListInResult');
                document.getElementById('box_villagerSide').style.display = 'block';
                document.getElementById('box_villager').style.display = 'block';
                break;
            case "WEREWOLF":
                tbody = document.getElementById('tbody_werewolfListInResult');
                document.getElementById('box_werewolfSide').style.display = 'block';
                document.getElementById('box_werewolf').style.display = 'block';
                break;
            case "FORTUNETELLER":
                tbody = document.getElementById('tbody_fortunetellerListInResult');
                document.getElementById('box_villagerSide').style.display = 'block';
                document.getElementById('box_fortuneteller').style.display = 'block';
                break;
            case "THIEF":
                tbody = document.getElementById('tbody_theifListInResult');
                document.getElementById('box_villagerSide').style.display = 'block';
                document.getElementById('box_thief').style.display = 'block';
                break;
            case "MADMAN":
                tbody = document.getElementById('tbody_madmanListInResult');
                document.getElementById('box_werewolfSide').style.display = 'block';
                document.getElementById('box_madman').style.display = 'block';
                break;
            case "HANGING":
                tbody = document.getElementById('tbody_hangingListInResult');
                document.getElementById('box_hangingSide').style.display = 'block';
                break;
        }
        tr = document.createElement('tr');
        td = document.createElement('td');
        td.innerHTML = playerArray[i].name;
        tr.appendChild(td);
        td = document.createElement('td');
        td.innerHTML = hangingName;
        tr.appendChild(td);
        tbody.appendChild(tr);

        switch (playerArray[i].position) {
            case "FORTUNETELLER":
                var flag = false;
                tr = document.createElement('tr');
                td = document.createElement('td');
                td.colSpan = 2;
                for (var j = 0; j < resultOfFortunetellerArray.length; j++) {
                    if (playerArray[i].id == resultOfFortunetellerArray[j].id) {
                        td.innerHTML = getResultOfFortunetellerString(resultOfFortunetellerArray[j].id, resultOfFortunetellerArray[j].selectionId);
                        flag = true;
                        break;
                    }
                }
                if (flag == false) {
                    for (var j = 0; j < resultOfThiefArray.length; j++) {
                        if (playerArray[i].id == resultOfThiefArray[j].id) {
                            for (var k = 0; k < resultOfFortunetellerArray.length; k++) {
                                if (resultOfThiefArray[j].selectionId == resultOfFortunetellerArray[k].id) {
                                    td.innerHTML = getResultOfFortunetellerString(resultOfFortunetellerArray[k].id, resultOfFortunetellerArray[k].selectionId);
                                    break;
                                }
                            }
                            break;
                        }
                    }
                }
                tr.appendChild(td);
                tbody.appendChild(tr);
                break;
            case "THIEF":
                tr = document.createElement('tr');
                td = document.createElement('td');
                td.colSpan = 2;
                var flag = false;
                for (var j = 0; j < resultOfThiefArray.length; j++) {
                    if (playerArray[i].id == resultOfThiefArray[j].id) {
                        td.innerHTML = getResultOfThiefString(resultOfThiefArray[j].id, resultOfThiefArray[j].selectionId);
                        flag = true;
                        break;
                    }
                }
                if (flag == false) {
                    for (var j = 0; j < resultOfThiefArray.length; j++) {
                        if (playerArray[i].id == resultOfThiefArray[j].selectionId) {
                            td.innerHTML = getResultOfThiefString(resultOfThiefArray[j].id, resultOfThiefArray[j].selectionId);
                            break;
                        }
                    }
                }
                tr.appendChild(td);
                tbody.appendChild(tr);
                break;
        }
    }
    displayState('RESULT');
}

//勝ち負けを設定
function setWinnerOrLoser(messageArray) {
    console.log('ENTER: setWinnerOrLoser, messageArray: ' + JSON.stringify(messageArray));
    var winnerOrLoser = messageArray['winnerOrLoser'];
    var winnerOrLoserString = '';
    if (winnerOrLoser == true) {
        winnerOrLoserString = 'あなたの勝ちです';
    }
    else {
        winnerOrLoserString = 'あなたの負けです';
    }
    document.getElementById('scrn_winnerOrLoser').innerHTML = winnerOrLoserString;
}

//プレイヤーの結果を設定
function setResultOfPlayerInResult(messageArray) {
    console.log('ENTER: setResultOfPlayerInResult, messageArray: ' + JSON.stringify(messageArray));
    var id = messageArray['id'];
    var name = messageArray['name'];
    var position = messageArray['position'];
    var hangingId = messageArray['hangingId'];
    var point = messageArray['point'];
    var earningPoint = messageArray['earningPoint'];
    var player = {id: id, name: name, position: position, hangingId: hangingId, point: point, earningPoint: earningPoint};
    playerArray.push(player);

    var tbody = document.getElementById('tbody_pointList');
    var tr = document.createElement('tr');
    var td = document.createElement('td');
    td.innerHTML = name;
    tr.appendChild(td);
    td = document.createElement('td');
    td.className = 'txt_right';
    td.innerHTML = point + " (" + earningPoint + ")";
    tr.appendChild(td);
    tbody.appendChild(tr);
}

//占い結果を表示
function setResultOfFortunetellerInResult(messageArray) {
    console.log('ENTER: setResultOfFortunetellerInResult, messageArray: ' + JSON.stringify(messageArray));
    var id = messageArray['id'];
    var selectionId = messageArray['selectionId'];
    var array = {id: id, selectionId: selectionId};
    resultOfFortunetellerArray.push(array);
}

//交換結果を設定
function setResultOfThiefInResult(messageArray) {
    console.log('ENTER: setResultOfThiefInResult, messageArray: ' + JSON.stringify(messageArray));
    var id = messageArray['id'];
    var selectionId = messageArray['selectionId'];
    var array = {id: id, selectionId: selectionId};
    resultOfThiefArray.push(array);
}
