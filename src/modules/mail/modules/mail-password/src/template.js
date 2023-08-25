const head = require('./head');
const body = require('./body');
module.exports = (data = {}) => `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml"
xmlns:v="urn:schemas-microsoft-com:vml"
xmlns:o="urn:schemas-microsoft-com:office:office">
<head>${head(data)}</head>
<body class="em_body" style="margin:0px auto; padding:0px;" bgcolor="#efefef">${body(data)}</body>
</html>`