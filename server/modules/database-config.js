var url = require('url');
var pg = require('pg');

if(process.env.DATABASE_URL) {
 var params = url.parse(process.env.DATABASE_URL);
 var auth = params.auth.split(':');

 var config = {
   user: auth[0],
   password: auth[1],
   host: params.hostname,
   port: params.port,
   database: params.pathname.split('/')[1],
   ssl: true
 };
} else {
 var config = {
   database: 'd59vgggaqq65f5', // the name of the database
   User: 'vbxwyitiogzdqz',
   host: 'ec2-107-22-162-158.compute-1.amazonaws.com', // where is your database
   Password: '8c69593bc8ad9a77a645b724bd55006a7e300e2cca4670ae1d03c0d82595a7d8',
   URI: 'postgres://vbxwyitiogzdqz:8c69593bc8ad9a77a645b724bd55006a7e300e2cca4670ae1d03c0d82595a7d8@ec2-107-22-162-158.compute-1.amazonaws.com:5432/d59vgggaqq65f5',
   port: 5432, // the port number for your database
   max: 10, // how many connections at one time
   idleTimeoutMillis: 30000 // 30 seconds to try to connect
 };
}

module.exports = new pg.Pool(config);
