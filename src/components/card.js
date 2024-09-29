import {addLikeCard, removeLikeCard, removeCard} from '../components/api.js';

//Функция создания карточки
function createCard (
        card, 
    {
        onDelete: deleteCallback,
        onLike: likeCardCallback,
        onView: viewImage,
        userId: userId,
    }) {
    const cardTemplate = document.querySelector('#card-template').content;
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    const cardDeleteButton = cardElement.querySelector('.card__delete-button');
    const buttonLikeCard = cardElement.querySelector('.card__like-button');
    const cardImage = cardElement.querySelector('.card__image');
    const likeCountNode = cardElement.querySelector('.like-count');

    cardElement.querySelector('.card__title').textContent = card.name;
    cardImage.src = card.link;
    cardImage.alt = 'На изображении: ' + card.name;
    cardElement.id = card._id;
    
    const likeCount = card.likes.length || 0;
    likeCountNode.textContent = card.likes.length;
    likeCountNode.textContent = likeCount;

    if (card.owner._id !== userId) {
        cardDeleteButton.classList.add('card__delete-hidden');
    }

    cardDeleteButton.addEventListener('click', deleteCallback);
    
    buttonLikeCard.addEventListener('click', function () {
        likeCardCallback(buttonLikeCard, likeCountNode, cardElement.id, isLiked);
    });

    cardElement.querySelector('.card__image').addEventListener('click', () => {
        viewImage(card.link, card.name);
    });

    const isLiked = card.likes.some((like) => like._id === userId);;
    if (isLiked) {
        buttonLikeCard.classList.add('card__like-button_is-active');
    }

    return cardElement;
}

//Функция удаления карточки
function deleteCard (event) {
    const card = event.target.closest('.card');
    removeCard(card.id)
        .then(() => card.remove())
        .catch((err) => console.log(err));

}

// Функция для обработки лайков карточки
function likeCard(likeButton, likeCountNode, cardId, isLiked) {
    if (!isLiked) {
        addLikeCard(cardId, false)
            .then((response) => {
                likeButton.classList.add('card__like-button_is-active');
                likeCountNode.textContent = response.likes.length || 0;
            })
            .catch((err) => console.error(err));
    } else {
        addLikeCard(cardId, true)
            .then((response) => {
                likeButton.classList.remove('card__like-button_is-active');
                likeCountNode.textContent = response.likes.length || 0;
            })
            .catch((err) => console.log(err));
    }
}
  

export { createCard, deleteCard, likeCard };