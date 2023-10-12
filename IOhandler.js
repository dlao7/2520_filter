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
  fs = require("fs"),
  PNG = require("pngjs").PNG,
  path = require("path");

/**
 * Description: decompress file from given pathIn, write to given pathOut
 *
 * @param {string} pathIn
 * @param {string} pathOut
 * @return {promise}
 */
const unzip = (pathIn, pathOut) => {
  /**
   * Notes: Unzipper module produces corrupt files
   * for some reason, switched to using AdmZip.
   * 
   * AdmZip appears to be synchronous, so I used
   * a try catch block to catch errors and then 
   * reject with the error message.
   * 
   */
  return new Promise ((res, rej) => {
    const zip = new AdmZip(pathIn);
  
    try {
      zip.extractAllTo(pathOut, true);
    } catch (e) {
      rej('Error', e)
    }
    
    res("Extraction process complete.")
  });
}

/**
 * Description: read all the png files from given directory and return Promise containing array of each png file path
 *
 * @param {string} path
 * @return {promise}
 */
const readDir = (dir) => {};

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
