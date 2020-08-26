export class FormValidator {
    constructor(params, formElement) {
        this._formElement = formElement;
        this._inputSelector = params.inputSelector;
        this._submitButtonSelector = params.submitButtonSelector;
        this._inactiveButtonClass = params.inactiveButtonClass;
        this._inputErrorClass = params.inputErrorClass;
        this._errorClass = params.errorClass;
    }

    // Функция, которая добавляет класс с ошибкой
    _showInputError = (inputElement, errorMessage) => {
        const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
        inputElement.classList.add(this._inputErrorClass);
        errorElement.textContent = errorMessage;
        errorElement.classList.add(this._errorClass);
    };

    // Функция, которая удаляет класс с ошибкой
    _hideInputError = (inputElement) => {
        const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
        inputElement.classList.remove(this._inputErrorClass);
        errorElement.classList.remove(this._errorClass);
        errorElement.textContent = '';
    };

    // Функция, которая проверяет валидность поля
    _isValid = (inputElement) => {
        if (!inputElement.validity.valid) {
            // Если поле не проходит валидацию, покажем ошибку
            this._showInputError(inputElement, inputElement.validationMessage);
        } else {
            // Если проходит, скроем
            this._hideInputError(inputElement);
        }
    };

    // Функция принимает массив полей
    _hasInvalidInput = (inputList) => {
        // проходим по этому массиву методом some
        return inputList.some((inputElement) => {
            // Если поле не валидно, колбэк вернёт true
            // Обход массива прекратится и вся фунцкция
            // hasInvalidInput вернёт true

            return !inputElement.validity.valid;
        })
    };

    // Функция принимает массив полей ввода
    // и элемент кнопки, состояние которой нужно менять
    _toggleButtonState = (inputList, buttonElement) => {
        // Если есть хотя бы один невалидный инпут
        if (this._hasInvalidInput(inputList)) {
            // сделай кнопку неактивной
            buttonElement.classList.add(this._inactiveButtonClass);
            buttonElement.disabled = true;
        } else {
            // иначе сделай кнопку активной
            buttonElement.classList.remove(this._inactiveButtonClass);
            buttonElement.disabled = false;
        }
    };

    _setEventListeners = () => {
        // Находим все поля внутри формы,
        // сделаем из них массив методом Array.from
        const inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
        const buttonElement = this._formElement.querySelector(this._submitButtonSelector);

        this._toggleButtonState(inputList, buttonElement);

        // Обойдём все элементы полученной коллекции
        inputList.forEach((inputElement) => {
            // каждому полю добавим обработчик события input
            inputElement.addEventListener('input', () => {
                // Внутри колбэка вызовем isValid,
                // передав ей форму и проверяемый элемент
                this._isValid(inputElement);
                this._toggleButtonState(inputList, buttonElement);
            });
        });
    };

    enableValidation() {
        this._formElement.addEventListener('submit', (evt) => {
            evt.preventDefault();
        });

        this._setEventListeners();
    };
}