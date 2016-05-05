window.onload = function() {
	var colors = ["Желтый", "Красный", "Синий", "Филолетовый", "Зеленый", "Белый", "Черный"];
	var shapes = ["Круг", "Квадрат", "Треугольник"];

	var doorPlus = document.getElementById("doorPlus");
	var doorElems = document.getElementById("doors");
	var calcResult = document.getElementById("calcResult");
    var result = document.getElementById("result");
    var doors = [];
    doorPlus.addEventListener('click', function() {
        var door = new Door(colors[0], null, doorElems.children.length,
            "У анархии нет правил", function() {return true;});
        doors.push(door);
        var doorElem = renderDoor(door);
        doorElem.doorPos = door.pos;
        doorElems.appendChild(doorElem); 
    });
    calcResult.addEventListener('click', function() {
        var minTruthfull = +document.getElementsByName('minTruthfull')[0].value;
        var maxTruthfull = +document.getElementsByName('maxTruthfull')[0].value;
        for (var i = 0; i < doorElems.children.length; i++) {
            var doorElem = doorElems.children[i];
            var ruleElems = doorElem.querySelector('.rules').children;
            var rulesInfo = [];
            for (var j = 0; j < ruleElems.length; j++) {
                var ruleElem = ruleElems[j];
                var colorOpts = ruleElem.children[0].options;
                var selectedColor = colorOpts.item(colorOpts.selectedIndex).innerHTML;
                var doorStatusOpts = ruleElem.children[1].options;
                var selectedDoorStatus = doorStatusOpts.selectedIndex;
                rulesInfo.push({
                    color: selectedColor,
                    doorStatus: selectedDoorStatus
                });
            }
            doors[i].rule = (function(rulesInfo) {
                return function(doors, rightDoor) {
                    if (rulesInfo.length === 0) {
                        return true;
                    }
                    var pr = checkRule(rulesInfo[0]);
                    for (var i = 1; i < rulesInfo.length; i++) {
                        if (pr !== checkRule(rulesInfo[i])) {
                            return false;
                        }
                    }
                    return this.truthfull ? pr : !pr;

                    function checkRule(ruleInfo) {
                        var colorDoors = doors.filter(function(el) {
                            return el.color === ruleInfo.color;
                        });
                        var checkFunc;
                        switch (ruleInfo.doorStatus) {
                            case 0: {
                                checkFunc = function(door) {
                                    return door.truthfull;
                                };
                            } break;
                            case 1: {
                                checkFunc = function(door) {
                                    return !door.truthfull;
                                };
                            } break;
                            case 2: {
                                checkFunc = function(door) {
                                    return door.pos === doors[rightDoor].pos;
                                };
                            } break;
                            case 3: {
                                checkFunc = function(door) {
                                    return door.pos !== doors[rightDoor].pos;
                                };
                            } break;
                            default: {
                                alert("Error, he-he");
                            }
                        }
                        var res = true;
                        for (var i = 0; i < colorDoors.length; i++) {
                            res = res && checkFunc(colorDoors[i]);
                        }
                        return res;
                    }
                }
            })(rulesInfo);
        }
        result.innerHTML = checkRules(roomRule(minTruthfull,maxTruthfull), doors);        
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
        rules.classList.add('rules');

        var deleteButton = document.createElement('div');
        deleteButton.classList.add('doorDelete');
        deleteButton.addEventListener('click', function() {
        	doors = doors.filter(function(el) { 
        		return doorElem.doorPos !== el.pos;
        	});
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

	function checkRules(roomRule, doors) { 
    	var rightCount = 0;
    	var rightAnswers = [];
    	for (var doorTruth = 0; doorTruth < Math.pow(2, doors.length); doorTruth++) {
    	    for (var i = 0; i < doors.length; i++) {
    	    	doors[i].truthfull = !!(doorTruth & (1<<i));
    	    }
    	    for (var rightDoor = 0; rightDoor < doors.length; rightDoor++) {
    	    	if (!roomRule(doors, rightDoor)) {
    	        	continue;
    	      	}
    	      	var pr = false;
    	      	for (var i = 0; i < doors.length; i++) {
    	        	if (!doors[i].rule(doors, rightDoor)) {
    	          		pr = true;
    	          		break;
    	        	}
    	      	}
    	      	if (pr) {
    	        	continue;
    	      	}
    	      	rightCount++;
    	      	rightAnswers.push({
    	        	truthfulls: doorTruth,
    	        	rightDoor: doors[rightDoor].pos
    	      	});
    	    }
    	}
    	var res = rightAnswers.length > 0 ? rightAnswers.map(function(el) {
    		var truthfullsStr = el.truthfulls.toString(2);
            truthfullsStr = truthfullsStr.split('').reverse().join('')+
                '0'.repeat(doors.length - truthfullsStr.length);
            return 'Right door: '+el.rightDoor+'; Truthfulls: '+truthfullsStr;
    	}).join('<br/>') : 'No right answers';
    	return res;
  	}

  	function roomRule(truthfullMin, truthfullMax) {
	  return function(doors, choosenDoorPos) {
	    var truthfullCount = doors.filter(function(elem) { 
			return elem.truthfull;
	    }).length;
	    return truthfullCount >= truthfullMin && truthfullCount <= truthfullMax;
	     // && choosenDoorPos === toDzyubablePos;
	      
	  };
	};
}