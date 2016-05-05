function Door(color, shape, pos, text, rule) {
  this.color = color;
  this.shape = shape;
  this.pos = pos;
  this.text = text;
  this.rule = rule;
}

function roomRule(truthfullMin, truthfullMax, toDzyubablePos) {
  return function(doors, choosenDoorPos) {
    var truthfullCount = doors.filter(function(elem) { 
return elem.truthfull;
    }).length;
    return truthfullCount >= truthfullMin && truthfullCount <= truthfullMax;
     // && choosenDoorPos === toDzyubablePos;
      
  };
};

var doors = [];
doors.push(new Door('Yellow', null, 0, '',
function(doors, rightDoor) {
        var statement1 = true;//!doors[rightDoor].truthfull;
        var statement2 = rightDoor === 1;
        if (statement1 ^ statement2) {
          return false;
        }
  return this.truthfull? statement1 : !statement1;
}));
doors.push(new Door('Red', null, 1, 'Ты не выберешь эту дверь',
      function(doors, rightDoor) {
        var statement = rightDoor === 0;
        return this.truthfull ? statement : !statement;
      }));

doors.push(new Door('Blue', null, 2, 'Ты выберешь синюю дверь',
      function(doors, rightDoor) {
        var statement = (rightDoor !== 1) && (rightDoor !== 2);
        return this.truthfull ? statement : !statement;
      }));
var rightDoorPos = 1;

var mainRule = roomRule(1, 1, 1);  
