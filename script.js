let page = document.querySelector('.page');
let profileEditButton = page.querySelector('.profile__info-edit');
let nameAuthor = page.querySelector('.profile__author-name');
let aboutAuthor = page.querySelector('.profile__about-author');
let popup = page.querySelector('.popup');
let form = page.querySelector('.popup__container');
let nameInput = popup.querySelector('.popup__item_el_name');
let aboutInput = popup.querySelector('.popup__item_el_about');
let toggleButton = popup.querySelector('.popup__toggle');

profileEditButton.addEventListener('click',showPopup);
toggleButton.addEventListener('click', hidePopup);

function showPopup(){
    let author = nameAuthor.innerText;
    let about = aboutAuthor.innerText;
    nameInput.value = author;
    aboutInput.value = about;
    popup.classList.add('popup_opened');
}

function hidePopup(){
    popup.classList.remove('popup_opened');
}

function formSubmitHandler (evt) {
    evt.preventDefault();
    console.log(`введённое имя: ${nameInput.value}`);
    console.log(`введённая работа: ${aboutInput.value}`);
    nameAuthor.textContent = nameInput.value;
    aboutAuthor.textContent = aboutInput.value;
    hidePopup();
}
form.addEventListener('submit', formSubmitHandler);