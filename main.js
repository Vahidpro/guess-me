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

function allLetter(inputText) {
	var letters = /^[آا-ی ]+$/;
	if (inputText.value.match(letters)) {
		return true;
	} else {
		alert("فقط حروف فارسی وارد کن!🚫");
		return false;
	}
}
const switchPage = () => {
	if (allLetter(wordInput)) {
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

		const displayBlocks = function (words) {
			words.forEach(function (words, i) {
				const html = `<div class="letter-box-empty index-${i}"></div>`;
				correctContainer.insertAdjacentHTML("afterbegin", html);
			});
		};
		displayBlocks(wordInputCount);
	}
};

var submitWord = document.querySelector(".submit-word");
let repetitiveCheck = [];

const submit = (e) => {
	// Input word
	e.preventDefault();
	let wordInputArray = document
		.querySelector(".word-input")
		.value.replace(/\s/g, "")
		.split("")
		.reverse();

	var guessWordInput = document.querySelector(".guess-word-input").value;

	//Check wether word included or not, if included:

	if (wordInputArray.includes(guessWordInput)) {
		// Find repititive words index
		var findRepetitionIndex = [];
		for (i = 0; i < wordInputArray.length; i++) {
			if (wordInputArray[i] == guessWordInput) {
				findRepetitionIndex.push(i);
			}
		}
		let inputIndex = wordInputArray.indexOf(guessWordInput);

		// change class form empty to correct
		if (findRepetitionIndex.length >= 2) {
			for (i = 0; i < findRepetitionIndex.length; i++) {
				document.querySelector(`.index-${findRepetitionIndex[i]}`).textContent =
					guessWordInput;
			}
		} else {
			document.querySelector(`.index-${inputIndex}`).textContent =
				guessWordInput;
		}
	}
	// if not included:
	else {
		if (!repetitiveCheck.includes(guessWordInput)) {
			// Repetitive check
			repetitiveCheck.push(guessWordInput);

			const htmlWrong = `<div class="letter-box-wrong">${guessWordInput}</div>`;

			wrongContainer.insertAdjacentHTML("afterbegin", htmlWrong);
		}
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
	wordInputCount = [];

	document.querySelectorAll(".letter-box-empty").forEach((e) => e.remove());
};
document.querySelector(".back").addEventListener("click", goBack);
