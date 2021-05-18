//Попапы
const popUpUserEditProfile = document.querySelector('#popup-user-edit-profile');
const popUpUserAddCards = document.querySelector('#popup-user-add-card');
const popUpViewImage = document.querySelector('#popup-view-image');

//Кнопки закрытия попапов
const buttonClosePopUpViewImage = popUpViewImage.querySelector('.popup__button-close');
const buttonClosePopUpAddCards = popUpUserAddCards.querySelector('.popup__button-close');
const buttonClosePopUpEditProfile = popUpUserEditProfile.querySelector('.popup__button-close');

//Кнопка отрывает попап редактирования профиля
const editButton = document.querySelector('.profile__edit-button');

//Форма редактирования профиля
const formEditProfile = popUpUserEditProfile.querySelector('.popup__form');
const inputNameEditProfile = formEditProfile.querySelector('[name="name"]');
const inputJobEditProfile = formEditProfile.querySelector('[name="job"]');

//Отображаемая информация в профиле
const profileInfo = document.querySelector('.profile__info');
const profileName = profileInfo.querySelector('.profile__name');
const profileJob = profileInfo.querySelector('.profile__about');


//Открывает попап добавления новой карточки
const buttonOpenPopUpAddCards = document.querySelector('.profile__add-button');

//Форма добавления новой карточки
const formAddCard = popUpUserAddCards.querySelector('.popup__form');
const inputTitleAddCards = popUpUserAddCards.querySelector('[name="title"]');
const inputImageAddCards = popUpUserAddCards.querySelector('[name="image"]');

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
  addCard(createCard(item.link, item.name));
});




/* "В качестве аргумента функция createCard должна принимать данные карточки (лучше как объект).
...
Я не разобрался как сделать функцию createCard используя в качестве аргумента ОБЪЕКТ универсальной 
для создания изначального массива карточек и для добавления карточки вручную.
Функция createCard без проблем работает для создания карточек из массива при загрузке страницы вот так:

function createCard(object) {
  const createCard = cardTemplate.querySelector('.element').cloneNode(true);
  likeCard(createCard);
  deleteCard(createCard);
  viewFullScreeImage(createCard);
  createCard.querySelector('.element__image').src = `${object.link}`;
  createCard.querySelector('.element__image').alt = `${object.name}`;
  createCard.querySelector('.element__title').textContent = `${object.name}`;
  return createCard;
};
...........
Но тогда, для того что бы функция работала и для добавления карточки из формы мне тоже нужен объект. 
Я могу его создать, например:

const objectInputsAddCardForm = {
  name: ,
  link: ,
};
............
И тогда я мог бы использовать createCard(objectInputsAddCardForm) для добавления карточки через форму. 
Получается, что в качестве значений для ключей в объекте нужно использовать value инпутов формы:

const objectInputsAddCardForm = {
  name: inputTitleAddCards.value,
  link: inputImageAddCards.value,
};

Что в прочем не работает. js как я понял не позволяет использовать в качестве значений объекта выражения и переменные.
............
Проверял этот объект с готовыми строками - работает:
const objectInputsAddCardForm = {
  name: 'Архыз',
  link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg',
};
............
Подскажите, я неправильно использую объект или подразумевается совсем иное решение? 

*/



function createCard(scrCards, nameCards) {
  const createCard = cardTemplate.querySelector('.element').cloneNode(true);
  likeCard(createCard);
  deleteCard(createCard);
  viewFullScreeImage(createCard);
  createCard.querySelector('.element__image').src = `${scrCards}`;
  createCard.querySelector('.element__image').alt = `${nameCards}`;
  createCard.querySelector('.element__title').textContent = `${nameCards}`;
  return createCard;
};


function addCard(createCard) {
  
  blockElements.prepend(createCard);
};


//Открывает попап
function openPopUp(popUpName) {
  popUpName.classList.add('popup_opened');
};

//закрывает попап
function closePopUp(popUpName) {
  popUpName.classList.remove('popup_opened');
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

function refreshProfile() {
  profileName.textContent = inputNameEditProfile.value;
  profileJob.textContent = inputJobEditProfile.value;
};


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

//Добавляет новую карточку места
formAddCard.addEventListener('submit', function(evt) {
  evt.preventDefault();
  addCard(createCard(inputImageAddCards.value, inputTitleAddCards.value));
  closePopUp(popUpUserAddCards);
  formAddCard.reset();
});