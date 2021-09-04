// MEMO: fromがES6の書き方で型に入っていないので追加
// MEMO: もしくは　`tsc main.ts --watch --lib dom,es6`で回せばOK
// MEMO: Array.includes()のエラーもとろうと思うとes7で回す必要がある
interface ArrayConstructor {
    from(arrayLike: any, mapFn?, thisArg?): Array<any>
}

document.addEventListener('DOMContentLoaded', function () {
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
    let xIsNext: boolean = true
    let isFinished: boolean = false
    const playerScore: { x: number[]; o: number[] } = {
        x: [],
        o: [],
    }

    // methods
    const changePlayer = () => {
        xIsNext = !xIsNext
        const nextPlayerView: HTMLElement = document.getElementById('nextPlayer')

        nextPlayerView.innerHTML = xIsNext ? 'x' : 'o'
    }

    const setMark = (target: Element): void => {
        target.innerHTML = xIsNext ? 'x' : 'o'
    }

    const changePlayerScore = (target: Element) => {
        // MEMO: ここNumber()がないと何故か文字列が入ってしまう…謎
        const squareNum = Number(target.getAttribute('data-squareNum'))
        if (xIsNext) {
            playerScore['x'].push(squareNum)
        } else {
            playerScore['o'].push(squareNum)
        }
        if (checkWin()) {
            const statesArea: HTMLElement = document.getElementById('statesArea')
            const player = xIsNext ? 'x' : 'o'
            const text = document.createTextNode('player ' + player + ' win!!')
            statesArea.appendChild(text)
            isFinished = true
        }
    }

    const checkWin = (): boolean => {
        let isWin = false
        const player = xIsNext ? 'x' : 'o'
        for (let i = 0; i < winningPattern.length; i++) {
            let included = 0
            for (let j = 0; j < 3; j++) {
                if (playerScore[player].includes(winningPattern[i][j])) {
                    included++
                }
            }
            if (included === 3) {
                isWin = true
            }
            included = 0
        }
        return isWin
    }

    const isEmptyCell = (target): boolean => {
        return Boolean(!target.textContent)
    }

    const square = document.getElementsByClassName('square')
    // MEMO: fromがエラー出ているので@ts-ignoreを使うか(Array　as any)か？
    const squareArray = Array.from(square)

    squareArray.forEach((target) => {
        target.addEventListener('click', () => {
            if (isEmptyCell(target) && !isFinished) {
                setMark(target)
                changePlayerScore(target)
                changePlayer()
            }
        })
    })
})
