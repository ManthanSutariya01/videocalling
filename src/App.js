import React from "react";
import "./App.css";
const OT = require("@opentok/client");

// replace these values with those generated in your TokBox Account
var apiKey = "47131824";
var sessionId =
  "2_MX40NzEzMTgyNH5-MTYxMzYzMjY0ODI0OX5ab0pkQ0hTdnNqUy8ydFRRQTdDMHFuUzR-fg";
var token =
  "T1==cGFydG5lcl9pZD00NzEzMTgyNCZzaWc9M2Q3NzYzZDczNTdkZDI2NmNiMzk2NGJlOGFmZTUzNzNkOWY3YmYzZTpzZXNzaW9uX2lkPTJfTVg0ME56RXpNVGd5Tkg1LU1UWXhNell6TWpZME9ESTBPWDVhYjBwa1EwaFRkbk5xVXk4eWRGUlJRVGRETUhGdVV6Ui1mZyZjcmVhdGVfdGltZT0xNjEzNjMyNjg0Jm5vbmNlPTAuNzM0NzY3MjU1MDU0OTEwMyZyb2xlPXB1Ymxpc2hlciZleHBpcmVfdGltZT0xNjE2MjIxMDgzJmluaXRpYWxfbGF5b3V0X2NsYXNzX2xpc3Q9";
// Handling all of our errors here by alerting them

// OT.checkScreenSharingCapability(function (response) {
//   var session = OT.initSession(apiKey, sessionId);
//   var publishOptions = {};
//   publishOptions.maxResolution = { width: 1920, height: 1080 };
//   publishOptions.videoSource = "screen";
//   publishOptions.publishAudio = true;
//   if (!response.supported || response.extensionRegistered === false) {
//     // This browser does not support screen sharing.
//   } else if (response.extensionInstalled === false) {
//     // Prompt to install the extension.
//     OT.registerScreenSharingExtension();
//   } else {
//     // Screen sharing is available. Publish the screen.
//     var publisher = OT.initPublisher(
//       "publisher",
//       //{ videoSource: "screen" },
//       publishOptions,
//       function (error) {
//         if (error) {
//           // Look at error.message to see what went wrong.
//         } else {
//           session.publish(publisher, function (error) {
//             if (error) {
//               // Look error.message to see what went wrong.
//             }
//           });
//         }
//       }
//     );

//     session.on("streamCreated", function (event) {
//       var subOptions = { insertMode: "append" };
//       if (event.stream.videoType === "screen") {
//         session.subscribe(event.stream, "subscriber", subOptions);
//       } else {
//         session.subscribe(event.stream, "people", subOptions);
//       }
//     });

//     session.on("streamCreated", function (event) {
//       var subOptions = {
//         appendMode: "append",
//       };

//       var parentElementId =
//         event.stream.videoType === "screen"
//           ? "sub-screen-sharing-container"
//           : "sub-camera-container";
//       event.subscriber = session.subscribe(
//         event.stream,
//         event.parentElement,
//         subOptions
//       );
//     });
//   }
// });

function handleError(error) {
  if (error) {
    alert(error.message);
  }
}

function initializeSession() {
  var session = OT.initSession(apiKey, sessionId);

  // Subscribe to a newly created stream
  session.on("streamCreated", function (event) {
    session.subscribe(
      event.stream,
      "subscriber",
      {
        insertMode: "append",
        width: "100%",
        height: "100%",
      },
      handleError
    );
  });
  // Create a publisher
  var publisher = OT.initPublisher(
    "publisher",
    {
      insertMode: "append",
      width: "100%",
      height: "100%",
    },
    handleError
  );

  // Connect to the session
  session.connect(token, function (error) {
    // If the connection is successful, publish to the session
    if (error) {
      handleError(error);
    } else {
      session.publish(publisher, handleError);
    }
  });

  console.log("manthan", session);
}

initializeSession();

const App = () => {
  return <></>;
};

export default App;
