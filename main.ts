const square =
    document.getElementsByClassName('square')
const squareArray = Array.from(square)

// squareArray.addEventListner('mousedown', () => {
//     console.log('test')
// })


const target = document.getElementById('square')
target.addEventListner('click', (e:MouseEvent) => {
    console.log('test')
})