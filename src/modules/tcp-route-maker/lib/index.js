const fs = require("fs")
const path = require("path");
const zlib = require('zlib');
const http = require('http');

exports.getAllFiles = function getAllFiles(dirPath, arrayOfFiles){
  files = fs.readdirSync(dirPath)

  arrayOfFiles = arrayOfFiles || []

  files.forEach(function(file) {
    if (fs.statSync(dirPath + "/" + file).isDirectory()) {
      arrayOfFiles = getAllFiles(dirPath + "/" + file, arrayOfFiles)
    } else {
      arrayOfFiles.push(path.join(__dirname, dirPath, "/", file))
    }
  })
  return arrayOfFiles
}

exports.readdirRecursive = async function readdirRecursive(dirPath, files = []){
    try{
        const allFiles = await fs.promises.readdir(dirPath);
        if(allFiles){
            for await(let file of allFiles){
                if((await fs.promises.stat(dirPath + "/" + file)).isDirectory()){
                    files = await readdirRecursive(dirPath + "/" + file, files);
                }else{
                    // files.push(path.join(__dirname, dirPath, "/", file)) 
                    files.push(path.join( dirPath, "/", file)) 
                  
                  
                }
            }
        }
        return files;
    }catch(error){
        return error;
    }
}
exports.zipper = (file = process.argv[2]) => fs.createReadStream(file)
    .pipe(zlib.createGzip())
    .pipe(fs.createWriteStream(file + '.gz'))
    .on('finish', () => console.log('File compressed successfully!'));

exports.server = () => http.createServer((req, res) => {
  const filename = req.headers.filename;
  console.log('File request received: ' + filename);
  req
  .pipe(zlib.createGunzip())
  .pipe(fs.createWriteStream(filename))
  .on('finish', () => {
      res.writeHead(201,{'Content-Type': 'text/plan'});
      res.end('That is it\n');
      console.log(`File saved: ${filename}`);
  })

}).listen(3000, () => console.log('Listening'));
