document.addEventListener(
  'DOMContentLoaded',
  function () {
    // change player
    let xIsNext: boolean = true
    const nextPlayerView = document.getElementById('nextPlayer')
    const changePlayer = () => {
      xIsNext = !xIsNext
      if (xIsNext) {
        nextPlayerView.innerHTML = 'x'
      } else {
        nextPlayerView.innerHTML = 'o'
      }
    }

    // click event handlar
    const square = document.getElementsByClassName('square')
    const squareArray = Array.from(square)

    squareArray.forEach((target) => {
      target.addEventListener('click', () => {
        console.log('test')
        changePlayer()
      })
    })
  },
  false
)
