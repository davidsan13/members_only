const modalBtn = document.querySelector('.modal-btn')
const modal = document.querySelector(".modal");
const openModal = function () {
  modal.classList.remove("hidden");

};

modalBtn.addEventListener("click", openModal)