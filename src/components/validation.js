export {enableValidation, clearValidation}

/**
 * Показывает сообщение об ошибке валидации для конкретного поля ввода.
 * @param {HTMLFormElement} formElement - Форма, содержащая поле.
 * @param {HTMLInputElement} inputElement - Поле ввода с ошибкой.
 * @param {string} errorMessage - Сообщение об ошибке.
 * @param {Object} config - Конфигурация с CSS-классами.
 */
function showError(formElement, inputElement, errorMessage, config) {
    const errorElement = formElement.querySelector(`.${inputElement.name}-error`)
    inputElement.classList.add(config.inputErrorClass)
    errorElement.classList.add('popup__input-error_active')
    errorElement.textContent = errorMessage
}

/**
 * Скрывает сообщение об ошибке и сбрасывает стили поля ввода.
 * @param {HTMLFormElement} formElement - Форма, содержащая поле.
 * @param {HTMLInputElement} inputElement - Поле ввода.
 * @param {Object} config - Конфигурация с CSS-классами.
 */
function hideError(formElement, inputElement, config) {
    const errorElement = formElement.querySelector(`.${inputElement.name}-error`)
    inputElement.classList.remove(config.inputErrorClass)
    errorElement.classList.remove('popup__input-error_active')
    errorElement.textContent = ''
}

/**
 * Проверяет валидность введённых данных в конкретном поле формы.
 * При ошибке отображает сообщение, иначе скрывает.
 * @param {HTMLFormElement} formElement - Форма, содержащая поле.
 * @param {HTMLInputElement} inputElement - Проверяемое поле ввода.
 * @param {Object} config - Конфигурация с селекторами и классами.
 */
function checkInputValidity(formElement, inputElement, config) {

    if (inputElement.validity.patternMismatch) {
        inputElement.setCustomValidity(inputElement.dataset.errorMessage)
    } else {
        inputElement.setCustomValidity('')
    }

    if (!inputElement.validity.valid) {
        showError(formElement, inputElement, inputElement.validationMessage, config)
    } else {
        hideError(formElement, inputElement, config)
    }

    const inputList = Array.from(formElement.querySelectorAll(config.inputSelector))
    const buttonElement = formElement.querySelector(config.submitButtonSelector)
    toggleButtonState(inputList, buttonElement, config)
}

/**
 * Проверяет, есть ли невалидные поля среди переданных.
 * @param {HTMLInputElement[]} inputList - Массив полей формы.
 * @returns {boolean} `true` если хотя бы одно поле невалидно.
 */
function hasInvalidInput (inputList) {
    return inputList.some( function (inputElement) {
        return !inputElement.validity.valid
    })
}

/**
 * Активирует или деактивирует кнопку отправки формы в зависимости от валидности полей.
 * @param {HTMLInputElement[]} inputList - Список всех полей формы.
 * @param {HTMLButtonElement} buttonElement - Кнопка отправки формы.
 * @param {Object} config - Конфигурация с CSS-классами.
 */
function toggleButtonState (inputList, buttonElement, config) {
    if (hasInvalidInput(inputList)) {
        buttonElement.classList.add(config.inactiveButtonClass)
        buttonElement.disabled = true
    } else {
        buttonElement.classList.remove(config.inactiveButtonClass)
        buttonElement.disabled = false
    }
}

/**
 * Назначает обработчики событий на все поля формы.
 * При изменении значений поля проверяются и обновляется состояние кнопки.
 * @param {HTMLFormElement} formElement - Объект формы.
 * @param {Object} config - Конфигурация с селекторами и классами.
 */
function setEventListeners(formElement, config) {
    const inputList = Array.from(formElement.querySelectorAll(config.inputSelector))
    const buttonElement = formElement.querySelector(config.submitButtonSelector)
    toggleButtonState(inputList, buttonElement, config)
    inputList.forEach(function (inputElement) {
        inputElement.addEventListener('input', function () {
            checkInputValidity(formElement, inputElement, config)
            toggleButtonState(inputList, buttonElement, config)
        })
    })
}

/**
 * Очищает ошибки и стили валидации для всех полей формы.
 * @param {HTMLFormElement} formElement - Форма, из которой очищаются ошибки.
 * @param {Object} config - Конфигурация с CSS-классами.
 */
function clearValidation(formElement, config) {

    const inputList = Array.from(formElement.querySelectorAll(config.inputSelector))
    inputList.forEach(function(inputElement) {
        hideError(formElement, inputElement, config)
    })
}

/**
 * Включает валидацию для всех форм на странице, указанных в конфигурации.
 * @param {Object} config - Конфигурация с селекторами и классами.
 */
function enableValidation (config) {
    const formList = Array.from(document.querySelectorAll(config.formSelector))
    formList.forEach( function(formElement) {
        formElement.addEventListener('submit', function(e) {
            e.preventDefault()
        })
        setEventListeners(formElement, config)
    })
}

