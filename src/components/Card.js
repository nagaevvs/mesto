class Card {
    constructor(data, templateSelector, handleCardClick, handleDeleteIconClick, handleLikeClick) {
        this._data = data
        this._name = data.name;
        this._link = data.link;
        this._likeCounter = data.likes.length
        this._templateSelector = templateSelector
        this._handleCardClick = handleCardClick
        this._ownerID = data.owner._id
        this._handleDeleteIconClick = handleDeleteIconClick
        this._handleLikeClick = handleLikeClick

        this._id = data._id
        this._myId = 'a2bac1258fa18ee519054f71'


    }

    setLikes(array) {
        this._data = array;
    }


    _getTemplate() {
        const cardElement = document
            .querySelector(`${this._templateSelector}`)
            .content
            .querySelector('.element')
            .cloneNode(true);
        return cardElement;
    }

    generateCard() {
        this._element = this._getTemplate();
        this._setEventListeners();
        const elementImage = this._element.querySelector('.element__image');
        elementImage.src = `${this._link}`;
        elementImage.alt = `${this._name}`;
        this._element.querySelector('.element__title').textContent = `${this._name}`;
        this._element.querySelector('.element__counter').textContent = this._likeCounter
        if (this._ownerID === this._myId) {
            this._element.querySelector('.element__delete').removeAttribute('hidden')
        }
        if (this._data.likes.some(e => e._id === this._myId)) {
            console.log('хех')
            this._element.querySelector('.element__like').classList.add('element__like_active')
        }
        return this._element;
    }

    _setEventListeners() {
        this._element.querySelector('.element__like').addEventListener('click', () => {
            this._handleLikeClick(this, this._data, this._element)
        });

        this._element.querySelector('.element__delete').addEventListener('click', () => {
            this._handleDeleteIconClick(this, this._id)
        });

        this._element.querySelector('.element__image').addEventListener('click', () => {
            this._handleCardClick(this._name, this._link);
        });
    }

    _likeCard() {
        this._element.querySelector('.element__like').classList.toggle('element__like_active');

    }

    _deleteCard() {
        this._element.remove();
        this._element = null;
    };
}

export default Card;