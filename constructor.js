window.onload = function() {
	var colors = ["Желтый", "Красный", "Синий", "Филолетовый", "Зеленый", "Белый", "Черный"];
	var shapes = ["Круг", "Квадрат", "Треугольник"];

	var doorPlus = document.getElementById("doorPlus");
	var doors = document.getElementById("doors");
	doorPlus.addEventListener('click', function() {
		var doorElem = renderDoor(new Door(colors[0], null, doors.children.length,
			"У анархии нет правил"));
		doors.appendChild(doorElem); 
	});

	doorPlus.click();

	function Door(color, shape, pos, text, rule) {
	  this.color = color;
	  this.shape = shape;
	  this.pos = pos;
	  this.text = text;
	  this.rule = rule;
	}

	function renderDoor(door) {
        var doorElem = document.createElement('div');
        
        var id = document.createTextNode('Id: ' + door.pos);

        var colorSpan = document.createTextNode('Color: ');
        var colorBox = createSelectBox(colors);

        var shapeSpan = document.createTextNode('Shape: ');
        var shapeBox = createSelectBox(shapes);

        var textSpan = document.createTextNode('Text: ');
        var rulePlus = document.createElement('div');
        rulePlus.classList.add('rulePlus')
        
        var text = document.createElement('textarea');
        text.innerHTML = door.text;

        var rules = document.createElement('div');

        var deleteButton = document.createElement('div');
        deleteButton.classList.add('doorDelete');
        deleteButton.addEventListener('click', function() {
        	doorElem.remove();
        });

        rulePlus.addEventListener('click', function() {
        	var rule = document.createElement('div');
        	rule.classList.add('rule');
        	var colorSelect = createSelectBox(colors);
        	var colorText = document.createTextNode(' дверь ');
        	var doorStatus = createSelectBox(['правильный', 'неправильный', 'ведет к Дзюбе', 'ведет в ад']);

        	rule.appendChild(colorSelect);
        	rule.appendChild(colorText);
        	rule.appendChild(doorStatus);
        	rules.appendChild(rule);
        });

        doorElem.appendChild(id);
        doorElem.appendChild(document.createElement('br'));
        doorElem.appendChild(colorSpan);
        doorElem.appendChild(colorBox);
        doorElem.appendChild(shapeSpan);
        doorElem.appendChild(shapeBox);
        doorElem.appendChild(document.createElement('hr'));
        doorElem.appendChild(textSpan);
        doorElem.appendChild(document.createElement('br'));
        doorElem.appendChild(text);
        doorElem.appendChild(rules);
        doorElem.appendChild(rulePlus);

        doorElem.appendChild(deleteButton);
		return doorElem;
	}  

	function createSelectBox(options) {
		var select = document.createElement('select');
		for (var i in options) {
			var option = options[i];
			var optionElem = document.createElement('option');
			optionElem.innerHTML = option;
			select.appendChild(optionElem);
		}
		return select;
	}

}