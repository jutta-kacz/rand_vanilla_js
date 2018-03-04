// GENERATE NUMBERS
function getNumbers() {
    var numbers = [];
    for(var i = 0; i < 8; i++) {
        numbers[i] = Math.floor((Math.random()*100) + 1);
    }
    return numbers;
}

function setColors() {
    var numbers = getNumbers();
    var elementArray = document.getElementsByClassName('js-random');

    for (var i = 0; i < elementArray.length; i++) {
        // GENERATE RGBA COLOR
        var randomColor = Math.floor(numbers[i] * 2.55);

        elementArray[i].style.backgroundColor = 'rgba(' + randomColor + ', 0, 0, 1)';
        elementArray[i].innerHTML = '<p>' + numbers[i] + '</p>';
       
        if (numbers[i] > 50) {
            elementArray[i].style.color ='#000';
        }
        else {
            elementArray[i].style.color = '#fff';
        }
    }
    return numbers;
}

// DOM
document.addEventListener('DOMContentLoaded', function() {
    var values = [];
    values.push(setColors());
    var i = 0;
    var wrapperDiv = document.getElementById('js-value');
    console.log(i);
    wrapperDiv.innerHTML = '<p>' + values[0] + '</p>';

    setInterval(function() {
        i++;
        if (i > 7) {
            values.shift();

            var oldP = wrapperDiv.firstChild;
            wrapperDiv.removeChild(oldP);
            i--;
        }
        values.push(setColors());

        var newP = document.createElement('p');
        newP.innerHTML = values[i];

        wrapperDiv.appendChild(newP);
    }, 3000);


    // DOWNLOAD
    document.getElementById('js-download').addEventListener('click', downloadList);

    function downloadList() {
        var text = document.getElementById('js-value').innerText;

        text = 'List values:\r\n\r\n' + text.replace(/\n/g, '\r\n');

        var a = document.createElement('a');

        a.href = 'data:text/csv,' + encodeURIComponent(text);
        a.setAttribute('download', 'list-values.txt');

        document.body.appendChild(a);

        setTimeout(function () {
          a.click();
          document.body.removeChild(a);
        }, 200);
    }
});