var path = require('path'),
    rootPath = path.normalize(__dirname + '/..'),
    env = process.env.NODE_ENV || 'development';

var config = {
  development: {
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
  },

  production: {
    root: rootPath,
    app: {
      name: 'assignment6'
    },
    port: process.env.PORT || 3000,
    db: 'mongodb://localhost/assignment6-production'
  }
};

module.exports = config[env];
