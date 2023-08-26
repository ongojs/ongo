'use strict';

require("cluster").isMaster ? require('./master')() : require('./cluster')();
