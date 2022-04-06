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
const profileEditButton = page.querySelector('.profile__info-edit');
const profileAddCardButton = page.querySelector('.profile__add-btn');
const profileName = page.querySelector('.profile__author-name');
const profileAbout = page.querySelector('.profile__about-author');
// элементы в Popup
const popup = page.querySelector('.popup');
const popupForm = popup.querySelector('.popup__form');
const popupContainer = popup.querySelector('.popup__container');
const popupHeading = popup.querySelector('.popup__heading');
const popupToggleButton = popup.querySelector('.popup__toggle');
const popupNameItem = popup.querySelector('.popup__item_el_name');
const popupAboutItem = popup.querySelector('.popup__item_el_about');
const popupButton = popup.querySelector('.popup__button');
const popupFigure = popup.querySelector('.popup__figure');
const popupFigureImage = popup.querySelector('.popup__figure-img');
const popupFigureCaption  = popup.querySelector('.popup__figure-caption');

function showPopup() {
  popup.classList.add('popup_opened');
}

function hidePopup(){
  popup.classList.remove('popup_opened');
}

function hideElement(element) {
  element.classList.add('hide');
}

function showElement(element) {
  element.classList.remove('hide');
}

function setEditPopup() {
  popupHeading.innerText = 'Редактировать профиль';  
  popupNameItem.value = profileName.innerText;
  popupAboutItem.value = profileAbout.innerText;
  popupButton.type = 'submit';
  popupButton.innerText = 'Сохранить';
  popupContainer.classList.remove('popup__container_content_figure');
  popup.classList.remove('popup_content_figure')
  hideElement(popupFigure);
  showElement(popupHeading);
  showElement(popupForm);
}

function setAddPopup() {
  popupHeading.innerText = 'Новое место';
  popupNameItem.value = '';
  popupAboutItem.value = '';
  popupNameItem.placeholder = 'Название';
  popupAboutItem.placeholder = 'Ссылка на картинку';
  popupButton.type = 'submit';
  popupButton.innerText = 'Создать';
  popupContainer.classList.remove('popup__container_content_figure');
  popup.classList.remove('popup_content_figure')
  hideElement(popupFigure);
  showElement(popupHeading);
  showElement(popupForm);
};

function setFigurePopup(eventItem) {
  const newCardsItem = eventItem.target.parentElement;
  const url = eventItem.target.style.backgroundImage.slice(5,-2);
  popupFigureImage.src = url;
  popupFigureImage.alt = newCardsItem.querySelector('.cards__title').textContent;
  popupFigureCaption.textContent = popupFigureImage.alt;
  popupContainer.classList.add('popup__container_content_figure');
  popup.classList.add('popup_content_figure');
  showElement(popupFigure);
  hideElement(popupHeading);
  hideElement(popupForm);
};

function callPopup(evt){
  if (evt.target.className.includes('profile__info-edit')) {
    setEditPopup();
  }
  else if(evt.target.className.includes('profile__add-btn')) {
    setAddPopup();
  }
  else {
    setFigurePopup(evt);
  }
  showPopup();
}

function fillTemplate(name, link) {
  const cardTemplate = page.querySelector('#card-template').content;
  const card = cardTemplate.querySelector('.cards__item').cloneNode(true);
  const cardImage = card.querySelector('.cards__image');
  const cardTitle = card.querySelector('.cards__title');
  const cardLikeButton = card.querySelector('.cards__like-button');
  const cardRemoveButton = card.querySelector('.cards__remove-button');
  cardImage.style.backgroundImage = `url(${link})`;
  cardTitle.textContent = name;
  cardLikeButton.addEventListener('click', evt => {
    evt.target.classList.toggle('cards__like-button_active');
  });
  cardRemoveButton.addEventListener('click', evt => {
    evt.target.closest('.cards__item').remove();
  });
  cardImage.addEventListener('click', evt => {
    callPopup(evt);
  });
  return card;
}

function insertCard(card) {
  cardsContainer.prepend(card);
}

function initialAddCards() {
  initialCards.forEach(elem => {
    const newCard = fillTemplate(elem.name, elem.link);
    insertCard(newCard);
  });
}

function addCard(){
  const newCard = fillTemplate(popupNameItem.value, popupAboutItem.value);
  insertCard(newCard);
  hidePopup();
}

function callSubmitHandler (evt) {
  evt.preventDefault();
  if (popupButton.innerText === 'Сохранить') { 
    profileName.textContent = popupNameItem.value;
    profileAbout.textContent = popupAboutItem.value;
  }  
  else{
    addCard();
  }
  hidePopup();
}

initialAddCards();

profileEditButton.addEventListener('click', callPopup);
profileAddCardButton.addEventListener('click', callPopup);
popupToggleButton.addEventListener('click', hidePopup);
popupForm.addEventListener('submit', callSubmitHandler);

