document.addEventListener("DOMContentLoaded", function () {
    var square = document.getElementsByClassName('square');
    var squareArray = Array.from(square);
    squareArray.forEach(function (target) {
        target.addEventListener('click', function () {
            console.log('test');
        });
    });
}, false);
