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

// Letters Counter
const wordInput = document.querySelector(".word-input");
const log = document.querySelector(".letters-counter");

wordInput.addEventListener("input", updateLetters);

function updateLetters(e) {
	log.textContent = e.target.value.length;
}

// Modal
const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnCloseModal = document.querySelector(".close");
const btnsOpenModal = document.querySelector(".guide");

const openModal = function () {
	overlay.style.display = "block";
	modal.style.display = "block";

	setTimeout(function () {
		overlay.classList.add("open");
		modal.classList.add("open");
	}, 10);
};

const closeModal = function () {
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
