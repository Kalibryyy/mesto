const initialCards = [
  {
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

const modal = document.querySelector('.modal');
const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');

const modalProfile = document.querySelector('.modal_type_profile');
const modalNewCard = document.querySelector('.modal_type_new-card');
const modalPicture = document.querySelector('.modal_type_picture');

const modalCloseProfile = modalProfile.querySelector('.modal__close');
const modalCloseNewCard = modalNewCard.querySelector('.modal__close');
const modalClosePicture = modalPicture.querySelector('.modal__close');

function toggleModal(modal) {
modal.classList.toggle('modal_opened');
document.addEventListener('keydown', function (evt) {
  if (evt.key === 'Escape') { 
      modal.classList.remove('modal_opened');
  }
});
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

const modalProfileOverlay = modalProfile.querySelector('.modal__overlay');
const modalNewCardOverlay = modalNewCard.querySelector('.modal__overlay');

modalProfileOverlay.addEventListener('click', function (evt) {
     toggleModal(modalProfile);
});

modalNewCardOverlay.addEventListener('click', function (evt) {
  toggleModal(modalNewCard);
});

function formSubmitHandler (evt) {
  evt.preventDefault(); 
  
  const nameInput = modalProfile.querySelector('.modal__input_type_name'); //Выбрала поле имени в модалке профиля
  const jobInput = modalProfile.querySelector('.modal__input_type_occupation');  // Выбрала поле деятельности в модалке профиля

  const nameProfile = document.querySelector('.profile__name');
  const jobProfile = document.querySelector('.profile__occupation'); // Выберите элементы, куда должны быть вставлены значения полей
  
  nameProfile.textContent =  nameInput.value;
  jobProfile.textContent = jobInput.value;    // Вставьте новые значения с помощью textContent
}

const template = document.querySelector('.template').content;
const elements__list = document.querySelector('.elements__list');
//const card = template.cloneNode(true);//клонировала template;
  
function cardSubmitHandler (evt) {
  evt.preventDefault(); 

  const cardNameInput = modalNewCard.querySelector('.modal__input_type_name'); // Выбрала поле имени в модалке карточки
  const cardPicInput = modalNewCard.querySelector('.modal__input_type_occupation'); // Выбрала поле картинки в модалке карточки

  renderCard({name: cardNameInput.value, link: cardPicInput.value});

  modalNewCard.querySelector('.modal__container').reset();
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
modalProfile.addEventListener('submit', formSubmitHandler);
modalNewCard.addEventListener('submit', cardSubmitHandler);

const modalBtnProfile = modalProfile.querySelector('.modal__btn');
const modalBtnNewCard = modalNewCard.querySelector('.modal__btn');

modalBtnProfile.addEventListener('click',  () =>
toggleModal(modalProfile));
modalBtnNewCard.addEventListener('click',  () =>
toggleModal(modalNewCard));

function createCard(data) {
  const card = template.cloneNode(true);
  
  card.querySelector('.elements__image').src = data.link;
  card.querySelector('.elements__text').textContent = data.name;
  
  const cardLike = card.querySelector('.elements__like');
  cardLike.addEventListener('click', function(evt) {
      evt.target.classList.toggle('elements__like_active');
  });

  const cardRemove = card.querySelector('.elements__basket');
  cardRemove.addEventListener('click', function(evt) {
      evt.target.closest('.elements__item').remove();
  });

  const cardImage = card.querySelector('.elements__image');
  cardImage.addEventListener('click', () => {
  const openImage = document.querySelector('.modal__picture-image'); 
  const pictureText =  document.querySelector('.modal__picture-text'); // Выберите элементы, куда должны быть вставлены значения
  openImage.src = data.link;
  openImage.alt = data.name;
  pictureText.textContent = data.name;
  /*openImage.src = card.querySelector('.elements__image').src; 
  pictureText.textContent = card.querySelector('.elements__text').textContent;*/
  toggleModal(modalPicture);
  });

 return card
}

function renderCard(data) {
  elements__list.prepend(createCard(data));
}

initialCards.forEach(function(data) {
  renderCard(data);
  });

 