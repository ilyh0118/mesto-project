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
const placePopupAboutItem = placePopup.querySelector('.popup__item_el_about');
// figure-popup
const figurePopup = page.querySelector('.figure-popup');
const figurePopupToggleButton = figurePopup.querySelector('.popup__toggle');
const figurePopupImage = figurePopup.querySelector('.popup__figure-img');
const figurePopupCaption  = figurePopup.querySelector('.popup__figure-caption');


// объявления функций
function setFigurePopup(eventItem) {
  const newCardsItem = eventItem.target.parentElement;
  const url = newCardsItem.querySelector('.cards__image').style.backgroundImage.slice(5,-2);
  const caption = newCardsItem.querySelector('.cards__title').textContent;
  figurePopupImage.src = url;
  figurePopupImage.alt = caption;
  figurePopupCaption.textContent = caption;
};

function fillTemplate(name, link) {
  const cardTemplate = page.querySelector('#card-template').content;
  const card = cardTemplate.querySelector('.cards__item').cloneNode(true);
  const cardImage = card.querySelector('.cards__image');
  const cardTitle = card.querySelector('.cards__title');
  const cardLikeButton = card.querySelector('.cards__like-button');
  const cardRemoveButton = card.querySelector('.cards__remove-button');
  cardImage.style.backgroundImage = `url(${link})`;
  cardTitle.textContent = name;
  cardLikeButton.addEventListener('click', evt => evt.target.classList.toggle('cards__like-button_active'));
  cardRemoveButton.addEventListener('click', evt => evt.target.closest('.cards__item').remove());
  cardImage.addEventListener('click', evt => setFigurePopup(evt));
  return card;
}

function createCard(initCard) {
  if (initCard) {
    return fillTemplate(initCard.name, initCard.link);
  } 
  else {
    return fillTemplate(placePopupNameItem.value, placePopupAboutItem.value);
  }  
}

function insertCard(card) {
  cardsContainer.prepend(card);
}

function initialAddCards() {
  initialCards.forEach(elem => {
    const newCard = createCard(elem);
    insertCard(newCard);
  });
}

function callProfileSubmitHandler (evt) {
  evt.preventDefault();
  profileName.textContent = profilePopupNameItem.value;
  profileAbout.textContent = profilePopupAboutItem.value;
}

function callPlaceSubmitHandler (evt) {
  evt.preventDefault();
  const newCard = createCard();
  insertCard(newCard);
}

function setProfilePopup() {
  profilePopupNameItem.value = profileName.innerText;
  profilePopupAboutItem.value = profileAbout.innerText;
}

function showPopup(item) {
  console.log(item)
  item.classList.add('popup_opened');
}

function hidePopup(item) {
  item.classList.remove('popup_opened');
}

function getCurrentPopup(item) {
  return item.target.closest('.popup');
}

initialAddCards();

// обработчики секции profile кнопок
profileEditButton.addEventListener('click', evt => {
  setProfilePopup();
  showPopup(profilePopup);
});
profileAddCardButton.addEventListener('click', elem => showPopup(placePopup));
// обработчики profile-popup
profilePopupToggleButton.addEventListener('click', elem => hidePopup(getCurrentPopup(elem)));
profilePopupForm.addEventListener('submit', elem => {
  callProfileSubmitHandler(elem);
  hidePopup(getCurrentPopup(elem));
});
// обработчики place-popup
placePopupToggleButton.addEventListener('click', elem => hidePopup(getCurrentPopup(elem)));
placePopupForm.addEventListener('submit', elem => {
  callPlaceSubmitHandler(elem);
  hidePopup(getCurrentPopup(elem));
});
// обработчики place-popup
figurePopupToggleButton.addEventListener('click', elem => hidePopup(getCurrentPopup(elem)));