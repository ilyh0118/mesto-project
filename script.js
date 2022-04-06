const page = document.querySelector('.page');
// элементы в Profile
const profileEditButton = page.querySelector('.profile__info-edit');
const createCardButton = page.querySelector('.profile__add-btn');
const nameProfile = page.querySelector('.profile__author-name');
const aboutProfile = page.querySelector('.profile__about-author');
// элементы в Popup
const popup = page.querySelector('.popup');
const form = page.querySelector('.popup__form');
const popupContainer = popup.querySelector('.popup__container');
const popupHeading = page.querySelector('.popup__heading');
const toggleButton = popup.querySelector('.popup__toggle');
const headingPopup = popup.querySelector('.popup__heading');
const nameItemPopup = popup.querySelector('.popup__item_el_name');
const aboutItemPopup = popup.querySelector('.popup__item_el_about');
const popupButton = popup.querySelector('.popup__button');
const popupFigure = popup.querySelector('.popup__figure');
const figureImage = popup.querySelector('.popup__figure-img');
const figureCaption  = popup.querySelector('.popup__figure-caption');

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
  headingPopup.innerText = 'Редактировать профиль';
  nameItemPopup.value = nameProfile.innerText;
  aboutItemPopup.value = aboutProfile.innerText;
  popupButton.type = 'submit';
  popupButton.innerText = 'Сохранить';
  popupContainer.classList.remove('popup__container_content_figure');
  popup.classList.remove('popup_content_figure')
  hideElement(popupFigure);
  showElement(popupHeading);
  showElement(form);
}

function setAddPopup() {
  headingPopup.innerText = 'Новое место';
  nameItemPopup.value = '';
  aboutItemPopup.value = '';
  nameItemPopup.placeholder = 'Название';
  aboutItemPopup.placeholder = 'Ссылка на картинку';
  popupButton.type = 'submit';
  popupButton.innerText = 'Создать';
  popupContainer.classList.remove('popup__container_content_figure');
  popup.classList.remove('popup_content_figure')
  hideElement(popupFigure);
  showElement(popupHeading);
  showElement(form);
};

function setFigurePopup(eventItem) {
  const cardsItem = eventItem.target.parentElement;
  const url = eventItem.target.style.backgroundImage.slice(5,-2);
  figureImage.src = url;
  figureImage.alt = cardsItem.querySelector('.cards__title').textContent;
  figureCaption.textContent = figureImage.alt;
  popupContainer.classList.add('popup__container_content_figure');
  popup.classList.add('popup_content_figure')
  showElement(popupFigure);
  hideElement(popupHeading);
  hideElement(form);
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
  card.querySelector('.cards__image').style.backgroundImage = `url(${link})`;
  card.querySelector('.cards__title').textContent = name;
  card.querySelector('.cards__like-button').addEventListener('click', evt => {
    evt.target.classList.toggle('cards__like-button_active');
  });
  card.querySelector('.cards__remove-button').addEventListener('click', evt => {
    evt.target.closest('.cards__item').remove();
  })
  card.querySelector('.cards__image').addEventListener('click', evt => {
    callPopup(evt);
  });
  return card;
}

function insertCard(card) {
  const cardsContainer = page.querySelector('.cards__grid');
  cardsContainer.append(card);
}

function initialAddCards() {
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
  initialCards.forEach(function(elem) {
    const initialCard = fillTemplate(elem.name, elem.link);
    insertCard(initialCard);
  });
}

function addCard(){
  const newCard = fillTemplate(nameItemPopup.value, aboutItemPopup.value);
  insertCard(newCard);
  hidePopup();
}

function callSubmitHandler (evt) {
  evt.preventDefault();
  if (popupButton.innerText === 'Сохранить') { 
    nameProfile.textContent = nameItemPopup.value;
    aboutProfile.textContent = aboutItemPopup.value;
  }  
  else{
    addCard();
  }
  hidePopup();
}

initialAddCards();

profileEditButton.addEventListener('click', callPopup);
createCardButton.addEventListener('click', callPopup);
toggleButton.addEventListener('click', hidePopup);
form.addEventListener('submit', callSubmitHandler);

