export default class UserInfo {
    // Принимает в конструктор объект с селекторами двух элементов: 
    // элемента имени пользователя и элемента информации о себе
    constructor({
      nameElement,
      infoElement
    }) {
      this._nameElement = document.querySelector(nameElement);
      this._infoElement = document.querySelector(infoElement);
    }
  
    //возвращает объект с данными пользователя 
    // этот метод пригодится когда данные пользователя нужно будет подставить в форму при открытии
    getUserInfo() {
      return {
        userName: this._nameElement.textContent, //берёт textContent из разметки
        userInfo: this._infoElement.textContent
      }
    }
  
    //принимает новые данные пользователя и добавляет их на страницу
    setUserInfo(data) {
      this._nameElement.textContent = data.name; // устанавливает textContent в разметку
      this._infoElement.textContent = data.link;
    }
  }