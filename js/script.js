//Попапы
let popUpUserEditProfile = document.querySelector('#popup-user-edit-profile')
let popUpUserAddCards = document.querySelector('#popup-user-add-card')
let popUpViewImage = document.querySelector('#popup-view-image')

//Кнопки закрытия попапов
let buttonClosePopUpViewImage = popUpViewImage.querySelector('.popup__button-close')
let buttonClosePopUpAddCards = popUpUserAddCards.querySelector('.popup__button-close');
let buttonClosePopUpEditProfile = popUpUserEditProfile.querySelector('.popup__button-close')

//Кнопка отрывает попап редактирования профиля
let editButton = document.querySelector('.profile__edit-button')

//Форма редактирования профиля
let formEditProfile = popUpUserEditProfile.querySelector('.popup__form')
let inputNameEditProfile = formEditProfile.querySelector('[name="name"]')
let inputJobEditProfile = formEditProfile.querySelector('[name="job"]')

//Отображаемая информация в профиле
let profileInfo = document.querySelector('.profile__info')
let profileName = profileInfo.querySelector('.profile__name')
let profileJob = profileInfo.querySelector('.profile__about')


//Открывает попап добавления новой карточки
let buttonOpenPopUpAddCards = document.querySelector('.profile__add-button');

//Форма добавления новой карточки
let formAddCard = popUpUserAddCards.querySelector('.popup__form')
let inputTitleAddCards = popUpUserAddCards.querySelector('[name="title"]')
let inputImageAddCards = popUpUserAddCards.querySelector('[name="image"]')

//Картинка попапа
let imageForPopUp = popUpViewImage.querySelector('.popup__image');
//Подпись к картинке
let figcaptionForPopUp = popUpViewImage.querySelector('.popup__figcaption')

//Содержимое шаблона для создания карточки
const cardTemplate = document.querySelector('#element').content;
//Контейнер для созданных карточек
const blockElements = document.querySelector('.elements');


//Массив мест для карточек
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

//создаем карточки из массива
initialCards.forEach(function(item) {
  const createCard = cardTemplate.querySelector('.element').cloneNode(true);
  createCard.querySelector('.element__image').src = `${item.link}`;
  createCard.querySelector('.element__title').textContent = `${item.name}`;
  likeCard(createCard)
  deleteCard(createCard)
  viewFullScreeImage(createCard)
  blockElements.prepend(createCard);
});

// Добавление пользователем карточки
function createCardUser() {
  initialCards.push({ name: `${inputTitleAddCards.value}`, link: `${inputImageAddCards.value}` })
  const createCard = cardTemplate.querySelector('.element').cloneNode(true);
  createCard.querySelector('.element__image').src = `${initialCards[initialCards.length - 1].link}`;
  createCard.querySelector('.element__title').textContent = `${initialCards[initialCards.length - 1].name}`;
  likeCard(createCard)
  deleteCard(createCard)
  viewFullScreeImage(createCard)
  closePopUp(popUpUserAddCards)
  inputTitleAddCards.value = ''
  inputImageAddCards.value = ''
  blockElements.prepend(createCard);
}

//Открывает попап
function openPopUp(popUpName) {
  popUpName.classList.add('popup_opened');

}

//закрывает попап
function closePopUp(popUpName) {
  popUpName.classList.remove('popup_opened');
}

//лайкает карточку
function likeCard(card) {
  card.querySelector('.element__like').addEventListener('click', function(evt) {
    evt.target.classList.toggle('element__like_active');
  });
}

//удаляет карточку
function deleteCard(card) {
  card.querySelector('.element__delete').addEventListener('click', function(evt) {
    card.remove()
  });
}

//открывает и зарывает попап с фотографией
function viewFullScreeImage(card) {
  card.querySelector('.element__image').addEventListener('click', function(evt) {
    openPopUp(popUpViewImage)
    imageForPopUp.src = `${card.querySelector('.element__image').src}`;
    figcaptionForPopUp.textContent = `${card.querySelector('.element__title').textContent}`;
  });

  buttonClosePopUpViewImage.addEventListener('click', function() {
    closePopUp(popUpViewImage)
  });
}


//Обновляет данные в профиле
formEditProfile.addEventListener('submit', function(evt) {
  evt.preventDefault();
  profileName.textContent = inputNameEditProfile.value
  profileJob.textContent = inputJobEditProfile.value
  closePopUp(popUpUserEditProfile)

});

//Открывает попап для редактирования данных в профиле
editButton.addEventListener('click', function() {
  openPopUp(popUpUserEditProfile)
  inputNameEditProfile.value = profileName.textContent;
  inputJobEditProfile.value = profileJob.textContent;
});

//Закрывает попап редактирования данных в профиле нажатием на крестик
buttonClosePopUpEditProfile.addEventListener('click', function() {
  closePopUp(popUpUserEditProfile)
});

//Открывает попап добавления карточек места
buttonOpenPopUpAddCards.addEventListener('click', function() {
  openPopUp(popUpUserAddCards)
});

//Закрывает попап добавления карточки нажатием на крестик
buttonClosePopUpAddCards.addEventListener('click', function() {
  closePopUp(popUpUserAddCards)
});

//Добавляет новую карточку места
formAddCard.addEventListener('submit', function(evt) {
  evt.preventDefault();
  createCardUser()
});