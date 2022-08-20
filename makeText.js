/** Command-line tool to generate Markov text. */
const MarkovMachine = require("./markov");

const fs = require("fs");
const axios = require("axios");

function cat(path) {
  return fs.readFileSync(path, "utf8", (err, data) => {
    console.log("reading");
    if (err) {
      console.log("ERROR: ", err);
      process.kill(1);
    } else {
      console.log(data);
      return data;
    }
  });
}

async function webCat(path) {
  try {
    res = await axios.get(path);
    return await res.data;
  } catch (err) {
    return "Error: Request failed with status code 404";
  }
}
async function run() {
  if (
    process.argv[2].startsWith("http://") ||
    process.argv[2].startsWith("https://")
  ) {
    mm = new MarkovMachine(await webCat(process.argv[2]));
  } else {
    mm = new MarkovMachine(cat(process.argv[2]));
  }
  console.log(mm.makeText());
}

run();
