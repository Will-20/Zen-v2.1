// server setup
const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();

// server options
const app = express();
app.use(cors());

var options = {
  inflate: true,
  limit: "4000kb",
  type: "application/json",
};
app.use(bodyParser.raw(options));
app.use(express.static(path.join(__dirname, "build")));

const fetch = require("node-fetch-commonjs");
const WebSocket = require("ws");

const WS_CONNECTION = "wss://ws.tryterra.co/connect";

let hr_list = [];
let time_list = [];

//Generates a token for a developer
const generateToken = new Promise((resolve, reject) => {
  const options = {
    method: "POST",
    headers: {
      Accept: "application/json",
      "dev-id": process.env.TERRA_DEV_ID,
      "x-api-key": process.env.TERRA_API_KEY,
    },
  };

  return fetch("https://ws.tryterra.co/auth/developer", options)
    .then((response) => resolve(response.json()))
    .catch((err) => reject(console.error(err)));
});

function initWS(token) {
  const socket = new WebSocket(WS_CONNECTION);

  var expectingHeartBeatAck = false;

  socket.addEventListener("open", function (event) {
    console.log("Connection Established");
  });

  function heartBeat() {
    if (!expectingHeartBeatAck) {
      var heartBeatPayload = JSON.stringify({
        op: 0,
      });
      socket.send(heartBeatPayload);
      console.log("↑  " + heartBeatPayload);
      expectingHeartBeatAck = true;
    } else socket.close();
  }

  socket.addEventListener("message", function (event) {
    console.log(event.data);
    console.log("↓  " + event.data);
    var message = JSON.parse(event.data);
    if (message["op"] == 2) {
      heartBeat();
      setInterval(heartBeat, message["d"]["heartbeat_interval"]);
      var payload = JSON.stringify(generatePayload(token));
      socket.send(payload);
      console.log("↑  " + payload);
    }
    if (message["op"] == 1) {
      expectingHeartBeatAck = false;
    }
    if (message["op"] == 5) {
      hr_list.push(message.d.val);
      time_list.push(message.d.ts);
    }
  });

  socket.addEventListener("close", function (event) {
    console.log("close");
    console.log(event.reason);
  });

  socket.addEventListener("error", function (event) {
    console.log("error");
    console.log(event);
  });
}

function generatePayload(token) {
  return {
    op: 3,
    d: {
      token: token,
      type: 1, //0  for user, 1 for developer
    },
  };
}

generateToken
  .then((tokenpayload) => {
    var token = tokenpayload["token"];
    initWS(token);
  })
  .catch((error) => {
    console.log(error);
  });

app.get("/api/hr", function (req, res) {
  const data = hr_list;
  // res.status(200).json([Math.floor(Math.random() * 20) + 60]);
  res.status(200).json(data);
});

app.get("/api/timestamps", function (req, res) {
  const data = time_list;
  res.status(200).json(data);
});

// var axios = require("axios");

// var config = {
//   method: "get",
//   url: "https://api.tryterra.co/v2/activity?user_id=294d5d27-6f7b-41d2-bc12-45693c615888&to_webhook=false&start_date=2023-02-04",
//   headers: {
//     "dev-id": "team-:d-dev-ZF9JvQd78F",
//     "X-API-Key":
//       "f0dc971344d88e9793af7f9d5be993f70311b99cca6159648846807124216fb5",
//   },
// };

// app.get("/api/user/:userId", async function (req, res) {
//   const params = req.params;
//   var start = "2023-02-04";
//   // start.setUTCHours(0, 0, 0, 0);

//   // var end = new Date();
//   // end.setUTCHours(23, 59, 59, 999);

//   // await terra
//   //   .getActivity({
//   //     userId: params.userId,
//   //     startDate: new Date("2023-01-01"),
//   //     // endDate: new Date("2023-01-07"),
//   //     toWebhook: false,
//   //   })
//   //   .then((r) => {
//   //     res.status(200).json(r);
//   //   })
//   //   .catch((e) => {
//   //     console.log(e);
//   //     res.status(500).json(e);
//   //   });
//   // res.send(req.params);
//   // res.sendStatus(200);
//   // res.status(200).json({ meow: "wao" });

//   await axios(config).then((response) => {
//     res.status(200).json(response.data);
//   });
// });

// Server application
app.get("/*", function (req, res) {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

const port = process.env.PORT;
app.listen(port);
console.log("Server started on port " + port);
