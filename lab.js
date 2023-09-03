

let request = 0;
const handler = (req, res) => {

    const url = req.url.split('/').filter(el => el.trim().length !== 0);
    request++
    res.end('Request: ' + request);
}
require('http').createServer(handler).listen(3000);

