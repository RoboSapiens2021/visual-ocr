let canvas = document.querySelector("#canvas");
let context = canvas.getContext("2d");
let video = document.querySelector("#video");
let img;
let tts;

var SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;
var SpeechGrammarList =
  window.SpeechGrammarList || window.webkitSpeechGrammarList;

var grammar = "#JSGF V1.0;";
var message = document.querySelector("#message");
var recognition = new SpeechRecognition();
var speechRecognitionList = new SpeechGrammarList();
speechRecognitionList.addFromString(grammar, 1);
recognition.grammars = speechRecognitionList;
recognition.lang = "en-US";
recognition.interimResults = false;

recognition.onresult = function (event) {
  var last = event.results.length - 1;
  var command = event.results[last][0].transcript;
  message.textContent = "Voice Input: " + command + ".";

  if (command.toLowerCase() === "read") {
    onSave();
  } else if (command.toLowerCase() === "scan") {
    onSave();
  } else if (command.toLowerCase() === "peek") {
    onSave();
  } else if (command.toLowerCase() === "search") {
    onSave();
  }
};

recognition.onspeechend = function () {
  recognition.stop();
};

recognition.onerror = function (event) {
  message.textContent = "Error occurred in recognition: " + event.error;
};

document
  .querySelector("#btnGiveCommand")
  .addEventListener("click", function () {
    recognition.start();
  });

if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
  navigator.mediaDevices.getUserMedia({ video: true }).then((stream) => {
    video.srcObject = stream;
    video.play();
  });
}

function onSaveHin() {
  context.drawImage(video, 0, 0, 640, 480);

  canvas.toBlob((blob) => {
    //const timestamp = Date.now().toString();
    const a = document.createElement("a");
    document.body.append(a);

    a.href = URL.createObjectURL(blob);
    a.target = "_blank";
    img = URL.createObjectURL(blob);

    a.click();
    console.log(img);
    a.remove();

    Tesseract.recognize(img, "hin", {
      logger: (m) => console.log(m)
    }).then(({ data: { text } }) => {
      tts = text;
      console.log(tts);
    });
  });
}

function onSave() {
  context.drawImage(video, 0, 0, 640, 480);

  canvas.toBlob((blob) => {
    //const timestamp = Date.now().toString();
    const a = document.createElement("a");
    document.body.append(a);

    a.href = URL.createObjectURL(blob);
    a.target = "_blank";
    img = URL.createObjectURL(blob);

    a.click();
    console.log(img);
    a.remove();

    Tesseract.recognize(img, "eng", {
      logger: (m) => console.log(m)
    }).then(({ data: { text } }) => {
      tts = text;
      console.log(tts);
    });
  });
}
