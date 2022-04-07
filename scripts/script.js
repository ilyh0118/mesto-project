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
function setFigurePopup(eventItem) {
  const currentCardsItem = eventItem.parentElement;
  const url = currentCardsItem.querySelector('.cards__image').style.backgroundImage.slice(5,-2);
  const caption = currentCardsItem.querySelector('.cards__title').textContent;
  figurePopupImage.src = url;
  figurePopupImage.alt = caption;
  figurePopupCaption.textContent = caption;
};

function openPopup(item) {
  item.classList.add('popup_opened');
}

function returnCardMarkupArray() {
  //[card, img, title, likeBtn, removeBtn]
  const cardTemplate = page.querySelector('#card-template').content;
  const card = cardTemplate.querySelector('.cards__item').cloneNode(true);
  const markupCardArray = [
    card,
    card.querySelector('.cards__image'),
    card.querySelector('.cards__title'),
    card.querySelector('.cards__like-button'),
    card.querySelector('.cards__remove-button')
  ];
  return markupCardArray;
}

function fillTemplate(name, link) {
  const markupArray = returnCardMarkupArray();
  markupArray[1].style.backgroundImage = `url(${link})`;
  markupArray[1].addEventListener('click', evt => {
    setFigurePopup(evt.target);
    openPopup(figurePopup);
  });
  markupArray[2].textContent = name;
  markupArray[3].addEventListener('click', evt => evt.target.classList.toggle('cards__like-button_active'));
  markupArray[4].addEventListener('click', evt => evt.target.closest('.cards__item').remove());
  return markupArray[0];
}

function createCard(initCard) {
  if (initCard) {
    return fillTemplate(initCard.name, initCard.link);
  } 
  else {
    return fillTemplate(placePopupNameItem.value, placePopupLinkItem.value);
  }  
}

function insertCard(card) {
  cardsContainer.prepend(card);
}

function addCard(cardParams) {
  const newCard = createCard(cardParams);
  insertCard(newCard);
}

function initialAddCards() {
  initialCards.forEach(elem => {
    addCard(elem);
  });
}

function callProfileSubmitHandler (evt) {
  evt.preventDefault();
  profileName.textContent = profilePopupNameItem.value;
  profileAbout.textContent = profilePopupAboutItem.value;
}

function callPlaceSubmitHandler (evt) {
  evt.preventDefault();
  addCard();
}

function setProfilePopup() {
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
  setProfilePopup();
  openPopup(profilePopup);
});
profileAddCardButton.addEventListener('click', elem => openPopup(placePopup));
// обработчики profile-popup
profilePopupToggleButton.addEventListener('click', elem => closePopup(getCurrentPopup(elem.target)));
profilePopupForm.addEventListener('submit', elem => {
  callProfileSubmitHandler(elem);
  closePopup(getCurrentPopup(elem.target));
});
// обработчики place-popup
placePopupToggleButton.addEventListener('click', elem => closePopup(getCurrentPopup(elem.target)));
placePopupForm.addEventListener('submit', elem => {
  callPlaceSubmitHandler(elem);
  closePopup(getCurrentPopup(elem.target));
});
// обработчики place-popup
figurePopupToggleButton.addEventListener('click', elem => closePopup(getCurrentPopup(elem.target)));