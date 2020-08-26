import {
  Card
} from './card.js';
import {
  FormValidator
} from './FormValidator.js';
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
  addForm,
  toggleModal,
  nameInput,
  jobInput,
  nameProfile,
  jobProfile,
  cardNameInput,
  cardPicInput
} from './constants.js';

initialCards.forEach(item => {
  renderCard(item);
});

function renderCard(item) {
  const card = new Card(item, '.template_type_default');
  const cardElement = card.generateCard();
  elementsList.prepend(cardElement);
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

modalProfileOverlay.addEventListener('click', function () {
  toggleModal(modalProfile);
});
modalNewCardOverlay.addEventListener('click', function () {
  toggleModal(modalNewCard);
});
modalPictureOverlay.addEventListener('click', function () {
  toggleModal(modalPicture);
});

function formSubmitHandler(evt) {
  evt.preventDefault();

  nameProfile.textContent = nameInput.value;
  jobProfile.textContent = jobInput.value; // Вставила новые значения с помощью textContent

  modalProfile.querySelector('.modal__container').reset();
}

function cardSubmitHandler(evt) {
  evt.preventDefault();

  renderCard({
    name: cardNameInput.value,
    link: cardPicInput.value
  });

  modalNewCard.querySelector('.modal__container').reset();
  modalBtnNewCard.disabled = true;
  modalBtnNewCard.classList.add('modal__btn_disabled');
}

// Прикрепила обработчик к форме:
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
