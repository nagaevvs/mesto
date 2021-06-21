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

//Содержимое шаблона для создания карточки
const cardTemplate = document.querySelector('#element').content;

//Контейнер для созданных карточек
const blockElements = document.querySelector('.elements');

//создаем карточки из массива
initialCards.forEach(function(item) {
  addCard(createCard(item));
});

//создать карточку
function createCard(item) {
  const cardElement = cardTemplate.querySelector('.element').cloneNode(true);
  likeCard(cardElement);
  deleteCard(cardElement);
  viewFullScreeImage(cardElement);
  cardElement.querySelector('.element__image').src = `${item.link}`;
  cardElement.querySelector('.element__image').alt = `${item.name}`;
  cardElement.querySelector('.element__title').textContent = `${item.name}`;
  return cardElement;
};

//добавить карточку
function addCard(cardElement) {
  blockElements.prepend(cardElement);
};

//Открывает попап
function openPopUp(popUpName) {
  popUpName.classList.add('popup_opened');
  window.addEventListener('keydown', escapeListen);

};

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
  //закрывает попап
function closePopUp(popUpName) {
  popUpName.classList.remove('popup_opened');
  window.removeEventListener('keydown', escapeListen);
};

//лайкает карточку
function likeCard(card) {
  card.querySelector('.element__like').addEventListener('click', function(evt) {
    evt.target.classList.toggle('element__like_active');
  });
};

//удаляет карточку
function deleteCard(card) {
  card.querySelector('.element__delete').addEventListener('click', function(evt) {
    card.remove();
  });
};

//открывает и зарывает попап с фотографией
function viewFullScreeImage(card) {
  card.querySelector('.element__image').addEventListener('click', function(evt) {
    openPopUp(popUpViewImage);
    imageForPopUp.src = `${card.querySelector('.element__image').src}`;
    imageForPopUp.alt = `${card.querySelector('.element__title').textContent}`;
    figcaptionForPopUp.textContent = `${card.querySelector('.element__title').textContent}`;
  });
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
  hideInputError(popUpUserEditProfile, inputNameEditProfile, configValidation);
  hideInputError(popUpUserEditProfile, inputJobEditProfile, configValidation);
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
  evt.preventDefault();
  addCard(createCard({
    name: inputTitleAddCards.value,
    link: inputImageAddCards.value,
  }));
  closePopUp(popUpUserAddCards);
  formAddCard.reset();
  submitPopUpAddCards.classList.add('popup__button_disabled');
  submitPopUpAddCards.setAttribute('disabled', true);
});