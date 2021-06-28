import configValidation from './configValidation.js';
import Card from './Card.js';
import initialCards from './initial-сards.js';
import FormValidator from './FormValidator.js';

//Попапы
const popUpUserEditProfile = document.querySelector('#popup-user-edit-profile');
const popUpUserAddCards = document.querySelector('#popup-user-add-card');
const popUpViewImage = document.querySelector('#popup-view-image');

//Кнопки закрытия попапов (крестики)
const buttonClosePopUpViewImage = popUpViewImage.querySelector('.popup__button-close');
const buttonClosePopUpAddCards = popUpUserAddCards.querySelector('.popup__button-close');
const buttonClosePopUpEditProfile = popUpUserEditProfile.querySelector('.popup__button-close');

//Кнопка отрывает попап редактирования профиля
const editButton = document.querySelector('.profile__edit-button');

//Форма редактирования профиля
const formEditProfile = document.forms.formprofile;
const inputNameEditProfile = formEditProfile.elements.name;
const inputJobEditProfile = formEditProfile.elements.job;

//Отображаемая информация в профиле
const profileInfo = document.querySelector('.profile__info');
const profileName = profileInfo.querySelector('.profile__name');
const profileJob = profileInfo.querySelector('.profile__about');

//Открывает попап добавления новой карточки
const buttonOpenPopUpAddCards = document.querySelector('.profile__add-button');

//Форма добавления новой карточки
const formAddCard = document.forms.formcard;
const inputTitleAddCards = formAddCard.elements.title;
const inputImageAddCards = formAddCard.elements.image;

//Сабмит формы добавления места
const submitPopUpAddCards = popUpUserAddCards.querySelector('.popup__button');

//Картинка попапа
const imageForPopUp = popUpViewImage.querySelector('.popup__image');

//Подпись к картинке
const figcaptionForPopUp = popUpViewImage.querySelector('.popup__figcaption');

//Контейнер для созданных карточек
const blockElements = document.querySelector('.elements');


//Создает карточку 
function createCard(data, templateSelector) {
  const card = new Card(data, templateSelector, viewFullScreenImage);
  const cardElement = card.generateCard();
  return cardElement
};

//Добавить карточку
function addCard(cardElement) {
  blockElements.prepend(cardElement);
};

//Создает карточки из массива
initialCards.forEach((item) => {
  addCard(createCard(item, '#element'))
});


//Создает экземпляры класса FormValidator для форм
const validFormEditProfile = new FormValidator(configValidation, formEditProfile);
validFormEditProfile.enableValidation();
const validFormAddCard = new FormValidator(configValidation, formAddCard);
validFormAddCard.enableValidation();


//Открывает попап
function openPopUp(popup) {
  popup.classList.add('popup_opened');
  window.addEventListener('keydown', listenEscape);
};

//закрывает попап
function closePopUp(popup) {
  popup.classList.remove('popup_opened');
  window.removeEventListener('keydown', listenEscape);
};

//обновляет информацию в профиле
function refreshProfile() {
  profileName.textContent = inputNameEditProfile.value;
  profileJob.textContent = inputJobEditProfile.value;
};

//Закрывает попап по нажатию на esc
function listenEscape(evt) {
  if (evt.key === "Escape") {
    closePopUp(document.querySelector('.popup_opened'));
  }
}

//ОБРАБОТЧИКИ

//открывает и зарывает попап с фотографией
function viewFullScreenImage(name, link) {

  openPopUp(popUpViewImage);
  imageForPopUp.src = link;
  imageForPopUp.alt = name;
  figcaptionForPopUp.textContent = name;

};


//Добавляет обработчик для закрытия попапа по клику
function addCloseClick() {
  const popupList = Array.from(document.querySelectorAll('.popup'));
  popupList.forEach((popupElement) => {
    popupElement.addEventListener('mousedown', evt => {
      if (!popupElement.querySelector('.container').contains(evt.target)) {
        closePopUp(popupElement);
      }
    })
  });
}
addCloseClick()

//Обновляет данные в профиле
formEditProfile.addEventListener('submit', function(evt) {
  evt.preventDefault();
  refreshProfile();
  closePopUp(popUpUserEditProfile);
});



//Открывает попап для редактирования данных в профиле
editButton.addEventListener('click', function() {
  openPopUp(popUpUserEditProfile);
  inputNameEditProfile.value = profileName.textContent;
  inputJobEditProfile.value = profileJob.textContent;
  validFormEditProfile.hideError()

});

//Закрывает попап c изображением
buttonClosePopUpViewImage.addEventListener('click', function() {
  closePopUp(popUpViewImage);
});

//Закрывает попап редактирования данных в профиле нажатием на крестик
buttonClosePopUpEditProfile.addEventListener('click', function() {
  closePopUp(popUpUserEditProfile);
});

//Открывает попап добавления карточек места
buttonOpenPopUpAddCards.addEventListener('click', function() {
  openPopUp(popUpUserAddCards);
});

//Закрывает попап добавления карточки нажатием на крестик
buttonClosePopUpAddCards.addEventListener('click', function() {
  closePopUp(popUpUserAddCards);
});

//Сабмит формы добавляет новую карточку места
formAddCard.addEventListener('submit', function(evt) {
  //evt.preventDefault();

  addCard(createCard({
    name: inputTitleAddCards.value,
    link: inputImageAddCards.value,
  }, '#element'))

  closePopUp(popUpUserAddCards);
  formAddCard.reset();
  validFormAddCard.toggleButtonState()
});