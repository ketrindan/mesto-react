import apiConfig from "./utils";

class Api {
  constructor (config) {
    this._baseUrl = config.baseUrl;
    this._headers = config.headers;
  }


  _serverResponse(res) {
    if (res.ok) {
      return res.json();
    }

    return Promise.reject(new Error(`Ошибка: ${res.status}`))
  }

  getUserData() {
    return fetch(`${this._baseUrl}/users/me`, {headers: this._headers})
    .then(res => this._serverResponse(res))
  }


  getCards() {
    return fetch(`${this._baseUrl}/cards`, {headers: this._headers})
    .then(res => this._serverResponse(res))
  }


  setUserData(name, job) {
    return fetch(`${this._baseUrl}/users/me`,
      {method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({name: name, about: job})
    })
    .then(res => this._serverResponse(res))
  }


  addNewCard(place, link) {
    return fetch(`${this._baseUrl}/cards`,
      {method: 'POST',
      headers: this._headers,
      body: JSON.stringify({name: place, link: link})
    })
    .then(res => this._serverResponse(res))
  }


  deleteCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}`,
      {method: 'DELETE',
      headers: this._headers,
    })
    .then(res => this._serverResponse(res))
  }


  _putLike(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`,
      {method: 'PUT',
      headers: this._headers,
    })
    .then(res => this._serverResponse(res))
  }


  _deleteLike(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`,
      {method: 'DELETE',
      headers: this._headers,
    })
    .then(res => this._serverResponse(res))
  }


  changeLikeCardStatus(cardId, isLiked) {
    if (isLiked) {
      return this._deleteLike(cardId)
    } else {
      return this._putLike(cardId)
    }
  }


  changeAvatar(avatar) {
    return fetch(`${this._baseUrl}/users/me/avatar`,
    {method: 'PATCH',
    headers: this._headers,
    body: JSON.stringify({avatar: avatar})
    })
    .then(res => this._serverResponse(res))
  }
}

const api = new Api(apiConfig);

export default api;