import '../pages/index.css';
import { openPopup, closePopup, closePopupOverlay } from '../components/modal.js';
import { createCard, deleteCard, likeCard } from '../components/card.js';
import initialCards from '../components/cards.js';

//Темплейт карточки
const container = document.querySelector('.content');
const buttonClosePopup = document.querySelectorAll('.popup__close');
const cardContainer = container.querySelector('.places__list');
const buttonEditProfile = document.querySelector('.profile__edit-button');
const buttonAddCard = document.querySelector('.profile__add-button');
const popupEdit = document.querySelector('.popup_type_edit');
const popupAdd = document.querySelector('.popup_type_new-card');
const profileContainer = document.querySelector('.profile__info');
const titleProfile = profileContainer.querySelector('.profile__title');
const descriptionProfile = profileContainer.querySelector('.profile__description');
const form = document.forms['edit-profile'];
const titleInput = form.elements.name;
const descriptionInput = form.elements.description;
const addCardForm = document.forms['new-place'];
const nameInput = addCardForm.elements['place-name'];
const urlInput = addCardForm.elements.link;
const imageTypePopup = document.querySelector('.popup_type_image');
const imagePopup = imageTypePopup.querySelector('.popup__image');
const imageCaptionPopup = imageTypePopup.querySelector('.popup__caption');


//Вывести карточки на страницу
initialCards.forEach( element => {
    const card = createCard (element.name, element.link, deleteCard, likeCard, viewImage);
    cardContainer.append(card);
});

//Открыть модальное окно профиля
buttonEditProfile.addEventListener('click', function () {
    openPopup(popupEdit);

    titleInput.value = titleProfile.textContent;
    descriptionInput.value = descriptionProfile.textContent;
});

//Закрыть модальное окно профиля при нажатии на оверлей
closePopupOverlay(popupEdit);

//Открыть модальное окно добавления карточек
buttonAddCard.addEventListener('click', function () {
    openPopup(popupAdd);
});

//Закрыть модальное окно добавления карточек при нажатии на оверлей
closePopupOverlay(popupAdd);

//Закрыть модальное окно
buttonClosePopup.forEach((button) => {
    button.addEventListener('click', () => {
        const openedPopup = button.closest('.popup_is-opened');
        closePopup(openedPopup);
    });
});

//Функция для отправки изменений в профиль
function handleFormSumbit (evt) {
    titleProfile.textContent = titleInput.value;
    descriptionProfile.textContent = descriptionInput.value;

    evt.preventDefault();
    
    const openedPopup = evt.target.closest('.popup_is-opened');
    closePopup(openedPopup);
}
//Отправка изменений в профиль
form.addEventListener('submit', handleFormSumbit);

//Создание новой карточки
addCardForm.addEventListener('submit', function (evt) {
    const card = createCard(nameInput.value, urlInput.value, deleteCard, likeCard, viewImage);

    evt.preventDefault();

    cardContainer.prepend(card);
    addCardForm.reset();

    const openedPopup = evt.target.closest('.popup_is-opened');
    closePopup(openedPopup);
});

//Функция просмотра изображения
function viewImage (url, title) {
    imagePopup.src = url;
    imageCaptionPopup.textContent = title;
    imageCaptionPopup.alt = title;

    openPopup(imageTypePopup);
}

//Закрыть модальное окно просмотра изображения при нажатии на оверлей
closePopupOverlay(imageTypePopup);