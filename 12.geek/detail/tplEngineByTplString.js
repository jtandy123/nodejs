const user = {
  name: '<script />'
};

const vm = require('vm');

const templateMap = {
  templateA: '`<h2>${include("templateB")}</h2>`',
  templateB: '`<p>${_(user.name)}</p>`'
}

const context = { 
  user,
  include: function(name) {
    return templateMap[name]();
  },
  _: function(markup) {
    if (!markup) return '';
    return String(markup)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/'/g, '&#39;')
    .replace(/"/g, '&quot;');
  }
};

Object.keys(templateMap).forEach(key => {
  const temp = templateMap[key];
  templateMap[key] = vm.runInNewContext(`
    (function() {
      return ${temp};
    });
  `, context);
});

console.log(vm.runInNewContext('`<h1>${include("templateA")}</h1>`', context));


// const template = '<h2><%= user.name %></h2>'
// ejs.render(template, user)