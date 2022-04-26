const { listen } = require('express/lib/application');
const http = require('http');
const Mail = require('nodemailer/lib/mailer');
const app = require('./app');
const port = process.env.PORT || 3000;
const server = http.createServer(app);

server.listen(3000,console.log('app is running'));