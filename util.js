const path = require('path');
const fs = require('fs');

const colorPositionExpression = new RegExp("(#[a-f0-9]{6}|rgba\\([0-9.]+ *, *[0-9.]+ *, *[0-9.]+ *, *[0-9.]+ *\\)|rgb\\([0-9.]+ *, *[0-9.]+ *, *[0-9.]+ *\\)) ([0-9]+%)",'gi');
const configurationExpression = new RegExp("([a-z-]+)[ (]+([0-9]+deg)",'i');

// check for raw file maybe
// Load JSON from the directory where the program is ran
// compile into CSS
// save CSS

module.exports = {
  importData: function({database, file}){
    // Import data nukes the file

    const npm = JSON.parse(fs.readFileSync(path.join('.','package.json')).toString());
    const output = {
      "meta": {
        "name": npm.name
      },
      "data": []
    };
    const list = JSON.parse(fs.readFileSync(file).toString());
    list.forEach(function(item, index){
      if (index > 25) return;
      const id = String.fromCharCode(97+index);
      const gradients = [];
      const type = "linear-gradient";
      const angle = "0deg";
      const data = [];
      const gradient = {type, angle, data};
      gradients.push(gradient);
      let myArray;
      while (( myArray = colorPositionExpression.exec(item)) !== null) {
        const [, color, position] = myArray;
        data.push({color, position})
      }
      output.data.push({id, gradients})
    });
    console.log( JSON.stringify(output, null, '  ') );
  },

  mergeData: function({database, file}){
    const output = JSON.parse(fs.readFileSync( database ).toString());
    const list = JSON.parse(fs.readFileSync(file).toString());

    list.forEach(function(item, index){ // if list is too short then items on bottom don't get anything.
      if (!item) return;
      if (index >= output.data.length) return;

      const data = []; // color array
      const [, type = "linear-gradient", angle = "0deg"] = item.match(configurationExpression)||[];
      const gradient = {type, angle, data}; // gradient object with angle and .data that contains colors

      let myArray;
      while (( myArray = colorPositionExpression.exec(item)) !== null) {
        const [, color, position] = myArray;
        data.push({color, position})
      }
      output.data[index].gradients.push(gradient)
    });
    console.log( JSON.stringify(output, null, '  ') );
  }
}
