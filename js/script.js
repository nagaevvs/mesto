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
const formEditProfile = document.forms.formprofile
const inputNameEditProfile = formEditProfile.elements.name
const inputJobEditProfile = formEditProfile.elements.job

//Отображаемая информация в профиле
const profileInfo = document.querySelector('.profile__info');
const profileName = profileInfo.querySelector('.profile__name');
const profileJob = profileInfo.querySelector('.profile__about');

//Открывает попап добавления новой карточки
const buttonOpenPopUpAddCards = document.querySelector('.profile__add-button');

//Форма добавления новой карточки
const formAddCard = document.forms.formcard
const inputTitleAddCards = formAddCard.elements.title
const inputImageAddCards = formAddCard.elements.image

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
  addCloseEsc()
  addCloseClick(popUpName)
};

//Добавляет обработчик для закрытия попапа по клику
function addCloseClick(popUpName) {
  popUpName.addEventListener('click', evt => {
    if (!popUpName.querySelector('.container').contains(evt.target)) {
      closePopUp()
    }
  })
}

//закрывает попап
function closePopUp() {
  const popUP = Array.from(document.querySelectorAll('.popup'))
  popUP.forEach((inputElement) => {
    inputElement.classList.remove('popup_opened');
  });
  removeCloseEsc()
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
    closePopUp()
  }
}

//Добавляет обработчик для закрытия попапа ESC
function addCloseEsc() {
  window.addEventListener('keydown', escapeListen)
}

//Удаляет обработчик для закрытия попапа ESC
function removeCloseEsc() {
  window.removeEventListener('keydown', escapeListen)
}

//ОБРАБОТЧИКИ

//Обновляет данные в профиле
formEditProfile.addEventListener('submit', function(evt) {
  evt.preventDefault();
  refreshProfile();
  closePopUp();
});

//Открывает попап для редактирования данных в профиле
editButton.addEventListener('click', function() {
  openPopUp(popUpUserEditProfile);
  inputNameEditProfile.value = profileName.textContent;
  inputJobEditProfile.value = profileJob.textContent;
});

//Закрывает попап c изображением
buttonClosePopUpViewImage.addEventListener('click', function() {
  closePopUp();
});

//Закрывает попап редактирования данных в профиле нажатием на крестик
buttonClosePopUpEditProfile.addEventListener('click', function() {
  closePopUp();
});

//Открывает попап добавления карточек места
buttonOpenPopUpAddCards.addEventListener('click', function() {
  openPopUp(popUpUserAddCards);
});

//Закрывает попап добавления карточки нажатием на крестик
buttonClosePopUpAddCards.addEventListener('click', function() {
  closePopUp();
});

//Сабмит формы добавляет новую карточку места
formAddCard.addEventListener('submit', function(evt) {
  evt.preventDefault();

  addCard(createCard({
    name: inputTitleAddCards.value,
    link: inputImageAddCards.value,
  }));

  closePopUp();
  formAddCard.reset();
});