import Popup from './Popup.js';

export default class PopupWithConfirm extends Popup {
    constructor(popupSelector, submitAction, closeKey) {
        super(popupSelector, closeKey);
        this._submitAction = submitAction
        this._button = this._popup.querySelector('.popup__button')

        this._submitButtonText = this._button.textContent;
        this._cardId = null
        this._card = null
    }

    renderLoading(isLoading, text1) {
        if (isLoading) {
            this._button.textContent = text1
        } else {
            this._button.textContent = this._submitButtonText
        }
    }


    setData(card, id) {
        this._cardId = id
        this._card = card
    }


    setEventListeners() {
        super.setEventListeners();
        this._button.addEventListener('click', (evt) => {
            evt.preventDefault();
            this._submitAction(this, this._card, this._cardId)

        })
    }


}