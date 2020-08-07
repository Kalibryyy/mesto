const object = {
  formSelector: '.modal__container',
  inputSelector: '.modal__input',
  submitButtonSelector: '.modal__btn',
  inactiveButtonClass: 'modal__btn_disabled',
  inputErrorClass: 'modal__input_type_error',
  errorClass: 'modal__error_visible',
}

// Функция, которая добавляет класс с ошибкой
const showInputError = (formElement, inputElement, errorMessage, params) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.add(params.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(params.errorClass);
};

// Функция, которая удаляет класс с ошибкой
const hideInputError = (formElement, inputElement, params) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.remove(params.inputErrorClass);
  errorElement.classList.remove(params.errorClass);
  errorElement.textContent = '';
};

// Функция, которая проверяет валидность поля
const isValid = (formElement, inputElement, params) => {
  if (!inputElement.validity.valid) {
      // Если поле не проходит валидацию, покажем ошибку
      showInputError(formElement, inputElement, inputElement.validationMessage, params);
  } else {
      // Если проходит, скроем
      hideInputError(formElement, inputElement, params);
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
const toggleButtonState = (inputList, buttonElement, params) => {
  // Если есть хотя бы один невалидный инпут
  if (hasInvalidInput(inputList)) {
      // сделай кнопку неактивной
      buttonElement.classList.add(params.inactiveButtonClass);
      buttonElement.disabled = true;
  } else {
      // иначе сделай кнопку активной
      buttonElement.classList.remove(params.inactiveButtonClass);
      buttonElement.disabled = false;
  }
};

const setEventListeners = (formElement, params) => {
  // Находим все поля внутри формы,
  // сделаем из них массив методом Array.from
  const inputList = Array.from(formElement.querySelectorAll(params.inputSelector));
  const buttonElement = formElement.querySelector(params.submitButtonSelector);

  toggleButtonState(inputList, buttonElement, params);

  // Обойдём все элементы полученной коллекции
  inputList.forEach((inputElement) => {
      // каждому полю добавим обработчик события input
      inputElement.addEventListener('input', () => {
          // Внутри колбэка вызовем isValid,
          // передав ей форму и проверяемый элемент
          isValid(formElement, inputElement, params);
          toggleButtonState(inputList, buttonElement, params);
      });
  });
};

const enableValidation = (params) => {
  // Найдём все формы с указанным классом в DOM,
  // сделаем из них массив методом Array.from
  const formList = Array.from(document.querySelectorAll(params.formSelector));
  // Переберём полученную коллекцию
  formList.forEach((formElement) => {
      formElement.addEventListener('submit', (evt) => {
          // У каждой формы отменим стандартное поведение
          evt.preventDefault();
      });

      // Для каждой формы вызовем функцию setEventListeners,
      // передав ей элемент формы
      setEventListeners(formElement, params);
  });
};

// Вызовем функцию
enableValidation(object);