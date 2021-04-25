let popUp = document.querySelector('.popup')
console.log(popUp.classList);

let editButton = document.querySelector('.profile__edit-button');


editButton.addEventListener('click', openPopUp);


function openPopUp() {
    console.log('работает')
    popUp.classList.add('popup_opened');
}



let buttonClose = document.querySelector('.popup__button-close');

buttonClose.addEventListener('click', closePopUp);


function closePopUp() {
    console.log('работает')
    popUp.classList.remove('popup_opened');
}