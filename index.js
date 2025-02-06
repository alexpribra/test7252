const fs = require("fs");

const ioc1 = "114.227.177.232";
const ioc2 = "101.34.14.87";

const send_file = "./elastic.json";
const event_count = 2;
function rand_ip() {
  return (
    Math.floor(Math.random() * 255) +
    1 +
    "." +
    Math.floor(Math.random() * 255) +
    "." +
    Math.floor(Math.random() * 255) +
    "." +
    Math.floor(Math.random() * 255)
  );
}
function run() {
  const obj = fs.readFileSync("vtb.json", "utf8");
  if (fs.existsSync(send_file)) {
    fs.unlinkSync(send_file);
  }
  const arr = [];

  for (let i = 0; i <= event_count; i++) {
    let new_obj = JSON.parse(obj);
    new_obj["flt-policy"] = rand_ip();
    if (process.env.NUM == "1" && i == 0) {
      new_obj["acc-ip"] = 216.219.87.41;
    } else if (process.env.NUM == "2" && i == 0) {
      new_obj["acc-ip"] = ioc2;
    } else {
      new_obj["acc-ip"] = rand_ip();
    }
    new_obj["@timestamp"] = new Date(
      Date.now() /*+ 3 * 60 * 1000*/
    ).toISOString();

    fs.appendFileSync(
      "./elastic.json",
      `{ "index" : { "_index" : "tip_data${process.env.NUM}", "_id" : "${
        process.env.NUM
      }_${Date.now()}_${i}" } }\n`
    );
    fs.appendFileSync("./elastic.json", JSON.stringify(new_obj) + "\n");
  }
}
run();
