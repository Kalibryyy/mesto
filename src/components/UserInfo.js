export default class UserInfo {
  // Принимает в конструктор объект с селекторами двух элементов: 
  // элемента имени пользователя и элемента информации о себе
  constructor( { nameElement, infoElement}) {
    this._nameElement = document.querySelector(nameElement);
    this._infoElement = document.querySelector(infoElement);
    this._avatar = document.querySelector('.profile__avatar');
  }

  //возвращает объект с данными пользователя 
  // этот метод пригодится когда данные пользователя нужно будет подставить в форму при открытии
  getUserInfo() {
    return {
      userName: this._nameElement.textContent, //берёт textContent из разметки
      userInfo: this._infoElement.textContent,
    }
  }

  //принимает новые данные пользователя и добавляет их на страницу
  setUserInfo(data) {
    if (data.name) {
      this._nameElement.textContent = data.name;
    };
    if (data.about) {
      this._infoElement.textContent = data.about;
    };
    if (data.avatar) {
      this._avatar.style.backgroundImage = `url(${data.avatar})`;
    }
  }
}
