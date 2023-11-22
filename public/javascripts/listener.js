const modalBtn = document.querySelector('.modal-btn')
const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay")

const closeBtn = document.querySelector('.btn-close')
const openModal = function () {
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden")
};

const closeModal = function () {
  modal.classList.add("hidden");
  overlay.classList.add("hidden")
}

modalBtn.addEventListener("click", openModal)
closeBtn.addEventListener("click", closeModal)