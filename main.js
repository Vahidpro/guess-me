// share menu

const shareData = {
	title: "GuessMe",
	text: "بیا بازی کنیم، تو بنویس من حدس میزنم😃🤔!",
	url: "https://letsguessme.netlify.app/",
};

// Letters Counter
const wordInput = document.querySelector(".word-input");
const log = document.querySelector(".letters-counter");

wordInput.addEventListener("input", updateLetters);

function updateLetters(e) {
	log.textContent = e.target.value.length;
}
