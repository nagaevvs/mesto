import './pages/index.css';

//Конфиг валидациии форм
import configValidation from './utils/configValidation.js';

//Классы
import Api from './components/Api';
import Card from './components/Card.js';
import FormValidator from './components/FormValidator.js';
import Section from './components/Section.js';
import PopupWithForm from './components/PopupWithForm.js';
import PopupWithImage from './components/PopupWithImage.js';
import UserInfo from './components/UserInfo.js';
import PopupWithConfirm from './components/PopupWithConfirm';

//Константы
import { editButton } from './utils/constants.js';
import { formEditProfile } from './utils/constants.js';
import { inputNameEditProfile } from './utils/constants.js';
import { inputJobEditProfile } from './utils/constants.js';
import { buttonOpenPopUpAddCards } from './utils/constants.js';
import { formAddCard } from './utils/constants.js';
import { cardListSection } from './utils/constants.js';
import { templateSelector } from './utils/constants.js';
import { nameSelector } from './utils/constants.js';
import { jobSelector } from './utils/constants.js';
import { closeKey } from './utils/constants.js';
import { avatarSelector } from './utils/constants.js';







function handleCardClick(name, link) {
    popupWithImage.open(name, link)
};



function handleLikeClick(card, data, thisElement) {




    if (data.likes.some(e => e._id === this._myId)) {
        api.disLikeCard(data._id)
            .then((res) => {
                card.setLikes(res)
                thisElement.querySelector('.element__like').classList.toggle('element__like_active');
                thisElement.querySelector('.element__counter').textContent = res.likes.length
            })
            .catch((err) => {
                console.log(err);
            });

    } else {

        api.likeCard(data._id)
            .then((res) => {
                card.setLikes(res)
                thisElement.querySelector('.element__like').classList.toggle('element__like_active');
                thisElement.querySelector('.element__counter').textContent = res.likes.length
            })
            .catch((err) => {
                console.log(err);
            });




    }



}




function handleDeleteIconClick(card, id) {

    popupWithConfirm.getId(card, id)
    popupWithConfirm.open()


}



function callbackPopupSubmit(card, id) {
    api.deleteCard(id)
        .then((data) => {
            console.log(data)
            card._deleteCard()
        })
        .catch((err) => {
            console.log(err);
        });
}


//Инициализация классов


const api = new Api({
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-34/',
    headers: {
        authorization: '774c99e1-4cb0-4e4b-b24e-632a0b4c7684',
        'Content-Type': 'application/json'
    }
});



const cardList = new Section({ renderer: (item) => rendererCard(item) }, cardListSection);


const rendererCard = (item) => {
    const card = new Card(item, templateSelector, handleCardClick, handleDeleteIconClick, handleLikeClick);
    const cardElement = card.generateCard();
    cardList.addItem(cardElement);
}

function callbackAddCard(data) {
    renderLoadingCreate(true, '#add-card-button')
    api.addNewCard(data.title, data.image)
        .then((res) => {
            rendererCard(res);
        })
        .catch((err) => {
            console.log(err);
        })
        .finally(() => {
            renderLoadingCreate(false, '#add-card-button')
        });

}

//Загружаем изначальный масив карточек
api.getInitialCards()
    .then((result) => {
        console.log('изначальный массив карточек', result)
        cardList.renderItems(result);
    })
    .catch((err) => {
        console.log(err);
    });


//Загружает данные профиля
api.getUserData()
    .then((data) => {
        console.log('Данные пользователя при загрузке', data)
        userInfo.setUserInfo(data.name, data.about, data.avatar)
    })
    .catch((err) => {
        console.log(err);
    });



const userInfo = new UserInfo({ nameSelector, jobSelector, avatarSelector })

const popupWithFormEditProfile = new PopupWithForm('#popup-user-edit-profile', callbackEditProfile, closeKey)
popupWithFormEditProfile.setEventListeners()

const popupWithFormAddCard = new PopupWithForm('#popup-user-add-card', callbackAddCard, closeKey)
popupWithFormAddCard.setEventListeners()

const popupWithConfirm = new PopupWithConfirm('#popup-confirm', callbackPopupSubmit, closeKey)
popupWithConfirm.setEventListeners()

const popupWithFormEditAvatar = new PopupWithForm('#popup-refresh-avatar', callbackEditAvatar, closeKey)
popupWithFormEditAvatar.setEventListeners()

const popupWithImage = new PopupWithImage('#popup-view-image', closeKey)
popupWithImage.setEventListeners()

const validFormEditProfile = new FormValidator(configValidation, formEditProfile);
validFormEditProfile.enableValidation();

const validFormAddCard = new FormValidator(configValidation, formAddCard);
validFormAddCard.enableValidation();




function callbackEditAvatar(data) {
    renderLoading(true, '#refresh-avatar-button')
    api.refreshAvatar(data.newAvatar)
        .then((data) => {
            document.querySelector('.profile__avatar').src = data.avatar
        })
        .catch((err) => {
            console.log(err);
        })
        .finally(() => {
            renderLoading(false, '#refresh-avatar-button')
        });
}


function renderLoading(isLoading, elementSelector) {
    if (isLoading) {
        document.querySelector(elementSelector).textContent = 'Сохранение...'
    } else {
        document.querySelector(elementSelector).textContent = 'Сохранить'

    }
}

function renderLoadingCreate(isLoading, elementSelector) {
    if (isLoading) {
        document.querySelector(elementSelector).textContent = 'Создание...'
    } else {
        document.querySelector(elementSelector).textContent = 'Создать'

    }
}


function callbackEditProfile(data) {
    renderLoading(true, '#edit-profile-button')
    api.editUserData(data.name, data.job)
        .then((data) => {
            console.log(data)
            document.querySelector('.profile__name').textContent = data.name
            document.querySelector('.profile__about').textContent = data.about
        })
        .catch((err) => {
            console.log(err);
        })
        .finally(() => {
            renderLoading(false, '#edit-profile-button')
        });

}

document.querySelector('.profile__avatar-wrapper').addEventListener('click', function() {
    popupWithFormEditAvatar.open()
});


//Кнопка открывает попап для изменения данных в профиле 
editButton.addEventListener('click', function() {
    popupWithFormEditProfile.open()
    inputNameEditProfile.value = userInfo.getUserInfo().userName;
    inputJobEditProfile.value = userInfo.getUserInfo().userJob;
    validFormEditProfile.hideError()
});

//Кнопка открывает попап добавления карточки
buttonOpenPopUpAddCards.addEventListener('click', function() {
    popupWithFormAddCard.open()
    validFormAddCard.hideError()
    validFormAddCard.toggleButtonState()
});