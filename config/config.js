var path = require('path'),
    rootPath = path.normalize(__dirname + '/..'),
    env = process.env.NODE_ENV || 'production';

/*var config = {
  production: {
    root: rootPath,
    app: {
      name: 'assignment6'
    },
    port: process.env.PORT || 3000,
    db: 'mongodb://localhost/assignment6-development'
  },

  test: {
    root: rootPath,
    app: {
      name: 'assignment6'
    },
    port: process.env.PORT || 3000,
    db: 'mongodb://localhost/assignment6-test'
  };*/
var config = {
  production: {
    root: rootPath,
    app: {
      name: 'assignment6'
    },
    port: process.env.PORT || 3000,
    db: 'mongodb://hussain:root@ds025752.mlab.com:25752/heroku_h0fcsqbt'
  }
};

module.exports = config[env];
