const proxy = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(proxy('/api', { 
    target: 'http://10.60.13.121:3000',
    changeOrigin: true,
    pathRewrite: {
      '^/api': ''
    }
  }));
};