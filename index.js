const path = require('path');
const fs = require('fs');

// check for raw file maybe
// Load JSON from the directory where the program is ran
// compile into CSS
// save CSS

module.exports = {

  importData: function({locations}){

    const npm = JSON.parse(fs.readFileSync(path.join('.','package.json')).toString());
    const output = {
      "meta": {
        "name": npm.name
      },
      "data": []
    };
    const list = JSON.parse(fs.readFileSync(location).toString());
    list.forEach(function(item, index){
      if (index > 25) return;
      const id = String.fromCharCode(97+index);
      const gradients = [];

      const type = "linear-gradient";
      const angle = "0deg";
      const data = [];

      const gradient = {type, angle, data};

      gradients.push(gradient);
      const myRegExp = new RegExp("(#[a-f0-9]{6}|rgba\\([0-9.]+ *, *[0-9.]+ *, *[0-9.]+ *, *[0-9.]+ *\\)|rgb\\([0-9.]+ *, *[0-9.]+ *, *[0-9.]+ *\\)) ([0-9]+%)",'gi');
      let myArray;
      while (( myArray = myRegExp.exec(item)) !== null) {
        const [, color, position] = myArray;
        data.push({color, position})
      }
      output.data.push({id, gradients})
    });


    console.log( JSON.stringify(output, null, '  ') );
  }
}
