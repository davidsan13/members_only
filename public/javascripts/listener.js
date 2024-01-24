const modalBtn = document.querySelector('.message-btn')
const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay")
const closeBtn = document.querySelector('.btn-close')

const openModalMessage = function () {
  modal.classList.remove("hidden")
  overlay.classList.remove("hidden")
};

const closeModalMessage = function () {
  modal.classList.add("hidden");
  overlay.classList.add("hidden")
}

modalBtn.addEventListener("click", openModalMessage)
closeBtn.addEventListener("click", closeModalMessage)


