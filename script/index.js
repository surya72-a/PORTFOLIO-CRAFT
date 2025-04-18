document.addEventListener("DOMContentLoaded", () => {
    const inputField = document.getElementById("input");
    inputField.addEventListener("keydown", (e) => {
        if (e.code === "Enter") {
            const input = inputField.value.trim();
            inputField.value = "";
            output(input);
        }
    });
});

const synth = window.speechSynthesis;

const textToSpeech = (string) => {
    const voice = new SpeechSynthesisUtterance(string);
    voice.lang = "en-US";
    voice.volume = 1;
    voice.rate = 1;
    voice.pitch = 1;
    synth.speak(voice);
};

function output(input) {
    const text = input.toLowerCase().replace(/[^\w\s]/gi, "").trim();
    const product = compare(prompts, replies, text) ||
        (text.match(/thank/gi) && "You're welcome!") ||
        "I didn't quite understand that. Could you rephrase?";
    addChat(input, product);
}

function compare(promptsArray, repliesArray, string) {
    for (let i = 0; i < promptsArray.length; i++) {
        if (promptsArray[i].includes(string)) {
            const replies = repliesArray[i];
            return replies[Math.floor(Math.random() * replies.length)];
        }
    }
    return null;
}

function addChat(input, product) {
    const messagesContainer = document.getElementById("messages");

    // User's message (left side)
    const userDiv = document.createElement("div");
    userDiv.className = "message user";
    userDiv.innerHTML = `<img src="images/user.png" class="avatar"><span class="text">${input}</span>`;
    messagesContainer.appendChild(userDiv);

    // Chatbot's message (right side)
    const botDiv = document.createElement("div");
    botDiv.className = "message bot";
    const botImg = document.createElement("img");
    botImg.src = "images/bot-mini.png";
    botImg.className = "avatar";
    const botText = document.createElement("span");
    botText.className = "text";
    botText.innerText = "Typing...";
    botDiv.appendChild(botText);
    botDiv.appendChild(botImg);
    messagesContainer.appendChild(botDiv);

    messagesContainer.scrollTop = messagesContainer.scrollHeight;

    setTimeout(() => {
        botText.innerText = product;
        textToSpeech(product);
    }, 1000);
}

// Data for prompts and replies
const prompts = [
    ["help me create a portfolio", "I want to create a portfolio", "guide me with portfolio creation"],
    // Add more prompts here
];
const replies = [
    ["Sure! Let’s start with the basics. What type of work do you want to showcase?"],
    // Add more replies here
];