let formElement = document.querySelector('.popup__form')
let nameInput = formElement.querySelector('[name="name"]')
let jobInput = formElement.querySelector('[name="job"]')
let profileInfo = document.querySelector('.profile__info')
let profileName = profileInfo.querySelector('.profile__name')
let profileJob = profileInfo.querySelector('.profile__about')

nameInput.setAttribute('value', `${profileName.textContent}`);
jobInput.setAttribute('value', `${profileJob.textContent}`);

function formSubmitHandler(evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
    let profileName = profileInfo.querySelector('.profile__name')
    let profileJob = profileInfo.querySelector('.profile__about')
    profileName.textContent = nameInput.value
    profileJob.textContent = jobInput.value
    closePopUp()
}

formElement.addEventListener('submit', formSubmitHandler);