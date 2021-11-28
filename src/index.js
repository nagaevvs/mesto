import './pages/index.css';

//Конфиг валидациии форм
import configValidation from './utils/configValidation.js';

//Массив карточек
import initialCards from './utils/initial-сards.js';

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

const avatarSelector = 'profile__avatar'






function handleCardClick(name, link) {
    popupWithImage.open(name, link)
};



function handleLikeClick(data) {
    console.log(data._id)
    if (data.likes.some(e => e._id === this._myId)) {
        console.log('дизлайк')
        api.disLikeCard(data._id)
            .then((res) => {
                console.log(res)


            })
            .catch((err) => {
                console.log(err);
            });



    } else {
        console.log('лайк')
        api.likeCard(data._id)
            .then((res) => {
                console.log(res)



            })
            .catch((err) => {
                console.log(err);
            });


    }



}




function handleDeleteIconClick(card) {
    console.log(card)
    popupWithConfirm.getId(card)
    popupWithConfirm.open()


}



//Инициализация классов


const api = new Api({
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-30',
    headers: {
        authorization: '98aec261-4abe-4fd2-b884-8bf15525cbfc',
        'Content-Type': 'application/json'
    }
});

//Загружаем изначальный масив карточек
api.getInitialCards()
    .then((result) => {
        console.log(result)
        const cardList = new Section({
                items: result,
                renderer: rendererCard
            },
            cardListSection
        );
        cardList.renderItems();

        function rendererCard(item) {
            const card = new Card(item, templateSelector, handleCardClick, handleDeleteIconClick, handleLikeClick);
            //card.test()
            const cardElement = card.generateCard();
            cardList.addItem(cardElement);
        }
    })
    .catch((err) => {
        console.log(err); // выведем ошибку в консоль
    });






//Загружает данные профиля
api.getUserData()
    .then((data) => {
        console.log(data)
        userInfo.setUserInfo(data.name, data.about, data.avatar)
    })
    .catch((err) => {
        console.log(err); // выведем ошибку в консоль
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
            console.log(data)
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


function callbackPopupSubmit(id) {
    api.deleteCard(id)
        .then((data) => {
            console.log(data)
        })
        .catch((err) => {
            console.log(err);
        });
}




function callbackAddCard(data) {
    renderLoadingCreate(true, '#add-card-button')
    api.addNewCard(data.title, data.image)
        .then((data) => {
            console.log(data)
        })
        .catch((err) => {
            console.log(err); // выведем ошибку в консоль
        })
        .finally(() => {
            renderLoadingCreate(false, '#add-card-button')
        });

    //const item = {}
    //item.name = data.title;
    //item.link = data.image;
    //rendererCard(item)
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