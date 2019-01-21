const auth = require('./Auth');
const user = require('./User');
const salon = require('./Salon');
const shop = require('./Shop');
const employee = require('./Employee');

module.exports = (app) => {
    app.use('/api/auth', auth);
    app.use('/api/user', user);
    app.use('/api/salon', salon);
    app.use('/api/shop', shop);
    app.use('/api/employee', employee);
}