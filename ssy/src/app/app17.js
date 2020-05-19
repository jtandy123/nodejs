const dns = require('dns');

dns.reverse('114.114.114.114', (error, domain) => {
  if (error) {
    console.log(error);
    return;
  }

  console.log(domain);
})