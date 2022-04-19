// share menu

const shareData = {
  title: "GuessMme",
  text: "بیا بازی کنیم، تو بنویس من حدس میزنم😃🤔!",
  url: "https://letsguessme.netlify.app/",
};

const btnShare = document.querySelector("btn-share");

btnShare.addEventListener("click", async () => {
  await navigator.share(shareData);
});
