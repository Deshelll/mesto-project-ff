import '../pages/index.css';
import { openPopup, closePopup, closePopupOverlay } from '../components/modal.js';
import { createCard, deleteCard, likeCard } from '../components/card.js';
import {enableValidationSettings, enableValidation, clearValidation} from '../components/validation.js';
import {getUser, getCards, patchProfile, postCard, patchImageProfile} from '../components/api.js';

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
const editProfileForm = document.forms['edit-profile'];
const titleInput = editProfileForm.elements.name;
const descriptionInput = editProfileForm.elements.description;
const addCardForm = document.forms['new-place'];
const nameInput = addCardForm.elements['place-name'];
const urlInput = addCardForm.elements.link;
const imageTypePopup = document.querySelector('.popup_type_image');
const imagePopup = imageTypePopup.querySelector('.popup__image');
const imageCaptionPopup = imageTypePopup.querySelector('.popup__caption');
const imageProfile = document.querySelector('.profile__image');

const profileForm = document.querySelector('.popup__form');
const nameInputProfile = profileForm.querySelector('.popup__input_type_name');
const descriptionInputProfile = profileForm.querySelector('.popup__input_type_description');
let userId ='';


Promise.all([getUser(), getCards()])
    .then(([user, cards]) => {
        userId = user._id;
        titleProfile.textContent = user.name;
        descriptionProfile.textContent = user.about;
        imageProfile.style.backgroundImage = `url('${user.avatar}')`;

        cards.forEach((element) => {
            const card = createCard (
                element, {
                    onDelete: deleteCard, 
                    onLike: likeCard, 
                    onView: viewImage,
                    userId,
                }
            );
            cardContainer.append(card)
        });
    })
    .catch((err) => console.log(err));


//Открыть модальное окно профиля
buttonEditProfile.addEventListener('click', function () {
    openPopup(popupEdit);

    titleInput.value = titleProfile.textContent;
    descriptionInput.value = descriptionProfile.textContent;

    clearValidation(popupEdit, enableValidationSettings);
});


//Закрыть модальное окно профиля при нажатии на оверлей
closePopupOverlay(popupEdit);

//Открыть модальное окно добавления карточек
buttonAddCard.addEventListener('click', function () {
    openPopup(popupAdd);

    clearValidation(popupAdd, enableValidationSettings);
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
function handleEditProfileFormSumbit (evt) {
    titleProfile.textContent = titleInput.value;
    descriptionProfile.textContent = descriptionInput.value;

    evt.preventDefault();
    
    loading(evt.submitter, 'Сохранение...');

    patchProfile({name: nameInputProfile.value, about: descriptionInputProfile.value})
        .then(() => {
            const name = nameInputProfile.value;
            const about = descriptionInputProfile.value;

            titleProfile.textContent = name;
            descriptionProfile.textContent = about;

            closePopup(popupEdit); 
        })
        .catch((err)=> console.log(err))
        .finally(() => loading(evt.submitter, 'Сохранить'));
}
//Отправка изменений в профиль
editProfileForm.addEventListener('submit', handleEditProfileFormSumbit);

//Создание новой карточки
addCardForm.addEventListener('submit', function (evt) {
    const card = {
        name: nameInput.value,
        link: urlInput.value
    };

    evt.preventDefault();

    loading(evt.submitter, 'Сохранение...');

    postCard(card)
    .then((element) => {
        const item = createCard(
            element, {
                onDelete: deleteCard,
                onLike: likeCard,
                onView: viewImage,
                userId,
            }
        );
        cardContainer.prepend(item);
        addCardForm.reset();

        closePopup(popupAdd);
    })
    .catch((err) => console.log(err))
    .finally(() => loading(evt.submitter, 'Сохранить'));
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


const avatarPopup = document.querySelector(".popup_type_avatar");
const profileAvatar = document.querySelector(".profile__image");

profileAvatar.addEventListener('click', function () {
    openPopup(avatarPopup);
});

function handleEditAvatar() {
    const avatarFormElement = avatarPopup.querySelector(".popup__form");
    const avatarInput = avatarFormElement.querySelector(".popup__input_type_url-profile");
    let userAvatar = "";

    function handleFormSubmitAvatar(evt) {
        evt.preventDefault();

        clearValidation(popupAdd, enableValidationSettings);

        loading(evt.submitter, 'Сохранение...');

        patchImageProfile({ avatar: avatarInput.value })
            .then((data) => {
                profileAvatar.style.backgroundImage = `url(${data.avatar})`;
                userAvatar = data.avatar;
                closePopup(avatarPopup);
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => loading(evt.submitter, 'Сохранить'));
    }

    avatarFormElement.addEventListener("submit", handleFormSubmitAvatar);
}

handleEditAvatar();

function loading (button, status) {
    button.textContent = status;
}


enableValidation(enableValidationSettings);

export {loading};