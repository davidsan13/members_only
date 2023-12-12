const modalBtn = document.querySelector('.modal-btn')
const modalMemberBtn = document.querySelector('.modal-member-btn')
const modal = document.querySelector(".modal");
const modalMember = document.querySelector(".modal-member")
const overlay = document.querySelector(".overlay")
const overlayMember = document.querySelector(".overlay-member")
const closeBtn = document.querySelector('.btn-close')
const closeMemberBtn = document.querySelector('.btn-close-member')
const openModalMessage = function () {
  modal.classList.remove("hidden")
  overlay.classList.remove("hidden")
};

const openModalMember = function () {
  modalMember.classList.remove("hidden")
  overlayMember.classList.remove("hidden")
};

const closeModalMessage = function () {
  modal.classList.add("hidden");
  overlay.classList.add("hidden")
}

const closeModalMember = function () {
  modalMember.classList.add("hidden")
  overlayMember.classList.add("hidden")
}

modalBtn.addEventListener("click", openModalMessage)
closeBtn.addEventListener("click", closeModalMessage)

modalMemberBtn.addEventListener("click", openModalMember)
closeMemberBtn.addEventListener("click", closeModalMember)
