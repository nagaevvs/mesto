import { openPopUp, popUpViewImage, imageForPopUp, figcaptionForPopUp } from './index.js'

class Card {
  constructor(data) {
    this._name = data.name;
    this._link = data.link;

  }

  _getTemplate() {
    const cardElement = document
      .querySelector('#element')
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
      this._viewFullScreeImage();
    });
  }

  _likeCard() {
    this._element.querySelector('.element__like').classList.toggle('element__like_active');

  }

  _deleteCard() {
    this._element.remove()
  };

  _viewFullScreeImage() {
    openPopUp(popUpViewImage);
    imageForPopUp.src = `${this._link}`;
    imageForPopUp.alt = `${this._name}`;
    figcaptionForPopUp.textContent = `${this._name}`;
  };

}

export default Card;