export default class Api {
  constructor(url) {
    this._url = url;
    this._headers = {
      authorization: '7c1a9600-08e1-4003-976b-876c2ce6c6a4',
      'Content-Type': 'application/json'
    }
  }

  getUserInfo() {
    return fetch(`${this._url}/users/me`, {
      headers: this._headers
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
  
        return Promise.reject(`Ошибка: ${res.status}`);
      });
  } 

  getInitialCards() {
    return fetch(`${this._url}/cards`, {
      headers: this._headers
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
  
        return Promise.reject(`Ошибка: ${res.status}`);
      });
  }

}


