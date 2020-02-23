import {test} from './test';
console.log(test);

export default class Example {
  render() {
    return '<h1>Example</h1>';
  }
}


const example = new Example();
console.log(example.render());