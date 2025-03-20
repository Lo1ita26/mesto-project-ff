function showInputError (formElement, inputElement, errorMessage, config) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(config.inputErrorClass); //'form__input_type_error');
    errorElement.textContent = errorMessage;
    errorElement.classList.add(config.errorClass); //'span-popup__active');
  }
  
  function hideInputError (formElement, inputElement, config) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(config.inputErrorClass); //('form__input_type_error');
    errorElement.classList.remove(config.errorClass); //('span-popup__active');
    errorElement.textContent = '';
  }
  
  function checkInputValidity (formElement, inputElement, config) {
    if (inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity(inputElement.dataset.errorMessage);
    } else {  
      inputElement.setCustomValidity("");
    }
    if (!inputElement.validity.valid){
     showInputError(formElement, inputElement, inputElement.validationMessage, config);
    } else {
      hideInputError(formElement, inputElement, config);
    }
  }
  
  function setEventListeners (formElement, config) {  //добавила config
    const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));// Array.from(formElement.querySelectorAll('.popup__input'));
    const buttonElement = formElement.querySelector(config.submitButtonSelector) //formElement.querySelector('.popup__button')
    toggleButtonState(inputList, buttonElement, config);
    inputList.forEach((inputElement) => {
     inputElement.addEventListener('input', function () {
     checkInputValidity(formElement, inputElement, config);
     toggleButtonState(inputList, buttonElement, config);
   });
    })
  }

  function hasInvalidInput (inputList) {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    })
  }

  function toggleButtonState (inputList, buttonElement, config) {
    if (hasInvalidInput(inputList)) {
      buttonElement.disabled = true;
      buttonElement.classList.add(config.inactiveButtonClass); //('popup__button-disabled')
    } else {
      buttonElement.disabled = false;
      buttonElement.classList.remove(config.inactiveButtonClass); //('popup__button-disabled');
    }
    }

  const enableValidation = config => { 
    const formList = document.querySelectorAll(config.formSelector);
    formList.forEach((formElement) => { 
      formElement.addEventListener('submit', function(evt) { 
        evt.preventDefault() 
      }) 
      setEventListeners(formElement, config); 
   })
 }

 function clearValidation(formElement, config) {
  const inputList = Array.from(formElement.querySelectorAll('.popup__input'));
  const buttonSubmit = formElement.querySelector('.popup__button');
  toggleButtonState(inputList, buttonSubmit, config);
  inputList.forEach(inputSelector => {
    hideInputError(formElement, inputSelector, config)
  })
 }

  export {enableValidation, clearValidation}