export default class UserInfo {
    constructor({ nameSelector, jobSelector, avatarSelector }) {
        this._userName = document.querySelector(`.${nameSelector}`);
        this._userAbout = document.querySelector(`.${jobSelector}`);
        this._userAvatar = document.querySelector(`.${avatarSelector}`);
        this._id = null
    }

    getUserInfo() {
        return {
            userName: this._userName.textContent,
            userAbout: this._userAbout.textContent,
            userAvatar: this._userAvatar.src,
            userId: this._id
        }
    }




    setUserInfo({ name, about, avatar, _id }) {
        this._userName.textContent = name;
        this._userAbout.textContent = about;
        this._userAvatar.src = avatar;
        this._id = _id;
    }
}