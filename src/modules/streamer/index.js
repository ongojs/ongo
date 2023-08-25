'use strict';

require('../dotenv').config();
const fs = require('fs');
const { GridFSBucket } = require('mongodb');
const Client = require('../client');
/*
|------------------------------------------------------------------------------------
| Universal Module Definition (UMD)
|------------------------------------------------------------------------------------
|
| This is an implementation of the Universal Module Definition (UMD) pattern
| for creating a module that can be used in both browser and Node.js environments.


| The function is wrapped in an immediately invoked function expression (IIFE),
| which allows the module to have its own private scope and prevent any variable conflicts with other code.
| 
| The global variable is passed as a parameter to the function. In the browser,
| the global variable refers to the window object, while in Node.js it refers to the global scope.
|
*/

(global => {

    /*
    |----------------------------------------------------------------------------------
    | MODULE DEFINITION
    |----------------------------------------------------------------------------------
    |
    | The module is defined as an object or a function.

    |
    */

    /**
  * Returns an object containing options for configuring a GridFS bucket.
  * The function provides default values for the bucketName, chunkSizeBytes,
  * writeConcern, readPreference, and disableMD5 options. These options can be
  * overridden by environment variables if provided, otherwise, default values
  * are used.
  *
  * @returns {Object} An object containing the configuration options for the GridFS bucket.
  * - bucketName (string): The name of the GridFS bucket. Defaults to 'myGridFSBucket'.
  * - chunkSizeBytes (number): The chunk size in bytes for storing files in GridFS. Defaults to 512 KB (512 * 1024 bytes).
  * - writeConcern (Object): The write concern settings for GridFS. Defaults to { w: 'majority', wtimeout: 10000 }.
  * - readPreference (string): The read preference for GridFS. Defaults to 'secondary'.
  * - disableMD5 (boolean): A flag indicating whether to disable MD5 checksum validation for files. Defaults to true.
  */
    function bucketOptions() {
        return {
            // The name of the GridFS bucket. Defaults to 'myGridFSBucket'.
            bucketName: process.env.BUCKET_NAME || 'myGridFSBucket',
            // The chunk size in bytes for storing files in GridFS. Defaults to 512 KB (512 * 1024 bytes).
            chunkSizeBytes: 512 * 1024,
            // The write concern settings for GridFS. Defaults to { w: 'majority', wtimeout: 10000 }.
            writeConcern: { w: 'majority', wtimeout: 10000 },
            // The read preference for GridFS. Defaults to 'secondary'.
            readPreference: 'secondary',
            // A flag indicating whether to disable MD5 checksum validation for files. Defaults to true.
            disableMD5: true,
        };
    }


    /**
     * Uploads a file to a GridFS bucket in MongoDB using the given Observable configuration.
     *
     * @param {Object} Observable - An object containing the configuration for connecting to MongoDB.
     *                             It must have the properties 'url' and 'db' for specifying the
     *                             MongoDB connection URL and database name, respectively.
     * @param {Object} [options] - An object containing options for configuring the GridFS bucket.
     *                             It can include properties such as 'bucketName', 'chunkSizeBytes',
     *                             'writeConcern', 'readPreference', and 'disableMD5'. These options
     *                             will be used to create the GridFS bucket.
     * @param {Object} [client] - A MongoClient instance representing the MongoDB connection. If not
     *                            provided, a new MongoClient instance will be created using the
     *                            connection URL from the 'Observable.url' property.
     * @returns {Promise<void>} A Promise that resolves when the file is successfully uploaded to the GridFS bucket,
     *                          or rejects if there is an error during the upload process.
     */
    async function file(Observable, options = bucketOptions(), client = new Client(Observable.url)) {
        try {
            // Access the database
            const database = client.db(Observable.db);

            // Create a new GridFSBucket instance
            const bucket = new GridFSBucket(database, options);

            // Read the file from disk
            const fileStream = fs.createReadStream(filePath);

            // Create a file upload stream
            const uploadStream = bucket.openUploadStream(fileName);

            // Pipe the file stream to the upload stream
            fileStream.pipe(uploadStream);

            // Wait for the upload to finish
            await new Promise((resolve, reject) => {
                uploadStream.on('error', reject);
                uploadStream.on('finish', resolve);
            });

            console.log('File saved successfully!');
        } catch (error) {
            console.error('Error saving file:', error);
        } finally {
            // Close the MongoClient connection
            await client.close();
        }
    }

    /*
    |----------------------------------------------------------------------------------
    | EXPORTS MODULE IN NODEJS ENVIRONMENTS
    |----------------------------------------------------------------------------------
    |
    | The module is exported using an if/else statement. If the module object is defined and
    | has an exports property, then the module is being used in Node.js and we export 
    | the file object by assigning it to module.exports
    |
    |
    */

    if (typeof module !== 'undefined' && module.exports) module.exports = file;

    /*
    |----------------------------------------------------------------------------------------
    | EXPORT MODULE IN BROWSER ENVIRONMENTS
    |----------------------------------------------------------------------------------------
    |
    | If module is not defined or does not have an exports property, then the module is being used
    | in the browser and we attach the myModule object to the global object (which is the window object
    | in the browser) by assigning it to global.file.
    |
    */

    else global.file = file;
})(this)