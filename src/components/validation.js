export {enableValidation, clearValidation, checkInputValidity, showError, hideError, toggleButtonState, setEventListeners}

function showError(formElement, inputElement, errorMessage, config) {
    const errorElement = formElement.querySelector(`.${inputElement.name}-error`);
    inputElement.classList.add(config.inputErrorClass);
    errorElement.classList.add('popup__input-error_active');
    errorElement.textContent = errorMessage;
}
function hideError(formElement, inputElement, config) {
    const errorElement = formElement.querySelector(`.${inputElement.name}-error`);
    inputElement.classList.remove(config.inputErrorClass);
    errorElement.classList.remove('popup__input-error_active');
    errorElement.textContent = '';
}

function checkInputValidity(formElement, inputElement, config) {

    if (inputElement.validity.patternMismatch) {
        inputElement.setCustomValidity(inputElement.dataset.errorMessage);
    } else {
        inputElement.setCustomValidity('');
    }

    if (!inputElement.validity.valid) {
        showError(formElement, inputElement, inputElement.validationMessage, config);
    } else {
        hideError(formElement, inputElement, config);
    }

    const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
    const buttonElement = formElement.querySelector(config.submitButtonSelector);
    toggleButtonState(inputList, buttonElement, config);
}

function hasInvalidInput (inputList) {
    return inputList.some( function (inputElement) {
        return !inputElement.validity.valid
    })
}

function toggleButtonState (inputList, buttonElement, config) {
    if (hasInvalidInput(inputList)) {
        buttonElement.classList.add(config.inactiveButtonClass)
        buttonElement.disabled = true
    } else {
        buttonElement.classList.remove(config.inactiveButtonClass)
        buttonElement.disabled = false
    }
}

function setEventListeners(formElement, config) {
    const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
    const buttonElement = formElement.querySelector(config.submitButtonSelector);
    toggleButtonState(inputList, buttonElement, config)
    inputList.forEach(function (inputElement) {
        inputElement.addEventListener('input', function () {
            checkInputValidity(formElement, inputElement, config)
            toggleButtonState(inputList, buttonElement, config);
        })
    })
}

function clearValidation(formElement, config) {

    const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
    inputList.forEach(function(inputElement) {
        hideError(formElement, inputElement, config);
    });
}

function enableValidation (config) {
    const formList = Array.from(document.querySelectorAll(config.formSelector))
    formList.forEach( function(formElement) {
        formElement.addEventListener('submit', function(e) {
            e.preventDefault()
        })
        setEventListeners(formElement, config)
    })
}

