export default class Api {
    constructor(options) {
        this._baseUrl = options.baseUrl
        this._headers = options.headers
        this._authorization = this._headers.authorization

    }

    getUserData() {
        return fetch(`${this._baseUrl}users/me`, {
                headers: {
                    authorization: `${this._headers.authorization}`
                }
            })
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(`Ошибка: ${res.status}`);
            });
    }

    getInitialCards() {
        return fetch(`${this._baseUrl}cards`, {
                headers: {
                    authorization: `${this._headers.authorization}`
                }
            })
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(`Ошибка: ${res.status}`);
            });
    }

    editUserData(name, about) {
        return fetch(`${this._baseUrl}users/me`, {
                method: 'PATCH',
                headers: {
                    authorization: `${this._headers.authorization}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: name,
                    about: about
                })
            })
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(`Ошибка: ${res.status}`);
            });
    }

    addNewCard(name, link) {
        return fetch(`${this._baseUrl}cards`, {
                method: 'POST',
                headers: {
                    authorization: `${this._headers.authorization}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: name,
                    link: link
                })
            })
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(`Ошибка: ${res.status}`);
            });
    }


    deleteCard(cardId) {
        return fetch(`${this._baseUrl}cards/${cardId}`, {
                method: 'DELETE',
                headers: {
                    authorization: `${this._headers.authorization}`,
                    'Content-Type': 'application/json'
                },
            })
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(`Ошибка: ${res.status}`);
            });
    }

    likeCard(cardId) {
        return fetch(`${this._baseUrl}cards/likes/${cardId}`, {
                method: 'PUT',
                headers: {
                    authorization: `${this._headers.authorization}`,
                    'Content-Type': 'application/json'
                },
            })
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(`Ошибка: ${res.status}`);
            });
    }


    disLikeCard(cardId) {
        return fetch(`${this._baseUrl}cards/likes/${cardId}`, {
                method: 'DELETE',
                headers: {
                    authorization: `${this._headers.authorization}`,
                    'Content-Type': 'application/json'
                },
            })
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(`Ошибка: ${res.status}`);
            });
    }


    refreshAvatar(avatar) {
        return fetch(`${this._baseUrl}users/me/avatar`, {
                method: 'PATCH',
                headers: {
                    authorization: `${this._headers.authorization}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    avatar: avatar,
                })
            })
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(`Ошибка: ${res.status}`);
            });
    }

}