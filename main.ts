document.addEventListener(
    'DOMContentLoaded',
    function () {
        // change player
        let xIsNext: boolean = true
        const nextPlayerView: HTMLElement =
            document.getElementById('nextPlayer')

        const changePlayer = () => {
            xIsNext = !xIsNext
            if (xIsNext) {
                nextPlayerView.innerHTML = 'x'
            } else {
                nextPlayerView.innerHTML = 'o'
            }
        }

        const setMark = (target: HTMLElement): void => {
            console.log(target)
            if (xIsNext) {
                target.innerHTML = 'x'
            } else {
                target.innerHTML = 'o'
            }
        }

        // click event handlar
        const square = document.getElementsByClassName('square')
        const squareArray = Array.from(square)
        squareArray.forEach((target) => {
            target.addEventListener('click', () => {
                setMark(target)
                changePlayer()
            })
        })
    },
    false
)
