const page = document.querySelector('.page');
// элементы в Cards + шаблон
const cardsContainer = page.querySelector('.cards__grid');
const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Горный Алтай',
    link: './images/altai.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  },
  {
    name: 'Карачаево-Черкессия',
    link: './images/karachay-cherkessia.jpg'
  }
  ];
// элементы в Profile
const profileSection = page.querySelector('.profile');
const profileEditButton = profileSection.querySelector('.profile__info-edit');
const profileAddCardButton = profileSection.querySelector('.profile__add-btn');
const profileName = profileSection.querySelector('.profile__author-name');
const profileAbout = profileSection.querySelector('.profile__about-author');
// profiele-popup и его элементы
const profilePopup = page.querySelector('.profile-popup');
const profilePopupForm = profilePopup.querySelector('.popup__form');
const profilePopupToggleButton = profilePopup.querySelector('.popup__toggle');
const profilePopupNameItem = profilePopup.querySelector('.popup__item_el_name');
const profilePopupAboutItem = profilePopup.querySelector('.popup__item_el_about');
// place-popup
const placePopup = page.querySelector('.place-popup');
const placePopupForm = placePopup.querySelector('.popup__form');
const placePopupToggleButton = placePopup.querySelector('.popup__toggle');
const placePopupNameItem = placePopup.querySelector('.popup__item_el_name');
const placePopupLinkItem = placePopup.querySelector('.popup__item_el_about');
// figure-popup
const figurePopup = page.querySelector('.figure-popup');
const figurePopupToggleButton = figurePopup.querySelector('.popup__toggle');
const figurePopupImage = figurePopup.querySelector('.popup__figure-img');
const figurePopupCaption  = figurePopup.querySelector('.popup__figure-caption');


// объявления функций
function handleCardClick(caption, url) {
  figurePopupImage.src = url;
  figurePopupImage.alt = caption;
  figurePopupCaption.textContent = caption;
}

function openPopup(item) {
  item.classList.add('popup_opened');
}

function createCard(name, link) {
  const cardTemplate = page.querySelector('#card-template').content;
  const card = cardTemplate.querySelector('.cards__item').cloneNode(true);
  const cardImage = card.querySelector('.cards__image');
  const cardTitle = card.querySelector('.cards__title');
  const cardLikeButtonn = card.querySelector('.cards__like-button');
  const cardRemoveButton = card.querySelector('.cards__remove-button');
  cardTitle.textContent = name;
  cardLikeButtonn.addEventListener('click', evt => evt.target.classList.toggle('cards__like-button_active'));
  cardRemoveButton.addEventListener('click', evt => evt.target.closest('.cards__item').remove());
  cardImage.style.backgroundImage = `url(${link})`;
  cardImage.addEventListener('click', () => {
    handleCardClick(name, link);
    openPopup(figurePopup);
  });
  return card;
}

function getCard(initCard) {
  if (initCard) {
    return createCard(initCard.name, initCard.link);
  } 
  else {
    return createCard(placePopupNameItem.value, placePopupLinkItem.value);
  }  
}

function insertCard(card) {
  cardsContainer.prepend(card);
}

function addCard(cardParams) {
  const newCard = getCard(cardParams);
  insertCard(newCard);
}

function initialAddCards() {
  initialCards.forEach(addCard);
}

function handleProfileSubmit (evt) {
  evt.preventDefault();
  profileName.textContent = profilePopupNameItem.value;
  profileAbout.textContent = profilePopupAboutItem.value;
}

function handlePlaceSubmit (evt) {
  evt.preventDefault();
  addCard();
}

function clearPlacePopupInputs() {
  placePopupNameItem.value = '';
  placePopupLinkItem.value = '';
}

function handleEditButtonClick() {
  profilePopupNameItem.value = profileName.innerText;
  profilePopupAboutItem.value = profileAbout.innerText;
}

function closePopup(item) {
  item.classList.remove('popup_opened');
}

function getCurrentPopup(item) {
  return item.closest('.popup');
}

initialAddCards();

// обработчики открытий popup
profileEditButton.addEventListener('click', evt => {
  handleEditButtonClick();
  openPopup(profilePopup);
});
profileAddCardButton.addEventListener('click', elem => openPopup(placePopup));
// обработчики profile-popup
profilePopupToggleButton.addEventListener('click', elem => closePopup(getCurrentPopup(elem.target)));
profilePopupForm.addEventListener('submit', elem => {
  handleProfileSubmit(elem);
  closePopup(getCurrentPopup(elem.target));
});
// обработчики place-popup
placePopupToggleButton.addEventListener('click', elem => closePopup(getCurrentPopup(elem.target)));
placePopupForm.addEventListener('submit', elem => {
  handlePlaceSubmit(elem);
  closePopup(getCurrentPopup(elem.target));
  clearPlacePopupInputs();
});
// обработчики place-popup
figurePopupToggleButton.addEventListener('click', elem => closePopup(getCurrentPopup(elem.target)));