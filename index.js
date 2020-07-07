const modal = document.querySelector('.modal__overlay');
const modalContainer = document.querySelector('.modal__container');
const editButton = document.querySelector('.profile__edit-button');
const modalClose = document.querySelector('.modal__close');
 
function toggleModal() {
modal.classList.toggle('modal_opened');
modalContainer.classList.toggle('modal_opened');
}
 
editButton.addEventListener('click', toggleModal);
modalClose.addEventListener('click', toggleModal);

const formElement = document.querySelector('.modal__container');
function formSubmitHandler (evt) {
    evt.preventDefault(); 

    const nameInput = formElement.querySelector('.modal__name');
    const jobInput = formElement.querySelector('.modal__occupation');

    const nameProfile = document.querySelector('.profile__name');
    const jobProfile = document.querySelector('.profile__occupation');// Выберите элементы, куда должны быть вставлены значения полей

    nameProfile.textContent =  nameInput.value;
    jobProfile.textContent = jobInput.value;// Вставьте новые значения с помощью textContent
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', formSubmitHandler);
