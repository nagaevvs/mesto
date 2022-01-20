import './index.css';

//Конфиг валидациии форм
import configValidation from '../utils/configValidation.js';

//Классы
import Api from '../components/Api';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import UserInfo from '../components/UserInfo.js';
import PopupWithConfirm from '../components/PopupWithConfirm';

//Константы
import { editButton } from '../utils/constants.js';
import { inputNameEditProfile } from '../utils/constants.js';
import { inputJobEditProfile } from '../utils/constants.js';
import { buttonOpenPopUpAddCards } from '../utils/constants.js';
import { cardListSection } from '../utils/constants.js';
import { templateSelector } from '../utils/constants.js';
import { nameSelector } from '../utils/constants.js';
import { jobSelector } from '../utils/constants.js';
import { closeKey } from '../utils/constants.js';
import { avatarSelector } from '../utils/constants.js';
import { formEditAvatar } from '../utils/constants.js';
import { formEditProfile } from '../utils/constants.js';
import { formAddCard } from '../utils/constants.js';

function handleCardClick(name, link) {
    popupWithImage.open(name, link)
};

function handleLikeClick(card, data) {

    if (data.likes.some(e => e._id === this._userId)) {
        api.disLikeCard(data._id)
            .then((res) => {
                card.updateLikes(res)
            })
            .catch((err) => {
                console.log(err);
            });
    } else {

        api.likeCard(data._id)
            .then((res) => {
                card.updateLikes(res)
            })
            .catch((err) => {
                console.log(err);
            });
    }
}


function handleDeleteIconClick(card, id) {
    popupWithConfirm.setData(card, id)
    popupWithConfirm.open()
}

function callbackPopupSubmit(popup, card, id) {

    popup.renderLoading(true, 'Удаление...')
    api.deleteCard(id)
        .then((data) => {
            card.deleteCard()
            popup.close()

        })
        .catch((err) => {
            console.log(err);
        })
        .finally(() => {
            popup.renderLoading(false, 'Удаление...')
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
    const card = new Card(item, userInfo.getUserInfo().userId, templateSelector, handleCardClick, handleDeleteIconClick, handleLikeClick);
    const cardElement = card.generateCard();
    return cardElement
}

function callbackAddCard(popup, data) {

    popup.renderLoading(true, 'Сохранение...')
    api.addNewCard(data.title, data.image)
        .then((card) => {
            cardList.addItem(card);
            popup.close()
        })
        .catch((err) => {
            console.log(err);
        })
        .finally(() => {

            popup.renderLoading(false, 'Сохранение...')
        });

}


Promise.all([api.getUserData(), api.getInitialCards()])
    .then(([userData, cards]) => {
        userInfo.setUserInfo(userData)
        cardList.renderItems(cards);
    })
    .catch(err => {
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


const formValidators = {}

// Включение валидации
const enableValidation = (config) => {
    const formList = Array.from(document.querySelectorAll(config.formSelector))
    formList.forEach((formElement) => {
        const validator = new FormValidator(config, formElement)
        const formName = formElement.getAttribute('name')
        formValidators[formName] = validator;
        validator.enableValidation();
    });
};

enableValidation(configValidation);


function callbackEditAvatar(popup, data) {

    popup.renderLoading(true, 'Сохранение...')
    api.refreshAvatar(data.avatar)
        .then((userData) => {
            userInfo.setUserInfo(userData)
            popup.close()
        })
        .catch((err) => {
            console.log(err);
        })
        .finally(() => {
            popup.renderLoading(false, 'Сохранение...')
        });
}



function callbackEditProfile(popup, data) {
    popup.renderLoading(true, 'Сохранение...')
    api.editUserData(data.name, data.job)
        .then((userData) => {
            userInfo.setUserInfo(userData)
            popup.close()
        })
        .catch((err) => {
            console.log(err);
        })
        .finally(() => {
            popup.renderLoading(false, 'Сохранение...')
        });

}

document.querySelector('.profile__avatar-wrapper').addEventListener('click', function() {
    popupWithFormEditAvatar.open()
    formValidators[formEditAvatar.getAttribute('name')].resetValidation()
});

editButton.addEventListener('click', function() {
    popupWithFormEditProfile.open()
    formValidators[formEditProfile.getAttribute('name')].resetValidation()
    const { userName, userAbout } = userInfo.getUserInfo()
    inputNameEditProfile.value = userName;
    inputJobEditProfile.value = userAbout;
});

buttonOpenPopUpAddCards.addEventListener('click', function() {
    popupWithFormAddCard.open()
    formValidators[formAddCard.getAttribute('name')].resetValidation()
});