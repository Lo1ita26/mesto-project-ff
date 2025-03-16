function showInputError (formElement, inputElement, errorMessage) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add('form__input_type_error');
    errorElement.textContent = errorMessage;
    errorElement.classList.add('span-popup__active');
  }
  
  function hideInputError (formElement, inputElement) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove('form__input_type_error');
    errorElement.classList.remove('span-popup__active');
    errorElement.textContent = '';
  }
  
  function checkInputValidity (formElement, inputElement) {
    if (inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity(inputElement.dataset.errorMessage);
    } else {  
      inputElement.setCustomValidity("");
    }
    if (!inputElement.validity.valid){
     showInputError(formElement, inputElement, inputElement.validationMessage);
    } else {
      hideInputError(formElement, inputElement);
    }
  }
  
  function setEventListeners (formElement) {
    const inputList = Array.from(formElement.querySelectorAll('.popup__input'));
    const buttonElement = formElement.querySelector('.popup__button')
    toggleButtonState(inputList, buttonElement);
    inputList.forEach((inputElement) => {
     inputElement.addEventListener('input', function () {
     checkInputValidity(formElement, inputElement);
     toggleButtonState(inputList, buttonElement);
   });
    })
  }
  
  function enableValidation () {
    const formList = Array.from(document.querySelectorAll('.popup__form'));
    const openButtons = Array.from(document.querySelectorAll('.open-button'));
    openButtons.forEach((openButton) => {
    openButton.addEventListener('click', () => {
        formList.forEach((formElement) => {
        const formInputs = Array.from(formElement.querySelectorAll('.popup__input'));
        formInputs.forEach((formInput) => {
        checkInputValidity(formElement, formInput)
        })
    })
    })
    })
    formList.forEach((formElement) => {
      formElement.addEventListener('submit', function(evt){
        evt.preventDefault();
      })
      setEventListeners(formElement);
    })
  }          
  
  enableValidation();
  
  function hasInvalidInput (inputList) {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    })
  }
  
  function toggleButtonState (inputList, buttonElement) {
  if (hasInvalidInput(inputList)) {
    buttonElement.disabled = true;
    buttonElement.classList.add('popup__button-disabled')
  } else {
    buttonElement.disabled = false;
    buttonElement.classList.remove('popup__button-disabled');
  }
  }

  export {enableValidation, checkInputValidity}