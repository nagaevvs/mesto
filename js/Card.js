class Card {
  constructor(data, templateSelector, viewFullScreenImage) {
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector
    this._viewFullScreenImage = viewFullScreenImage
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
    this._element.querySelector('.element__image').src = `${this._link}`;
    this._element.querySelector('.element__image').alt = `${this._name}`;
    this._element.querySelector('.element__title').textContent = `${this._name}`;
    return this._element;
  }

  _setEventListeners() {
    this._element.querySelector('.element__like').addEventListener('click', () => {
      this._likeCard();
    });

    this._element.querySelector('.element__delete').addEventListener('click', () => {
      this._deleteCard();
    });

    this._element.querySelector('.element__image').addEventListener('click', () => {
      this._viewFullScreenImage(this._name, this._link);
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