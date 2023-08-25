const fs = require("fs")
const path = require("path");
const zlib = require('zlib');
const http = require('http');

/**
 * Recursively get all files from a directory and its subdirectories.
 *
 * @function getAllFiles
 * @param {string} dirPath - The path to the directory to search for files.
 * @param {Array} arrayOfFiles - (Optional) An array to store the list of file paths (used for recursion).
 * @returns {Array} An array containing the paths of all files found in the directory and its subdirectories.
 */
exports.getAllFiles = function getAllFiles(dirPath, arrayOfFiles) {
  // Read the contents of the directory.
  const files = fs.readdirSync(dirPath);

  // Initialize the arrayOfFiles array if not provided.
  arrayOfFiles = arrayOfFiles || [];

  // Loop through each file in the directory.
  files.forEach(function (file) {
    // Check if the current item is a directory.
    if (fs.statSync(dirPath + "/" + file).isDirectory()) {
      // Recursively call the function to process subdirectories.
      arrayOfFiles = getAllFiles(dirPath + "/" + file, arrayOfFiles);
    } else {
      // If the current item is a file, add its path to the arrayOfFiles array.
      arrayOfFiles.push(path.join(__dirname, dirPath, "/", file));
    }
  });

  // Return the final array containing all file paths.
  return arrayOfFiles;
};

/**
 * Recursively read all files from a directory and its subdirectories using async/await.
 *
 * @function readdirRecursive
 * @async
 * @param {string} dirPath - The path to the directory to search for files.
 * @param {Array} files - (Optional) An array to store the list of file paths (used for recursion).
 * @returns {Promise<Array>} A promise that resolves to an array containing the paths of all files found in the directory and its subdirectories.
 * If an error occurs during the process, the promise will be rejected with the error message.
 */
exports.readdirRecursive = async function readdirRecursive(dirPath, files = []) {
  try {
    // Read the contents of the directory using async/await.
    const allFiles = await fs.promises.readdir(dirPath);

    if (allFiles) {
      for await (let file of allFiles) {
        // Check if the current item is a directory using async/await.
        if ((await fs.promises.stat(dirPath + "/" + file)).isDirectory()) {
          // Recursively call the function to process subdirectories.
          files = await readdirRecursive(dirPath + "/" + file, files);
        } else {
          // If the current item is a file, add its path to the files array.
          files.push(path.join(dirPath, "/", file));
        }
      }
    }

    return files;
  } catch (error) {
    // If an error occurs during the process, return the error message.
    return error;
  }
};

/**
 * Compresses a file using gzip compression.
 *
 * @function zipper
 * @param {string} file - The path to the file that needs to be compressed.
 * @returns {void} This function does not return anything, it performs the gzip compression and logs a success message when finished.
 */
exports.zipper = (file = process.argv[2]) => {
  // Create a read stream to read the file.
  const readStream = fs.createReadStream(file);

  // Create a gzip compression stream.
  const gzipStream = zlib.createGzip();

  // Create a write stream to save the compressed data to a new file with the '.gz' extension.
  const writeStream = fs.createWriteStream(file + '.gz');

  // Pipe the read stream through the gzip stream and then to the write stream.
  readStream.pipe(gzipStream).pipe(writeStream);

  // Listen for the 'finish' event, which indicates that the compression is complete.
  writeStream.on('finish', () => {
    console.log('File compressed successfully!');
  });
};

/**
 * Creates an HTTP server that listens for incoming requests to save compressed files.
 *
 * @function server
 * @returns {void} This function does not return anything, it creates an HTTP server and starts listening on port 3000.
 */
exports.server = () => {
  // Create an HTTP server using the http module.
  const server = http.createServer((req, res) => {
    // Extract the filename from the request headers.
    const filename = req.headers.filename;
    console.log('File request received: ' + filename);

    // Create a stream to decompress the incoming data using gzip.
    const gunzipStream = zlib.createGunzip();

    // Create a write stream to save the decompressed data to a file with the provided filename.
    const writeStream = fs.createWriteStream(filename);

    // Pipe the incoming request data through the gunzip stream and then to the write stream.
    req.pipe(gunzipStream).pipe(writeStream);

    // Listen for the 'finish' event on the write stream, which indicates that the file has been saved.
    writeStream.on('finish', () => {
      // Send a response to the client indicating successful file save.
      res.writeHead(201, { 'Content-Type': 'text/plan' });
      res.end('That is it\n');
      console.log(`File saved: ${filename}`);
    });
  });

  // Start the server and listen on port 3000.
  server.listen(3000, () => {
    console.log('Listening');
  });
};

