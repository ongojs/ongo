
const Controller = require('../../../../src/modules/http-controller/src');
const {Red} = require('../../../../src/modules/couleurs')();

module.exports = (fnCommand = () => { }) => {
    switch (fnCommand(3)) {
        case "controller":
            const { make } = new Controller({ command: fnCommand (3) })
            if (fnCommand (4)) {
                if (fnCommand (5)) {
                    console.log(Red('EXTRA OPTIONS ARE NOT ALLOWED'));
                } else {
                    make(fnCommand (4))
                }
            } else {
                console.log(Red('make controller command'))
            }
            break;
        default:
            console.log(Red("invalid make command ..."));
            break;
    }
}