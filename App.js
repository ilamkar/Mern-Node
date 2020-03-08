const fs = require("fs"); //file system

const userName = "ILAM KAR";

fs.writeFile("user-data.txt", "Name:" + userName, err => {
  if (err) {
    console.log(err);
    return;
  }
  console.log("Wrote file");
});
