export default class Popup {
    constructor(popupSelector, closeKey) {
        this._popup = document.querySelector(popupSelector)
        this._handleEscClose = this._handleEscClose.bind(this)
        this._closeKey = closeKey
    }

    open() {
        this._popup.classList.add('popup_opened');
        document.addEventListener('keydown', this._handleEscClose);
    }

    close() {
        this._popup.classList.remove('popup_opened');
        document.removeEventListener('keydown', this._handleEscClose);
    }

    _handleEscClose(e) {
        if (e.key === this._closeKey) {
            e.preventDefault()
            this.close()
        }
    }

    setEventListeners() {
        this._popup.querySelector('.popup__button-close').addEventListener('click', () => {
            this.close()
        })
        this._popup.addEventListener('mousedown', evt => {
            if (!this._popup.querySelector('.container').contains(evt.target)) {
                this.close()
            }
        });
    }
}