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
    const openedPopup = document.querySelector('.popup_is-opened');

    if (evt.key === 'Escape') {
        closePopup(openedPopup);
    }
}

export { openPopup, closePopup, keyHandler, closePopupOverlay };