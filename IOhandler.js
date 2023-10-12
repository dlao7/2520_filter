/*
 * Project: BCITstagram
 * File Name: IOhandler.js
 * Description: Collection of functions for files input/output related operations
 *
 * Created Date: 10/12/2023
 * Author: Deborah Lao
 *
 */

const AdmZip = require("adm-zip"),
  fs = require("fs").promises,
  PNG = require("pngjs").PNG,
  path = require("path");
  // { promisify } = require('util');

/**
 * Description: decompress file from given pathIn, write to given pathOut
 *
 * @param {string} pathIn
 * @param {string} pathOut
 * @return {promise}
 */
const unzip = (pathIn, pathOut) => {
  /**
   * 
   * Notes: Unzipper module produces corrupt files, 
   * switched to using AdmZip's Async version of
   * extractAllTo.
   *
   */

  const zip = new AdmZip(pathIn) ;
  // const extractProm = promisify(zip.extractAllToAsync);

  // extractProm(pathOut, true)
  //   .then((result) => resolve("Extraction process complete."))
  //   .catch((err) => reject("Extraction error."))

  return new Promise ((res, rej) => {
    zip.extractAllToAsync(pathOut, true, (err, data) => {
    if (err){
      rej("There was an error during extraction.")
    } else {
      res("Extraction process complete.")
    }
  });
  })
  
}

/**
 * Description: read all the png files from given directory and return Promise containing array of each png file path
 *
 * @param {string} path
 * @return {promise}
 */
const readDir = (dir) => {
  return new Promise((res, rej) => {
    fs.readdir(dir)
      .then((fileNames) => {
        pngList = [];
        for (file of fileNames){
          if (path.extname(file) === ".png"){
            pngList.push(path.join(dir, file));
          }
        }
        res(pngList);
      })
      .catch((err) => {
        if (err.code === "ENOENT"){
          rej(`The directory "${dir}" does not exist.`)
        }
        rej(err);
      })
   });
};

/**
 * Description: Read in png file by given pathIn,
 * convert to grayscale and write to given pathOut
 *
 * @param {string} filePath
 * @param {string} pathProcessed
 * @return {promise}
 */
const grayScale = (pathIn, pathOut) => {};

module.exports = {
  unzip,
  readDir,
  grayScale,
};
