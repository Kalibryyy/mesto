import Popup from './Popup.js';

export default class PopupAvatarUpdate extends Popup {
    constructor(popupSelector, {
        handleFormSubmit
      }) {
        super(popupSelector);
        this._handleFormSubmit = handleFormSubmit;
    }
    
}