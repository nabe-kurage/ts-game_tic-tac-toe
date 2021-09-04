document.addEventListener('DOMContentLoaded', function () {
    // for win-loss Judge
    const winningPattern = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ]
    // data
    let xIsNext: boolean = true
    const playerScore: { x: number[]; o: number[] } = {
        x: [],
        o: [],
    }

    const nextPlayerView: HTMLElement = document.getElementById('nextPlayer')

    // methods
    const changePlayer = () => {
        xIsNext = !xIsNext
        nextPlayerView.innerHTML = xIsNext ? 'x' : 'o'
    }

    const setMark = (target: Element): void => {
        target.innerHTML = xIsNext ? 'x' : 'o'
    }

    const changePlayerScore = (target) => {
        const squareNum: number = target.getAttribute('data-squareNum')
        console.log(squareNum)
        if (xIsNext) {
            playerScore['x'].push(squareNum)
        } else {
            playerScore['o'].push(squareNum)
        }
        console.log(checkWin())
    }

    const checkWin = (): boolean => {
        for (let i = 0; i < winningPattern.length; i++) {
            // console.log(...winningPattern[i])
            if (playerScore['x'].includes(0)) {
                return true
            }
        }
        return false
    }

    const isEmptyCell = (target): boolean => {
        return Boolean(!target.textContent)
    }

    // click event handlar
    const square = document.getElementsByClassName('square')
    const squareArray = Array.from(square)
    squareArray.forEach((target) => {
        target.addEventListener('click', () => {
            if (isEmptyCell(target)) {
                setMark(target)
                changePlayerScore(target)
                changePlayer()
            }
        })
    })
})
