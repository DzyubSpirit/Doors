window.onload = function() {
  var ruleP = document.getElementById("roomRule");
  ruleP.innerHTML = mainRule.text;
  
  checkRules(mainRule, doors);  

  renderDoors(doors);

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
          rightDoor: rightDoor
        });
         
      }
    }
    console.log(rightCount);
    console.log(rightAnswers);
  }

  function renderDoors(doors) {
    var doorsElem = document.getElementById('doors');
    for (var i in doors) {
      var door = doors[i];
      var doorElem = document.createElement('div');
      var innerHTML = 'Color: ' + door.color;
      innerHTML += door.shape ? '<br/>Shape: '+door.shape: '';
      innerHTML += '<hr/>'+door.text;
      innerHTML += '<hr/>';
      doorElem.innerHTML = innerHTML;
      var button = document.createElement('button');
      button.innerHTML = 'Choose';
      button.onclick = (function(door) {
        return function() {
	  if (door.pos === rightDoorPos) {
            alert('Ebat ti umniy');
          } else {
            alert('Ha loh!');
          }
        };
      })(door);
      doorElem.appendChild(button);      
      doorsElem.appendChild(doorElem);
    }
  }  
}
