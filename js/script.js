let popUp = document.querySelector('.popup')
let editButton = document.querySelector('.profile__edit-button');
let formElement = document.querySelector('.popup__form')
let nameInput = formElement.querySelector('[name="name"]')
let jobInput = formElement.querySelector('[name="job"]')
let profileInfo = document.querySelector('.profile__info')
let profileName = profileInfo.querySelector('.profile__name')
let profileJob = profileInfo.querySelector('.profile__about')
let buttonClose = document.querySelector('.popup__button-close');

let popUpAddCards = document.querySelector('.popup-add-cards')
let addCardsButton = document.querySelector('.profile__add-button');
let buttonClosePopUpCards = popUpAddCards.querySelector('.popup__button-close');


let createCardForm = popUpAddCards.querySelector('.popup__form')

let inputTitleAddCards = popUpAddCards.querySelector('[name="title"]')
let inputImageAddCards = popUpAddCards.querySelector('[name="image"]')
let sectionElements = document.querySelector('.elements');


const cardTemplate = document.querySelector('#element').content; 
const blockElements = document.querySelector('.elements');



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

//userElement.querySelector('.element__image').src = `${initialCards[0].link}`;
//userElement.querySelector('.element__title').textContent = `${initialCards[0].name}`;
//blockElements.append(userElement); 



function createCards() {
  
initialCards.forEach(function (item) {
  
  
  const userElement = cardTemplate.querySelector('.element').cloneNode(true);

  
  userElement.querySelector('.element__image').src = `${item.link}`;
  userElement.querySelector('.element__title').textContent = `${item.name}`;
  blockElements.prepend(userElement); 
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

function createCardSubmit(evt) {
  evt.preventDefault();
  
  initialCards.push({name: `${inputTitleAddCards.value}`, link: `${inputImageAddCards.value}`})
  
  const items = initialCards.splice(0, initialCards.length)
  const userElement = cardTemplate.querySelector('.element').cloneNode(true);
  
  
  userElement.querySelector('.element__image').src = `${items.link}`;
  userElement.querySelector('.element__title').textContent = `${items.name}`;
  blockElements.prepend(userElement); 
  
  
  
}






formElement.addEventListener('submit', formSubmitHandler);
editButton.addEventListener('click', openPopUp);
buttonClose.addEventListener('click', closePopUp);

addCardsButton.addEventListener('click', openPopUpAddCards);
buttonClosePopUpCards.addEventListener('click', closePopUpAddCards);

createCardForm.addEventListener('submit', createCardSubmit);