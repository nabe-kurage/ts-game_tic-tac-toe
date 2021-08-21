document.addEventListener("DOMContentLoaded", function () {
    const square = document.getElementsByClassName('square')
    const squareArray = Array.from(square)

    squareArray.forEach((target) => {
        target.addEventListener('click', () => {
            console.log('test')
        })
    })
}, false);