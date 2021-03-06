export default class Api {
  constructor(options) {
    this._url = options.baseUrl;
    this.headers = options.headers;
  }

  _getInitialCards(path) {
    return fetch(`${this._url}${path}`, {
        headers: this.headers
      })
      .then(this.checkStatus)
  }

  _getUserInfo(path) {
    return fetch(`${this._url}${path}`, {
        headers: this.headers
      })
      .then(this.checkStatus)
  }

  getAppInfo(userDataPath, cardsDataPath) {
    return Promise.all([this._getUserInfo(userDataPath), this._getInitialCards(cardsDataPath)])
  }

  updateInfo(path, data) {
    return fetch(`${this._url}${path}`, {
        method: "PATCH",
        headers: this.headers,
        body: JSON.stringify({
          name: data.name,
          about: data.link
        })
      })
      .then(this.checkStatus)
  }

  put(path, id) {
    return fetch(`${this._url}${path}/${id}`, {
        method: "PUT",
        headers: this.headers
      })
      .then(this.checkStatus)
  }

  delete(path, id) {
    return fetch(`${this._url}${path}/${id}`, {
      method: "DELETE",
      headers: this.headers
    })
      .then(this.checkStatus)
      .then(res => res)
  }

    updateAvatar(path, url) {
      return fetch(`${this._url}${path}`, {
        method: "PATCH",
        headers: this.headers,
        body: JSON.stringify({
          avatar: url
        })
      })
        .then(this.checkStatus)
    }

  addCard(path, formData) {
    return fetch(`${this._url}${path}`, {
        method: "POST",
        headers: this.headers,
        body: JSON.stringify({
          name: formData.name,
          link: formData.link
        })
      })
      .then(this.checkStatus)
  }

  checkStatus(res) {
    return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
  }
}

