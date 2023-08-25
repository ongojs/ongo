const css = require('./css');
module.exports = (data = {}) => `<meta name="viewport" content="width=device-width" />
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<title>Alerts e.g. approaching your limit</title>
<style type="text/css">${css()}</style>`