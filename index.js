const fs = require('fs');

const render = function (name, input){
  let listOfMatchingClasses = Array.isArray(input)?input:[input];
  const response = [];

    listOfMatchingClasses.forEach(function(matchedClass){
      const {id, gradients} = matchedClass;
      const inner = [];

      gradients.forEach(function(gradient){

       const {type, angle, data} = gradient;


         const code = `${type}(${angle}, ${data.map(i=>[i.color, i.position].join(" ") ).join(", ")})`;
         inner.unshift(code);


      //  return `.${name}-${id} { background: ${type}(${angle}, ${gradient.map(i=>[i.color, i.position].join(" ") ).join(", ")}); }`

      }); // gradients done

      const code = `.${name}-${id} {
        background: ${inner.join(", ")};
      }`
      response.push(code);

    });
    return response.join("\n");
}

module.exports = {
    render,
    css: function(pattern, opt={}){
      const database = JSON.parse(fs.readFileSync(opt.database||'./style.json').toString());
      const selected = database.data.filter(gradient => gradient.id.match(pattern));
      return selected.map(i => render(database.meta.name, i)).join("\n");
    },
    raw: function(pattern, opt={}){
      const database = JSON.parse(fs.readFileSync(opt.database||'./style.json').toString());
      const selected = database.data.filter(gradient => gradient.id.match(pattern));
      return selected;
    }
};
