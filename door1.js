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
doors.push(new Door('Синяя', null, 0,
 'Желтая дверь ведет к Дзюбе',//'Желтая дверь ведет к Дзюбе<br/>Либо желтая, либо красная дверь правдивая',
  function(doors, rightDoor) {
        /*var statement2 = doors[2].truthfull || doors[1].truthfull;
        var statement1 = rightDoor === 2;
        if (statement1 ^ statement2) {
          return false;
        }
        return this.truthfull? statement1 : !statement1;*/
    var statement = rightDoor === 2;
    return this.truthfull ? statement : !statement;
  }));
doors.push(new Door('Красная', null, 1, 
  'Ты не выберешь эту дверь',
  function(doors, rightDoor) {
    return this.truthfull ? rightDoor !== 1 : rightDoor === 1;
  }));

doors.push(new Door('Желтая', null, 2, 
  'Ты выберешь синюю дверь',
  function(doors, rightDoor) {
    return this.truthfull ? rightDoor === 0 : rightDoor !== 0;
  }));

var rightDoorPos = 1;

var mainRule = roomRule(0, 1, 1);  
mainRule.text = '0 или 1 дверь правдивая';
