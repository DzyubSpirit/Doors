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
doors.push(new Door('Желтая', null, 0, 
  'Либо эта дверь, либо фиолетовая ведут к бекону',
  function(doors, rightDoor) {
    var statement = rightDoor === 0 || rightDoor === 3;
    return this.truthfull? statement : !statement;
  }));
doors.push(new Door('Зеленая', null, 1, 
  'Синяя и красная двери неправдивая',
  function(doors, rightDoor) {
    var statement = (!doors[2].truthfull) && (!doors[4].truthfull);
    return this.truthfull ? statement : !statement;
  }));

doors.push(new Door('Синяя', null, 2, 
  'Зеленая и красная двери ведут к смерти<br/>Эта дверь ведет к Дзюбе',
  function(doors, rightDoor) {
    var statement1 = rightDoor !== 1 && rightDoor !== 4;
    var statement2 = rightDoor === 2;
    if (statement1 ^ statement2) {
      return false;
    }
    return this.truthfull ? statement1 : !statement1;
  }));
doors.push(new Door('Фиолетовая', null, 2, 
  'Зеленая, синяя или красная дверь ведет к Дзюбе<br/>Ты выберешь неправдивую дверь',
  function(doors, rightDoor) {
    var statement1 = rightDoor === 1 || rightDoor === 2 || rightDoor === 4;
    var statement2 = !doors[rightDoor].truthfull;
    if (statement1 ^ statement2) {
      return false;
    }
    return this.truthfull ? statement1 : !statement1;
  }));
doors.push(new Door('Красная', null, 2, 
  'Фиолетовая дверь неправдивая<br/>Желтая дверь ведет к Дзюбе',
  function(doors, rightDoor) {
    var statement1 = !doors[3].truthfull;
    var statement2 = rightDoor === 0;
    if (statement1 ^ statement2) {
      return false;
    }
    return this.truthfull ? statement1 : !statement1;
  }));

var rightDoorPos = 4;

var mainRule = roomRule(2, 2, 4);  
mainRule.text = 'Ровно 2 двери правдивы';