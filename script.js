let rangeInputs = document.querySelectorAll('.borders'),
    textInputs = document.querySelectorAll('.borders-text'),
    table = document.getElementById('table'),
    rectangle = document.querySelector('.rectangle');

rangeInputs.forEach(function(input) {
    input.addEventListener('input', function() {
        let input = this.parentNode.nextElementSibling.querySelector('input');
        input.value = this.value;
        input.dispatchEvent(new Event('input'));
    });
});

textInputs.forEach(function (input) {
    input.addEventListener('input', function() {
        changeRectangle(rectangle); // изменение css происходит только тут
        this.parentNode.previousElementSibling.querySelector('input').value = this.value;
    });
    input.addEventListener('change', function() {
        if (this.value == '') {
            this.value = '0';
        } else if (+this.value > 100) {
            this.value = '100';
        }
        this.dispatchEvent(new Event('input'));
    });
});

function changeRectangle (div) {
    div.style.borderRadius = `${textInputs[0].value}px ${textInputs[1].value}px 
        ${textInputs[2].value}px ${textInputs[3].value}px `;
}

// border line
let borderLineTbody = document.getElementById('tbody-border-line'),
    rangeInputBorderLine = document.querySelector('.border-line-range'),
    textInputBorderLine = document.querySelector('.border-line-text'),
    borderStyleSelect = document.getElementById('border-style'),
    borderColorSelect = document.getElementById('border-color');

textInputBorderLine.addEventListener('input', function() {
    rangeInputBorderLine.value = this.value;
    changeBorderRectangle(rectangle);
});
textInputBorderLine.addEventListener('change', function() {
    if (this.value == '') {
        this.value = '0';
    } else if (+this.value > 200) {
        this.value = '200';
    }
    this.dispatchEvent(new Event('input'));
});

rangeInputBorderLine.addEventListener('input', function() {
    textInputBorderLine.value = this.value;
    textInputBorderLine.dispatchEvent(new Event('input'));
});

[borderStyleSelect, borderColorSelect].forEach(function(item) {
    item.addEventListener('change', function () {
        changeBorderRectangle(rectangle);
    });
    item.addEventListener('mousemove', function (event) {
        console.log(event.target);
        // TODO: при наведении сразу изменять
    });
});

function hideBorderLineTbody(self) {
    if ( self.checked ) {
        borderLineTbody.style.display = 'table-row-group';
        changeBorderRectangle(rectangle);
    } else {
        borderLineTbody.style.display = 'none';
    }
}

function changeBorderRectangle (div) {
    let style = borderStyleSelect.options[borderStyleSelect.selectedIndex].value,
        color = borderColorSelect.options[borderColorSelect.selectedIndex].value;
    div.style.border = `${textInputBorderLine.value}px ${style} ${color}`;
}