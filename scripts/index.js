import { Card } from './Card.js';
import { FormValidator } from './FormValidator.js';
import {
    initialCards,
    object,
    editButton,
    addButton,
    modalProfile,
    modalNewCard,
    modalPicture,
    modalCloseProfile,
    modalCloseNewCard,
    modalClosePicture,
    modalProfileOverlay,
    modalNewCardOverlay,
    modalPictureOverlay,
    modalBtnProfile,
    modalBtnNewCard,
    elementsList,
    editForm,
    addForm
} from './constants.js';

initialCards.forEach(item => {
    renderCard(item);
});

function renderCard(item) {
    const card = new Card(item, '.template_type_default');
    const cardElement = card.generateCard();
    elementsList.prepend(cardElement);
}

function toggleModal(modal) {
    modal.classList.toggle('modal_opened');
    document.addEventListener('keydown', handleEscape);
    if (modal.classList.contains('modal_opened') && modal.classList.contains('modal__container')) {
        const form = modal.querySelector('.modal__container');
        form.reset();
        const inputs = Array.from(modal.querySelectorAll('.modal__input'));
        inputs.forEach(input => {
            isValid(form, input, object);
        });
    }
}

function handleEscape(evt) {
    if (evt.key === 'Escape') {
        modalProfile.classList.remove('modal_opened');
        modalNewCard.classList.remove('modal_opened');
        modalPicture.classList.remove('modal_opened');
        document.removeEventListener('keydown', handleEscape);
    }
}

editButton.addEventListener('click', () =>
    toggleModal(modalProfile));

addButton.addEventListener('click', () =>
    toggleModal(modalNewCard));

modalCloseProfile.addEventListener('click', () =>
    toggleModal(modalProfile));

modalCloseNewCard.addEventListener('click', () =>
    toggleModal(modalNewCard));

modalClosePicture.addEventListener('click', () =>
    toggleModal(modalPicture));

modalProfileOverlay.addEventListener('click', function() {
    toggleModal(modalProfile);
});
modalNewCardOverlay.addEventListener('click', function() {
    toggleModal(modalNewCard);
});
modalPictureOverlay.addEventListener('click', function() {
    toggleModal(modalPicture);
});

function formSubmitHandler(evt) {
    evt.preventDefault();

    const nameInput = modalProfile.querySelector('.modal__input_type_name'); //Выбрала поле имени в модалке профиля
    const jobInput = modalProfile.querySelector('.modal__input_type_occupation'); // Выбрала поле деятельности в модалке профиля

    const nameProfile = document.querySelector('.profile__name');
    const jobProfile = document.querySelector('.profile__occupation'); // Выберите элементы, куда должны быть вставлены значения полей

    nameProfile.textContent = nameInput.value;
    jobProfile.textContent = jobInput.value; // Вставьте новые значения с помощью textContent

    modalProfile.querySelector('.modal__container').reset();
}

function cardSubmitHandler(evt) {
    evt.preventDefault();

    const cardNameInput = modalNewCard.querySelector('.modal__input_type_name'); // Выбрала поле имени в модалке карточки
    const cardPicInput = modalNewCard.querySelector('.modal__input_type_occupation'); // Выбрала поле картинки в модалке карточки

    renderCard({
        name: cardNameInput.value,
        link: cardPicInput.value
    });

    modalNewCard.querySelector('.modal__container').reset();
    modalBtnNewCard.disabled = true;
    modalBtnNewCard.classList.add('modal__btn_disabled');
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
modalProfile.addEventListener('submit', formSubmitHandler);
modalNewCard.addEventListener('submit', cardSubmitHandler);

modalBtnProfile.addEventListener('click', () =>
    toggleModal(modalProfile));
modalBtnNewCard.addEventListener('click', () =>
    toggleModal(modalNewCard));

const editFormValidator = new FormValidator(object, editForm);
const addFormValidator = new FormValidator(object, addForm);

editFormValidator.enableValidation();
addFormValidator.enableValidation();