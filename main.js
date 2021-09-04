document.addEventListener('DOMContentLoaded', function () {
    // for win-loss Judge
    var winningPattern = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    // data
    var xIsNext = true;
    var isFinished = false;
    var playerScore = {
        x: [],
        o: []
    };
    var nextPlayerView = document.getElementById('nextPlayer');
    // methods
    var changePlayer = function () {
        xIsNext = !xIsNext;
        nextPlayerView.innerHTML = xIsNext ? 'x' : 'o';
    };
    var setMark = function (target) {
        target.innerHTML = xIsNext ? 'x' : 'o';
    };
    var changePlayerScore = function (target) {
        // MEMO: ここNumber()がないと何故か文字列が入ってしまう…謎
        var squareNum = Number(target.getAttribute('data-squareNum'));
        if (xIsNext) {
            playerScore['x'].push(squareNum);
        }
        else {
            playerScore['o'].push(squareNum);
        }
        if (checkWin()) {
            var statesArea = document.getElementById('statesArea');
            var player = xIsNext ? 'x' : 'o';
            var text = document.createTextNode('player ' + player + ' win!!');
            statesArea.appendChild(text);
            isFinished = true;
        }
    };
    var checkWin = function () {
        var isWin = false;
        var player = xIsNext ? 'x' : 'o';
        for (var i = 0; i < winningPattern.length; i++) {
            var included = 0;
            for (var j = 0; j < 3; j++) {
                if (playerScore[player].includes(winningPattern[i][j])) {
                    included++;
                }
            }
            if (included === 3) {
                isWin = true;
            }
            included = 0;
        }
        return isWin;
    };
    var isEmptyCell = function (target) {
        return Boolean(!target.textContent);
    };
    // click event handlar
    var square = document.getElementsByClassName('square');
    var squareArray = Array.from(square);
    squareArray.forEach(function (target) {
        target.addEventListener('click', function () {
            if (isEmptyCell(target) && !isFinished) {
                setMark(target);
                changePlayerScore(target);
                changePlayer();
            }
        });
    });
});
