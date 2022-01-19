import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
    constructor(popupSelector, closeKey) {
        super(popupSelector, closeKey);
        this._popupImage = this._popup.querySelector('.popup__image');
        this._popupFigcaption = this._popup.querySelector('.popup__figcaption');
    }

    open(name, link) {
        super.open()
        this._popupImage.src = link;
        this._popupImage.alt = name;
        this._popupFigcaption.textContent = name;
    }

}