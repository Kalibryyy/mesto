export default class Section {
  constructor({
    renderer
  }, containerSelector, initialArray, spinner) {
    this._initialArray = initialArray;
    this._container = document.querySelector(containerSelector);
    this._renderer = renderer;
    this.spinner = spinner;
  }

  renderItems() {
    this.spinner.renderLoading(true);
    
    this._initialArray
      .then((data) => {
        data.forEach(item => {
          this._renderer(item);
        });
      })
      .finally(() => {
        this.spinner.renderLoading(false);
      });
  }

  addItem(element) {
    this._container.prepend(element);
  }
}


