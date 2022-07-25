// share menu

const shareData = {
	title: "GuessMe",
	text: "بیا بازی کنیم، تو بنویس من حدس میزنم😃🤔!",
	url: "https://letsguessme.netlify.app/",
};

// Functions
const querySelector = function (className) {
	return document.querySelector("className");
};

// Selectors
const correctContainer = document.querySelector(".correct-container");
const wrongContainer = document.querySelector(".wrong-container");

// Letters Counter
var wordInput = document.querySelector(".word-input");
var log = document.querySelector(".letters-counter");

wordInput.addEventListener("input", updateLetters);
function updateLetters(e) {
	log.textContent = e.target.value.length;
}
// Modal
const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnCloseModal = document.querySelector(".close");
const btnsOpenModal = document.querySelector(".guide");
let vahid;

const openModal = () => {
	overlay.style.display = "block";
	modal.style.display = "block";

	setTimeout(() => {
		overlay.classList.add("open");
		modal.classList.add("open");
	}, 10);
};

const closeModal = () => {
	overlay.classList.remove("open");
	modal.classList.remove("open");
	setTimeout(function () {
		overlay.style.display = "none";
		modal.style.display = "none";
	}, 500);
};

btnsOpenModal.addEventListener("click", openModal);
btnCloseModal.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);
document.addEventListener("keydown", function (e) {
	if (e.key === "Escape" && !modal.classList.contains("hidden")) {
		closeModal();
	}
});

// Click guess button and move to other page (answer form)
// TODO:
const switchPage = () => {
	const mainForm = document.querySelector(".main-form");
	const answerForm = document.querySelector(".answer-form");
	mainForm.style.display = "none";
	answerForm.style.display = "flex";

	setTimeout(() => {
		answerForm.classList.add("open");
		answerForm.classList.add("transform");
	}, 400);

	// Count words
	const wordInputCount = document
		.querySelector(".word-input")
		.value.replace(/\s/g, "")
		.split("")
		.reverse();

	console.log(wordInputCount);

	const displayBlocks = function (words) {
		words.forEach(function (words, i) {
			const html = `<div class="letter-box-empty index-${i}"></div>`;
			correctContainer.insertAdjacentHTML("afterbegin", html);
		});
	};
	displayBlocks(wordInputCount);
};

var submitWord = document.querySelector(".submit-word");

const submit = () => {
	// Input word
	const wordInputArray = document
		.querySelector(".word-input")
		.value.replace(/\s/g, "")
		.split("")
		.reverse();
	var guessWordInput = document.querySelector(".guess-word-input").value;
	console.log(guessWordInput);

	// console.log("sub");
	//Check wether word included or not
	// if included:
	for (const [i, word] in wordInputArray.entries()) {
		console.log(i, word);
	}
	if (wordInputArray.includes(guessWordInput)) {
		let inputIndex = wordInputArray.indexOf(guessWordInput);
		console.log(inputIndex);

		// change class form empty to correct
		// change value of html with class index-i

		document.querySelector(`.index-${inputIndex}`).textContent = guessWordInput;

		// document.querySelector(`index-`);
		// const html = `<div class="letter-box-correct">${guessWordInput}</div>`;
		// correctContainer.insertAdjacentHTML("afterbegin", html);
	}
	// if not included:
	else {
		const htmlWrong = `<div class="letter-box-wrong">${guessWordInput}</div>`;

		console.log("not include");

		wrongContainer.insertAdjacentHTML("afterbegin", htmlWrong);
	}
};

submitWord.addEventListener("click", submit);

document.querySelector(".guess-button").addEventListener("click", switchPage);

// Go back icon in answer page

const goBack = () => {
	const mainForm = document.querySelector(".main-form");
	const answerForm = document.querySelector(".answer-form");
	mainForm.style.display = "flex";
	answerForm.style.display = "none";
	answerForm.classList.remove("open");
	answerForm.classList.remove("transform");

	// Reset values
	wordInput.value = "";
	log.textContent = "۰";
};
document.querySelector(".back").addEventListener("click", goBack);

// const CorrectWords = ["ا", "ل", "ه", "ا", "م"];

// Practice
// const fruits = ["Banana", "Orange", "Apple", "Mango"];
// console.log(fruits.includes("Mango"));
