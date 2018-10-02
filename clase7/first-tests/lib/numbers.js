let number;


function createNumber(num) {
    if (!number){
        number=num;
    }
    function substract(){
        number--;
        console.log(number);
        return createNumber()
    }
    function add(){
        number++;
        console.log(number);
        return createNumber()
    }
    
    return {add,substract}
  }
  
  createNumber(5)   // prints "5"
    .add()          // prints "6"
    .add()          // prints "7"
    .substract()     // prints "6"
    .add()          // prints "7"