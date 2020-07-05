const modal = document.querySelector('.modal');
const editButton = document.querySelector('.profile__edit-button');
const modalClose = modal.querySelector('.modal__close');
 
function renderAdded() {
modal.classList.toggle('modal_opened');
}
 
editButton.addEventListener('click', renderAdded);
modalClose.addEventListener('click', renderAdded);
