const fs = require ('fs');
// const dataFile = require('../../doggos/src/data.json')
const path = require ('path');

const dataFilePath = __dirname + '/data.json';

const fileContent = "hello";

// console.log(dataFilePath, 'the path');
const writeInFile = async (req, res) => {
  console.log(dataFilePath, 'the path');
//   await fs.writeFile(dataFilePath, JSON.stringify(fileContent), (err) => {
//     if (err) {
//         console.error(err);
//         return;
//     };
//     console.log("File has been created");
// });
res.status(200);
}


module.exports = writeInFile;