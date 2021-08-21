document.addEventListener(
    'DOMContentLoaded',
    function () {
        // change player
        var xIsNext = true
        var nextPlayerView = document.getElementById('nextPlayer')
        var changePlayer = function () {
            xIsNext = !xIsNext
            if (xIsNext) {
                nextPlayerView.innerHTML = 'x'
            } else {
                nextPlayerView.innerHTML = 'o'
            }
        }
        // click event handlar
        var square = document.getElementsByClassName('square')
        var squareArray = Array.from(square)
        squareArray.forEach(function (target) {
            target.addEventListener('click', function () {
                console.log('test')
                changePlayer()
            })
        })
    },
    false
)
