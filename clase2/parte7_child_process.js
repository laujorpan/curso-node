#!/usr/bin/env node

/* Launch child process (Cmd commands).
 * We can make this using spawn or exec, first is better when the child process to return a large amount of data to Node
 * Moreover, this script is made as an executable (because of its first line)
 */
const spawn = require('child_process').spawn

console.log('haciendo un  ejecutable con childs')
let stream = spawn('ls',['-la'])

stream.stdout.setEncoding('utf-8')
stream.stderr.setEncoding('utf-8')

stream.stdout.on('data', (data) => console.log(data));
