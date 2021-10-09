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
    var isGameFinished = false;
    // methods area
    // nowは副詞なのでcurrentの方がよい
    var currentPlayer = function () {
        return xIsNext ? 'x' : 'o';
    };
    var changePlayer = function () {
        xIsNext = !xIsNext;
        var nextPlayerView = document.getElementById('nextPlayer');
        nextPlayerView.innerHTML = currentPlayer();
    };
    var setMark = function (target) {
        target.innerHTML = currentPlayer();
    };
    var changePlayerScore = function (target) {
        target.setAttribute('data-owner', currentPlayer());
        if (checkWin())
            finishGame();
    };
    var finishGame = function () {
        var statesArea = document.getElementById('statesArea');
        var text = document.createTextNode('currentPlayer ' + currentPlayer() + ' win!!');
        statesArea.appendChild(text);
        // isGameFinishedの方がよい　疑問文
        isGameFinished = true;
    };
    var checkWin = function () {
        var currentPlayerOwnSquares = document.querySelectorAll(".square[data-owner='" + currentPlayer() + "']");
        var currentPlayerOwnSquaresList = Array.from(currentPlayerOwnSquares, function (target) {
            return Number(target.getAttribute('data-squareNum'));
        });
        for (var i = 0; i < winningPatterns.length; i++) {
            var included = 0;
            for (var j = 0; j < 3; j++) {
                if (currentPlayerOwnSquaresList.includes(winningPatterns[i][j])) {
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
            if (isEmptyCell(target) && !isGameFinished) {
                setMark(target);
                changePlayerScore(target);
                changePlayer();
            }
        });
    });
});
