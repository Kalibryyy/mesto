export default class Section {
  constructor({
    renderer
  }, containerSelector, initialArray, spinner) {
    this._initialArray = initialArray;
    this._container = document.querySelector(containerSelector);
    this._renderer = renderer;
    this.spinner = spinner;
  }

  renderItems () { 
    this._initialArray.forEach(item => { 
      this._renderer(item); 
    }); 
  } 

  addItem(element) {
    this._container.prepend(element);
  }
}
