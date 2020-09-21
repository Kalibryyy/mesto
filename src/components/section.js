export default class Section {
  constructor({
    renderer
  }, containerSelector, initialArray) {
    this._initialArray = initialArray;
    this._container = document.querySelector(containerSelector);
    this._renderer = renderer;
  }

  renderItems () { 
    this._initialArray.forEach(item => { 
      this._renderer(item); 
    }); 
  } 

  addItem(element) {
    this._container.append(element);
  }
}
