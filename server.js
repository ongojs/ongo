'use strict';
if (require("cluster").isMaster) {
    require('./master')();
} else {
    require('./cluster')()
}
