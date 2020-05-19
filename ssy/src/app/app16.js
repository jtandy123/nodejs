const dns = require('dns');

const domain = 'www.example.com';

dns.resolve(domain, (error, address) => {
  if (error) {
    console.log(error);
    return;
  }

  console.log(address);
})