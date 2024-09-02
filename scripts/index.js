// @todo: Темплейт карточки
const container = document.querySelector('.content');

// @todo: DOM узлы
const cardContainer = container.querySelector('.places__list');

// @todo: Функция создания карточки
function addCard (cardTitle, cardLink) {
    const cardTemplate = document.querySelector('#card-template').content;
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    const cardDeleteButton = cardElement.querySelector('.card__delete-button');

    cardElement.querySelector('.card__title').textContent = cardTitle;
    cardElement.querySelector('.card__image').src = cardLink;

    cardDeleteButton.addEventListener('click', deleteCard);

    cardContainer.append(cardElement);
}

// @todo: Функция удаления карточки
function deleteCard (event) {
    const card = event.target.closest('.card');
    
    card.remove();
}

// @todo: Вывести карточки на страницу
initialCards.forEach( element => addCard (element.name, element.link));