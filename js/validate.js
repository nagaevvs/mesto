const configValidation = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
}


const showInputError = (formElement, inputElement, errorMessage, configValidation) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(`${configValidation.inputErrorClass}`);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(`${configValidation.errorClass}`);
};

const hideInputError = (formElement, inputElement, configValidation) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(`${configValidation.inputErrorClass}`);
  errorElement.classList.remove(`${configValidation.errorClass}`);
  errorElement.textContent = '';
};

const isValid = (formElement, inputElement, configValidation) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, configValidation);
  } else {
    hideInputError(formElement, inputElement, configValidation);
  }
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  })
};

const toggleButtonState = (inputList, buttonElement, configValidation) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(`${configValidation.inactiveButtonClass}`);
    buttonElement.setAttribute('disabled', true);

  } else {
    buttonElement.classList.remove(`${configValidation.inactiveButtonClass}`);
    buttonElement.removeAttribute('disabled');
  }
};

const setEventListeners = (formElement, configValidation) => {
  const inputList = Array.from(formElement.querySelectorAll(`${configValidation.inputSelector}`));
  const buttonElement = formElement.querySelector(`${configValidation.submitButtonSelector}`);
  toggleButtonState(inputList, buttonElement, configValidation);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      isValid(formElement, inputElement, configValidation)
      toggleButtonState(inputList, buttonElement, configValidation);
    });
  });
};

const enableValidation = (configValidation) => {
  const formList = Array.from(document.querySelectorAll(`${configValidation.formSelector}`));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    setEventListeners(formElement, configValidation);
  });
};

enableValidation(configValidation);