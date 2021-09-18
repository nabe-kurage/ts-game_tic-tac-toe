document.addEventListener('DOMContentLoaded', function () {
    // data area
    var winningPatterns = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    var xIsNext = true;
    var isFinishedGame = false;
    // methods area
    var nowPlayer = function () {
        return xIsNext ? 'x' : 'o';
    };
    var changePlayer = function () {
        xIsNext = !xIsNext;
        var nextPlayerView = document.getElementById('nextPlayer');
        nextPlayerView.innerHTML = nowPlayer();
    };
    var setMark = function (target) {
        target.innerHTML = nowPlayer();
    };
    var changePlayerScore = function (target) {
        target.setAttribute('data-owner', nowPlayer());
        if (checkWin())
            finishGame();
    };
    var finishGame = function () {
        var statesArea = document.getElementById('statesArea');
        var text = document.createTextNode('nowPlayer ' + nowPlayer() + ' win!!');
        statesArea.appendChild(text);
        isFinishedGame = true;
    };
    var checkWin = function () {
        // 今のプレイヤーがdata-ownerに入っている要素を取得
        var nowPlayerOwnSquares = document.querySelectorAll(".square[data-owner='" + nowPlayer() + "']");
        var nowPlayerOwnSquaresList = Array.from(nowPlayerOwnSquares, function (target) {
            return Number(target.getAttribute('data-squareNum'));
        });
        for (var i = 0; i < winningPatterns.length; i++) {
            var included = 0;
            for (var j = 0; j < 3; j++) {
                if (nowPlayerOwnSquaresList.includes(winningPatterns[i][j])) {
                    included++;
                }
            }
            if (included === 3) {
                // MEMO: 勝ち判定が出た場合その後の値のチェックは不要
                return true;
            }
            included = 0;
        }
        return false;
    };
    var isEmptyCell = function (target) {
        return Boolean(!target.textContent);
    };
    var square = document.getElementsByClassName('square');
    // MEMO: fromがエラー出ているので@ts-ignoreを使うか(Array　as any)か？
    var squareArray = Array.from(square);
    squareArray.forEach(function (target) {
        target.addEventListener('click', function () {
            if (isEmptyCell(target) && !isFinishedGame) {
                setMark(target);
                changePlayerScore(target);
                changePlayer();
            }
        });
    });
});
