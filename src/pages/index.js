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
import { formEditProfile } from '../utils/constants.js';
import { inputNameEditProfile } from '../utils/constants.js';
import { inputJobEditProfile } from '../utils/constants.js';
import { buttonOpenPopUpAddCards } from '../utils/constants.js';
import { formAddCard } from '../utils/constants.js';
import { cardListSection } from '../utils/constants.js';
import { templateSelector } from '../utils/constants.js';
import { nameSelector } from '../utils/constants.js';
import { jobSelector } from '../utils/constants.js';
import { closeKey } from '../utils/constants.js';
import { avatarSelector } from '../utils/constants.js';







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
            console.log(data)
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



// function createCard(item) {
//     const card = new Card(item, userInfo.getUserInfo().userId, templateSelector, handleCardClick, handleDeleteIconClick, handleLikeClick);
//     const cardElement = card.generateCard();
//     return cardElement
// }


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
        // тут установка данных пользователя
        console.log('Данные пользователя при загрузке', userData)
        userInfo.setUserInfo(userData)

        // и тут отрисовка карточек
        console.log('изначальный массив карточек', cards)
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
            // получаем данные из атрибута `name` у формы
        const formName = formElement.getAttribute('name')
            // console.log(formName)
            // вот тут в объект записываем под именем формы
        formValidators[formName] = validator;

        validator.enableValidation();
    });
};

enableValidation(configValidation);
console.log(formValidators[formprofile.getAttribute('name')].test())





// const validFormEditProfile = new FormValidator(configValidation, formEditProfile);
// validFormEditProfile.enableValidation();

// const validFormAddCard = new FormValidator(configValidation, formAddCard);
// validFormAddCard.enableValidation();




function callbackEditAvatar(popup, data) {

    popup.renderLoading(true, 'Сохранение...')
    api.refreshAvatar(data.avatar)
        .then((userData) => {
            userInfo.setUserInfo(userData)
            document.querySelector('.profile__avatar').src = userInfo.getUserInfo().userAvatar
            popup.close()
        })
        .catch((err) => {
            console.log(err);
        })
        .finally(() => {
            popup.renderLoading(false, 'Сохранение...')
        });
}


// function renderLoading(isLoading, elementSelector) {
//     if (isLoading) {
//         document.querySelector(elementSelector).textContent = 'Сохранение...'
//     } else {
//         document.querySelector(elementSelector).textContent = 'Сохранить'

//     }
// }

function renderLoadingCreate(isLoading, elementSelector) {
    if (isLoading) {
        document.querySelector(elementSelector).textContent = 'Создание...'
    } else {
        document.querySelector(elementSelector).textContent = 'Создать'

    }
}

function renderDelete(isLoading, elementSelector) {
    if (isLoading) {
        document.querySelector(elementSelector).textContent = 'Удаление...'
    } else {
        document.querySelector(elementSelector).textContent = 'Да'

    }
}


function callbackEditProfile(popup, data) {
    //renderLoading(true, '#edit-profile-button')
    popup.renderLoading(true, 'Сохранение...')
    api.editUserData(data.name, data.job)
        .then((userData) => {

            userInfo.setUserInfo(userData)
            document.querySelector('.profile__name').textContent = userInfo.getUserInfo().userName
            document.querySelector('.profile__about').textContent = userInfo.getUserInfo().userAbout
            popup.close()
        })
        .catch((err) => {
            console.log(err);
        })
        .finally(() => {
            //renderLoading(false, '#edit-profile-button')
            popup.renderLoading(false, 'Сохранение...')
        });

}

document.querySelector('.profile__avatar-wrapper').addEventListener('click', function() {
    popupWithFormEditAvatar.open()
    formValidators[formavatar.getAttribute('name')].hideError()
    formValidators[formavatar.getAttribute('name')].toggleButtonState()

});


//Кнопка открывает попап для изменения данных в профиле 
editButton.addEventListener('click', function() {
    popupWithFormEditProfile.open()
    formValidators[formprofile.getAttribute('name')].hideError()
    formValidators[formprofile.getAttribute('name')].toggleButtonState()
    inputNameEditProfile.value = userInfo.getUserInfo().userName;
    inputJobEditProfile.value = userInfo.getUserInfo().userAbout;
    //validFormEditProfile.


});

//Кнопка открывает попап добавления карточки
buttonOpenPopUpAddCards.addEventListener('click', function() {
    popupWithFormAddCard.open()
        //validFormAddCard.hideError()
        //validFormAddCard.toggleButtonState()
        //formValidators.formcard.hideError()
        //formValidators.formcard.toggleButtonState()
    formValidators[formcard.getAttribute('name')].hideError()
    formValidators[formcard.getAttribute('name')].toggleButtonState()
});