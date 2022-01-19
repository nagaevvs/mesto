class Card {
    constructor(data, userId, templateSelector, handleCardClick, handleDeleteIconClick, handleLikeClick) {
        this._data = data
        this._name = data.name;
        this._link = data.link;
        this._likeCounter = data.likes.length
        this._templateSelector = templateSelector
        this._handleCardClick = handleCardClick
        this._ownerID = data.owner._id
        this._handleDeleteIconClick = handleDeleteIconClick
        this._handleLikeClick = handleLikeClick
        this._cardId = data._id
        this._userId = userId


    }

    updateLikes(array) {
        this._data = array;
        this._likeButton.classList.toggle('element__like_active');
        this._counter.textContent = array.likes.length
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
        this._likeButton = this._element.querySelector('.element__like')
        this._counter = this._element.querySelector('.element__counter')
        this._cardImage = this._element.querySelector('.element__image');
        this._deleteButton = this._element.querySelector('.element__delete')
        this._title = this._element.querySelector('.element__title')
        this._setEventListeners();

        this._cardImage.src = `${this._link}`;
        this._cardImage.alt = `${this._name}`;
        this._title.textContent = `${this._name}`;
        this._counter.textContent = this._likeCounter

        if (this._ownerID === this._userId) {
            this._deleteButton.removeAttribute('hidden')
        }
        if (this._data.likes.some(e => e._id === this._userId)) {
            this._likeButton.classList.add('element__like_active')
        }
        return this._element;
    }

    _setEventListeners() {
        this._likeButton.addEventListener('click', () => {
            this._handleLikeClick(this, this._data)
        });

        this._deleteButton.addEventListener('click', () => {
            this._handleDeleteIconClick(this, this._cardId)
        });

        this._cardImage.addEventListener('click', () => {
            this._handleCardClick(this._name, this._link);
        });
    }

    _likeCard() {
        this._likeButton.classList.toggle('element__like_active');

    }

    deleteCard() {
        this._element.remove();
        this._element = null;
    };
}

export default Card;