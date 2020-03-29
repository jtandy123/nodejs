'use strict';

var IndexModel = require('../models/index');


module.exports = function (router) {

    var model = new IndexModel();

    router.get('/', function (req, res) {
        
        res.locals.locale = { language: 'zh', country: 'CN' };
        res.render('index', model);
        
        
    });

};
