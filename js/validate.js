const showInputError = (formElement, inputElement, errorMessage, objectSet) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(`${objectSet.inputErrorClass}`);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(`${objectSet.errorClass}`);
};

const hideInputError = (formElement, inputElement, objectSet) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(`${objectSet.inputErrorClass}`);
  errorElement.classList.remove(`${objectSet.errorClass}`);
  errorElement.textContent = '';
};

const isValid = (formElement, inputElement, objectSet) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, objectSet);
  } else {
    hideInputError(formElement, inputElement, objectSet);
  }
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  })
};

const toggleButtonState = (inputList, buttonElement, objectSet) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(`${objectSet.inactiveButtonClass}`);
    buttonElement.setAttribute('disabled', true);

  } else {
    buttonElement.classList.remove(`${objectSet.inactiveButtonClass}`);
    buttonElement.removeAttribute('disabled');
  }
};

const setEventListeners = (formElement, objectSet) => {
  const inputList = Array.from(formElement.querySelectorAll(`${objectSet.inputSelector}`));
  const buttonElement = formElement.querySelector(`${objectSet.submitButtonSelector}`);
  toggleButtonState(inputList, buttonElement, objectSet);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      isValid(formElement, inputElement, objectSet)
      toggleButtonState(inputList, buttonElement, objectSet);
    });
  });
};

const enableValidation = (objectSet) => {
  const formList = Array.from(document.querySelectorAll(`${objectSet.formSelector}`));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    setEventListeners(formElement, objectSet);
  });
};

enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
});