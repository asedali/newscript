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
	<body>
		<p>Hello world</p>
	</body>
	</html>
	`, { waitUntil: ['load'] });

      
      
  //await page.goto('https://mindmindi.blogspot.com/');
  console.log("on new ...");
  const innerText = await page.evaluate(() => document.querySelector('p').innerText);
  console.log(innerText);
            await page.waitFor(1000000);
            console.log("out of new ...");

 // await page.waitFor(1000000000);
  
})();
