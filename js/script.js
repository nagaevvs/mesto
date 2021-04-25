let popUp = document.querySelector('.popup')


let editButton = document.querySelector('.profile__edit-button');

editButton.addEventListener('click', openPopUp);

function openPopUp() {

    popUp.classList.add('popup_opened');
}

let buttonClose = document.querySelector('.popup__button-close');

buttonClose.addEventListener('click', closePopUp);

function closePopUp() {

    popUp.classList.remove('popup_opened');
}