export default class Api {
    constructor(options) {
        this._baseUrl = options.baseUrl
        this._headers = options.headers
        this._authorization = this._headers.authorization
    }

    test3() {

    }



    getUserData() {
        return fetch('https://mesto.nomoreparties.co/v1/cohort-30/users/me', {
                headers: {
                    authorization: '98aec261-4abe-4fd2-b884-8bf15525cbfc'
                }
            })
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
                // если ошибка, отклоняем промис
                return Promise.reject(`Ошибка: ${res.status}`);
            });
    }


    getInitialCards() {
        return fetch('https://mesto.nomoreparties.co/v1/cohort-30/cards', {
                headers: {
                    authorization: '98aec261-4abe-4fd2-b884-8bf15525cbfc'
                }
            })
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
                // если ошибка, отклоняем промис
                return Promise.reject(`Ошибка: ${res.status}`);
            });
    }


    editUserData(name, about) {
        return fetch('https://mesto.nomoreparties.co/v1/cohort-30/users/me', {
                method: 'PATCH',
                headers: {
                    authorization: '98aec261-4abe-4fd2-b884-8bf15525cbfc',
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
                // если ошибка, отклоняем промис
                return Promise.reject(`Ошибка: ${res.status}`);
            });
    }


    addNewCard(name, link) {
        return fetch('https://mesto.nomoreparties.co/v1/cohort-30/cards', {
                method: 'POST',
                headers: {
                    authorization: '98aec261-4abe-4fd2-b884-8bf15525cbfc',
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
                // если ошибка, отклоняем промис
                return Promise.reject(`Ошибка: ${res.status}`);
            });
    }



    deleteCard(cardId) {
        return fetch(`https://mesto.nomoreparties.co/v1/cohort-30/cards/${cardId}`, {
                method: 'DELETE',
                headers: {
                    authorization: '98aec261-4abe-4fd2-b884-8bf15525cbfc',
                    'Content-Type': 'application/json'
                },
            })
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
                // если ошибка, отклоняем промис
                return Promise.reject(`Ошибка: ${res.status}`);
            });
    }

    likeCard(cardId) {
        return fetch(`https://mesto.nomoreparties.co/v1/cohort-30/cards/likes/${cardId}`, {
                method: 'PUT',
                headers: {
                    authorization: '98aec261-4abe-4fd2-b884-8bf15525cbfc',
                    'Content-Type': 'application/json'
                },
            })
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
                // если ошибка, отклоняем промис
                return Promise.reject(`Ошибка: ${res.status}`);
            });
    }


    disLikeCard(cardId) {
        return fetch(`https://mesto.nomoreparties.co/v1/cohort-30/cards/likes/${cardId}`, {
                method: 'DELETE',
                headers: {
                    authorization: '98aec261-4abe-4fd2-b884-8bf15525cbfc',
                    'Content-Type': 'application/json'
                },
            })
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
                // если ошибка, отклоняем промис
                return Promise.reject(`Ошибка: ${res.status}`);
            });
    }


    refreshAvatar(avatar) {
        return fetch(`https://mesto.nomoreparties.co/v1/cohort-30/users/me/avatar`, {
                method: 'PATCH',
                headers: {
                    authorization: '98aec261-4abe-4fd2-b884-8bf15525cbfc',
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
                // если ошибка, отклоняем промис
                return Promise.reject(`Ошибка: ${res.status}`);
            });
    }








}