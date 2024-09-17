//Функция создания карточки
function createCard (cardTitle, cardLink, deleteCallback, likeCardCallback, viewImage) {
    const cardTemplate = document.querySelector('#card-template').content;
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    const cardDeleteButton = cardElement.querySelector('.card__delete-button');
    const buttonLikeCard = cardElement.querySelector('.card__like-button');

    cardElement.querySelector('.card__title').textContent = cardTitle;
    cardElement.querySelector('.card__image').src = cardLink;
    cardElement.querySelector('.card__image').alt = 'На изображении: ' + cardTitle;

    cardDeleteButton.addEventListener('click', deleteCallback);
    buttonLikeCard.addEventListener('click', likeCardCallback);
    cardElement.querySelector('.card__image').addEventListener('click', () => {
        console.log('click');
        viewImage(cardLink, cardTitle);
    });

    return cardElement;
}

//Функция удаления карточки
function deleteCard (event) {
    const card = event.target.closest('.card');
    
    card.remove();
}

//Поставить лайк карточке
function likeCard (evt) {
    if (evt.target.classList.contains('card__like-button')) {
        evt.target.classList.toggle('card__like-button_is-active');
    }
}

export { createCard, deleteCard, likeCard };