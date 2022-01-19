import Popup from './Popup.js';

export default class PopupWithConfirm extends Popup {
    constructor(popupSelector, submitAction, closeKey) {
        super(popupSelector, closeKey);
        this._submitAction = submitAction
        this._buttonSelector = this._popupSelector.querySelector('.popup__button')
        this._her = []
        this._card = []
    }

    getId(card, id) {
        this._card = card
        this._her = id
    }


    setEventListeners() {
        super.setEventListeners();
        this._buttonSelector.addEventListener('click', (evt) => {
            evt.preventDefault();
            this._submitAction(this._card, this._her)
            this.close()
        })
    }


}