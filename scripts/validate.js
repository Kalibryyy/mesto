const object = {
    formSelector: '.modal__container', 
    inputSelector: '.modal__input',
    submitButtonSelector: '.modal__btn',
    inactiveButtonClass: 'modal__btn_disabled',
    inputErrorClass: 'modal__input_type_error',
    errorClass: 'modal__error_visible',
} 

// Функция, которая добавляет класс с ошибкой
const showInputError = (formElement, inputElement, errorMessage) => {
const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
inputElement.classList.add(object.inputErrorClass);
errorElement.textContent = errorMessage;
errorElement.classList.add(object.errorClass);
};

// Функция, которая удаляет класс с ошибкой
const hideInputError = (formElement, inputElement) => {
const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
inputElement.classList.remove(object.inputErrorClass);
errorElement.classList.remove(object.errorClass);
errorElement.textContent = '';
};

// Функция, которая проверяет валидность поля
const isValid = (formElement, inputElement) => {
if (!inputElement.validity.valid) {
  // Если поле не проходит валидацию, покажем ошибку
  showInputError(formElement, inputElement, inputElement.validationMessage);
    } else {
  // Если проходит, скроем
  hideInputError(formElement, inputElement);
    }
};

  // Функция принимает массив полей
const hasInvalidInput = (inputList) => {
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
const toggleButtonState = (inputList, buttonElement) => {
// Если есть хотя бы один невалидный инпут
    if (hasInvalidInput(inputList)) {
  // сделай кнопку неактивной
    buttonElement.classList.add(object.inactiveButtonClass);
    } else {
      // иначе сделай кнопку активной
    buttonElement.classList.remove(object.inactiveButtonClass);
  
    }
};

const setEventListeners = (formElement) => {
// Находим все поля внутри формы,
// сделаем из них массив методом Array.from
const inputList = Array.from(formElement.querySelectorAll(object.inputSelector));
const buttonElement = formElement.querySelector(object.submitButtonSelector);

toggleButtonState(inputList, buttonElement);

// Обойдём все элементы полученной коллекции
inputList.forEach((inputElement) => {
  // каждому полю добавим обработчик события input
  inputElement.addEventListener('input', () => {
    // Внутри колбэка вызовем isValid,
    // передав ей форму и проверяемый элемент
    isValid(formElement, inputElement);
    toggleButtonState(inputList, buttonElement);
  });
});
};

const enableValidation = () => {
// Найдём все формы с указанным классом в DOM,
// сделаем из них массив методом Array.from
const formList = Array.from(document.querySelectorAll(object.formSelector));
// Переберём полученную коллекцию
formList.forEach((formElement) => {
  formElement.addEventListener('submit', (evt) => {
    // У каждой формы отменим стандартное поведение
    evt.preventDefault();
  });

  // Для каждой формы вызовем функцию setEventListeners,
  // передав ей элемент формы
  setEventListeners(formElement, object);
});
};

// Вызовем функцию
enableValidation(object);