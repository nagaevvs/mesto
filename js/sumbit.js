// Находим форму в DOM
let formElement = document.querySelector('.popup__form') // Воспользуйтесь методом querySelector()
    // Находим поля формы в DOM
let nameInput = formElement.querySelector('[name="name"]') // Воспользуйтесь инструментом .querySelector()
let jobInput = formElement.querySelector('[name="job"]') // Воспользуйтесь инструментом .querySelector()
let profileInfo = document.querySelector('.profile__info')
let profileName = profileInfo.querySelector('.profile__name')
let profileJob = profileInfo.querySelector('.profile__about')

nameInput.setAttribute('value', `${profileName.textContent}`);
jobInput.setAttribute('value', `${profileJob.textContent}`);
// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function formSubmitHandler(evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
    // Так мы можем определить свою логику отправки.
    // О том, как это делать, расскажем позже.
    let profileName = profileInfo.querySelector('.profile__name')
    let profileJob = profileInfo.querySelector('.profile__about')



    console.log(nameInput.value)
    console.log(jobInput.value)

    // Получите значение полей jobInput и nameInput из свойства value

    // Выберите элементы, куда должны быть вставлены значения полей


    console.log(profileName.textContent)
    console.log(profileJob.textContent)
        // Вставьте новые значения с помощью textContent

    profileName.textContent = nameInput.value
    profileJob.textContent = jobInput.value

    closePopUp()
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', formSubmitHandler);