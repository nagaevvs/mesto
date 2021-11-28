export default class RenderLoading {
    constructor(elementSelector, value) {
        this._elementSelector = elementSelector
        this._value = value
    }

    saving(isLoading) {
        if (isLoading) {
            document.querySelector('#refresh-avatar-button').textContent = 'Сохранение...'
        } else {
            document.querySelector('#refresh-avatar-button').textContent = 'Сохранить'
        }
    }

    creating(isLoading) {
        if (isLoading) {
            document.querySelector('#refresh-avatar-button').textContent = 'Cоздание...'
        } else {
            document.querySelector('#refresh-avatar-button').textContent = 'Создать'
        }
    }


}