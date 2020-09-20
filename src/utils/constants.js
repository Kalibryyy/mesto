export {
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
  avatarForm,
  openImage,
  pictureText,
  nameInput,
  jobInput,
  nameProfile,
  jobProfile,
  cardNameInput,
  cardPicInput,
};

const object = {
  formSelector: '.modal__container',
  inputSelector: '.modal__input',
  submitButtonSelector: '.modal__btn',
  inactiveButtonClass: 'modal__btn_disabled',
  inputErrorClass: 'modal__input_type_error',
  errorClass: 'modal__error_visible',
}

const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');

const modalProfile = document.querySelector('.modal_type_profile');
const modalNewCard = document.querySelector('.modal_type_new-card');
const modalPicture = document.querySelector('.modal_type_picture');

const modalCloseProfile = modalProfile.querySelector('.modal__close');
const modalCloseNewCard = modalNewCard.querySelector('.modal__close');
const modalClosePicture = modalPicture.querySelector('.modal__close');

const modalProfileOverlay = modalProfile.querySelector('.modal__overlay');
const modalNewCardOverlay = modalNewCard.querySelector('.modal__overlay');
const modalPictureOverlay = modalPicture.querySelector('.modal__picture-overlay');

const modalBtnProfile = modalProfile.querySelector('.modal__btn');
const modalBtnNewCard = modalNewCard.querySelector('.modal__btn');

const elementsList = '.elements__list';

const editForm = document.querySelector('.modal__container_type_edit'); 
const addForm = document.querySelector('.modal__container_type_add');
const avatarForm = document.querySelector('.modal__container_type_avatar'); 

const openImage = document.querySelector('.modal__picture-image');
const pictureText = document.querySelector('.modal__picture-text');

const nameInput = modalProfile.querySelector('.modal__input_type_name'); //Выбрала поле имени в модалке профиля
const jobInput = modalProfile.querySelector('.modal__input_type_occupation'); // Выбрала поле деятельности в модалке профиля

const nameProfile = document.querySelector('.profile__name');
const jobProfile = document.querySelector('.profile__occupation'); // Выбрала элементы, куда должны быть вставлены значения полей

const cardNameInput = modalNewCard.querySelector('.modal__input_type_name'); // Выбрала поле имени в модалке карточки
const cardPicInput = modalNewCard.querySelector('.modal__input_type_occupation'); // Выбрала поле картинки в модалке карточки


