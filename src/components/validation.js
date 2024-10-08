import { enableValidationSettings } from '../scripts/index.js';

//Валидация форм
const showInputError = (formElement, inputElement, errorMessage, enableValidationSettings) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

    inputElement.classList.add(enableValidationSettings.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(enableValidationSettings.errorClass);
};

const hideInputError = (formElement, inputElement, enableValidationSettings) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

    inputElement.setCustomValidity("");

    inputElement.classList.remove(enableValidationSettings.inputErrorClass);
    errorElement.classList.remove(enableValidationSettings.errorClass);
    errorElement.textContent = '';
};

const checkInputValidity = (formElement, inputElement, enableValidationSettings) => {
    if(inputElement.validity.patternMismatch) {
        inputElement.setCustomValidity(inputElement.dataset.errorMessage);
    } else {
        inputElement.setCustomValidity("");
    }
    
    if (!inputElement.validity.valid) {
        showInputError(formElement, inputElement, inputElement.validationMessage, enableValidationSettings);
    } else {
        hideInputError(formElement, inputElement, enableValidationSettings);
    }
};

const setEventListeners = (formElement, enableValidationSettings) => {
    const inputList = Array.from(formElement.querySelectorAll(enableValidationSettings.inputSelector));
    const buttonElement = formElement.querySelector(enableValidationSettings.submitButtonSelector);

    toggleButtonState(inputList, buttonElement, enableValidationSettings);

    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', function () {
            checkInputValidity(formElement, inputElement, enableValidationSettings);
            toggleButtonState(inputList, buttonElement, enableValidationSettings);
        });
    });
};

const enableValidation = (enableValidationSettings) => {
    const formList = Array.from(document.querySelectorAll(enableValidationSettings.formSelector));
    
    formList.forEach((formElement) => {
        formElement.addEventListener('submit', function (evt) {
            evt.preventDefault();
        });

        setEventListeners(formElement, enableValidationSettings);
    });
}

function hasInvalidInput (inputList) {
    return inputList.some((inputElement) => {
        return !inputElement.validity.valid
    })
}

function disabledButton (buttonElement, enableValidationSettings) {
    buttonElement.classList.add(enableValidationSettings.inactiveButtonClass);
    buttonElement.disabled = true;
}

function toggleButtonState (inputList, buttonElement, enableValidationSettings) {
    if (hasInvalidInput(inputList)) {
        disabledButton(buttonElement, enableValidationSettings);
    } else {
        buttonElement.classList.remove(enableValidationSettings.inactiveButtonClass);
        buttonElement.disabled = false;
    }
}

function clearValidation (formElement, enableValidationSettings, resetInput = true) {
    const inputList = Array.from(formElement.querySelectorAll(enableValidationSettings.inputSelector));
    const buttonElement = formElement.querySelector(enableValidationSettings.submitButtonSelector);

    inputList.forEach((inputElement) => {
        hideInputError(formElement, inputElement, enableValidationSettings);

        if (resetInput) {
            inputElement.value = "";
        }
    });

    disabledButton(buttonElement, enableValidationSettings);
}


export { enableValidation, clearValidation, toggleButtonState};