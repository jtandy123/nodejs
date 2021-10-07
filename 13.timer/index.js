var timer = setTimeout(name => console.log(`Hello setTimeout1`), 3000);
timer.unref();
console.log('Waiting timer');
process.stdin.on('readable', () => console.log(process.stdin.read().toString()));