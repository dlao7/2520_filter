const path = require("path");

/*
 * Project: BCITstagram
 * File Name: main.js
 * Description: Entry point for BCITstagram backend.
 *
 * Created Date: 10/12/2023
 * Author: Deborah Lao
 *
 */

const { unzip, readDir, grayScale } = require("./IOhandler");
const zipFilePath = path.join(__dirname, "myfile.zip");
const pathUnzipped = path.join(__dirname, "unzipped");
const pathProcessed = path.join(__dirname, "grayscaled");

unzip(zipFilePath, pathUnzipped)
  .then((result) => console.log(result))
  .then(() => readDir(pathUnzipped))
  .then((pngList) => {
    Promise.all(
      pngList.map((png) =>
        grayScale(png, path.join(pathProcessed, path.basename(png)))
      )
    ).then(() => {
      console.log("All images done.");
    })
  })
  .catch((err) => console.log(err));
