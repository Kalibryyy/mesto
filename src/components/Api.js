export default class Api {
  constructor(options) {
    this._url = options.baseUrl;
    this.headers = options.headers;
  }

  getInitialCards(path) {
    return fetch(`${this._url}${path}`, {
        headers: this.headers
      })
      .then(this.checkStatus)
      .catch(this.showError);
  }

  getUserInfo(path) {
    return fetch(`${this._url}${path}`, {
        headers: this.headers
      })
      .then(this.checkStatus)
      .catch(this.showError);
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
      .catch(this.showError);
  }

  put(path, id) {
    return fetch(`${this._url}${path}/${id}`, {
        method: "PUT",
        headers: this.headers
      })
      .then(this.checkStatus)
      .catch(this.showError);
  }

  delete(path, id) {
    return fetch(`${this._url}${path}/${id}`, {
      method: "DELETE",
      headers: this.headers
    })
      .then(this.checkStatus)
      .then(res => res)
      .catch(this.showError);
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
        .catch(this.showError);
    }

//   api.delete('cards', cardItem.id)
//   .then((res) => {
//     console.log(res);
    
//     card._handleCardRemove();
//   })
//   .catch(err => console.log(err));

//   fetch('https://mesto.nomoreparties.co/v1/cohort-15/cards/5f6739ec82b7ae00116466bf', {
//     method: "DELETE",
//     headers: {
//     authorization: '4b693f44-f60e-4f4e-bfd2-2bb476e7515d'
//     }
//   })

  addCard(path, formData) {
    return fetch(`https://mesto.nomoreparties.co/v1/cohort-15/${path}`, {
        method: "POST",
        headers: this.headers,
        body: JSON.stringify({
          name: formData.name,
          link: formData.link
        })
      })
      .then(this.checkStatus)
      .catch(this.showError);
  }

  checkStatus(res) {
    return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
  }

  showError(err) {
    return console.log(err);
  }
}

// getInitialCards() {
//     fetch('https://mesto.nomoreparties.co/v1/cohort-15/cards', {
//     headers: {
//     authorization: '4b693f44-f60e-4f4e-bfd2-2bb476e7515d'
//   }
// })
// .then(res => res.json())
// .then((result) => {
//   console.log(result);
// });

// getInitialCards() {
//   return fetch('https://mesto.nomoreparties.co/v1/cohort-15/cards', {
//     headers: {
//       authorization: '4b693f44-f60e-4f4e-bfd2-2bb476e7515d'
//     }
//   })
//     .then(res => {
//       if (res.ok) {
//         return res.json();
//       }
//     });
// }

// fetch('https://mesto.nomoreparties.co/v1/cohort-15/users/me', {
//     method: "PATCH",
//     headers: {
//         authorization: '4b693f44-f60e-4f4e-bfd2-2bb476e7515d',
//         'Content-Type': 'application/json'
//       },
//     body: JSON.stringify({
//       name: 'да всё что угодно только иди на сервер',
//       about: 'уходи говорю'
//     })
//   })


