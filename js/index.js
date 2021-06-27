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


//Создает карточки из массива
initialCards.forEach((item) => {
  const card = new Card(item);
  const cardElement = card.generateCard();
  blockElements.append(cardElement);
});


const formList = Array.from(document.querySelectorAll(`.popup__form`));
//Включает валидацию форм
formList.forEach((formElement) => {
  const formValid = new FormValidator(configValidation, formElement);
  formValid.enableValidation();

});

//Открывает попап
function openPopUp(popUpName) {
  popUpName.classList.add('popup_opened');
  window.addEventListener('keydown', escapeListen);
};

//закрывает попап
function closePopUp(popUpName) {
  popUpName.classList.remove('popup_opened');
  window.removeEventListener('keydown', escapeListen);
};

//обновляет информацию в профиле
function refreshProfile() {
  profileName.textContent = inputNameEditProfile.value;
  profileJob.textContent = inputJobEditProfile.value;
};

//Закрывает попап по нажатию на esc
function escapeListen(evt) {
  if (evt.key === "Escape") {
    closePopUp(document.querySelector('.popup_opened'));
  }
}

//ОБРАБОТЧИКИ

//Добавляет обработчик для закрытия попапа по клику
function addCloseClick() {
  const popUP = Array.from(document.querySelectorAll('.popup'));
  popUP.forEach((inputElement) => {
    inputElement.addEventListener('mousedown', evt => {
      if (!inputElement.querySelector('.container').contains(evt.target)) {
        closePopUp(inputElement);
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

//Скрывает текст ошибки
function hideError(form, inputElement) {
  const errorElement = form.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(`popup__input_type_error`);
  errorElement.classList.remove(`popup__error_visible`);
  errorElement.textContent = '';
}

//Открывает попап для редактирования данных в профиле
editButton.addEventListener('click', function() {
  openPopUp(popUpUserEditProfile);
  inputNameEditProfile.value = profileName.textContent;
  inputJobEditProfile.value = profileJob.textContent;
  hideError(popUpUserEditProfile, inputNameEditProfile);
  hideError(popUpUserEditProfile, inputJobEditProfile);

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
  const card = new Card({
    name: inputTitleAddCards.value,
    link: inputImageAddCards.value,
  });
  const cardElement = card.generateCard();
  blockElements.append(cardElement);

  closePopUp(popUpUserAddCards);
  formAddCard.reset();
  submitPopUpAddCards.classList.add('popup__button_disabled');
  submitPopUpAddCards.setAttribute('disabled', true);
});

export { openPopUp, popUpViewImage, imageForPopUp, figcaptionForPopUp }