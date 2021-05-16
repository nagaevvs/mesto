let popUp = document.querySelector('.popup')
let editButton = document.querySelector('.profile__edit-button');
let formElement = document.querySelector('.popup__form')
let nameInput = formElement.querySelector('[name="name"]')
let jobInput = formElement.querySelector('[name="job"]')
let profileInfo = document.querySelector('.profile__info')
let profileName = profileInfo.querySelector('.profile__name')
let profileJob = profileInfo.querySelector('.profile__about')
let buttonClose = popUp.querySelector('.popup__button-close');

let popUpAddCards = document.querySelector('.popup-add-cards')
let addCardsButton = document.querySelector('.profile__add-button');
let buttonClosePopUpCards = popUpAddCards.querySelector('.popup__button-close');


let createCardForm = popUpAddCards.querySelector('.popup__form')

let inputTitleAddCards = popUpAddCards.querySelector('[name="title"]')
let inputImageAddCards = popUpAddCards.querySelector('[name="image"]')
let sectionElements = document.querySelector('.elements');


let popupImage = document.querySelector('.popup-image')

const cardTemplate = document.querySelector('#element').content;
const blockElements = document.querySelector('.elements');



const initialCards = [{
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





function createCards() {
  initialCards.forEach(function(item) {
    const userElement = cardTemplate.querySelector('.element').cloneNode(true);
    userElement.querySelector('.element__image').src = `${item.link}`;
    userElement.querySelector('.element__title').textContent = `${item.name}`;
    blockElements.prepend(userElement);
    likeCard(userElement)
    deleteCard(userElement)
    openPopupImage(userElement)
  });

}

createCards()

function openPopUp() {
  popUp.classList.add('popup_opened');
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
}


function closePopUp() {
  popUp.classList.remove('popup_opened');
}

function formSubmitHandler(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value
  profileJob.textContent = jobInput.value
  closePopUp()
}

//Добавить место

function openPopUpAddCards() {
  popUpAddCards.classList.add('popup-add-cards_opened');
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
}


function closePopUpAddCards() {
  popUpAddCards.classList.remove('popup-add-cards_opened');
}


// Добавление пользователем карточки
function createCardSubmit(evt) {
  evt.preventDefault();
  initialCards.push({ name: `${inputTitleAddCards.value}`, link: `${inputImageAddCards.value}` })
  const userElement = cardTemplate.querySelector('.element').cloneNode(true);
  userElement.querySelector('.element__image').src = `${initialCards[initialCards.length - 1].link}`;
  userElement.querySelector('.element__title').textContent = `${initialCards[initialCards.length - 1].name}`;
  blockElements.prepend(userElement);
  inputTitleAddCards.value = ''
  inputImageAddCards.value = ''
  closePopUpAddCards()
  likeCard(userElement)
  deleteCard(userElement)
  openPopupImage(userElement)

}

function likeCard(userElement) {
  userElement.querySelector('.element__like').addEventListener('click', function(evt) {
    evt.target.classList.toggle('element__like_active');
  });

}


function deleteCard(userElement) {
  userElement.querySelector('.element__delete').addEventListener('click', function(evt) {
    userElement.remove()

  });

}



function openPopupImage(userElement) {
  userElement.querySelector('.element__image').addEventListener('click', function(evt) {
    popupImage.classList.add('popup-image_opened');
    popupImage.querySelector('.popup-image__photo').src = `${userElement.querySelector('.element__image').src}`;
    popupImage.querySelector('.popup-image__title').textContent = `${userElement.querySelector('.element__title').textContent}`;

  });

  popupImage.querySelector('.popup__button-close').addEventListener('click', function(evt) {
    popupImage.classList.remove('popup-image_opened');

  });


}




//Обработчик формы редактирования информации в профиле
formElement.addEventListener('submit', formSubmitHandler);

//Открывает попап редактирования информации в профиле
editButton.addEventListener('click', openPopUp);

//Закрывает попап редактирования информации в профиле
buttonClose.addEventListener('click', closePopUp);

//Открывает попап доюавления места
addCardsButton.addEventListener('click', openPopUpAddCards);

//Крестик закрывает попап редактирования места 
buttonClosePopUpCards.addEventListener('click', closePopUpAddCards);

//Обработчик формы добавления месте
createCardForm.addEventListener('submit', createCardSubmit);