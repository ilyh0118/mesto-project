let page = document.querySelector('.page');
// элементы в Profile
let profileEditButton = page.querySelector('.profile__info-edit');
let createCardButton = page.querySelector('.profile__add-btn');
let nameProfile = page.querySelector('.profile__author-name');
let aboutProfile = page.querySelector('.profile__about-author');
// элементы в Popup
let popup = page.querySelector('.popup');
let form = page.querySelector('.popup__container');
let toggleButton = popup.querySelector('.popup__toggle');
let headingPopup = popup.querySelector('.popup__heading');
let nameItemPopup = popup.querySelector('.popup__item_el_name');
let aboutItemPopup = popup.querySelector('.popup__item_el_about');
let popupButton = popup.querySelector('.popup__button');

initialAddCards();

profileEditButton.addEventListener('click', showPopup);
createCardButton.addEventListener('click', showPopup);
toggleButton.addEventListener('click', hidePopup);
form.addEventListener('submit', formSubmitHandler);

function initialAddCards() {
    const initialCards = [
    {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
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
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
    ];
    for (let i = 0; i < initialCards.length; i++) {
      const initialCard = fillTemplate(initialCards[i].name, initialCards[i].link);
      insertCard(initialCard);
    }
}

function showPopup(evt){
    // меняем параметры формы в зависимости от того 
    // на какой кнопке произошло событие:
    if (evt.target.className.includes('profile__info-edit')) {
        headingPopup.innerText = 'Редактировать профиль';
        nameItemPopup.value = nameProfile.innerText;
        aboutItemPopup.value = aboutProfile.innerText;
        popupButton.type = 'submit';
        popupButton.innerText = 'Сохранить';
        popupButton.removeEventListener('click', addCard);
    }
    else {
        headingPopup.innerText = 'Новове место';
        nameItemPopup.value = '';
        aboutItemPopup.value = '';
        nameItemPopup.placeholder = 'Название';
        aboutItemPopup.placeholder = 'Ссылка на картинку';
        popupButton.type = 'button';
        popupButton.innerText = 'Создать';
        popupButton.addEventListener('click', addCard);
    }
    popup.classList.add('popup_opened');
}

function addCard(){
  const newCard = fillTemplate(nameItemPopup.value, aboutItemPopup.value);
  insertCard(newCard);
  hidePopup();
}

function fillTemplate(name, link) {
  const cardTemplate = page.querySelector('#card-template').content;
  const card = cardTemplate.querySelector('.cards__item').cloneNode(true);
  card.querySelector('.cards__image').alt = name;
  card.querySelector('.cards__image').src = link;
  card.querySelector('.cards__title').textContent = name;
  card.querySelector('.cards__like-button').addEventListener('click', function(evt){
    evt.target.classList.toggle('cards__like-button_active');
  });
  return card;
}

function insertCard(card) {
  let cardsContainer = page.querySelector('.cards__grid');
  cardsContainer.append(card);
}

function formSubmitHandler (evt) {
    evt.preventDefault();
    console.log(`введённое имя: ${nameItemPopup.value}`);
    console.log(`введённая работа: ${aboutItemPopup.value}`);
    nameProfile.textContent = nameItemPopup.value;
    aboutProfile.textContent = aboutItemPopup.value;
    hidePopup();
}

function hidePopup(){
  popup.classList.remove('popup_opened');
}