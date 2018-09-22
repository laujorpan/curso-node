const cowsay = require('cowsay');

//we can launch the script using npm start because package json script define as "start"
console.log('eeeh!!');

console.log(cowsay.think({
	text : "I'm a moooodule",
	e : "--",
	T : "U  "
}));