
module.exports = function (app) {

    let CategoryCtrl = require('./CategoryController');
    app.route('/Category')
        .get(CategoryCtrl.get)
        .post(CategoryCtrl.store);
    app.route('/Category/:CategoryID')
        .get(CategoryCtrl.detail)
        .put(CategoryCtrl.update)
        .delete(CategoryCtrl.delete);

 
};