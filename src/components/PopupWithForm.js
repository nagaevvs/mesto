import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
    constructor(popupSelector, submitAction, closeKey) {
        super(popupSelector, closeKey);
        this._submitAction = submitAction;
        this._form = this._popup.querySelector('.popup__form')
        this._submitButton = this._form.querySelector('.popup__button')
        this._submitButtonText = this._submitButton.textContent;
    }

    renderLoading(isLoading, text1) {
        if (isLoading) {
            this._submitButton.textContent = text1
        } else {
            this._submitButton.textContent = this._submitButtonText
        }
    }


    _getInputValues() {
        this._inputList = this._popup.querySelectorAll('.popup__input')
        this._formValues = {};
        this._inputList.forEach(input => {
            this._formValues[input.name] = input.value;
        });
        return this._formValues;
    }

    setEventListeners() {
        super.setEventListeners();
        this._form.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._submitAction(this, this._getInputValues())

        })
    }

    close() {
        super.close();
        this._form.reset();

    }


}