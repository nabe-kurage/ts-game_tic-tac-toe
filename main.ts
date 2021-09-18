document.addEventListener('DOMContentLoaded', function () {
    // MEMO: fromがES6の書き方で型に入っていないので追加
    // MEMO: もしくは　`tsc main.ts --watch --lib dom,es6`で回せばOK
    // MEMO: Array.includes()のエラーもとろうと思うとes7で回す必要がある
    interface ArrayConstructor {
        from(arrayLike: any, mapFn?, thisArg?): Array<any>
    }

    type Player = 'x' | 'o'

    // data area
    const winningPatterns = [
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
    let isFinishedGame: boolean = false

    // methods area
    const nowPlayer = (): Player => {
        return xIsNext ? 'x' : 'o'
    }

    const changePlayer = () => {
        xIsNext = !xIsNext
        const nextPlayerView: HTMLElement = document.getElementById('nextPlayer')

        nextPlayerView.innerHTML = nowPlayer()
    }

    const setMark = (target: Element): void => {
        target.innerHTML = nowPlayer()
    }

    const changePlayerScore = (target: Element) => {
        target.setAttribute('data-owner', nowPlayer())

        if (checkWin()) finishGame()
    }

    const finishGame = () => {
        const statesArea: HTMLElement = document.getElementById('statesArea')
        const text = document.createTextNode('nowPlayer ' + nowPlayer() + ' win!!')
        statesArea.appendChild(text)
        isFinishedGame = true
    }

    const checkWin = (): boolean => {
        const nowPlayerOwnSquares = document.querySelectorAll(`.square[data-owner='${nowPlayer()}']`)
        const nowPlayerOwnSquaresList = Array.from(nowPlayerOwnSquares, (target) =>
            Number(target.getAttribute('data-squareNum'))
        )

        for (let i = 0; i < winningPatterns.length; i++) {
            let included = 0
            for (let j = 0; j < 3; j++) {
                if (nowPlayerOwnSquaresList.includes(winningPatterns[i][j])) {
                    included++
                }
            }
            if (included === 3) {
                // MEMO: 勝ち判定が出た場合その後の値のチェックは不要
                return true
            }
            included = 0
        }
        return false
    }

    const isEmptyCell = (target): boolean => {
        return Boolean(!target.textContent)
    }

    const square = document.getElementsByClassName('square')
    // MEMO: fromがエラー出ているので@ts-ignoreを使うか(Array　as any)か？
    const squareArray = Array.from(square)

    squareArray.forEach((target) => {
        target.addEventListener('click', () => {
            if (isEmptyCell(target) && !isFinishedGame) {
                setMark(target)
                changePlayerScore(target)
                changePlayer()
            }
        })
    })
})
