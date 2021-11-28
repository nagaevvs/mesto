//Кнопка отрывает попап редактирования профиля
export const editButton = document.querySelector('.profile__edit-button');

//Форма редактирования профиля
export const formEditProfile = document.forms.formprofile;
export const inputNameEditProfile = formEditProfile.elements.name;
export const inputJobEditProfile = formEditProfile.elements.job;

//Открывает попап добавления новой карточки
export const buttonOpenPopUpAddCards = document.querySelector('.profile__add-button');

//Форма добавления новой карточки
export const formAddCard = document.forms.formcard;

//Контейнер для созданных карточек
export const cardListSection = '.elements';
export const templateSelector = '#element';

//Селекторы профиля пользователя
export const nameSelector = 'profile__name';
export const jobSelector = 'profile__about';

//Селектор кнопки закрытия попапа
export const closeKey = 'Escape'