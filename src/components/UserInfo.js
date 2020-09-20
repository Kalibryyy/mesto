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

  setInitialUserInfo(initialUserInfo) {
    initialUserInfo
      .then(user => {
        this._nameElement.textContent = user.name; // устанавливает textContent в разметку
        this._infoElement.textContent = user.about;
        this._avatar.style.backgroundImage = `url(${user.avatar})`;
      });
  }

  //принимает новые данные пользователя и добавляет их на страницу
  setUserInfo(data) {
    this._nameElement.textContent = data.name; // устанавливает textContent в разметку
    this._infoElement.textContent = data.about;
    this._avatar.style.backgroundImage = `url(${data.avatar})`;
  }
}
