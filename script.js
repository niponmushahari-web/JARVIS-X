function speak(text){
  let speech = new SpeechSynthesisUtterance(text);
  speechSynthesis.speak(speech);
}

document.getElementById("sendBtn").onclick = function(){

  let text = document.getElementById("input").value;

  document.getElementById("chat").innerHTML +=
  "<p><b>You:</b> " + text + "</p>";

  if(text.toLowerCase() === "time"){
      let reply = new Date().toLocaleTimeString();

      document.getElementById("chat").innerHTML +=
      "<p><b>JARVIS:</b> " + reply + "</p>";

      speak(reply);
  }
  // DATE
if(text.toLowerCase() === "date"){
    let reply = new Date().toDateString();

    document.getElementById("chat").innerHTML +=
    "<p><b>JARVIS:</b> " + reply + "</p>";

    speak(reply);
}

// GOOGLE SEARCH
else if(text.toLowerCase().startsWith("search ")){

    let query = text.substring(7);

    window.open(
      "https://www.google.com/search?q=" +
      encodeURIComponent(query),
      "_blank"
    );

    let reply = "Searching Google for " + query;

    document.getElementById("chat").innerHTML +=
    "<p><b>JARVIS:</b> " + reply + "</p>";

    speak(reply);
}

// YOUTUBE SEARCH
else if(text.toLowerCase().startsWith("youtube ")){

    let query = text.substring(8);

    window.open(
      "https://www.youtube.com/results?search_query=" +
      encodeURIComponent(query),
      "_blank"
    );

    let reply = "Searching YouTube for " + query;

    document.getElementById("chat").innerHTML +=
    "<p><b>JARVIS:</b> " + reply + "</p>";

    speak(reply);
}
// BATTERY STATUS
else if(text.toLowerCase() === "battery"){

    if(navigator.getBattery){

        navigator.getBattery().then(function(battery){

            let level = Math.round(battery.level * 100);

            let reply = "Battery is " + level + " percent";

            document.getElementById("chat").innerHTML +=
            "<p><b>JARVIS:</b> " + reply + "</p>";

            speak(reply);
        });

    }else{

        let reply = "Battery information not supported";

        document.getElementById("chat").innerHTML +=
        "<p><b>JARVIS:</b> " + reply + "</p>";

        speak(reply);
    }
}

// GOOGLE MAPS SEARCH
else if(text.toLowerCase().startsWith("maps ")){

    let place = text.substring(5);

    window.open(
      "https://www.google.com/maps/search/" +
      encodeURIComponent(place),
      "_blank"
    );

    let reply = "Opening maps for " + place;

    document.getElementById("chat").innerHTML +=
    "<p><b>JARVIS:</b> " + reply + "</p>";

    speak(reply);
}
// SAVE NOTE
else if(text.toLowerCase().startsWith("save note ")){

    let note = text.substring(10);

    localStorage.setItem("jarvis_note", note);

    let reply = "Note saved successfully";

    document.getElementById("chat").innerHTML +=
    "<p><b>JARVIS:</b> " + reply + "</p>";

    speak(reply);
}

// SHOW NOTE
else if(text.toLowerCase() === "show note"){

    let note = localStorage.getItem("jarvis_note");

    let reply = note ? note : "No note found";

    document.getElementById("chat").innerHTML +=
    "<p><b>JARVIS:</b> " + reply + "</p>";

    speak(reply);
}

// SAVE REMINDER
else if(text.toLowerCase().startsWith("remind me ")){

    let reminder = text.substring(10);

    localStorage.setItem("jarvis_reminder", reminder);

    let reply = "Reminder saved";

    document.getElementById("chat").innerHTML +=
    "<p><b>JARVIS:</b> " + reply + "</p>";

    speak(reply);
}

// SHOW REMINDER
else if(text.toLowerCase() === "show reminder"){

    let reminder = localStorage.getItem("jarvis_reminder");

    let reply = reminder ? reminder : "No reminder found";

    document.getElementById("chat").innerHTML +=
    "<p><b>JARVIS:</b> " + reply + "</p>";

    speak(reply);
}
const SpeechRecognition =
window.SpeechRecognition ||
window.webkitSpeechRecognition;

if(SpeechRecognition){

    const recognition = new SpeechRecognition();

    recognition.lang = "en-US";

    document.getElementById("micBtn")
    .addEventListener("click", function(){

        recognition.start();

        speak("Listening Boss");
    });

    recognition.onresult = function(event){

        let voiceText =
        event.results[0][0].transcript;

        document.getElementById("input").value =
        voiceText;

        document.getElementById("sendBtn").click();
    };
}
else{

    alert(
      "Speech Recognition not supported in this browser"
    );
}
};