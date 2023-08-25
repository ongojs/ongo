// Copyright (c) 2023 Ericson S. Weah <ericsonweah.dev>
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the 'Software'), to
// deal in the Software without restriction, including without limitation the
// rights to use, copy, modify, merge, publish, distribute, sublicense, and/or
// sell copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
// ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
// WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.


"use strict";

/**
 *    @author Ericson Weah Dev  
 *    email: ericson.weah@ericsonweah.dev
 *    github: https://github.com/ericson-weah-dev
 *    phone: +1.385.204.5167
 *    Website: https://www.ericsonweah.dev
 *
 * @module DB
 * @kind class
 *
 * @extends Base
 * @requires Base
 *
 * @classdesc Model class
 */

require('../dotenv').config();
const { MongoClient } = require('mongodb');
const dbMethod = require('../database');
const admin = require('../admin');
const { ObjectId } = require('mongodb');
const { isArray, isValid, isValidObjectId, isObject, isString, isNumber, fileExists,isBoolean } = require('../helpers')();

/**
 * Represents a Model class that extends the base class.
 */
class DB extends require("../base") {
    /**
     * Constructs a new instance of the Model class.
     *
     * @param {...Object} arrayOfObjects - Additional objects containing options to be assigned to the model.
     */
    constructor(...arrayOfObjects) {
        super({ objectMode: true, encoding: "utf-8", autoDestroy: true });

        // Assign additional options to the model
        arrayOfObjects.forEach(option => {
            if (Object.keys(option).length > 0) {
                Object.keys(option).forEach((key) => {
                    if (!this[key]) this[key] = option[key];
                });
            }
        });

        // Auto bind methods of the model
        this.autobind(DB);

        // Auto invoke methods of the model
        // this.autoinvoker();

        // Add methods from other classes if they do not already exist
        this.methodizer(/**ClassList*/);

        // Set the maximum number of event listeners to infinity
        this.setMaxListeners(Infinity);
    }


    createCommandOptions(command, value) {
        return options => object => {
            options[command] = value
            return {
                ...options,
                ...object
            }
        }
    }

    /**
     * Manipulates an options object by adding a specific command and its value to it or merging it with another object.
     * 
     * @param {Object} options - The options object to be manipulated. (Default: {})
     * @param {string} command - The command to be added to the options object. (Default: 'createUser')
     * @param {string} value - The value associated with the command. (Default: 'name')
     * @param {Object} option - The object to be merged with the options object. (Default: {})
     * @returns {Object} A new object with the command added to the options or merged with the object.
     */
    options(options = {}, command = 'createUser', value = 'name', option = {}) {
        for (let key in options) {
            if (key === value) {
                option[command] = options[key];
            } else {
                option[key] = options[key];
            }
        }
        return option;
    }

    /**
     * Asynchronously executes a 'count' command on the specified collection with the provided options.
     * 
     * @param {Object} options - The options for the 'count' command. (Default: { collection: this.collection, query: {}, limit: 1, skip: 1, hint: '' | {}, readConcern: {}, collation: {}, comment: '' })
     * @param {function} fns - A callback function that is executed after the 'count' command. (Default: ()=> {})
     * @returns {Promise<number|string>} A Promise that resolves to the count of documents matching the query or a string indicating an error.
     */
    async count(options = { collection: this.collection, query: {}, limit: 1, skip: 1, hint: '' | {}, readConcern: {}, collation: {}, comment: '' }, fns = () => { }) {
        // Call the 'dbMethod' function to get the 'count' command function
        const fn = dbMethod(this)('command', fns, false, 'count');

        // Check if 'options' is not an object
        if (options && !isObject(options)) return 'Invalid options';
        // Extract 'count' specific options and create the countOptions object
        const countOptions = this.options(options, 'count', 'collection');

        // Execute the 'count' command and return the result
        return fn(countOptions);
    }

    /**
     * Asynchronously executes a 'buildInfo' command with the provided options.
     * 
     * @param {Object} options - The options for the 'buildInfo' command. (Default: {})
     * @param {function} fns - A callback function that is executed after the 'buildInfo' command. (Default: ()=> {})
     * @returns {Promise<Object|string>} A Promise that resolves to an object containing the build information or a string indicating an error.
     */
    async buildInfo(options = {}, fns = () => { }) {
        // Call the 'admin' function to get the 'buildInfo' command function
        const fn = admin(this)('buildInfo', fns);

        // Check if 'options' is not an object
        if (options && !isObject(options)) return 'Invalid options';

        // Execute the 'buildInfo' command and return the result
        return fn(options);
    }

    /**
     * Asynchronously executes a 'listDatabases' command with the provided options.
     * 
     * @param {Object} options - The options for the 'listDatabases' command. (Default: { listDatabases: 1 })
     * @param {function} fns - A callback function that is executed after the 'listDatabases' command. (Default: ()=> {})
     * @returns {Promise<Array<Object>|string>} A Promise that resolves to an array of database information objects or a string indicating an error.
     */

    async listDatabases(options = { listDatabases: 1 }, fns = () => { }) {
        // Call the 'admin' function to get the 'listDatabases' command function
        const fn = admin(this)('listDatabases', fns);

        // Check if 'options' is not an object
        if (options && !isObject(options)) return 'Invalid options';

        // Execute the 'listDatabases' command and return the result
        return fn(options);
    }

    /**
 * Asynchronously executes a 'serverInfo' command with the provided options.
 * 
 * @param {Object} options - The options for the 'serverInfo' command. (Default: { serverInfo: 1 })
 * @param {function} fns - A callback function that is executed after the 'serverInfo' command. (Default: ()=> {})
 * @returns {Promise<Object|string>} A Promise that resolves to an object containing server information or a string indicating an error.
 */

    async serverInfo(options = { serverInfo: 1 }, fns = () => { }) {
        // Call the 'admin' function to get the 'serverInfo' command function
        const fn = admin(this)('serverInfo', fns);

        // Check if 'options' is not an object
        if (options && !isObject(options)) return 'Invalid options';

        // Execute the 'serverInfo' command and return the result
        return fn(options);
    }


    /**
     * Asynchronously executes a 'ping' command with the provided options.
     * 
     * @param {Object} options - The options for the 'ping' command. (Default: { ping: 1 })
     * @param {function} fns - A callback function that is executed after the 'ping' command. (Default: ()=> {})
     * @returns {Promise<string|Object>} A Promise that resolves to a string 'pong' or an object containing additional response data, or a string indicating an error.
     */
    async ping(options = { ping: 1 }, fns = () => { }) {
        // Call the 'admin' function to get the 'ping' command function
        const fn = admin(this)('ping', fns);

        // Check if 'options' is not an object
        if (options && !isObject(options)) return 'Invalid options';

        // Execute the 'ping' command and return the result
        return fn(options);
    }

    /**
     * Asynchronously executes a 'serverStatus' command with the provided options.
     * 
     * @param {Object} options - The options for the 'serverStatus' command. (Default: { serverStatus: 1 })
     * @param {function} fns - A callback function that is executed after the 'serverStatus' command. (Default: ()=> {})
     * @returns {Promise<Object|string>} A Promise that resolves to an object containing server status information or a string indicating an error.
     */

    async serverStatus(options = { serverStatus: 1 }, fns = () => { }) {
        // Call the 'admin' function to get the 'serverStatus' command function
        const fn = admin(this)('serverStatus', fns);

        // Check if 'options' is not an object
        if (options && !isObject(options)) return 'Invalid options';

        // Execute the 'serverStatus' command and return the result
        return fn(options);
    }

    /**
     * Asynchronously executes a 'removeUser' command to remove a user from the specified database with the provided options.
     * 
     * @param {string} username - The username of the user to be removed. (Default: 'users')
     * @param {Object} options - The options for the 'removeUser' command. (Default: { removeUser: 1 })
     * @param {function} fns - A callback function that is executed after the 'removeUser' command. (Default: ()=> {})
     * @returns {Promise<Object|string>} A Promise that resolves to an object containing the command result or a string indicating an error.
     */

    async removeUser(username = 'users', options = { removeUser: 1 }, fns = () => { }) {
        // Call the 'admin' function to get the 'removeUser' command function
        const fn = admin(this)('removeUser', fns);

        // Check if 'options' is not an object
        if (options && !isObject(options)) return 'Invalid options';

        // Execute the 'removeUser' command and return the result
        return fn(username, options);
    }

    // async adminCommand(command = 'users', options = {removeUser: 1}, fns = () => {}){
    //     const fn = admin(this)('command', fns, 'adminCommand');

    //     if (options && !isObject(options)) return 'Invalid options';
    //     return fn(command,options);
    // }
    /**
     * Asynchronously executes an 'aggregate' command on the specified collection using the provided pipeline and options.
     * 
     * @param {Object} options - The options for the 'aggregate' command.
     * @param {number} options.collection - The collection to run the aggregation on. (Required)
     * @param {Array<Object>} options.pipeline - The aggregation pipeline to be executed. (Required)
     * @param {boolean} options.explain - If true, returns the aggregation execution plan. (Default: true)
     * @param {boolean} options.allowDiskUse - If true, enables writing data to temporary files during execution. (Default: true)
     * @param {Object} options.cursor - The cursor options. (Default: {})
     * @param {number} options.maxTimeMS - The maximum time to allow the command to run in milliseconds. (Default: 0)
     * @param {boolean} options.bypassDocumentValidation - If true, allows the write operation to bypass document validation. (Default: true)
     * @param {Object} options.readConcern - The read concern level for the operation. (Default: {})
     * @param {Object} options.collation - The collation to use for string comparison. (Default: {})
     * @param {Object|string} options.hint - The index hint for the aggregation query. (Default: {} | '')
     * @param {string} options.comment - A comment to include in the aggregation command. (Default: '')
     * @param {Object} options.writeConcern - The write concern for the operation. (Default: {})
     * @param {Object} options.let - The variables to use in the aggregation pipeline. (Default: {})
     * @param {function} fns - A callback function that is executed after the 'aggregate' command. (Default: ()=> {})
     * @returns {Promise<Object|string>} A Promise that resolves to the aggregation result or a string indicating an error.
     */
    async aggregate(options = { collection: 1, pipeline: [], explain: true, allowDiskUse: true, cursor: {}, maxTimeMS: 0, bypassDocumentValidation: true, readConcern: {}, collation: {}, hint: {} | '', comment: '', writeConcern: {}, let: {} }, fns = () => { }) {
        // Call the 'dbMethod' function to get the 'aggregate' command function
        const fn = dbMethod(this)('command', fns, false, 'aggregate');

        // Check if 'options' is not an object
        if (options && !isObject(options)) return 'Invalid options';

        // Extract 'aggregate' specific options and create the aggregateOptions object
        const aggregateOptions = this.options(options, 'aggregate', 'collection');

        // Execute the 'aggregate' command and return the result
        return fn(aggregateOptions);
    }

    /**
     * Asynchronously validates a collection in the database using the 'validateCollection' command with the provided options.
     * 
     * @param {string} collection - The name of the collection to be validated. (Default: 'users')
     * @param {Object} options - The options for the 'validateCollection' command. (Default: { validateCollection: 1 })
     * @param {function} fns - A callback function that is executed after the 'validateCollection' command. (Default: ()=> {})
     * @returns {Promise<Object|string>} A Promise that resolves to the validation result or a string indicating an error.
     */
    async validateCollection(collection = 'users', options = { validateCollection: 1 }, fns = () => { }) {
        // Call the 'admin' function to get the 'validateCollection' command function
        const fn = admin(this)('validateCollection', fns);

        // Check if 'options' is not an object
        if (options && !isObject(options)) return 'Invalid options';

        // Execute the 'validateCollection' command and return the result
        return fn(collection, options);
    }

    /**
     * Asynchronously retrieves distinct values for a specified field in a collection using the 'distinct' command with the provided options.
     * 
     * @param {Object} options - The options for the 'distinct' command.
     * @param {string} options.collection - The name of the collection to run the distinct operation on. (Default: 'users')
     * @param {string} options.key - The field for which to return distinct values. (Default: 'firstname')
     * @param {Object} options.query - The query that filters the documents. (Default: {})
     * @param {Object} options.readConcern - The read concern level for the operation. (Default: {})
     * @param {Object} options.collation - The collation to use for string comparison. (Default: {})
     * @param {string} options.comment - A comment to include in the distinct command. (Default: '')
     * @param {function} fns - A callback function that is executed after the 'distinct' command. (Default: ()=> {})
     * @returns {Promise<Array>|string>} A Promise that resolves to an array of distinct values or a string indicating an error.
     */
    async distinct(options = { collection: "users", key: "firstname", query: {}, readConcern: {}, collation: {}, comment: '' }, fns = () => { }) {
        // Call the 'dbMethod' function to get the 'distinct' command function
        const fn = dbMethod(this)('command', fns, false, 'distinct');

        // Check if 'options' is not an object
        if (options && !isObject(options)) return 'Invalid options';

        // Extract 'distinct' specific options and create the distinctOptions object
        const distinctOptions = this.options(options, 'distinct', 'collection');

        // Execute the 'distinct' command and return the result
        return fn(distinctOptions);
    }


    async mapReduce(options = {
        collection: this.collection,
        map: () => { },
        reduce: () => { },
        finalize: '',
        out: '' | {},
        query: {},
        sort: {},
        limit: 1,
        scope: {},
        jsMode: false,
        verbose: false,
        bypassDocumentValidation: true,
        collation: {},
        writeConcern: {},
        comment: ''
    }, fns = () => { }) {

        const fn = dbMethod(this)('command', fns, false, 'mapReduce');

        if (options && !isObject(options)) return 'Invalid options';
        const mapReduceOptions = this.options(options, 'mapReduce', 'collection');
        return fn(mapReduceOptions);

    }//todo 

    /**
     * Asynchronous method to perform delete operations in MongoDB.
     * 
     * @param {Object} options - The options object for the delete operation.
     * @param {string} options.collection - The name of the collection from which the documents will be deleted.
     * @param {Array} options.deletes - An array of delete operation details.
     * @param {Object} options.deletes.q - The query object to filter documents for deletion.
     * @param {number} options.deletes.limit - The maximum number of documents to delete for each operation.
     * @param {Object} options.deletes.collation - The collation rules for string comparison during the deletion.
     * @param {Object|String} options.deletes.hint - The index specification to use during the deletion.
     *                                             Pass an empty object `{}` for no hint or an empty string `''`.
     * @param {string} options.comment - Optional. A comment to associate with the delete operation.
     * @param {Object} options.let - Optional. Added in MongoDB 5.0. A variable to use in the delete pipeline stage.
     * @param {boolean} options.ordered - Optional. If set to `true`, the deletes will be executed in order and stop on error.
     *                                    If set to `false`, the deletes will continue even if an error occurs (unordered).
     * @param {Object} options.writeConcern - Optional. The write concern options for the delete operation.
     * @param {Function} fns - Optional. A function to execute before the delete operation (pre-hook).
     * @returns {Promise} - A promise that resolves with the result of the delete operation.
     *                     If options are invalid, the promise resolves with the string 'Invalid options'.
     */
    async delete(options = {
        collection: this.collection,
        deletes: [
            {
                q: {},
                limit: 1,
                collation: {},
                hint: {} | ''
            },
        ],
        comment: '',
        let: {}, // Added in MongoDB 5.0
        ordered: false,
        writeConcern: {}
    }, fns = () => { }) {
        const fn = dbMethod(this)('command', fns, false, 'delete');

        // Check if options is an object
        if (options && !isObject(options)) {
            return 'Invalid options';
        }

        // Extract and validate deleteOptions from the options object
        const deleteOptions = this.options(options, 'delete', 'collection');

        // Call the function 'fn' with deleteOptions and return the result
        return fn(deleteOptions);
    }

    /**
     * Asynchronous method to perform find operations in MongoDB.
     * 
     * @param {Object} options - The options object for the find operation.
     * @param {string} options.collection - The name of the collection from which to find documents.
     * @param {Object} options.filter - The query object to filter the documents.
     * @param {Object} options.sort - The sort order of the results.
     * @param {Object} options.projection - The projection specification to limit the fields returned.
     * @param {Object|String} options.hint - The index specification to use during the find operation.
     *                                       Pass an empty object `{}` for no hint or an empty string `''`.
     * @param {number} options.skip - The number of documents to skip before returning results.
     * @param {number} options.limit - The maximum number of documents to return.
     * @param {number} options.batchSize - The number of documents to return in each batch.
     * @param {boolean} options.singleBatch - If set to `true`, the find operation will return a single batch of results.
     * @param {string} options.comment - Optional. A comment to associate with the find operation.
     * @param {number} options.maxTimeMS - Optional. The maximum time in milliseconds for the find operation to run.
     * @param {Object} options.readConcern - Optional. The read concern level for the find operation.
     * @param {Object} options.max - Optional. The exclusive upper bound for a specific index.
     * @param {Object} options.min - Optional. The inclusive lower bound for a specific index.
     * @param {boolean} options.returnKey - Optional. If set to `true`, only the index key will be returned.
     * @param {boolean} options.showRecordId - Optional. If set to `true`, the server will return the record identifier.
     * @param {boolean} options.tailable - Optional. If set to `true`, the cursor will be tailable.
     * @param {boolean} options.oplogReplay - Optional. If set to `true`, the cursor will use the oplog for replay.
     * @param {boolean} options.noCursorTimeout - Optional. If set to `true`, the cursor will not timeout.
     * @param {boolean} options.awaitData - Optional. If set to `true`, the cursor will wait for data before returning.
     * @param {boolean} options.allowPartialResults - Optional. If set to `true`, partial results will be allowed.
     * @param {Object} options.collation - Optional. The collation rules for string comparison during the find operation.
     * @param {boolean} options.allowDiskUse - Optional. If set to `true`, allows disk use for storing temporary data.
     * @param {Object} options.let - Optional. Added in MongoDB 5.0. A variable to use in the find pipeline stage.
     * @param {Function} fns - Optional. A function to execute before the find operation (pre-hook).
     * @returns {Promise} - A promise that resolves with the result of the find operation.
     *                     If options are invalid, the promise resolves with the string 'Invalid options'.
     */
    async find(options = {
        collection: this.collection,
        filter: {},
        sort: {},
        projection: {},
        hint: {} | '',
        skip: 0,
        limit: 1,
        batchSize: 101,
        singleBatch: false,
        comment: '',
        maxTimeMS: 1000,
        readConcern: {},
        max: {},
        min: {},
        returnKey: false,
        showRecordId: true,
        tailable: true,
        oplogReplay: true,
        noCursorTimeout: true,
        awaitData: true,
        allowPartialResults: true,
        collation: {},
        allowDiskUse: true,
        let: {} // Added in MongoDB 5.0
    }, fns = () => { }) {
        const fn = dbMethod(this)('command', fns, false, 'find');

        // Check if options is an object
        if (options && !isObject(options)) {
            return 'Invalid options';
        }

        // Extract and validate findOptions from the options object
        const findOptions = this.options(options, 'find', 'collection');

        // Call the function 'fn' with findOptions and return the result
        return fn(findOptions);
    }


    /**
     * Asynchronous method to perform the findAndModify operation in MongoDB.
     * 
     * @param {Object} options - The options object for the findAndModify operation.
     * @param {string} options.collection - The name of the collection to perform the operation on.
     * @param {Object} options.query - The query object to filter the documents for the findAndModify operation.
     * @param {Object} options.sort - The sort order of the documents to find.
     * @param {boolean} options.remove - If set to `true`, the matching document will be removed. Default is `true`.
     * @param {Object|Array} options.update - The update object to apply to the matching document(s).
     *                                        Use an empty object `{}` for no updates or an array `[]` for multiple updates.
     * @param {boolean} options.new - If set to `true`, returns the modified document. Default is `true`.
     * @param {Object} options.fields - The projection specification to limit the fields returned for the modified document.
     * @param {boolean} options.upsert - If set to `true`, performs an upsert if no matching documents are found. Default is `true`.
     * @param {boolean} options.bypassDocumentValidation - If set to `true`, bypasses document validation during the operation.
     * @param {Object} options.writeConcern - The write concern options for the findAndModify operation.
     * @param {Object} options.collation - The collation rules for string comparison during the findAndModify operation.
     * @param {Array} options.arrayFilters - An array of filter documents that determine which array elements to modify.
     * @param {Object|String} options.hint - The index specification to use during the findAndModify operation.
     *                                       Pass an empty object `{}` for no hint or an empty string `''`.
     * @param {string} options.comment - Optional. A comment to associate with the findAndModify operation.
     * @param {Object} options.let - Optional. Added in MongoDB 5.0. A variable to use in the findAndModify pipeline stage.
     * @param {Function} fns - Optional. A function to execute before the findAndModify operation (pre-hook).
     * @returns {Promise} - A promise that resolves with the result of the findAndModify operation.
     *                     If options are invalid, the promise resolves with the string 'Invalid options'.
     */
    async findAndModify(options = {
        collection: this.collection,
        query: {},
        sort: {},
        remove: true,
        update: {} | [],
        new: true,
        fields: {},
        upsert: true,
        bypassDocumentValidation: true,
        writeConcern: {},
        collation: {},
        arrayFilters: [],
        hint: {} | '',
        comment: '',
        let: {} // Added in MongoDB 5.0
    }, fns = () => { }) {
        const fn = dbMethod(this)('command', fns, false, 'findAndModify');

        // Check if options is an object
        if (options && !isObject(options)) {
            return 'Invalid options';
        }

        // Extract and validate findAndModifyOptions from the options object
        const findAndModifyOptions = this.options(options, 'findAndModify', 'collection');

        // Call the function 'fn' with findAndModifyOptions and return the result
        return fn(findAndModifyOptions);
    }

    async getMore(options = { getMore: 34343, collection: 'users', batchSize: 101, maxTimeMS: 1000, comment: '' }, fns = () => { }) {

        const fn = dbMethod(this)('command', fns, false, 'getMore');

        if (options && !isObject(options)) return 'Invalid options';
        const getMoreOptions = this.options(options, 'getMore', 'collection');
        return fn(getMoreOptions);
    }//todo:

    /**
     * Asynchronous method to perform the insert operation in MongoDB.
     * 
     * @param {Object} options - The options object for the insert operation.
     * @param {string} options.collection - The name of the collection where documents will be inserted.
     * @param {Array} options.documents - An array of documents to be inserted into the collection.
     * @param {boolean} options.ordered - If set to `true`, the documents will be inserted in order and stop on error.
     *                                    If set to `false`, the insert will continue even if an error occurs (unordered).
     * @param {Object} options.writeConcern - The write concern options for the insert operation.
     * @param {boolean} options.bypassDocumentValidation - If set to `true`, bypasses document validation during the operation.
     * @param {string} options.comment - Optional. A comment to associate with the insert operation.
     * @param {Function} fns - Optional. A function to execute before the insert operation (pre-hook).
     * @returns {Promise} - A promise that resolves with the result of the insert operation.
     *                     If options are invalid, the promise resolves with the string 'Invalid options'.
     */
    async insert(options = {
        collection: this.collection,
        documents: [],
        ordered: true,
        writeConcern: {},
        bypassDocumentValidation: true,
        comment: '',
    }, fns = () => { }) {
        const fn = dbMethod(this)('command', fns, false, 'insert');

        // Check if options is an object
        if (options && !isObject(options)) {
            return 'Invalid options';
        }

        // Extract and validate insertOptions from the options object
        const insertOptions = this.options(options, 'insert', 'collection');

        // Call the function 'fn' with insertOptions and return the result
        return fn(insertOptions);
    }


    /**
     * Asynchronous method to perform update operations in MongoDB.
     * 
     * @param {Object} options - The options object for the update operation.
     * @param {string} options.collection - The name of the collection on which to perform the update operation.
     * @param {Array} options.updates - An array of update operation details.
     * @param {Object} options.updates.q - The query object to filter documents for the update operation.
     * @param {Object|Array} options.updates.u - The update object to apply to the matching document(s).
     *                                           Use an empty object `{}` for no updates or an array `[]` for multiple updates.
     * @param {Object} options.updates.c - Added in MongoDB 5.0. The criteria to determine whether to perform the update.
     * @param {boolean} options.updates.upsert - If set to `true`, performs an upsert if no matching documents are found.
     * @param {boolean} options.updates.multi - If set to `true`, updates multiple documents that match the query.
     * @param {Object} options.updates.collation - The collation rules for string comparison during the update operation.
     * @param {Array} options.updates.arrayFilters - An array of filter documents that determine which array elements to update.
     * @param {Object|String} options.updates.hint - The index specification to use during the update operation.
     *                                               Pass an empty object `{}` for no hint or an empty string `''`.
     * @param {boolean} options.ordered - If set to `true`, the updates will be executed in order and stop on error.
     *                                    If set to `false`, the updates will continue even if an error occurs (unordered).
     * @param {Object} options.writeConcern - The write concern options for the update operation.
     * @param {boolean} options.bypassDocumentValidation - If set to `true`, bypasses document validation during the operation.
     * @param {string} options.comment - Optional. A comment to associate with the update operation.
     * @param {Object} options.let - Optional. Added in MongoDB 5.0. A variable to use in the update pipeline stage.
     * @param {Function} fns - Optional. A function to execute before the update operation (pre-hook).
     * @returns {Promise} - A promise that resolves with the result of the update operation.
     *                     If options are invalid, the promise resolves with the string 'Invalid options'.
     */
    async update(options = {
        collection: this.collection,
        updates: [
            {
                q: {},
                u: {} | [],
                c: {}, // Added in MongoDB 5.0
                upsert: true,
                multi: true,
                collation: {},
                arrayFilters: [],
                hint: {} | ''
            },
        ],
        ordered: true,
        writeConcern: {},
        bypassDocumentValidation: true,
        comment: '',
        let: {} // Added in MongoDB 5.0
    }, fns = () => { }) {
        const fn = dbMethod(this)('command', fns, false, 'update');

        // Check if options is an object
        if (options && !isObject(options)) {
            return 'Invalid options';
        }

        // Extract and validate updateOptions from the options object
        const updateOptions = this.options(options, 'update', 'collection');

        // Call the function 'fn' with updateOptions and return the result
        return fn(updateOptions);
    }


    /**
     * Asynchronous method to perform the planCacheClear operation in MongoDB.
     * 
     * @param {Object} options - The options object for the planCacheClear operation.
     * @param {string} options.collection - The name of the collection on which to perform the planCacheClear operation.
     * @param {Object} options.query - The query object to filter the documents for the planCacheClear operation.
     * @param {Object} options.sort - The sort order of the documents to clear from the plan cache.
     * @param {Object} options.projection - The projection specification to limit the fields cleared from the plan cache.
     * @param {string} options.comment - Optional. A comment to associate with the planCacheClear operation.
     * @param {Function} fns - Optional. A function to execute before the planCacheClear operation (pre-hook).
     * @returns {Promise} - A promise that resolves with the result of the planCacheClear operation.
     *                     If options are invalid, the promise resolves with the string 'Invalid options'.
     */
    async planCacheClear(options = {
        collection: this.collection,
        query: {},
        sort: {},
        projection: {},
        comment: ''
    }, fns = () => { }) {
        const fn = dbMethod(this)('command', fns, false, 'planCacheClear');

        // Check if options is an object
        if (options && !isObject(options)) {
            return 'Invalid options';
        }

        // Extract and validate planCacheClearOptions from the options object
        const planCacheClearOptions = this.options(options, 'planCacheClear', 'collection');

        // Call the function 'fn' with planCacheClearOptions and return the result
        return fn(planCacheClearOptions);
    }


    /**
     * Asynchronous method to perform the planCacheClearFilters operation in MongoDB.
     * 
     * @param {Object} options - The options object for the planCacheClearFilters operation.
     * @param {string} options.collection - The name of the collection on which to perform the planCacheClearFilters operation.
     * @param {Object} options.query - The query object to filter the documents for the planCacheClearFilters operation.
     * @param {Object} options.sort - The sort order of the documents to clear filters from the plan cache.
     * @param {Object} options.projection - The projection specification to limit the fields cleared from the plan cache.
     * @param {Object} options.collation - The collation rules for string comparison during the planCacheClearFilters operation.
     * @param {string} options.comment - Optional. A comment to associate with the planCacheClearFilters operation.
     * @param {Function} fns - Optional. A function to execute before the planCacheClearFilters operation (pre-hook).
     * @returns {Promise} - A promise that resolves with the result of the planCacheClearFilters operation.
     *                     If options are invalid, the promise resolves with the string 'Invalid options'.
     */
    async planCacheClearFilters(options = {
        collection: this.collection,
        query: {},
        sort: {},
        projection: {},
        collation: {},
        comment: ''
    }, fns = () => { }) {
        const fn = dbMethod(this)('command', fns, false, 'planCacheClearFilters');

        // Check if options is an object
        if (options && !isObject(options)) {
            return 'Invalid options';
        }

        // Extract and validate planCacheClearFiltersOptions from the options object
        const planCacheClearFiltersOptions = this.options(options, 'planCacheClearFilters', 'collection');

        // Call the function 'fn' with planCacheClearFiltersOptions and return the result
        return fn(planCacheClearFiltersOptions);
    }



    /**
     * Asynchronous method to perform the planCacheListFilters operation in MongoDB.
     * 
     * @param {Object} options - The options object for the planCacheListFilters operation.
     * @param {string} options.collection - The name of the collection on which to perform the planCacheListFilters operation.
     * @param {string} options.comment - Optional. A comment to associate with the planCacheListFilters operation.
     * @param {Function} fns - Optional. A function to execute before the planCacheListFilters operation (pre-hook).
     * @returns {Promise} - A promise that resolves with the result of the planCacheListFilters operation.
     *                     If options are invalid, the promise resolves with the string 'Invalid options'.
     */
    async planCacheListFilters(options = {
        collection: this.collection,
        comment: ''
    }, fns = () => { }) {
        const fn = dbMethod(this)('command', fns, false, 'planCacheListFilters');

        // Check if options is an object
        if (options && !isObject(options)) {
            return 'Invalid options';
        }

        // Extract and validate planCacheListFiltersOptions from the options object
        const planCacheListFiltersOptions = this.options(options, 'planCacheListFilters', 'collection');

        // Call the function 'fn' with planCacheListFiltersOptions and return the result
        return fn(planCacheListFiltersOptions);
    }


    /**
     * Asynchronous method to perform the planCacheSetFilter operation in MongoDB.
     * 
     * @param {Object} options - The options object for the planCacheSetFilter operation.
     * @param {string} options.collection - The name of the collection on which to perform the planCacheSetFilter operation.
     * @param {Object} options.query - The query object to filter the documents for the planCacheSetFilter operation.
     * @param {Object} options.sort - The sort order of the documents to set the plan cache filter.
     * @param {Object} options.projection - The projection specification to limit the fields set as the plan cache filter.
     * @param {Object} options.collation - The collation rules for string comparison during the planCacheSetFilter operation.
     * @param {Array} options.indexes - An array of index specifications to set as the plan cache filter.
     * @param {string} options.comment - Optional. A comment to associate with the planCacheSetFilter operation.
     * @param {Function} fns - Optional. A function to execute before the planCacheSetFilter operation (pre-hook).
     * @returns {Promise} - A promise that resolves with the result of the planCacheSetFilter operation.
     *                     If options are invalid, the promise resolves with the string 'Invalid options'.
     */
    async planCacheSetFilter(options = {
        collection: this.collection,
        query: {},
        sort: {},
        projection: {},
        collation: {},
        indexes: [],
        comment: ''
    }, fns = () => { }) {
        const fn = dbMethod(this)('command', fns, false, 'planCacheSetFilter');

        // Check if options is an object
        if (options && !isObject(options)) {
            return 'Invalid options';
        }

        // Extract and validate planCacheSetFilterOptions from the options object
        const planCacheSetFilterOptions = this.options(options, 'planCacheSetFilter', 'collection');

        // Call the function 'fn' with planCacheSetFilterOptions and return the result
        return fn(planCacheSetFilterOptions);
    }

    // DATABASE OPERATIONS


    // Authentication Commands

    async authenticate(options = { authenticate: 1, user: "your_username", pwd: "your_password" }, fns = () => { }) {
        const fn = admin(this)('command', fns, false, 'authenticate');

        if (options && !isObject(options)) return 'Invalid options';
        const authenticateOptions = this.options(options, 'authenticate', 'level');
        // console.log(authenticateOptions)
        return fn(authenticateOptions);
    }//todo: BSON field 'authenticate.pwd' is an unknown field.

    /**
 * Asynchronous method to perform the logout operation in MongoDB.
 * 
 * @param {Object} options - The options object for the logout operation.
 * @param {number} options.level - Optional. The logout level to specify the scope of the logout operation.
 *                                 Default is 1 (logout from the current database).
 * @param {Function} fns - Optional. A function to execute before the logout operation (pre-hook).
 * @returns {Promise} - A promise that resolves with the result of the logout operation.
 *                     If options are invalid, the promise resolves with the string 'Invalid options'.
 */
    async logout(options = { level: 1 }, fns = () => { }) {
        const fn = dbMethod(this)('command', fns, false, 'logout');

        // Check if options is an object
        if (options && !isObject(options)) {
            return 'Invalid options';
        }

        // Extract and validate logoutOptions from the options object
        const logoutOptions = this.options(options, 'logout', 'level');

        // Call the function 'fn' with logoutOptions and return the result
        return fn(logoutOptions);
    }

    // Replication Commands 
    //   async appendOplogNote(){}

    async hello(options = { level: 1, saslSupportedMechs: "", comment: '' }, fns = () => { }) {
        const fn = dbMethod(this)('command', fns, false, 'hello');

        if (options && !isObject(options)) return 'Invalid options';
        const helloOptions = this.options(options, 'hello', 'level');
        return fn(helloOptions);
    }//todo: UserName must contain a '.' separated database.user pair

    /**
     * Asynchronous method to perform the replSetAbortPrimaryCatchUp operation in MongoDB.
     * 
     * @param {Object} options - The options object for the replSetAbortPrimaryCatchUp operation.
     * @param {number} options.level - Optional. The level of the operation, specifying the scope of the action.
     *                                 Default is 1 (replSetAbortPrimaryCatchUp at the current database).
     * @param {Function} fns - Optional. A function to execute before the replSetAbortPrimaryCatchUp operation (pre-hook).
     * @returns {Promise} - A promise that resolves with the result of the replSetAbortPrimaryCatchUp operation.
     *                     If options are invalid, the promise resolves with the string 'Invalid options'.
     */
    async replSetAbortPrimaryCatchUp(options = { level: 1 }, fns = () => { }) {
        const fn = dbMethod(this)('command', fns, false, 'replSetAbortPrimaryCatchUp');

        // Check if options is an object
        if (options && !isObject(options)) {
            return 'Invalid options';
        }

        // Extract and validate replSetAbortPrimaryCatchUpOptions from the options object
        const replSetAbortPrimaryCatchUpOptions = this.options(options, 'replSetAbortPrimaryCatchUp', 'level');

        // Call the function 'fn' with replSetAbortPrimaryCatchUpOptions and return the result
        return fn(replSetAbortPrimaryCatchUpOptions);
    }

    /**
     * Asynchronous method to perform the replSetFreeze operation in MongoDB.
     * 
     * @param {Object} options - The options object for the replSetFreeze operation.
     * @param {number} options.duration - Optional. The duration in seconds to freeze the replica set.
     *                                    Default is 1 second.
     * @param {Function} fns - Optional. A function to execute before the replSetFreeze operation (pre-hook).
     * @returns {Promise} - A promise that resolves with the result of the replSetFreeze operation.
     *                     If options are invalid, the promise resolves with the string 'Invalid options'.
     */
    async replSetFreeze(options = { duration: 1 }, fns = () => { }) {
        const fn = dbMethod(this)('command', fns, false, 'replSetFreeze');

        // Check if options is an object
        if (options && !isObject(options)) {
            return 'Invalid options';
        }

        // Extract and validate replSetFreezeOptions from the options object
        const replSetFreezeOptions = this.options(options, 'replSetFreeze', 'duration');

        // Call the function 'fn' with replSetFreezeOptions and return the result
        return fn(replSetFreezeOptions);
    }
    async replSetGetConfig() { }

    /**
     * Asynchronous method to perform the replSetGetStatus operation in MongoDB.
     * 
     * @param {Object} options - The options object for the replSetGetStatus operation.
     * @param {number} options.status - Optional. The level of status information to retrieve for the replica set.
     *                                  Default is 1 (returns basic status information).
     * @param {Function} fns - Optional. A function to execute before the replSetGetStatus operation (pre-hook).
     * @returns {Promise} - A promise that resolves with the result of the replSetGetStatus operation.
     *                     If options are invalid, the promise resolves with the string 'Invalid options'.
     */
    async replSetGetStatus(options = { status: 1 }, fns = () => { }) {
        const fn = dbMethod(this)('command', fns, false, 'replSetGetStatus');

        // Check if options is an object
        if (options && !isObject(options)) {
            return 'Invalid options';
        }

        // Extract and validate replSetGetStatusOptions from the options object
        const replSetGetStatusOptions = this.options(options, 'replSetGetStatus', 'status');

        // Call the function 'fn' with replSetGetStatusOptions and return the result
        return fn(replSetGetStatusOptions);
    }


    /**
     * Asynchronous method to perform the replSetInitiate operation in MongoDB.
     * 
     * @param {Object} options - The options object for the replSetInitiate operation.
     * @param {Object} options.config_document - Optional. The configuration document for the replica set initiation.
     *                                            Default is an empty object `{}`.
     * @param {Function} fns - Optional. A function to execute before the replSetInitiate operation (pre-hook).
     * @returns {Promise} - A promise that resolves with the result of the replSetInitiate operation.
     *                     If options are invalid, the promise resolves with the string 'Invalid options'.
     */
    async replSetInitiate(options = { config_document: {} }, fns = () => { }) {
        const fn = dbMethod(this)('command', fns, false, 'replSetInitiate');

        // Check if options is an object
        if (options && !isObject(options)) {
            return 'Invalid options';
        }

        // Extract and validate replSetInitiateOptions from the options object
        const replSetInitiateOptions = this.options(options, 'replSetInitiate', 'config_document');

        // Call the function 'fn' with replSetInitiateOptions and return the result
        return fn(replSetInitiateOptions);
    }

    /**
     * Asynchronous method to perform the replSetMaintenance operation in MongoDB.
     * 
     * @param {Object} options - The options object for the replSetMaintenance operation.
     * @param {number} options.status - Optional. The status code for the replica set maintenance operation.
     *                                  Default is 0 (enable normal operations on the replica set).
     * @param {Function} fns - Optional. A function to execute before the replSetMaintenance operation (pre-hook).
     * @returns {Promise} - A promise that resolves with the result of the replSetMaintenance operation.
     *                     If options are invalid, the promise resolves with the string 'Invalid options'.
     */
    async replSetMaintenance(options = { status: 0 }, fns = () => { }) {
        const fn = dbMethod(this)('command', fns, false, 'replSetMaintenance');

        // Check if options is an object
        if (options && !isObject(options)) {
            return 'Invalid options';
        }

        // Extract and validate replSetMaintenanceOptions from the options object
        const replSetMaintenanceOptions = this.options(options, 'replSetMaintenance', 'status');

        // Call the function 'fn' with replSetMaintenanceOptions and return the result
        return fn(replSetMaintenanceOptions);
    }


    /**
   * Asynchronous method to perform the replSetReconfig operation in MongoDB.
   * 
   * @param {Object} options - The options object for the replSetReconfig operation.
   * @param {Object} options.new_config_document - Optional. The new configuration document for the replica set.
   *                                               Default is an empty object `{}`.
   * @param {boolean} options.force - Optional. Whether to force the replica set reconfiguration.
   *                                  Default is false (reconfiguration is not forced).
   * @param {number} options.maxTimeMS - Optional. The maximum time in milliseconds to wait for the operation to complete.
   *                                     Default is 1000 milliseconds (1 second).
   * @param {Function} fns - Optional. A function to execute before the replSetReconfig operation (pre-hook).
   * @returns {Promise} - A promise that resolves with the result of the replSetReconfig operation.
   *                     If options are invalid, the promise resolves with the string 'Invalid options'.
   */
    async replSetReconfig(options = {
        new_config_document: {},
        force: false,
        maxTimeMS: 1000
    }, fns = () => { }) {
        const fn = dbMethod(this)('command', fns, false, 'replSetReconfig');

        // Check if options is an object
        if (options && !isObject(options)) {
            return 'Invalid options';
        }

        // Extract and validate replSetReconfigOptions from the options object
        const replSetReconfigOptions = this.options(options, 'replSetReconfig', 'new_config_document');

        // Call the function 'fn' with replSetReconfigOptions and return the result
        return fn(replSetReconfigOptions);
    }
    async replSetResizeOplog() { }
    async replSetStepDown() { }
    async replSetSyncFrom() { }

    // Sharding Commands

    async abortReshardCollection() { }
    async addShard() { }
    async addShardToZone() { }
    async balancerCollectionStatus() { }
    async balancerStart() { }
    async balancerStatus() { }
    async balancerStop() { }
    async clearJumboFlag() { }

    /**
     * Asynchronous method to perform the cleanupOrphaned operation in MongoDB.
     * 
     * @param {Object} options - The options object for the cleanupOrphaned operation.
     * @param {string} options.namespace - Optional. The namespace to specify the database and collection for orphaned documents cleanup.
     *                                     Default is "${this.db}.${this.collection}", where this.db and this.collection are assumed to be available in the context of this method.
     * @param {Function} fns - Optional. A function to execute before the cleanupOrphaned operation (pre-hook).
     * @returns {Promise} - A promise that resolves with the result of the cleanupOrphaned operation.
     *                     If options are invalid, the promise resolves with the string 'Invalid options'.
     */
    async cleanupOrphaned(options = { namespace: `${this.db}.${this.collection}` }, fns = () => { }) {
        const fn = dbMethod(this)('command', fns, false, 'cleanupOrphaned');

        // Check if options is an object
        if (options && !isObject(options)) {
            return 'Invalid options';
        }

        // Extract and validate cleanupOrphanedOptions from the options object
        const cleanupOrphanedOptions = this.options(options, 'cleanupOrphaned', 'namespace');

        // Call the function 'fn' with cleanupOrphanedOptions and return the result
        return fn(cleanupOrphanedOptions);
    }
    async cleanupReshardCollection() { }
    async commitReshardCollection() { }
    async configureCollectionBalancing() { }

    /**
     * Asynchronous method to perform the enableSharding operation in MongoDB.
     * 
     * @param {Object} options - The options object for the enableSharding operation.
     * @param {string} options.database - Optional. The name of the database to enable sharding on.
     *                                     Default is this.db, where this.db is assumed to be available in the context of this method.
     * @param {Function} fns - Optional. A function to execute before the enableSharding operation (pre-hook).
     * @returns {Promise} - A promise that resolves with the result of the enableSharding operation.
     *                     If options are invalid, the promise resolves with the string 'Invalid options'.
     */
    async enableSharding(options = { database: this.db }, fns = () => { }) {
        const fn = dbMethod(this)('command', fns, false, 'enableSharding');

        // Check if options is an object
        if (options && !isObject(options)) {
            return 'Invalid options';
        }

        // Extract and validate enableShardingOptions from the options object
        const enableShardingOptions = this.options(options, 'enableSharding', 'database');

        // Call the function 'fn' with enableShardingOptions and return the result
        return fn(enableShardingOptions);
    }

    /**
     * Asynchronous method to perform the isMaster operation in MongoDB.
     * 
     * @param {Object} options - The options object for the isMaster operation.
     * @param {string} options.database - Optional. The name of the database to check for the master status.
     *                                     Default is this.db, where this.db is assumed to be available in the context of this method.
     * @param {Function} fns - Optional. A function to execute before the isMaster operation (pre-hook).
     * @returns {Promise} - A promise that resolves with the result of the isMaster operation.
     *                     If options are invalid, the promise resolves with the string 'Invalid options'.
     */
    async isMaster(options = { database: this.db }, fns = () => { }) {
        const fn = dbMethod(this)('command', fns, false, 'isMaster');

        // Check if options is an object
        if (options && !isObject(options)) {
            return 'Invalid options';
        }

        // Extract and validate isMasterOptions from the options object
        const isMasterOptions = this.options(options, 'isMaster', 'database');

        // Call the function 'fn' with isMasterOptions and return the result
        return fn(isMasterOptions);
    }

    async flushRouterConfig() { }

    async getShardMap(string = "getShardMap", fns = () => { }) {

        const fn = dbMethod(this)('command', fns, false, 'getShardMap');
        return fn('getShardMap');
    }//todo no such command: '0'


    // Use Hello
    async isdbgrid(options = { status: 1 }, fns = () => { }) {

        const fn = dbMethod(this)('command', fns, false, 'isdbgrid');

        if (options && !isObject(options)) return 'Invalid options';
        const isdbgridOptions = this.options(options, 'isdbgrid', 'status');
        return fn(isdbgridOptions);
    }//todo: no such command: 'isdbgrid'

    async listShards(options = { status: 1 }, fns = () => { }) {


        const fn = dbMethod(this)('command', fns, false, 'listShards');

        if (options && !isObject(options)) return 'Invalid options';
        const listShardsOptions = this.options(options, 'listShards', 'status');
        return fn(listShardsOptions);
    }//todo: no such command: 'listShards'

    // Administration Commands

    /**
     * Asynchronous method to perform the cloneCollectionAsCapped operation in MongoDB.
     * 
     * @param {Object} options - The options object for the cloneCollectionAsCapped operation.
     * @param {string} options.collection - Optional. The name of the source collection to be cloned as a capped collection.
     *                                      Default is this.collection, where this.collection is assumed to be available in the context of this method.
     * @param {string} options.toCollection - Optional. The name of the new capped collection to be created as a clone.
     *                                        Default is 'newusers'.
     * @param {number} options.size - Optional. The size in bytes to set as the capped collection size.
     *                                 Default is 1000 bytes.
     * @param {Object} options.writeConcern - Optional. The write concern for the operation.
     *                                        Default is an empty object `{}`.
     * @param {string} options.comment - Optional. A comment to describe the purpose of the operation.
     *                                    Default is an empty string.
     * @param {Function} fns - Optional. A function to execute before the cloneCollectionAsCapped operation (pre-hook).
     * @returns {Promise} - A promise that resolves with the result of the cloneCollectionAsCapped operation.
     *                     If options are invalid, the promise resolves with the string 'Invalid options'.
     */
    async cloneCollectionAsCapped(options = {
        collection: this.collection,
        toCollection: 'newusers',
        size: 1000,
        writeConcern: {},
        comment: ''
    }, fns = () => { }) {
        const fn = dbMethod(this)('command', fns, false, 'cloneCollectionAsCapped');

        // Check if options is an object
        if (options && !isObject(options)) {
            return 'Invalid options';
        }

        // Extract and validate cloneCollectionAsCappedOptions from the options object
        const cloneCollectionAsCappedOptions = this.options(options, 'cloneCollectionAsCapped', 'collection');

        // Call the function 'fn' with cloneCollectionAsCappedOptions and return the result
        return fn(cloneCollectionAsCappedOptions);
    }

    /**
     * Asynchronous method to perform the collMod operation in MongoDB.
     * 
     * @param {Object} options - The options object for the collMod operation.
     * @param {string} options.collection - Optional. The name of the collection to modify.
     *                                      Default is this.collection, where this.collection is assumed to be available in the context of this method.
     * @param {Function} fns - Optional. A function to execute before the collMod operation (pre-hook).
     * @returns {Promise} - A promise that resolves with the result of the collMod operation.
     *                     If options are invalid, the promise resolves with the string 'Invalid options'.
     */
    async collMod(options = { collection: this.collection/*, option1: 'value1', option2: 'value2'*/ }, fns = () => { }) {
        const fn = dbMethod(this)('command', fns, false, 'collMod');

        // Check if options is an object
        if (options && !isObject(options)) {
            return 'Invalid options';
        }

        // Extract and validate collModOptions from the options object
        const collModOptions = this.options(options, 'collMod', 'collection');

        // Call the function 'fn' with collModOptions and return the result
        return fn(collModOptions);
    }


    /**
     * Asynchronous method to perform the compact operation in MongoDB.
     * 
     * @param {Object} options - The options object for the compact operation.
     * @param {string} options.collection - Optional. The name of the collection to compact.
     *                                      Default is this.collection, where this.collection is assumed to be available in the context of this method.
     * @param {string} options.comment - Optional. A comment to describe the purpose of the compact operation.
     *                                    Default is an empty string.
     * @param {Function} fns - Optional. A function to execute before the compact operation (pre-hook).
     * @returns {Promise} - A promise that resolves with the result of the compact operation.
     *                     If options are invalid, the promise resolves with the string 'Invalid options'.
     */
    async compact(options = { collection: this.collection, comment: '' }, fns = () => { }) {
        const fn = dbMethod(this)('command', fns, false, 'compact');

        // Check if options is an object
        if (options && !isObject(options)) return 'Invalid options';

        // Extract and validate compactOptions from the options object
        const compactOptions = this.options(options, 'compact', 'collection');

        // Call the function 'fn' with compactOptions and return the result
        return fn(compactOptions);
    }


    /**
     * Asynchronous method to perform the compactStructuredEncryptionData operation in MongoDB.
     * 
     * @param {Object} options - The options object for the compactStructuredEncryptionData operation.
     * @param {string} options.collection - Optional. The name of the collection to compact its structured encryption data.
     *                                      Default is this.collection, where this.collection is assumed to be available in the context of this method.
     * @param {Object} options.compactionTokens - Optional. An object containing compaction tokens for structured encryption data.
     *                                             Default is an empty object `{}`.
     * @param {Function} fns - Optional. A function to execute before the compactStructuredEncryptionData operation (pre-hook).
     * @returns {Promise} - A promise that resolves with the result of the compactStructuredEncryptionData operation.
     *                     If options are invalid, the promise resolves with the string 'Invalid options'.
     */
    async compactStructuredEncryptionData(options = {
        collection: this.collection,
        compactionTokens: {}
    }, fns = () => { }) {
        const fn = dbMethod(this)('command', fns, false, 'compactStructuredEncryptionData');

        // Check if options is an object
        if (options && !isObject(options)) {
            return 'Invalid options';
        }

        // Extract and validate compactStructuredEncryptionDataOptions from the options object
        const compactStructuredEncryptionDataOptions = this.options(options, 'compactStructuredEncryptionData', 'collection');

        // Call the function 'fn' with compactStructuredEncryptionDataOptions and return the result
        return fn(compactStructuredEncryptionDataOptions);
    }//todo: may not be a todo: Queryable Encryption is only supported when FCV supports 6.0


    //Do Not Run This Command In Sharded Clusters
    /**
     * Asynchronous method to perform the convertToCapped operation in MongoDB.
     * 
     * @param {Object} options - The options object for the convertToCapped operation.
     * @param {string} options.collection - Optional. The name of the collection to convert to a capped collection.
     *                                      Default is this.collection, where this.collection is assumed to be available in the context of this method.
     * @param {number} options.size - Optional. The size in bytes to set as the maximum size of the capped collection.
     *                                 Default is 190 bytes.
     * @param {Object} options.writeConcern - Optional. The write concern for the operation.
     *                                        Default is an empty object `{}`.
     * @param {string} options.comment - Optional. A comment to describe the purpose of the convertToCapped operation.
     *                                    Default is an empty string.
     * @param {Function} fns - Optional. A function to execute before the convertToCapped operation (pre-hook).
     * @returns {Promise} - A promise that resolves with the result of the convertToCapped operation.
     *                     If options are invalid, the promise resolves with the string 'Invalid options'.
     */
    async convertToCapped(options = {
        collection: this.collection,
        size: 190,
        writeConcern: {},
        comment: ''
    }, fns = () => { }) {
        const fn = dbMethod(this)('command', fns, false, 'convertToCapped');

        // Check if options is an object
        if (options && !isObject(options)) {
            return 'Invalid options';
        }

        // Extract and validate convertToCappedOptions from the options object
        const convertToCappedOptions = this.options(options, 'convertToCapped', 'collection');

        // Call the function 'fn' with convertToCappedOptions and return the result
        return fn(convertToCappedOptions);
    }

    /**
     * Asynchronous method to perform the create operation in MongoDB.
     * 
     * @param {Object} options - The options object for the create operation.
     * @param {string} options.create - Optional. The name of the collection to be created.
     *                                  Default is this.collection, where this.collection is assumed to be available in the context of this method.
     * @param {boolean} options.capped - Optional. Specifies whether the collection should be a capped collection.
     *                                   Default is false.
     * @param {Object} options.timeseries - Optional. An object that configures the collection as a time-series collection.
     *                                      Default is an empty object {}.
     * @param {string} options.timeseries.timeField - Optional. The name of the field that stores the time value in time-series collections.
     *                                                Default is 'timeField'.
     * @param {string} options.timeseries.metaField - Optional. The name of the field that stores the metadata in time-series collections.
     *                                                Default is 'metaField'.
     * @param {string} options.timeseries.granularity - Optional. The time granularity for time-series collections (e.g., 'seconds', 'minutes', 'hours', etc.).
     *                                                  Default is 'seconds'.
     * @param {number} options.expireAfterSeconds - Optional. The number of seconds after which documents in the collection expire.
     *                                              Default is 1000 seconds.
     * @param {Object} options.clusteredIndex - Optional. An object to configure a clustered index for the collection (Added in MongoDB 5.3).
     *                                           Default is an empty object {}.
     * @param {Object} options.changeStreamPreAndPostImages - Optional. An object to configure change stream pre-and-post images (Added in MongoDB 6.0).
     *                                                       Default is an empty object {}.
     * @param {boolean} options.autoIndexId - Optional. Specifies whether to automatically create an index on the _id field.
     *                                         Default is true.
     * @param {number} options.size - Optional. The size in bytes to set as the maximum size of a capped collection.
     *                                Default is 100 bytes.
     * @param {number} options.max - Optional. The maximum number of documents allowed in a capped collection.
     *                               Default is 999999999 (almost unlimited).
     * @param {Object} options.storageEngine - Optional. An object to configure the storage engine for the collection.
     *                                         Default is an empty object {}.
     * @param {Object} options.validator - Optional. An object to define the validation rules for documents in the collection.
     *                                     Default is an empty object {}.
     * @param {string} options.validationLevel - Optional. The validation level for the collection ('off', 'strict', or 'moderate').
     *                                           Default is 'off'.
     * @param {string} options.validationAction - Optional. The validation action for the collection ('error' or 'warn').
     *                                            Default is 'warn'.
     * @param {Object} options.indexOptionDefaults - Optional. An object to configure the index options for the collection.
     *                                               Default is an empty object {}.
     * @param {string} options.viewOn - Optional. The name of the source collection for creating a view.
     *                                   Default is 'source collection'.
     * @param {Array} options.pipeline - Optional. An array of aggregation pipeline stages for creating a view.
     *                                    Default is an empty array [].
     * @param {Object} options.collation - Optional. An object to specify collation for string comparison.
     *                                      Default is an empty object {}.
     * @param {Object} options.writeConcern - Optional. The write concern for the operation.
     *                                        Default is an empty object {}.
     * @param {Object} options.encryptedFields - Optional. An object to configure field-level encryption for the collection.
     *                                            Default is an empty object {}.
     * @param {string} options.comment - Optional. A comment to describe the purpose of the create operation.
     *                                    Default is an empty string.
     * @param {Function} fns - Optional. A function to execute before the create operation (pre-hook).
     * @returns {Promise} - A promise that resolves with the result of the create operation.
     *                     If options are invalid, the promise resolves with the string 'Invalid options'.
     */
    async create(options = {
        create: this.collection,
        capped: false,
        timeseries: {
            timeField: 'timeField',
            metaField: 'metaField',
            granularity: 'seconds'
        },
        expireAfterSeconds: 1000,
        clusteredIndex: {},
        changeStreamPreAndPostImages: {},
        autoIndexId: true,
        size: 100,
        max: 999999999,
        storageEngine: {},
        validator: {},
        validationLevel: 'off',
        validationAction: 'warn',
        indexOptionDefaults: {},
        viewOn: 'source collection',
        pipeline: [],
        collation: {},
        writeConcern: {},
        encryptedFields: {},
        comment: ""
    }, fns = () => { }) {
        const fn = dbMethod(this)('command', fns, false, 'create');

        // Check if options is an object
        if (options && !isObject(options)) {
            return 'Invalid options';
        }

        // Extract and validate createOptions from the options object
        const createOptions = this.options(options, 'create', 'collection');

        // Call the function 'fn' with createOptions and return the result
        return fn(createOptions);
    }

    /**
     * Asynchronous method to perform the createIndexes operation in MongoDB.
     * 
     * @param {Object} options - The options object for the createIndexes operation.
     * @param {string} options.collection - Optional. The name of the collection for which indexes will be created.
     *                                      Default is this.collection, where this.collection is assumed to be available in the context of this method.
     * @param {Array} options.indexes - Optional. An array of index specification objects to be created in the collection.
     *                                  Each index specification object should contain a 'key' field, and a 'name' field (index name).
     *                                  Additional index options can be added as properties in the index specification object.
     *                                  Default is an empty array [].
     * @param {Object} options.writeConcern - Optional. The write concern for the operation.
     *                                        Default is an empty object {}.
     * @param {string} options.commitQuorum - Optional. The commit quorum option for the createIndexes operation ('majority' or a number).
     *                                        Default is 'majority'.
     * @param {string} options.comment - Optional. A comment to describe the purpose of the createIndexes operation.
     *                                    Default is an empty string.
     * @param {Function} fns - Optional. A function to execute before the createIndexes operation (pre-hook).
     * @returns {Promise} - A promise that resolves with the result of the createIndexes operation.
     *                     If options are invalid, the promise resolves with the string 'Invalid options'.
     */
    async createIndexes(options = {
        collection: this.collection,
        indexes: [{ key: {}, name: 'index_name', /** option, option, ... */ }],
        writeConcern: {},
        commitQuorum: 'majority',
        comment: ""
    }, fns = () => { }) {
        const fn = dbMethod(this)('command', fns, false, 'createIndexes');

        // Check if options is an object
        if (options && !isObject(options)) {
            return 'Invalid options';
        }

        // Extract and validate createIndexesOptions from the options object
        const createIndexesOptions = this.options(options, 'createIndexes', 'collection');

        // Call the function 'fn' with createIndexesOptions and return the result
        return fn(createIndexesOptions);
    }

    /**
     * Asynchronous method to perform the drop operation in MongoDB.
     * 
     * @param {Object} options - The options object for the drop operation.
     * @param {string} options.collection - Optional. The name of the collection to be dropped.
     *                                      Default is this.collection, where this.collection is assumed to be available in the context of this method.
     * @param {Object} options.writeConcern - Optional. The write concern for the operation.
     *                                        Default is an empty object {}.
     * @param {string} options.comment - Optional. A comment to describe the purpose of the drop operation.
     *                                    Default is an empty string.
     * @param {Function} fns - Optional. A function to execute before the drop operation (pre-hook).
     * @returns {Promise} - A promise that resolves with the result of the drop operation.
     *                     If options are invalid, the promise resolves with the string 'Invalid options'.
     */

    async drop(options = { collection: this.collection, writeConcern: {}, comment: '' }, fns = () => { }) {

        const fn = dbMethod(this)('command', fns, false, 'drop');

        // Check if options is an object
        if (options && !isObject(options)) return 'Invalid options';

        // Extract and validate dropOptions from the options object
        const dropOptions = this.options(options, 'drop', 'collection');

        // Call the function 'fn' with dropOptions and return the result
        return fn(dropOptions);
    }

    /**
     * Asynchronous method to perform the dropDatabase operation in MongoDB.
     * 
     * @param {Object} options - The options object for the dropDatabase operation.
     * @param {number} options.level - Optional. The level of the drop operation. 
     *                                 Default is 1.
     * @param {Object} options.writeConcern - Optional. The write concern for the operation.
     *                                        Default is an empty object {}.
     * @param {string} options.comment - Optional. A comment to describe the purpose of the dropDatabase operation.
     *                                    Default is an empty string.
     * @param {Function} fns - Optional. A function to execute before the dropDatabase operation (pre-hook).
     * @returns {Promise} - A promise that resolves with the result of the dropDatabase operation.
     *                     If options are invalid, the promise resolves with the string 'Invalid options'.
     */
    async dropDatabase(options = {
        level: 1,
        writeConcern: {},
        comment: ''
    }, fns = () => { }) {
        const fn = dbMethod(this)('command', fns, false, 'dropDatabase');

        // Check if options is an object
        if (options && !isObject(options)) return 'Invalid options';

        // Extract and validate dropDatabaseOptions from the options object
        const dropDatabaseOptions = this.options(options, 'dropDatabase', 'level');

        // Call the function 'fn' with dropDatabaseOptions and return the result
        return fn(dropDatabaseOptions);
    }


    /**
     * Asynchronous method to perform the dropConnections operation in MongoDB.
     * 
     * @param {Object} options - The options object for the dropConnections operation.
     * @param {number} options.level - Optional. The level of the dropConnections operation. 
     *                                 Default is 1.
     * @param {Array} options.hostAndPort - Optional. An array of strings representing the host and port combinations to drop connections.
     *                                      Default is an empty array [].
     * @param {string} options.comment - Optional. A comment to describe the purpose of the dropConnections operation.
     *                                    Default is an empty string.
     * @param {Function} fns - Optional. A function to execute before the dropConnections operation (pre-hook).
     * @returns {Promise} - A promise that resolves with the result of the dropConnections operation.
     *                     If options are invalid, the promise resolves with the string 'Invalid options'.
     */
    async dropConnections(options = { level: 1, hostAndPort: [ /*"host1:port1", "host2:port2", ... */], comment: '' }, fns = () => { }) {
        const fn = dbMethod(this)('command', fns, false, 'dropConnections');

        // Check if options is an object
        if (options && !isObject(options)) {
            return 'Invalid options';
        }

        // Extract and validate dropConnectionsOptions from the options object
        const dropConnectionsOptions = this.options(options, 'dropConnections', 'level');

        // Call the function 'fn' with dropConnectionsOptions and return the result
        return fn(dropConnectionsOptions);
    }


    /**
    * Asynchronous method to perform the dropIndexes operation in MongoDB.
    * 
    * @param {Object} options - The options object for the dropIndexes operation.
    * @param {string} options.collection - Optional. The name of the collection from which indexes will be dropped.
    *                                      Default is this.collection, where this.collection is assumed to be available in the context of this method.
    * @param {Object} options.index - Optional. The index specification object representing the index to be dropped.
    *                                  Default is an empty object {}.
    * @param {Object} options.writeConcern - Optional. The write concern for the operation.
    *                                        Default is an empty object {}.
    * @param {string} options.comment - Optional. A comment to describe the purpose of the dropIndexes operation.
    *                                    Default is an empty string.
    * @param {Function} fns - Optional. A function to execute before the dropIndexes operation (pre-hook).
    * @returns {Promise} - A promise that resolves with the result of the dropIndexes operation.
    *                     If options are invalid, the promise resolves with the string 'Invalid options'.
    */
    async dropIndexes(options = {
        collection: this.collection,
        index: {},
        writeConcern: {},
        comment: ''
    }, fns = () => { }) {
        const fn = dbMethod(this)('command', fns, false, 'dropIndexes');

        // Check if options is an object
        if (options && !isObject(options)) {
            return 'Invalid options';
        }

        // Extract and validate dropIndexesOptions from the options object
        const dropIndexesOptions = this.options(options, 'dropIndexes', 'collection');

        // Call the function 'fn' with dropIndexesOptions and return the result
        return fn(dropIndexesOptions);
    }


    /**
     * Asynchronous method to perform the filemd5 operation in MongoDB.
     * 
     * @param {Object} options - The options object for the filemd5 operation.
     * @param {ObjectId} options.files_id - Optional. The ObjectId of the file for which to calculate the md5 hash.
     *                                      Default is a new ObjectId("4f1f10e37671b50e4ecd2776").
     * @param {string} options.root - Optional. The root of the file system where the file is stored.
     *                                 Default is "fs".
     * @param {Function} fns - Optional. A function to execute before the filemd5 operation (pre-hook).
     * @returns {Promise} - A promise that resolves with the result of the filemd5 operation.
     *                     If options are invalid, the promise resolves with the string 'Invalid options'.
     */
    async filemd5(options = {
        files_id: new ObjectId("4f1f10e37671b50e4ecd2776"),
        root: "fs"
    }, fns = () => { }) {
        const fn = dbMethod(this)('command', fns, false, 'filemd5');

        // Check if options is an object
        if (options && !isObject(options)) {
            return 'Invalid options';
        }

        // Extract and validate filemd5Options from the options object
        const filemd5Options = this.options(options, 'filemd5', 'files_id');

        // Call the function 'fn' with filemd5Options and return the result
        return fn(filemd5Options);
    }



/**
 * Asynchronous method to perform the fsync operation in MongoDB.
 * 
 * @param {Object} options - The options object for the fsync operation.
 * @param {number} options.level - Optional. The level of the fsync operation. 
 *                                 Default is 1.
 * @param {boolean} options.lock - Optional. Whether to lock the database for the fsync operation.
 *                                 Default is false.
 * @param {string} options.comment - Optional. A comment to describe the purpose of the fsync operation.
 *                                    Default is an empty string.
 * @param {Function} fns - Optional. A function to execute before the fsync operation (pre-hook).
 * @returns {Promise} - A promise that resolves with the result of the fsync operation.
 *                     If options are invalid, the promise resolves with the string 'Invalid options'.
 */
async fsync(options = {
    level: 1,
    lock: false,
    comment: ''
  }, fns = () => {}) {
    const fn = dbMethod(this)('command', fns, false, 'fsync');
  
    // Check if options is an object
    if (options && !isObject(options)) {
      return 'Invalid options';
    }
  
    // Extract and validate fsyncOptions from the options object
    const fsyncOptions = this.options(options, 'fsync', 'level');
  
    // Call the function 'fn' with fsyncOptions and return the result
    return fn(fsyncOptions);
  }
  

/**
 * Asynchronous method to perform the fsyncUnlock operation in MongoDB.
 * 
 * @param {Object} options - The options object for the fsyncUnlock operation.
 * @param {number} options.level - Optional. The level of the fsyncUnlock operation. 
 *                                 Default is 1.
 * @param {string} options.comment - Optional. A comment to describe the purpose of the fsyncUnlock operation.
 *                                    Default is an empty string.
 * @param {Function} fns - Optional. A function to execute before the fsyncUnlock operation (pre-hook).
 * @returns {Promise} - A promise that resolves with the result of the fsyncUnlock operation.
 *                     If options are invalid, the promise resolves with the string 'Invalid options'.
 */
async fsyncUnlock(options = {
    level: 1,
    comment: ''
  }, fns = () => {}) {
    const fn = dbMethod(this)('command', fns, false, 'fsyncUnlock');
  
    // Check if options is an object
    if (options && !isObject(options)) {
      return 'Invalid options';
    }
  
    // Extract and validate fsyncUnlockOptions from the options object
    const fsyncUnlockOptions = this.options(options, 'fsyncUnlock', 'level');
  
    // Call the function 'fn' with fsyncUnlockOptions and return the result
    return fn(fsyncUnlockOptions);
  }
  
  async getAuditConfig(){}
async getClusterParameter(){}
async getDefaultRWConcern(){}

async getParameter(){}

/**
 * Asynchronous method to perform the killCursors operation in MongoDB.
 * 
 * @param {Object} options - The options object for the killCursors operation.
 * @param {string} options.collection - Optional. The name of the collection from which cursors will be killed.
 *                                      Default is this.collection, where this.collection is assumed to be available in the context of this method.
 * @param {Array} options.cursors - Optional. An array of cursor IDs representing the cursors to be killed.
 *                                  Default is an empty array [].
 * @param {string} options.comment - Optional. A comment to describe the purpose of the killCursors operation.
 *                                    Default is an empty string.
 * @param {Function} fns - Optional. A function to execute before the killCursors operation (pre-hook).
 * @returns {Promise} - A promise that resolves with the result of the killCursors operation.
 *                     If options are invalid, the promise resolves with the string 'Invalid options'.
 */
async killCursors(options = {
    collection: this.collection,
    cursors: [/* <cursor id1>, ...*/ ],
    comment: ''
  }, fns = () => {}) {
    const fn = dbMethod(this)('command', fns, false, 'killCursors');
  
    // Check if options is an object
    if (options && !isObject(options)) {
      return 'Invalid options';
    }
  
    // Extract and validate killCursorsOptions from the options object
    const killCursorsOptions = this.options(options, 'killCursors', 'collection');
  
    // Call the function 'fn' with killCursorsOptions and return the result
    return fn(killCursorsOptions);
  }

  async killOp(){}
  

/**
 * Asynchronous method to perform the listCollections operation in MongoDB.
 * 
 * @param {Object} options - The options object for the listCollections operation.
 * @param {number} options.level - Optional. The level of the listCollections operation. 
 *                                 Default is 1.
 * @param {Object} options.filter - Optional. The filter to select which collections to list.
 *                                  Default is an empty object {}.
 * @param {boolean} options.nameOnly - Optional. Whether to list only the names of collections (true) or full collection details (false).
 *                                     Default is false.
 * @param {boolean} options.authorizedCollections - Optional. Whether to include only authorized collections (true) or all collections (false).
 *                                                  Default is false.
 * @param {string} options.comment - Optional. A comment to describe the purpose of the listCollections operation.
 *                                    Default is an empty string.
 * @param {Function} fns - Optional. A function to execute before the listCollections operation (pre-hook).
 * @returns {Promise} - A promise that resolves with the result of the listCollections operation.
 *                     If options are invalid, the promise resolves with the string 'Invalid options'.
 */
async listCollections(options = {
    level: 1,
    filter: {},
    nameOnly: false,
    authorizedCollections: false,
    comment: ''
  }, fns = () => {}) {
    const fn = dbMethod(this)('command', fns, false, 'listCollections');
  
    // Check if options is an object
    if (options && !isObject(options)) {
      return 'Invalid options';
    }
  
    // Extract and validate listCollectionsOptions from the options object
    const listCollectionsOptions = this.options(options, 'listCollections', 'level');
  
    // Call the function 'fn' with listCollectionsOptions and return the result
    return fn(listCollectionsOptions);
  }


/**
 * Asynchronous method to perform the listIndexes operation in MongoDB.
 * 
 * @param {Object} options - The options object for the listIndexes operation.
 * @param {string} options.collection - Optional. The name of the collection for which to list the indexes.
 *                                      Default is this.collection, where this.collection is assumed to be available in the context of this method.
 * @param {Object} options.cursor - Optional. The cursor options for the listIndexes operation.
 *                                  Default is { batchSize: 1024 }.
 * @param {string} options.comment - Optional. A comment to describe the purpose of the listIndexes operation.
 *                                    Default is an empty string.
 * @param {Function} fns - Optional. A function to execute before the listIndexes operation (pre-hook).
 * @returns {Promise} - A promise that resolves with the result of the listIndexes operation.
 *                     If options are invalid, the promise resolves with the string 'Invalid options'.
 */
async listIndexes(options = {
    collection: this.collection,
    cursor: { batchSize: 1024 },
    comment: ''
  }, fns = () => {}) {
    const fn = dbMethod(this)('command', fns, false, 'listIndexes');
  
    // Check if options is an object
    if (options && !isObject(options)) {
      return 'Invalid options';
    }
  
    // Extract and validate listIndexesOptions from the options object
    const listIndexesOptions = this.options(options, 'listIndexes', 'collection');
  
    // Call the function 'fn' with listIndexesOptions and return the result
    return fn(listIndexesOptions);
  }
  
  async logRotate(){}


/**
 * Asynchronous method to perform the reIndex operation in MongoDB.
 * 
 * @param {Object} options - The options object for the reIndex operation.
 * @param {string} options.collection - Optional. The name of the collection on which to perform the reIndex operation.
 *                                      Default is this.collection, where this.collection is assumed to be available in the context of this method.
 * @param {Function} fns - Optional. A function to execute before the reIndex operation (pre-hook).
 * @returns {Promise} - A promise that resolves with the result of the reIndex operation.
 *                     If options are invalid, the promise resolves with the string 'Invalid options'.
 */
async reIndex(options = {
    collection: this.collection
  }, fns = () => {}) {
    const fn = dbMethod(this)('command', fns, false, 'reIndex');
  
    // Check if options is an object
    if (options && !isObject(options)) {
      return 'Invalid options';
    }
  
    // Extract and validate reIndexOptions from the options object
    const reIndexOptions = this.options(options, 'reIndex', 'collection');
  
    // Call the function 'fn' with reIndexOptions and return the result
    return fn(reIndexOptions);
  }


/**
 * Asynchronous method to perform the renameCollection operation in MongoDB.
 * 
 * @param {Object} options - The options object for the renameCollection operation.
 * @param {string} options.collection - Optional. The name of the collection to be renamed.
 *                                      Default is this.collection, where this.collection is assumed to be available in the context of this method.
 * @param {string} options.to - The new name for the collection after renaming.
 * @param {boolean} options.dropTarget - Optional. Whether to drop the target collection if it already exists with the same name as 'to'.
 *                                       Default is true, which means the target collection will be dropped if it exists.
 * @param {Object} options.writeConcern - Optional. The write concern for the renameCollection operation.
 * @param {Object} options.comment - Optional. A comment to describe the purpose of the renameCollection operation.
 *                                    Default is an empty object {}.
 * @param {Function} fns - Optional. A function to execute before the renameCollection operation (pre-hook).
 * @returns {Promise} - A promise that resolves with the result of the renameCollection operation.
 *                     If options are invalid, the promise resolves with the string 'Invalid options'.
 */
async renameCollection(options = {
    collection: this.collection,
    to: 'new-collection-name',
    dropTarget: true,
    writeConcern: {},
    comment: {}
  }, fns = () => {}) {
    const fn = dbMethod(this)('command', fns, false, 'renameCollection');
  
    // Check if options is an object
    if (options && !isObject(options)) {
      return 'Invalid options';
    }
  
    // Extract and validate renameCollectionOptions from the options object
    const renameCollectionOptions = this.options(options, 'renameCollection', 'collection');
  
    // Call the function 'fn' with renameCollectionOptions and return the result
    return fn(renameCollectionOptions);
  }
  

/**
 * Asynchronous method to perform the rotateCertificates operation in MongoDB.
 * 
 * @param {Object} options - The options object for the rotateCertificates operation.
 * @param {number} options.level - Optional. The level of the rotateCertificates operation. 
 *                                 Default is 1.
 * @param {string} options.message - Optional. An optional log message to accompany the rotateCertificates operation.
 *                                   Default is an empty string.
 * @param {Function} fns - Optional. A function to execute before the rotateCertificates operation (pre-hook).
 * @returns {Promise} - A promise that resolves with the result of the rotateCertificates operation.
 *                     If options are invalid, the promise resolves with the string 'Invalid options'.
 */
async rotateCertificates(options = {
    level: 1,
    message: 'optional log message'
  }, fns = () => {}) {
    const fn = dbMethod(this)('command', fns, false, 'rotateCertificates');
  
    // Check if options is an object
    if (options && !isObject(options)) {
      return 'Invalid options';
    }
  
    // Extract and validate rotateCertificatesOptions from the options object
    const rotateCertificatesOptions = this.options(options, 'rotateCertificates', 'level');
  
    // Call the function 'fn' with rotateCertificatesOptions and return the result
    return fn(rotateCertificatesOptions);
  }

  async setAuditConfig(){}
async setClusterParameter (){}
async setFeatureCompatibilityVersion(){}


/**
 * Asynchronous method to perform the setIndexCommitQuorum operation in MongoDB.
 * 
 * @param {Object} options - The options object for the setIndexCommitQuorum operation.
 * @param {string} options.collection - Optional. The name of the collection on which to set the index commit quorum.
 *                                      Default is this.collection, where this.collection is assumed to be available in the context of this method.
 * @param {Array} options.indexNames - An array of index names for which to set the commit quorum.
 * @param {number | string} options.commitQuorum - The commit quorum value to set for the specified indexes.
 *                                                 It can be a number or an empty string ('') to unset the commit quorum.
 * @param {string} options.comment - Optional. A comment to describe the purpose of the setIndexCommitQuorum operation.
 *                                    Default is an empty string.
 * @param {Function} fns - Optional. A function to execute before the setIndexCommitQuorum operation (pre-hook).
 * @returns {Promise} - A promise that resolves with the result of the setIndexCommitQuorum operation.
 *                     If options are invalid, the promise resolves with the string 'Invalid options'.
 */
async setIndexCommitQuorum(options = {
    collection: this.collection,
    indexNames: [{}],
    commitQuorum: 1 | '',
    comment: ''
  }, fns = () => {}) {
    const fn = dbMethod(this)('command', fns, false, 'setIndexCommitQuorum');
  
    // Check if options is an object
    if (options && !isObject(options)) {
      return 'Invalid options';
    }
  
    // Extract and validate setIndexCommitQuorumOptions from the options object
    const setIndexCommitQuorumOptions = this.options(options, 'setIndexCommitQuorum', 'collection');
  
    // Call the function 'fn' with setIndexCommitQuorumOptions and return the result
    return fn(setIndexCommitQuorumOptions);
  }

  async setParameter(){}
async setDefaultRWConcern(){}
async setUserWriteBlockMode(){}
async shutdown(){}


// Diagnostic Commands

/**
 * Asynchronous method to perform the collStats operation in MongoDB.
 * 
 * @param {Object} options - The options object for the collStats operation.
 * @param {string} options.collection - Optional. The name of the collection for which to retrieve the statistics.
 *                                      Default is this.collection, where this.collection is assumed to be available in the context of this method.
 * @param {number} options.scale - Optional. The scale factor to apply to the output statistics.
 *                                 Default is 1024.
 * @param {Function} fns - Optional. A function to execute before the collStats operation (pre-hook).
 * @returns {Promise} - A promise that resolves with the result of the collStats operation.
 *                     If options are invalid, the promise resolves with the string 'Invalid options'.
 */
async collStats(options = {
    collection: this.collection,
    scale: 1024
  }, fns = () => {}) {
    const fn = dbMethod(this)('command', fns, false, 'collStats');
  
    // Check if options is an object
    if (options && !isObject(options)) {
      return 'Invalid options';
    }
  
    // Extract and validate collStatsOptions from the options object
    const collStatsOptions = this.options(options, 'collStats', 'collection');
  
    // Call the function 'fn' with collStatsOptions and return the result
    return fn(collStatsOptions);
  }

/**
 * Asynchronous method to perform the connPoolStats operation in MongoDB.
 * 
 * @param {Object} options - The options object for the connPoolStats operation.
 * @param {number} options.level - Optional. The level of the connPoolStats operation. 
 *                                 Default is 1.
 * @param {Function} fns - Optional. A function to execute before the connPoolStats operation (pre-hook).
 * @returns {Promise} - A promise that resolves with the result of the connPoolStats operation.
 *                     If options are invalid, the promise resolves with the string 'Invalid options'.
 */
async connPoolStats(options = {
    level: 1
  }, fns = () => {}) {
    const fn = dbMethod(this)('command', fns, false, 'connPoolStats');
  
    // Check if options is an object
    if (options && !isObject(options)) {
      return 'Invalid options';
    }
  
    // Extract and validate connPoolStatsOptions from the options object
    const connPoolStatsOptions = this.options(options, 'connPoolStats', 'level');
  
    // Call the function 'fn' with connPoolStatsOptions and return the result
    return fn(connPoolStatsOptions);
  }


/**
 * Asynchronous method to perform the connectionStatus operation in MongoDB.
 * 
 * @param {Object} options - The options object for the connectionStatus operation.
 * @param {number} options.level - Optional. The level of the connectionStatus operation. 
 *                                 Default is 1.
 * @param {boolean} options.showPrivileges - Optional. Flag to indicate whether to show privileges in the connection status.
 *                                           Default is false.
 * @param {Function} fns - Optional. A function to execute before the connectionStatus operation (pre-hook).
 * @returns {Promise} - A promise that resolves with the result of the connectionStatus operation.
 *                     If options are invalid, the promise resolves with the string 'Invalid options'.
 */
async connectionStatus(options = {
    level: 1,
    showPrivileges: false
  }, fns = () => {}) {
    const fn = dbMethod(this)('command', fns, false, 'connectionStatus');
  
    // Check if options is an object
    if (options && !isObject(options)) {
      return 'Invalid options';
    }
  
    // Extract and validate connectionStatusOptions from the options object
    const connectionStatusOptions = this.options(options, 'connectionStatus', 'level');
  
    // Call the function 'fn' with connectionStatusOptions and return the result
    return fn(connectionStatusOptions);
  }
  
/**
 * Asynchronous method to perform the datasize operation in MongoDB.
 * 
 * @param {Object} options - The options object for the datasize operation.
 * @param {string} options.collection - Optional. The name of the collection for which to calculate the data size.
 *                                      Default is `${this.db}.${this.collection}`, where this.db and this.collection are assumed to be available in the context of this method.
 * @param {Object} options.keyPattern - Optional. The key pattern for which to calculate the data size.
 * @param {Object} options.min - Optional. The minimum boundary for the data size calculation.
 * @param {Object} options.max - Optional. The maximum boundary for the data size calculation.
 * @param {boolean} options.estimate - Optional. Flag to indicate whether to estimate the data size or not.
 *                                     Default is false.
 * @param {Function} fns - Optional. A function to execute before the datasize operation (pre-hook).
 * @returns {Promise} - A promise that resolves with the result of the datasize operation.
 *                     If options are invalid, the promise resolves with the string 'Invalid options'.
 */
async datasize(options = {
    collection: `${this.db}.${this.collection}`,
    keyPattern: {},
    min: {},
    max: {},
    estimate: false
  }, fns = () => {}) {
    const fn = dbMethod(this)('command', fns, false, 'datasize');
  
    // Check if options is an object
    if (options && !isObject(options)) {
      return 'Invalid options';
    }
  
    // Extract and validate datasizeOptions from the options object
    const datasizeOptions = this.options(options, 'datasize', 'collection');
  
    // Call the function 'fn' with datasizeOptions and return the result
    return fn(datasizeOptions);
  }


/**
 * Asynchronous method to perform the dbHash operation in MongoDB.
 * 
 * @param {Object} options - The options object for the dbHash operation.
 * @param {number} options.value - Optional. The value of the dbHash operation. Default is 1.
 * @param {Array<string>} options.collections - Optional. An array of collection names for which to calculate the hash.
 * @param {Function} fns - Optional. A function to execute before the dbHash operation (pre-hook).
 * @returns {Promise} - A promise that resolves with the result of the dbHash operation.
 *                     If options are invalid, the promise resolves with the string 'Invalid options'.
 */
async dbHash(options = {
    value: 1,
    collections: []
  }, fns = () => {}) {
    const fn = dbMethod(this)('command', fns, false, 'dbHash');
  
    // Check if options is an object
    if (options && !isObject(options)) {
      return 'Invalid options';
    }
  
    // Extract and validate dbHashOptions from the options object
    const dbHashOptions = this.options(options, 'dbHash', 'value');
  
    // Call the function 'fn' with dbHashOptions and return the result
    return fn(dbHashOptions);
  }
  
  
/**
 * Asynchronous method to perform the dbStats operation in MongoDB.
 * 
 * @param {Object} options - The options object for the dbStats operation.
 * @param {number} options.value - Optional. The value of the dbStats operation. Default is 1.
 * @param {number} options.scale - Optional. The scale value for the dbStats operation. Default is 1024.
 * @param {number} options.freeStorage - Optional. The freeStorage value for the dbStats operation. Default is 1.
 * @param {Function} fns - Optional. A function to execute before the dbStats operation (pre-hook).
 * @returns {Promise} - A promise that resolves with the result of the dbStats operation.
 *                     If options are invalid, the promise resolves with the string 'Invalid options'.
 */
async dbStats(options = {
    value: 1,
    scale: 1024,
    freeStorage: 1
  }, fns = () => {}) {
    const fn = dbMethod(this)('command', fns, false, 'dbStats');
  
    // Check if options is an object
    if (options && !isObject(options)) {
      return 'Invalid options';
    }
  
    // Extract and validate dbStatsOptions from the options object
    const dbStatsOptions = this.options(options, 'dbStats', 'value');
  
    // Call the function 'fn' with dbStatsOptions and return the result
    return fn(dbStatsOptions);
  }
  
  async explain( options = {document: {},verbosity: 'allPlansExecution', comment: ''}, fns = () => {} ){

    const fn = dbMethod(this)('command', fns, false, 'explain');

    if (options && !isObject(options)) return 'Invalid options';
    const explainOptions = this.options(options, 'explain', 'document');
    return fn(explainOptions);
}//todo: Explain failed due to unknown command: 

async getCmdLineOpts(){}
async getLog(){}
async hostInfo(){}

/**
 * Asynchronous method to perform the listCommands operation in MongoDB.
 * 
 * @param {Object} options - The options object for the listCommands operation.
 * @param {number} options.command - Optional. The value of the listCommands operation. Default is 1.
 * @param {Function} fns - Optional. A function to execute before the listCommands operation (pre-hook).
 * @returns {Promise} - A promise that resolves with the result of the listCommands operation.
 *                     If options are invalid, the promise resolves with the string 'Invalid options'.
 */
async listCommands(options = {
    command: 1
  }, fns = () => {}) {
    const fn = dbMethod(this)('command', fns, false, 'listCommands');
  
    // Check if options is an object
    if (options && !isObject(options)) {
      return 'Invalid options';
    }
  
    // Extract and validate listCommandsOptions from the options object
    const listCommandsOptions = this.options(options, 'listCommands', 'command');
  
    // Call the function 'fn' with listCommandsOptions and return the result
    return fn(listCommandsOptions);
  }
  
  async lockInfo(){}
async ping(){}

/**
 * Asynchronous method to perform the profile operation in MongoDB.
 * 
 * @param {Object} options - The options object for the profile operation.
 * @param {number} options.level - Optional. The profiling level. Default is 0.
 * @param {number} options.slowms - Optional. The threshold in milliseconds to determine slow operations. Default is 100.
 * @param {number} options.sampleRate - Optional. The sampling rate for profiling. Default is 1.0.
 * @param {Object} options.filter - Optional. An object representing the filter for profiling based on field expressions.
 * @param {Function} fns - Optional. A function to execute before the profile operation (pre-hook).
 * @returns {Promise} - A promise that resolves with the result of the profile operation.
 *                     If options are invalid, the promise resolves with the string 'Invalid options'.
 */
async profile(options = {
    level: 0,
    slowms: 100,
    sampleRate: 1.0,
    filter: {}
  }, fns = () => {}) {
    const fn = dbMethod(this)('command', fns, false, 'profile');
  
    // Check if options is an object
    if (options && !isObject(options)) {
      return 'Invalid options';
    }
  
    // Extract and validate profileOptions from the options object
    const profileOptions = this.options(options, 'profile', 'level');
  
    // Call the function 'fn' with profileOptions and return the result
    return fn(profileOptions);
  }


/**
 * Asynchronous method to perform the top operation in MongoDB.
 * 
 * @param {Object} options - The options object for the top operation.
 * @param {number} options.status - Optional. The status value for the top operation. Default is 1.
 * @param {Function} fns - Optional. A function to execute before the top operation (pre-hook).
 * @returns {Promise} - A promise that resolves with the result of the top operation.
 *                     If options are invalid, the promise resolves with the string 'Invalid options'.
 */
async top(options = {
    status: 1
  }, fns = () => {}) {
    const fn = dbMethod(this)('command', fns, false, 'top');
  
    // Check if options is an object
    if (options && !isObject(options)) {
      return 'Invalid options';
    }
  
    // Extract and validate topOptions from the options object
    const topOptions = this.options(options, 'top', 'status');
  
    // Call the function 'fn' with topOptions and return the result
    return fn(topOptions);
  }
  
  
/**
 * Asynchronous method to perform the validate operation in MongoDB.
 * 
 * @param {Object} options - The options object for the validate operation.
 * @param {string} options.collection - The name of the collection to validate.
 * @param {boolean} options.full - Optional. Whether to perform a full validation. Default is false.
 * @param {boolean} options.repair - Optional. Whether to repair any issues found during validation. Default is false.
 * @param {boolean} options.metadata - Optional. Whether to include metadata in the validation result. Default is false.
 * @param {Function} fns - Optional. A function to execute before the validate operation (pre-hook).
 * @returns {Promise} - A promise that resolves with the result of the validate operation.
 *                     If options are invalid, the promise resolves with the string 'Invalid options'.
 */
async validate(options = {
    collection: this.collection,
    full: false,
    repair: false,
    metadata: false
  }, fns = () => {}) {
    const fn = dbMethod(this)('command', fns, false, 'validate');
  
    // Check if options is an object
    if (options && !isObject(options)) {
      return 'Invalid options';
    }
  
    // Extract and validate validateOptions from the options object
    const validateOptions = this.options(options, 'validate', 'collection');
  
    // Call the function 'fn' with validateOptions and return the result
    return fn(validateOptions);
  }

  // Free Monitoring Commands

async setFreeMonitoring (){}

// Auditing Commands 

async logApplicationMessage(options = { message: 'get logs'}, fns = () => {}){

    const fn = dbMethod(this)('command', fns, false, 'logApplicationMessage');

    if (options && !isObject(options)) return 'Invalid options';
    const logApplicationMessageOptions = this.options(options, 'logApplicationMessage', 'message');
    return fn(logApplicationMessageOptions);

}//todo no such command: 'logApplicationMessage'

// Session Commands

async abortTransaction (){}
async commitTransaction(){}

/**
 * Asynchronous method to start a session in MongoDB.
 * 
 * @param {Object} options - The options object for starting a session.
 * @param {number} options.status - Optional. The status value for starting the session. Default is 1.
 * @param {Function} fns - Optional. A function to execute before starting the session (pre-hook).
 * @returns {Promise} - A promise that resolves with the result of starting the session.
 *                     If options are invalid, the promise resolves with the string 'Invalid options'.
 */
async startSession(options = {
    status: 1
  }, fns = () => {}) {
    const fn = dbMethod(this)('command', fns, false, 'startSession');
  
    // Check if options is an object
    if (options && !isObject(options)) {
      return 'Invalid options';
    }
  
    // Extract and validate startSessionOptions from the options object
    const startSessionOptions = this.options(options, 'startSession', 'status');
  
    // Call the function 'fn' with startSessionOptions and return the result
    return fn(startSessionOptions);
  }
  
/**
 * Asynchronous method to end sessions in MongoDB.
 * 
 * @param {Object} options - The options object for ending sessions.
 * @param {Array} options.command - An array of objects, each specifying the session ID to end.
 * @param {Function} fns - Optional. A function to execute before ending the sessions (pre-hook).
 * @returns {Promise} - A promise that resolves with the result of ending the sessions.
 *                     If options are invalid, the promise resolves with the string 'Invalid options'.
 */
async endSessions(options = {
    command: [ /* { id : <UUID> }, ...*/ ]
  }, fns = () => {}) {
    const fn = dbMethod(this)('command', fns, false, 'endSessions');
  
    // Check if options is an object
    if (options && !isObject(options)) {
      return 'Invalid options';
    }
  
    // Extract and validate endSessionsOptions from the options object
    const endSessionsOptions = this.options(options, 'endSessions', 'command');
  
    // Call the function 'fn' with endSessionsOptions and return the result
    return fn(endSessionsOptions);
  }

  
/**
 * Asynchronous method to kill all sessions in MongoDB.
 * 
 * @param {Object} options - The options object for killing all sessions.
 * @param {Array} options.command - An array of objects, each specifying the user and database of the session to kill.
 * @param {Function} fns - Optional. A function to execute before killing all sessions (pre-hook).
 * @returns {Promise} - A promise that resolves with the result of killing all sessions.
 *                     If options are invalid, the promise resolves with the string 'Invalid options'.
 */
async killAllSessions(options = {
    command: [ /* { user: <user>, db: <dbname> }, ... */ ]
  }, fns = () => {}) {
    const fn = dbMethod(this)('command', fns, false, 'killAllSessions');
  
    // Check if options is an object
    if (options && !isObject(options)) {
      return 'Invalid options';
    }
  
    // Extract and validate killAllSessionsOptions from the options object
    const killAllSessionsOptions = this.options(options, 'killAllSessions', 'command');
  
    // Call the function 'fn' with killAllSessionsOptions and return the result
    return fn(killAllSessionsOptions);
  }
  

/**
 * Asynchronous method to kill all sessions in MongoDB that match the specified pattern.
 * 
 * @param {Object} options - The options object for killing sessions by pattern.
 * @param {Array} options.pattern - An array of patterns representing the sessions to kill.
 * @param {Function} fns - Optional. A function to execute before killing sessions by pattern (pre-hook).
 * @returns {Promise} - A promise that resolves with the result of killing sessions by pattern.
 *                     If options are invalid, the promise resolves with the string 'Invalid options'.
 */
async killAllSessionsByPattern(options = {
    pattern: [/* <pattern>, ... */]
  }, fns = () => {}) {
    const fn = dbMethod(this)('command', fns, false, 'killAllSessionsByPattern');
  
    // Check if options is an object
    if (options && !isObject(options)) {
      return 'Invalid options';
    }
  
    // Extract and validate killAllSessionsByPatternOptions from the options object
    const killAllSessionsByPatternOptions = this.options(options, 'killAllSessionsByPattern', 'pattern');
  
    // Call the function 'fn' with killAllSessionsByPatternOptions and return the result
    return fn(killAllSessionsByPatternOptions);
  }
  
/**
 * Asynchronous method to kill specific sessions in MongoDB.
 * 
 * @param {Object} options - The options object for killing sessions.
 * @param {Array} options.command - An array of objects representing the sessions to kill.
 *                                  Each object should have the property 'id' with the UUID of the session to kill.
 * @param {Function} fns - Optional. A function to execute before killing sessions (pre-hook).
 * @returns {Promise} - A promise that resolves with the result of killing sessions.
 *                     If options are invalid, the promise resolves with the string 'Invalid options'.
 */
async killSessions(options = {
    command: [/* { id: <UUID> }, ... */]
  }, fns = () => {}) {
    const fn = dbMethod(this)('command', fns, false, 'killSessions');
  
    // Check if options is an object
    if (options && !isObject(options)) {
      return 'Invalid options';
    }
  
    // Extract and validate killSessionsOptions from the options object
    const killSessionsOptions = this.options(options, 'killSessions', 'command');
  
    // Call the function 'fn' with killSessionsOptions and return the result
    return fn(killSessionsOptions);
  }
  
/**
 * Asynchronous method to refresh specific sessions in MongoDB.
 * 
 * @param {Object} options - The options object for refreshing sessions.
 * @param {Array} options.command - An array of objects representing the sessions to refresh.
 *                                  Each object should have the property 'id' with the UUID of the session to refresh.
 * @param {Function} fns - Optional. A function to execute before refreshing sessions (pre-hook).
 * @returns {Promise} - A promise that resolves with the result of refreshing sessions.
 *                     If options are invalid, the promise resolves with the string 'Invalid options'.
 */
async refreshSessions(options = {
    command: [/* { id: <UUID> }, ... */]
  }, fns = () => {}) {
    const fn = dbMethod(this)('command', fns, false, 'refreshSessions');
  
    // Check if options is an object
    if (options && !isObject(options)) {
      return 'Invalid options';
    }
  
    // Extract and validate refreshSessionsOptions from the options object
    const refreshSessionsOptions = this.options(options, 'refreshSessions', 'command');
  
    // Call the function 'fn' with refreshSessionsOptions and return the result
    return fn(refreshSessionsOptions);
  }
  

/**
 * Asynchronous method to create a new collection in MongoDB.
 *
 * @param {string} name - The name of the new collection to be created. Must be a string.
 * @param {Object} options - Optional. The options object for creating the collection.
 * @param {Function} fns - Optional. A function to execute before creating the collection (pre-hook).
 * @returns {Promise} - A promise that resolves with the result of creating the collection.
 *                     If the name is invalid (not provided or not a string), the promise resolves with the string 'Invalid name'.
 *                     If the options are invalid (not provided or not an object), the promise resolves with the string 'Invalid options'.
 */
async createCollection(name = 'users', options = {}, fns = () => {}) {
    // Check if the name is provided and is a string
    if (name && !isString(name)) {
      return 'Invalid name';
    }
  
    // Check if the options are provided and are an object
    if (options && !isObject(options)) {
      return 'Invalid options';
    }
  
    // Obtain the appropriate function 'fn' using the 'dbMethod' based on the provided 'fns'
    const fn = dbMethod(this)('createCollection', fns);
  
    // Call the function 'fn' with the 'name' and 'options' and return the result
    return fn(name, options);
  }
  
/**
 * Asynchronous method to get a list of collection names in the current MongoDB database.
 *
 * @param {Function} fns - Optional. A function to execute before getting the collection names (pre-hook).
 * @returns {Promise} - A promise that resolves with an array of collection names in the database.
 *                     The promise resolves with an empty array if there are no collections.
 */
async getCollectionNames(fns = () => {}) {
    // Obtain the appropriate function 'fn' using the 'dbMethod' based on the provided 'fns'
    const fn = dbMethod(this)('listCollections', fns, true, 'getCollectionNames');
  
    // Call the function 'fn' and return the result (an array of collection names)
    return fn();
  }


/**
 * Asynchronous method to watch changes on a MongoDB collection using aggregation pipeline.
 *
 * @param {Array} pipeline - Optional. An array representing the aggregation pipeline to filter the changes.
 * @param {Object} options - Optional. Additional options to customize the watch operation.
 * @param {Function} fns - Optional. A function to execute before watching for changes (pre-hook).
 * @returns {Promise} - A promise that resolves with a change stream object.
 */
async watch(pipeline = [], options = {}, fns = () => {}) {
    // Obtain the appropriate function 'fn' using the 'dbMethod' based on the provided 'fns'
    const fn = dbMethod(this)('watch', fns);
  
    // Check if the options are provided and are an object
    if (options && !isObject(options)) return 'Invalid options';
  
    // Call the function 'fn' with the provided pipeline and options, and return the change stream object
    return fn(pipeline, options);
  }
  

  async runCommand(command =  {} | 'string', fns = () =>{}) {
    const fn = dbMethod(this)('runCommand', fns);
    return fn(command);
}// todo : fix runCommand is not a method issue

async adminCommand(command =  {} | 'string', fns = () =>{}) {
    const fn = dbMethod(this)('adminCommand', fns);
    return fn(command);
}// todo : fix runCommand is not a method issue



/**
 * Asynchronous method to rename a MongoDB collection.
 *
 * @param {string} oldName - The current name of the collection to be renamed.
 * @param {string} newName - The new name to be given to the collection.
 * @param {Function} fns - Optional. A function to execute before renaming the collection (pre-hook).
 * @returns {Promise} - A promise that resolves after the collection has been successfully renamed.
 */
async renameCollection(oldName = '', newName = '', fns = () => { }) {
    // Obtain the appropriate function 'fn' using the 'dbMethod' based on the provided 'fns'
    const fn = dbMethod(this)('renameCollection', fns);
  
    // Check if the oldName and newName are provided and are strings
    if (!isString(oldName) || !isString(newName)) {
      throw new Error('Invalid collection names');
    }
  
    // Call the function 'fn' with the provided oldName and newName, and return the promise
    return fn(oldName, newName);
  }


/**
 * Asynchronous method to retrieve statistics for a MongoDB collection.
 *
 * @param {Object} options - Optional. An object containing options for the statistics command.
 * @param {Function} fns - Optional. A function to execute before retrieving the statistics (pre-hook).
 * @returns {Promise} - A promise that resolves with the statistics for the collection.
 */
async stats(options = {}, fns = () => { }) {
  // Check if the options are provided and are an object
  if (options && !isObject(options)) {
    throw new Error('Invalid options');
  }

  // Obtain the appropriate function 'fn' using 'dbMethod' based on the provided 'fns'
  const fn = dbMethod(this)('stats', fns, false, 'stats');

  // Call the function 'fn' with the provided options, and return the promise
  return fn(options);
}


async getCollection(name = this.collection, fns = () => {}) {
  const fn = dbMethod(this)('getCollection', fns);
  return fn(name);
}//todo:  database[method] is not a function                                               Mon Jul 31 10:24:08 MDT 20database[method] is not a function                                                     Mon Jul 31 10:24:08 MDT 202database[method] is not a function 

/**
 * Asynchronous method to drop a MongoDB collection.
 *
 * @param {string} name - Optional. The name of the collection to be dropped. Defaults to the current collection.
 * @param {Function} fns - Optional. A function to execute before dropping the collection (pre-hook).
 * @returns {Promise} - A promise that resolves once the collection has been dropped.
 */
async dropCollection(name = this.collection, fns = () => {}) {

    // Check if the name is provided and is a string
    if (name && !isString(name)) {
      return 'Invalid name';
    }
  // Obtain the appropriate function 'fn' using 'dbMethod' based on the provided 'fns'
  const fn = dbMethod(this)('dropCollection', fns);

  // Call the function 'fn' with the provided collection name, and return the promise
  return fn(name);
}

/**
 * Asynchronous method to drop a MongoDB collection.
 *
 * @param {string} name - Optional. The name of the collection to be dropped. Defaults to the current collection.
 * @param {Function} fns - Optional. A function to execute before dropping the collection (pre-hook).
 * @returns {Promise} - A promise that resolves once the collection has been dropped.
 */
async drop(name = this.collection, fns = () => {}) {
  // Check if the provided name is a string
  if (name && !isString(name)) {
    return 'Invalid name';
  }

  // Obtain the appropriate function 'fn' using 'dbMethod' based on the provided 'fns'
  const fn = dbMethod(this)('dropCollection', fns, false, 'drop');

  // Call the function 'fn' with the provided collection name, and return the promise
  return fn(name);
}


// async dropDatabase(fns = () => {}) {
//   const fn = dbMethod(this)('dropDatabase', fns);
//   return fn();
// }


/**
 * Asynchronous method to execute a MongoDB command.
 *
 * @param {Object} options - Optional. An object containing the command options.
 * @param {number} options.ping - Optional. A ping command value (default is 1).
 * @param {Function} fns - Optional. A function to execute before running the command (pre-hook).
 * @returns {Promise} - A promise that resolves with the result of the command.
 */
async command(options = { ping: 1 }, fns = () => {}) {
  // Obtain the appropriate function 'fn' using 'dbMethod' based on the provided 'fns'
  const fn = dbMethod(this)('command', fns);

  // Check if the provided options are an object
  if (options && !isObject(options)) {
    return 'Invalid options';
  }

  // Call the function 'fn' with the provided command options, and return the promise
  return fn(options);
}


/**
 * Asynchronous method to create a MongoDB view.
 *
 * @param {string} view - The name of the view to be created.
 * @param {string} source - The name of the source collection or view on which the view is based.
 * @param {Array} pipeline - An array of aggregation pipeline stages defining the view.
 * @param {Function} fns - Optional. A function to execute before creating the view (pre-hook).
 * @returns {Promise} - A promise that resolves with the result of the create view command.
 */
async createView(view, source, pipeline, fns = () => {}) {
  // Use 'this.command' to execute the 'createView' command with the provided parameters
  return this.command({ create: view, viewOn: source, pipeline }, fns);
}

async currentOp(operations = false || {}, fns = () => {}) {

  if(operations && !isBoolean(operations)) return 'Invalid operations';
  const fn = dbMethod(this)('currentOp', fns);
  return fn(operations);
}//todo: database[method] is not a function



async fsyncLock(fns = () => {}) { 
  const fn = dbMethod(this)('fsyncLock', fns);
  return fn();
}// todo : fix fsyncLock is not a method issue
  
async fsyncUnlock(fns = () => {}) { 
  const fn = dbMethod(this)('fsyncUnlock', fns);
  return fn();
}// todo : fix fsyncUnlock is not a method issue

async getCollectionInfos(filter = {}, nameOnly = true, authorizedCollections = true, fns = () => {}) {
  const fn = dbMethod(this)('getCollectionInfos', fns, true, 'getCollectionInfos');
  return fn(filter, nameOnly, authorizedCollections);
}// todo : fix getCollectionInfos is not a method issue
  

async getLogComponents(fns = () => {}) {
  const fn = dbMethod(this)('getLogComponents', fns);
  return fn();
}//todo database[method] is not a function

async getName(fns = () => {}) {
  const fn = dbMethod(this)('getName', fns);
  return fn();
}//todo: database[method] is not a function


  // User Management Commands

/**
 * Asynchronous method to create a new user in the MongoDB database.
 *
 * @param {Object} options - An object containing the options for creating the user.
 * @param {string} options.name - The name of the user to be created.
 * @param {string} options.pwd - The password for the user.
 * @param {Object} options.customData - Optional. Custom data associated with the user.
 * @param {Array} options.roles - Optional. An array of roles assigned to the user.
 * @param {Object} options.writeConcern - Optional. Write concern for the operation.
 * @param {Array} options.authenticationRestrictions - Optional. Authentication restrictions for the user.
 * @param {Array} options.mechanisms - Optional. Authentication mechanisms for the user.
 * @param {boolean} options.digestPassword - Optional. If true, the password will be stored as a digest.
 * @param {string} options.comment - Optional. A comment associated with the user.
 * @param {Function} fns - Optional. A function to execute before creating the user (pre-hook).
 * @returns {Promise} - A promise that resolves with the result of the create user command.
 */
async createUser(options = { name: 'newuser', pwd: 'password', customData: {}, roles: [], writeConcern: {}, authenticationRestrictions: [], mechanisms: [], digestPassword: false, comment: '' }, fns = () => {}) {
  // Use 'this.command' to execute the 'createUser' command with the provided parameters
  const fn = dbMethod(this)('command', fns, false, 'createUser');

  // Check if 'options' is an object
  if (options && !isObject(options)) return 'Invalid options';

  // Extract and validate 'createUserOptions' from the 'options' object
  const createUserOptions = this.options(options, 'createUser');

  // Return the result of the 'createUser' command
  return fn(createUserOptions);
}


/**
 * Asynchronous method to update an existing user in the MongoDB database.
 *
 * @param {Object} options - An object containing the options for updating the user.
 * @param {string} options.name - The name of the user to be updated.
 * @param {string} options.pwd - Optional. The new password for the user.
 * @param {Object} options.customData - Optional. New custom data associated with the user.
 * @param {Array} options.roles - Optional. New array of roles assigned to the user.
 * @param {Object} options.writeConcern - Optional. Write concern for the operation.
 * @param {Array} options.authenticationRestrictions - Optional. New authentication restrictions for the user.
 * @param {Array} options.mechanisms - Optional. New authentication mechanisms for the user.
 * @param {boolean} options.digestPassword - Optional. If true, the new password will be stored as a digest.
 * @param {string} options.comment - Optional. A comment associated with the user update.
 * @param {Function} fns - Optional. A function to execute before updating the user (pre-hook).
 * @returns {Promise} - A promise that resolves with the result of the update user command.
 */
async updateUser(options = { name: 'newuser', pwd: 'password', customData: {}, roles: [], writeConcern: {}, authenticationRestrictions: [], mechanisms: [], digestPassword: false, comment: '' }, fns = () => {}) {
  // Use 'this.command' to execute the 'updateUser' command with the provided parameters
  const fn = dbMethod(this)('command', fns, false, 'updateUser');

  // Check if 'options' is an object
  if (options && !isObject(options)) return 'Invalid options';

  // Extract and validate 'updateUserOptions' from the 'options' object
  const updateUserOptions = this.options(options, 'updateUser');

  // Return the result of the 'updateUser' command
  return fn(updateUserOptions);
}

/**
 * Asynchronous method to drop all users from the MongoDB database.
 *
 * @param {Object} options - An object containing the options for dropping all users from the database.
 * @param {number} options.level - Optional. The level of operation. Default is 1.
 * @param {Object} options.writeConcern - Optional. Write concern for the operation.
 * @param {string} options.comment - Optional. A comment associated with the operation.
 * @param {Function} fns - Optional. A function to execute before dropping all users (pre-hook).
 * @returns {Promise} - A promise that resolves with the result of the dropAllUsersFromDatabase command.
 */
async dropAllUsersFromDatabase(options = { level: 1, writeConcern: {}, comment: '' }, fns = () => {}) {
  // Use 'this.command' to execute the 'dropAllUsersFromDatabase' command with the provided parameters
  const fn = dbMethod(this)('command', fns, false, 'dropAllUsersFromDatabase');

  // Check if 'options' is an object
  if (options && !isObject(options)) return 'Invalid options';

  // Extract and validate 'dropAllUsersFromDatabaseOptions' from the 'options' object
  const dropAllUsersFromDatabaseOptions = this.options(options, 'dropAllUsersFromDatabase', 'level');

  // Return the result of the 'dropAllUsersFromDatabase' command
  return fn(dropAllUsersFromDatabaseOptions);
}

/**
 * Asynchronous method to drop a user from the MongoDB database.
 *
 * @param {Object} options - An object containing the options for dropping the user.
 * @param {string} options.name - Optional. The name of the user to drop. Default is 'newuser'.
 * @param {Object} options.writeConcern - Optional. Write concern for the operation.
 * @param {string} options.comment - Optional. A comment associated with the operation.
 * @param {Function} fns - Optional. A function to execute before dropping the user (pre-hook).
 * @returns {Promise} - A promise that resolves with the result of the dropUser command.
 */

async dropUser(options = { name: 'newuser', writeConcern: {}, comment: '' }, fns = () => {}) {
  // Use 'this.command' to execute the 'dropUser' command with the provided parameters
  const fn = dbMethod(this)('command', fns, false, 'dropUser');

  // Check if 'options' is an object
  if (options && !isObject(options)) return 'Invalid options';

  // Extract and validate 'dropUserOptions' from the 'options' object
  const dropUserOptions = this.options(options, 'dropUser');

  // Return the result of the 'dropUser' command
  return fn(dropUserOptions);
}

/**
 * Asynchronous method to grant roles to a user in the MongoDB database.
 *
 * @param {Object} options - An object containing the options for granting roles to the user.
 * @param {string} options.name - Optional. The name of the user to grant roles. Default is 'newuser'.
 * @param {Array<string>} options.roles - Optional. An array of roles to grant to the user.
 * @param {Object} options.writeConcern - Optional. Write concern for the operation.
 * @param {string} options.comment - Optional. A comment associated with the operation.
 * @param {Function} fns - Optional. A function to execute before granting roles to the user (pre-hook).
 * @returns {Promise} - A promise that resolves with the result of the grantRolesToUser command.
 */
async grantRolesToUser(options = { name: 'newuser', roles: [], writeConcern: {}, comment: '' }, fns = () => {}) {
  // Use 'this.command' to execute the 'grantRolesToUser' command with the provided parameters
  const fn = dbMethod(this)('command', fns, false, 'grantRolesToUser');

  // Check if 'options' is an object
  if (options && !isObject(options)) return 'Invalid options';

  // Extract and validate 'grantRolesToUserOptions' from the 'options' object
  const grantRolesToUserOptions = this.options(options, 'grantRolesToUser');

  // Return the result of the 'grantRolesToUser' command
  return fn(grantRolesToUserOptions);
}


/**
 * Asynchronous method to revoke roles from a user in the MongoDB database.
 *
 * @param {Object} options - An object containing the options for revoking roles from the user.
 * @param {string} options.name - Optional. The name of the user to revoke roles. Default is 'newuser'.
 * @param {Array<string>} options.roles - Optional. An array of roles to revoke from the user.
 * @param {Object} options.writeConcern - Optional. Write concern for the operation.
 * @param {string} options.comment - Optional. A comment associated with the operation.
 * @param {Function} fns - Optional. A function to execute before revoking roles from the user (pre-hook).
 * @returns {Promise} - A promise that resolves with the result of the revokeRolesFromUser command.
 */
async revokeRolesFromUser(options = { name: 'newuser', roles: [], writeConcern: {}, comment: '' }, fns = () => {}) {
  // Use 'this.command' to execute the 'revokeRolesFromUser' command with the provided parameters
  const fn = dbMethod(this)('command', fns, false, 'revokeRolesFromUser');

  // Check if 'options' is an object
  if (options && !isObject(options)) return 'Invalid options';

  // Extract and validate 'revokeRolesFromUserOptions' from the 'options' object
  const revokeRolesFromUserOptions = this.options(options, 'revokeRolesFromUser');

  // Return the result of the 'revokeRolesFromUser' command
  return fn(revokeRolesFromUserOptions);
}

/**
 * Asynchronous method to retrieve information about users in the MongoDB database.
 *
 * @param {Object} options - An object containing the options for retrieving user information.
 * @param {string} options.name - Optional. The name of the user to retrieve information. Default is 'newuser'.
 * @param {boolean} options.showCredentials - Optional. Whether to show user credentials. Default is true.
 * @param {boolean} options.showCustomData - Optional. Whether to show custom data associated with the user. Default is true.
 * @param {boolean} options.showPrivileges - Optional. Whether to show user privileges. Default is true.
 * @param {boolean} options.showAuthenticationRestrictions - Optional. Whether to show user authentication restrictions. Default is true.
 * @param {Object} options.filter - Optional. Additional filtering criteria for user information.
 * @param {string} options.comment - Optional. A comment associated with the operation.
 * @param {Function} fns - Optional. A function to execute before retrieving user information (pre-hook).
 * @returns {Promise} - A promise that resolves with the result of the usersInfo command.
 */
async usersInfo(options = {
  name: 'newuser',
  showCredentials: true,
  showCustomData: true,
  showPrivileges: true,
  showAuthenticationRestrictions: true,
  filter: {},
  comment: ''
}, fns = () => {}) {
  // Use 'this.command' to execute the 'usersInfo' command with the provided parameters
  const fn = dbMethod(this)('command', fns, false, 'usersInfo');

  // Check if 'options' is an object
  if (options && !isObject(options)) return 'Invalid options';

  // Extract and validate 'usersInfoOptions' from the 'options' object
  const usersInfoOptions = this.options(options, 'usersInfo');

  // Return the result of the 'usersInfo' command
  return fn(usersInfoOptions);
}

// Role Management Commands: todo://double check these method


/**
 * Asynchronous method to create a new role in the MongoDB database.
 *
 * @param {Object} options - An object containing the options for creating the role.
 * @param {string} options.name - Optional. The name of the new role to be created. Default is 'new role'.
 * @param {Array} options.privileges - Optional. An array of privileges to be granted to the new role. Default is an empty array.
 * @param {Array} options.roles - Optional. An array of roles to inherit privileges from for the new role. Default is an empty array.
 * @param {Array} options.authenticationRestrictions - Optional. An array of authentication restrictions for the new role. Default is an empty array.
 * @param {Object} options.writeConcern - Optional. The write concern for the operation. Default is an empty object.
 * @param {string} options.comment - Optional. A comment associated with the operation.
 * @param {Function} fns - Optional. A function to execute before creating the role (pre-hook).
 * @returns {Promise} - A promise that resolves with the result of the createRole command.
 */
async createRole(options = {
  name: 'new role',
  privileges: [],
  roles: [],
  authenticationRestrictions: [],
  writeConcern: {},
  comment: ''
}, fns = () => {}) {
  // Use 'this.command' to execute the 'createRole' command with the provided parameters
  const fn = dbMethod(this)('command', fns, false, 'createRole');

  // Check if 'options' is an object
  if (options && !isObject(options)) return 'Invalid options';

  // Extract and validate 'createRoleOptions' from the 'options' object
  const createRoleOptions = this.options(options, 'createRole');

  // Return the result of the 'createRole' command
  return fn(createRoleOptions);
}

/**
 * Asynchronous method to drop all roles from the MongoDB database.
 *
 * @param {Object} options - An object containing the options for dropping all roles from the database.
 * @param {number} options.level - Optional. The level of the operation. Default is 1.
 * @param {Object} options.writeConcern - Optional. The write concern for the operation. Default is an empty object.
 * @param {string} options.comment - Optional. A comment associated with the operation.
 * @param {Function} fns - Optional. A function to execute before dropping all roles (pre-hook).
 * @returns {Promise} - A promise that resolves with the result of the dropAllRolesFromDatabase command.
 */
async dropAllRolesFromDatabase(options = {
  level: 1,
  writeConcern: {},
  comment: ''
}, fns = () => {}) {
  // Use 'this.command' to execute the 'dropAllRolesFromDatabase' command with the provided parameters
  const fn = dbMethod(this)('command', fns, false, 'dropAllRolesFromDatabase');

  // Check if 'options' is an object
  if (options && !isObject(options)) return 'Invalid options';

  // Extract and validate 'dropAllRolesFromDatabaseOptions' from the 'options' object
  const dropAllRolesFromDatabaseOptions = this.options(options, 'dropAllRolesFromDatabase', 'level');

  // Return the result of the 'dropAllRolesFromDatabase' command
  return fn(dropAllRolesFromDatabaseOptions);
}


/**
 * Asynchronous method to grant privileges to a MongoDB role.
 *
 * @param {Object} options - An object containing the options for granting privileges to the role.
 * @param {string} options.name - The name of the role to which privileges will be granted.
 * @param {Array} options.privileges - An array of privileges to be granted to the role.
 * @param {Object} options.writeConcern - Optional. The write concern for the operation. Default is an empty object.
 * @param {string} options.comment - Optional. A comment associated with the operation.
 * @param {Function} fns - Optional. A function to execute before granting privileges to the role (pre-hook).
 * @returns {Promise} - A promise that resolves with the result of the grantPrivilegesToRole command.
 */
async grantPrivilegesToRole(options = {
  name: 'role',
  privileges: [],
  writeConcern: {},
  comment: ''
}, fns = () => {}) {
  // Use 'this.command' to execute the 'grantPrivilegesToRole' command with the provided parameters
  const fn = dbMethod(this)('command', fns, false, 'grantPrivilegesToRole');

  // Check if 'options' is an object
  if (options && !isObject(options)) return 'Invalid options';

  // Extract and validate 'grantPrivilegesToRoleOptions' from the 'options' object
  const grantPrivilegesToRoleOptions = this.options(options, 'grantPrivilegesToRole');

  // Return the result of the 'grantPrivilegesToRole' command
  return fn(grantPrivilegesToRoleOptions);
}


/**
 * Asynchronous method to grant roles to a MongoDB role.
 *
 * @param {Object} options - An object containing the options for granting roles to the role.
 * @param {string} options.name - The name of the role to which roles will be granted.
 * @param {Array} options.roles - An array of roles to be granted to the role.
 * @param {Object} options.writeConcern - Optional. The write concern for the operation. Default is an empty object.
 * @param {string} options.comment - Optional. A comment associated with the operation.
 * @param {Function} fns - Optional. A function to execute before granting roles to the role (pre-hook).
 * @returns {Promise} - A promise that resolves with the result of the grantRolesToRole command.
 */
async grantRolesToRole(options = {
  name: 'role',
  roles: [],
  writeConcern: {},
  comment: ''
}, fns = () => {}) {
  // Use 'this.command' to execute the 'grantRolesToRole' command with the provided parameters
  const fn = dbMethod(this)('command', fns, false, 'grantRolesToRole');

  // Check if 'options' is an object
  if (options && !isObject(options)) return 'Invalid options';

  // Extract and validate 'grantRolesToRoleOptions' from the 'options' object
  const grantRolesToRoleOptions = this.options(options, 'grantRolesToRole');

  // Return the result of the 'grantRolesToRole' command
  return fn(grantRolesToRoleOptions);
}

/**
 * Asynchronous method to revoke roles from a MongoDB role.
 *
 * @param {Object} options - An object containing the options for revoking roles from the role.
 * @param {string} options.name - The name of the role from which roles will be revoked.
 * @param {Array} options.roles - An array of roles to be revoked from the role.
 * @param {Object} options.writeConcern - Optional. The write concern for the operation. Default is an empty object.
 * @param {string} options.comment - Optional. A comment associated with the operation.
 * @param {Function} fns - Optional. A function to execute before revoking roles from the role (pre-hook).
 * @returns {Promise} - A promise that resolves with the result of the revokeRolesFromRole command.
 */
async revokeRolesFromRole(options = {
  name: 'role',
  roles: [],
  writeConcern: {},
  comment: ''
}, fns = () => {}) {
  // Use 'this.command' to execute the 'revokeRolesFromRole' command with the provided parameters
  const fn = dbMethod(this)('command', fns, false, 'revokeRolesFromRole');

  // Check if 'options' is an object
  if (options && !isObject(options)) return 'Invalid options';

  // Extract and validate 'revokeRolesFromRoleOptions' from the 'options' object
  const revokeRolesFromRoleOptions = this.options(options, 'revokeRolesFromRole');

  // Return the result of the 'revokeRolesFromRole' command
  return fn(revokeRolesFromRoleOptions);
}

/**
 * Asynchronous method to invalidate the user cache in MongoDB.
 *
 * @param {Object} options - An object containing the options for invalidating the user cache.
 * @param {number} options.level - The cache level to invalidate (default is 1).
 * @param {Function} fns - Optional. A function to execute before invalidating the user cache (pre-hook).
 * @returns {Promise} - A promise that resolves with the result of the invalidateUserCache command.
 */
async invalidateUserCache(options = { level: 1 }, fns = () => {}) {
  // Use 'this.command' to execute the 'invalidateUserCache' command with the provided parameters
  const fn = dbMethod(this)('command', fns, false, 'invalidateUserCache');

  // Check if 'options' is an object
  if (options && !isObject(options)) return 'Invalid options';

  // Extract and validate 'invalidateUserCacheOptions' from the 'options' object
  const invalidateUserCacheOptions = this.options(options, 'invalidateUserCache', 'level');

  // Return the result of the 'invalidateUserCache' command
  return fn(invalidateUserCacheOptions);
}


/**
 * Asynchronous method to revoke privileges from a role in MongoDB.
 *
 * @param {Object} options - An object containing the options for revoking privileges from a role.
 * @param {string} options.name - The name of the role from which privileges will be revoked.
 * @param {Array} options.privileges - An array of privilege objects to be revoked from the role.
 * @param {Object} options.writeConcern - Optional. The write concern for the operation.
 * @param {string} options.comment - Optional. A comment to describe the purpose of the operation.
 * @param {Function} fns - Optional. A function to execute before revoking privileges from the role (pre-hook).
 * @returns {Promise} - A promise that resolves with the result of the revokePrivilegesFromRole command.
 */
async revokePrivilegesFromRole(options = { name: 'role', privileges: [], writeConcern: {}, comment: '' }, fns = () => {}) {
  // Use 'this.command' to execute the 'revokePrivilegesFromRole' command with the provided parameters
  const fn = dbMethod(this)('command', fns, false, 'revokePrivilegesFromRole');

  // Check if 'options' is an object
  if (options && !isObject(options)) return 'Invalid options';

  // Extract and validate 'revokePrivilegesFromRoleOptions' from the 'options' object
  const revokePrivilegesFromRoleOptions = this.options(options, 'revokePrivilegesFromRole');

  // Return the result of the 'revokePrivilegesFromRole' command
  return fn(revokePrivilegesFromRoleOptions);
}


/**
 * Asynchronous method to get information about roles in MongoDB.
 *
 * @param {Object} options - An object containing the options for retrieving role information.
 * @param {Object} options.name - Optional. An object specifying the role and the database for which role information will be retrieved.
 * @param {string} options.name.role - Optional. The name of the role for which information will be retrieved.
 * @param {string} options.name.db - Optional. The name of the database to which the role belongs.
 * @param {boolean} options.showAuthenticationRestrictions - Optional. Indicates whether to include authentication restrictions in the role information.
 * @param {boolean} options.showBuiltinRoles - Optional. Indicates whether to include built-in roles in the role information.
 * @param {boolean} options.showPrivileges - Optional. Indicates whether to include privileges in the role information.
 * @param {string} options.comment - Optional. A comment to describe the purpose of the operation.
 * @param {Function} fns - Optional. A function to execute before retrieving role information (pre-hook).
 * @returns {Promise} - A promise that resolves with the result of the rolesInfo command.
 */
async rolesInfo(options = { name: { role: 'role', db: 'app' }, showAuthenticationRestrictions: true, showBuiltinRoles: true, showPrivileges: true, comment: '' }, fns = () => {}) {
  // Use 'this.command' to execute the 'rolesInfo' command with the provided parameters
  const fn = dbMethod(this)('command', fns, false, 'rolesInfo');

  // Check if 'options' is an object
  if (options && !isObject(options)) return 'Invalid options';

  // Extract and validate 'rolesInfoOptions' from the 'options' object
  const rolesInfoOptions = this.options(options, 'rolesInfo');

  // Return the result of the 'rolesInfo' command
  return fn(rolesInfoOptions);
}

/**
 * Asynchronous method to update a role in MongoDB.
 *
 * @param {Object} options - An object containing the options for updating a role.
 * @param {string} options.name - Optional. The name of the role to be updated.
 * @param {Array} options.privileges - Optional. An array of privileges to be granted to the role.
 * @param {Array} options.roles - Optional. An array of roles to be granted to the role.
 * @param {Array} options.authenticationRestrictions - Optional. An array of authentication restrictions for the role.
 * @param {Object} options.writeConcern - Optional. The write concern for the update operation.
 * @param {string} options.comment - Optional. A comment to describe the purpose of the operation.
 * @param {Function} fns - Optional. A function to execute before updating the role (pre-hook).
 * @returns {Promise} - A promise that resolves with the result of the updateRole command.
 */
async updateRole(options = { name: 'new role', privileges: [], roles: [], authenticationRestrictions: [], writeConcern: {}, comment: '' }, fns = () => {}) {
  // Use 'this.command' to execute the 'updateRole' command with the provided parameters
  const fn = dbMethod(this)('command', fns, false, 'updateRole');

  // Check if 'options' is an object
  if (options && !isObject(options)) return 'Invalid options';

  // Extract and validate 'updateRoleOptions' from the 'options' object
  const updateRoleOptions = this.options(options, 'updateRole');

  // Return the result of the 'updateRole' command
  return fn(updateRoleOptions);
}

}

module.exports = DB