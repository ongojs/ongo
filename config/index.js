
const env = require(require('path').join(process.cwd(), './.env.js'))()
module.exports = () => {
  for (let prop in env) {
    if (!process.env[prop]) {
      if (typeof env[prop] === "string") {
        process.env[prop] = env[prop];
      } else if (typeof env[prop] === "object")
        process.env[prop] = `[${env[prop].toString()}]`;
    }
  }
}