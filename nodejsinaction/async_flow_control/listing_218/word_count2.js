const fs = require('fs');
const tasks = [];
const wordCounts = {};
const filesDir = './text';
const limit = 2;
let running = 0;

function checkIfComplete() {
  running--;
  if (tasks.length === 0 && running === 0) {
    for (let index in wordCounts) {
      console.log(`${index}: ${wordCounts[index]}`);
    }
  }
}

function addWordCount(word) {
  wordCounts[word] = (wordCounts[word]) ? wordCounts[word] + 1 : 1;
}

function countWordsInText(text) {
  const words = text.toString().toLowerCase().split(/\W+/).sort();

  words.filter(word => word).forEach(word => addWordCount(word));
}

fs.readdir(filesDir, (err, files) => {
  if (err) {
    throw err;
  }

  function launcher() {
    while(tasks.length > 0) {
      if (running < limit) {
        const task = tasks.shift();
        task();
      }
    }
  } 

  files.forEach(file => {
    const task = (file => {
      return () => {
        running++;
        fs.readFile(file, (err, text) => {
          if (err) {
            throw err;
          }
          if (tasks.length > 0) {
            launcher();
          }
          countWordsInText(text);
          checkIfComplete();
        })
      };
    })(`${filesDir}/${file}`);
    tasks.push(task);
  });

  launcher();
});
