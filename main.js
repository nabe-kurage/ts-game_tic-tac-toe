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
        var squareNum = target.getAttribute('data-squareNum');
        console.log(squareNum);
        if (xIsNext) {
            playerScore['x'].push(squareNum);
        }
        else {
            playerScore['o'].push(squareNum);
        }
        console.log(checkWin());
    };
    var checkWin = function () {
        for (var i = 0; i < winningPattern.length; i++) {
            // console.log(...winningPattern[i])
            if (playerScore['x'].includes(0)) {
                return true;
            }
        }
        return false;
    };
    var isEmptyCell = function (target) {
        return Boolean(!target.textContent);
    };
    // click event handlar
    var square = document.getElementsByClassName('square');
    var squareArray = Array.from(square);
    squareArray.forEach(function (target) {
        target.addEventListener('click', function () {
            if (isEmptyCell(target)) {
                setMark(target);
                changePlayerScore(target);
                changePlayer();
            }
        });
    });
});
