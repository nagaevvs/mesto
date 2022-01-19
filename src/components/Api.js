export default class Api {
    constructor(options) {
        this._baseUrl = options.baseUrl
        this._headers = options.headers
        this._authorization = this._headers.authorization

    }

    _checkResponse(res) {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    }


    getUserData() {
        return fetch(`${this._baseUrl}users/me`, {
                headers: this._headers
            })
            .then(this._checkResponse);
    }

    getInitialCards() {
        return fetch(`${this._baseUrl}cards`, {
                headers: this._headers
            })
            .then(this._checkResponse);
    }

    editUserData(name, about) {
        return fetch(`${this._baseUrl}users/me`, {
                method: 'PATCH',
                headers: this._headers,
                body: JSON.stringify({
                    name: name,
                    about: about
                })
            })
            .then(this._checkResponse);
    }

    addNewCard(name, link) {
        return fetch(`${this._baseUrl}cards`, {
                method: 'POST',
                headers: this._headers,
                body: JSON.stringify({
                    name: name,
                    link: link
                })
            })
            .then(this._checkResponse);
    }


    deleteCard(cardId) {
        return fetch(`${this._baseUrl}cards/${cardId}`, {
                method: 'DELETE',
                headers: this._headers,
            })
            .then(this._checkResponse);
    }

    likeCard(cardId) {
        return fetch(`${this._baseUrl}cards/likes/${cardId}`, {
                method: 'PUT',
                headers: this._headers,
            })
            .then(this._checkResponse);
    }


    disLikeCard(cardId) {
        return fetch(`${this._baseUrl}cards/likes/${cardId}`, {
                method: 'DELETE',
                headers: this._headers,
            })
            .then(this._checkResponse);
    }


    refreshAvatar(avatar) {
        return fetch(`${this._baseUrl}users/me/avatar`, {
                method: 'PATCH',
                headers: this._headers,
                body: JSON.stringify({
                    avatar: avatar,
                })
            })
            .then(this._checkResponse);
    }

}