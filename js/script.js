let popUp = document.querySelector('.popup')
let editButton = document.querySelector('.profile__edit-button');
let formElement = document.querySelector('.popup__form')
let nameInput = formElement.querySelector('[name="name"]')
let jobInput = formElement.querySelector('[name="job"]')
let profileInfo = document.querySelector('.profile__info')
let profileName = profileInfo.querySelector('.profile__name')
let profileJob = profileInfo.querySelector('.profile__about')
let buttonClose = document.querySelector('.popup__button-close');

function openPopUp() {

    popUp.classList.add('popup_opened');
    nameInput.setAttribute('value', `${profileName.textContent}`);
    jobInput.setAttribute('value', `${profileJob.textContent}`);
}

function closePopUp() {

    popUp.classList.remove('popup_opened');
}

function formSubmitHandler(evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
    profileName.textContent = nameInput.value
    profileJob.textContent = jobInput.value
    closePopUp()
}

formElement.addEventListener('submit', formSubmitHandler);
editButton.addEventListener('click', openPopUp);
buttonClose.addEventListener('click', closePopUp);