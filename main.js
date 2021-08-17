var square = document.getElementsByClassName('square');
var squareArray = Array.from(square);
// squareArray.addEventListner('mousedown', () => {
//     console.log('test')
// })
var target = document.getElementById('square');
target.addEventListner('click', function (e) {
    console.log('test');
});
