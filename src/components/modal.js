import { clearValidation, toggleButtonState } from '../components/validation.js';
import { enableValidationSettings } from '../scripts/index.js';

const editProfileForm = document.forms['edit-profile'];
const titleInput = editProfileForm.elements.name;
const descriptionInput = editProfileForm.elements.description;
const profileContainer = document.querySelector('.profile__info');
const titleProfile = profileContainer.querySelector('.profile__title');
const descriptionProfile = profileContainer.querySelector('.profile__description');

function openPopup (openedPopup) {
    openedPopup.classList.add('popup_is-opened');
    document.addEventListener('keydown', keyHandler);
}

//Закрыть модальное окно
function closePopup (openedPopup) {
    if (openedPopup.classList.contains('popup_is-opened')) {
        openedPopup.classList.remove('popup_is-opened');

        document.removeEventListener('keydown', keyHandler);
    }
}

//Закрыть модальное окно по нажатию на оверлей
function closePopupOverlay(openedPopup) {
    openedPopup.addEventListener('click', function (evt) {
        if (evt.target === openedPopup) {
            closePopup(openedPopup);
        }
    });
}

// Закрыть модальное окно на ESC
function keyHandler (evt) {

    if (evt.key === 'Escape') {
        const openedPopup = document.querySelector('.popup_is-opened');
        
        closePopup(openedPopup);
    }
}


function setListernerPopup (button, popup, callback) {
    button.addEventListener('click', () => {
        openPopup(popup);

        clearValidation(popup, enableValidationSettings);

        if (callback) {
            callback();

            const formElement = popup.querySelector(enableValidationSettings.formSelector);
            const inputList = Array.from(formElement.querySelectorAll(enableValidationSettings.inputSelector));
            const buttonElement = formElement.querySelector(enableValidationSettings.submitButtonSelector);

            toggleButtonState(inputList, buttonElement, enableValidationSettings);
        }
    });
}

function fillInputsPopup () {
    titleInput.value = titleProfile.textContent;
    descriptionInput.value = descriptionProfile.textContent;
}

export { openPopup, closePopup, keyHandler, closePopupOverlay, setListernerPopup, fillInputsPopup };