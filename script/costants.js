const prompts = [
    ["help me create a portfolio", "I want to create a portfolio", "guide me with portfolio creation"],
    ["what is a portfolio", "why do I need a portfolio"],
    ["what should I include in my portfolio", "how to structure my portfolio"],
    ["how do I design my portfolio", "portfolio design ideas"],
    ["how do I present my projects", "how to showcase projects in portfolio"],
    ["how do I display my skills", "skills section in portfolio"],
    ["how do I write a personal statement", "personal statement for portfolio"],
    ["how to make my portfolio stand out", "unique portfolio ideas"],
    ["what’s the best platform for portfolios", "where should I host my portfolio"],
    ["should I include my social media links", "social media links in portfolio"]
];

const replies = [
    ["Of course! Let’s start with the basics. What type of work do you want to showcase?", "Absolutely! What’s your primary goal for the portfolio?"],
    ["A portfolio is a professional collection of your work, skills, and achievements designed to showcase your capabilities.", "It serves as a visual resume and is essential for personal branding and attracting opportunities."],
    ["Include sections like an introduction, your projects, skills, and a contact page. Tailor it to your field.", "Focus on showcasing your best work, achievements, and relevant skills."],
    ["Keep the design clean, professional, and easy to navigate. Use consistent fonts, colors, and layouts.", "Choose a design that complements your work while remaining functional and user-friendly."],
    ["Use clear descriptions, images, and videos of your projects. Highlight the problem, your approach, and the outcome.", "Showcase your work in a story-like format to engage viewers."],
    ["List your key skills with examples of how you’ve applied them. Visual representations like charts can also help.", "Make sure the skills you include are relevant to your field or role."],
    ["Your personal statement should highlight who you are, what you do, and what you aim to achieve. Keep it concise and impactful.", "Focus on your unique strengths and aspirations while maintaining a professional tone."],
    ["Focus on unique design elements, impactful visuals, and showcasing your best work.", "Use engaging content and interactive features to leave a lasting impression."],
    ["Popular platforms include WordPress, Wix, and Squarespace. GitHub is great for developers.", "Choose a platform that aligns with your technical skills and portfolio requirements."],
    ["Including social media links makes it easy for viewers to connect with you professionally.", "Focus on platforms relevant to your field, like LinkedIn or Behance."]
];

const synth = window.speechSynthesis;

const textToSpeech = (string) => {
    let voice = new SpeechSynthesisUtterance(string);
    voice.lang = "en-US";
    voice.volume = 1;
    voice.rate = 1;
    voice.pitch = 1;
    synth.speak(voice);
};

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

    const userDiv = document.createElement("div");
    userDiv.className = "user response";

    userDiv.innerHTML = `<img src="/images/logo.jpg" class="avatar"><span>${input}</span>`;

    messagesContainer.appendChild(userDiv);

    const botDiv = document.createElement("div");
    botDiv.className = "bot response";
    const botImg = document.createElement("img");
    botImg.src = "/images/logo.jpg";
    botImg.className = "avatar";
    const botText = document.createElement("span");
    botText.innerText = "Typing...";
    botDiv.appendChild(botImg);
    botDiv.appendChild(botText);
    messagesContainer.appendChild(botDiv);

    messagesContainer.scrollTop = messagesContainer.scrollHeight;

    setTimeout(() => {
        botText.innerText = product;
        textToSpeech(product);
    }, 1000);
}