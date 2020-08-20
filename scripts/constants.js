export {
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
};

const initialCards = [{
        name: 'США',
        link: './images/element-usa.JPG'
    },
    {
        name: 'Бермудские острова',
        link: './images/element-bermuda.JPG'
    },
    {
        name: 'Германия',
        link: './images/element-germany.JPG'
    },
    {
        name: 'Италия',
        link: './images/element-italy.JPG'
    },
    {
        name: 'Португалия',
        link: './images/element-portugal.JPG'
    },
    {
        name: 'Французская Полинезия',
        link: './images/element-french-polynesia.JPG'
    }
];

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

const elementsList = document.querySelector('.elements__list');

const editForm = document.querySelector('.modal__container_type_edit');
const addForm = document.querySelector('.modal__container_type_add');