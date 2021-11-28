import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(popupSelector, submitAction, closeKey) {
    super(popupSelector, closeKey);
    this._submitAction = submitAction;
    this._formSelector = this._popupSelector.querySelector('.popup__form')
  }

  _getInputValues() {
    this._inputList = this._popupSelector.querySelectorAll('.popup__input')
    this._formValues = {};
    this._inputList.forEach(input => {
      this._formValues[input.name] = input.value;
    });
    return this._formValues;

  }

  setEventListeners() {
    super.setEventListeners();
    this._formSelector.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._submitAction(this._getInputValues())
      this.close()
    })
  }

  close() {
    super.close();
    this._formSelector.reset();

  }


}