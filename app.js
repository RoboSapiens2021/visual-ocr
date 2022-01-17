let canvas = document.querySelector("#canvas");
let context = canvas.getContext("2d");
let video = document.querySelector("#video");
let img;
let tts;
let speaks = [
  {
    name: "Alex",
    lang: "bn-IN"
  },
  {
    name: "Alice",
    lang: "it-IT"
  },
  {
    name: "Alva",
    lang: "sv-SE"
  },
  {
    name: "Amelie",
    lang: "fr-CA"
  },
  {
    name: "Anna",
    lang: "de-DE"
  },
  {
    name: "Carmit",
    lang: "he-IL"
  },
  {
    name: "Damayanti",
    lang: "id-ID"
  },
  {
    name: "Daniel",
    lang: "en-GB"
  },
  {
    name: "Diego",
    lang: "es-AR"
  },
  {
    name: "Ellen",
    lang: "nl-BE"
  },
  {
    name: "Fiona",
    lang: "en"
  },
  {
    name: "Fred",
    lang: "en-US"
  },
  {
    name: "Ioana",
    lang: "ro-RO"
  },
  {
    name: "Joana",
    lang: "pt-PT"
  },
  {
    name: "Jorge",
    lang: "es-ES"
  },
  {
    name: "Juan",
    lang: "es-MX"
  },
  {
    name: "Kanya",
    lang: "th-TH"
  },
  {
    name: "Karen",
    lang: "en-AU"
  },
  {
    name: "Kyoko",
    lang: "ja-JP"
  },
  {
    name: "Laura",
    lang: "sk-SK"
  },
  {
    name: "Lekha",
    lang: "hi-IN"
  },
  {
    name: "Luca",
    lang: "it-IT"
  },
  {
    name: "Luciana",
    lang: "pt-BR"
  },
  {
    name: "Maged",
    lang: "ar-SA"
  },
  {
    name: "Mariska",
    lang: "hu-HU"
  },
  {
    name: "Mei-Jia",
    lang: "zh-TW"
  },
  {
    name: "Melina",
    lang: "el-GR"
  },
  {
    name: "Milena",
    lang: "ru-RU"
  },
  {
    name: "Moira",
    lang: "en-IE"
  },
  {
    name: "Monica",
    lang: "es-ES"
  },
  {
    name: "Nora",
    lang: "nb-NO"
  },
  {
    name: "Paulina",
    lang: "es-MX"
  },
  {
    name: "Samantha",
    lang: "en-US"
  },
  {
    name: "Sara",
    lang: "da-DK"
  },
  {
    name: "Satu",
    lang: "fi-FI"
  },
  {
    name: "Sin-ji",
    lang: "zh-HK"
  },
  {
    name: "Tessa",
    lang: "en-ZA"
  },
  {
    name: "Thomas",
    lang: "fr-FR"
  },
  {
    name: "Ting-Ting",
    lang: "zh-CN"
  },
  {
    name: "Veena",
    lang: "en-IN"
  },
  {
    name: "Victoria",
    lang: "en-US"
  },
  {
    name: "Xander",
    lang: "nl-NL"
  },
  {
    name: "Yelda",
    lang: "tr-TR"
  },
  {
    name: "Yuna",
    lang: "ko-KR"
  },
  {
    name: "Yuri",
    lang: "ru-RU"
  },
  {
    name: "Zosia",
    lang: "pl-PL"
  },
  {
    name: "Zuzana",
    lang: "cs-CZ"
  }
];
const msg = new SpeechSynthesisUtterance();

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

      msg.volume = 1; // 0 to 1
      msg.rate = 1; // 0.1 to 10
      msg.pitch = 1.5; // 0 to 2
      msg.text = tts;

      const voice = speaks[0]; //47
      console.log(`Voice: ${voice.name} and Lang: ${voice.lang}`);
      msg.voiceURI = voice.name;
      msg.lang = "en-US";

      speechSynthesis.speak(msg);
    });
  });
}
