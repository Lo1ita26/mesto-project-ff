// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;

// @todo: DOM узлы
const cardList = document.querySelector('.places__list');

// @todo: Функция создания карточки
function createCard(cardData) {
  const cardNode = cardTemplate.cloneNode(true);
  const cardImage = cardNode.querySelector('.card__image');
  const cardTitle = cardNode.querySelector('.card__title');
  const cardDeleteButton = cardNode.querySelector('.card__delete-button');

  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  cardTitle.textContent = cardData.name;
  
  cardDeleteButton.addEventListener('click', removeCard);

  return cardNode; 
} 

// @todo: Функция удаления карточки
function removeCard(e) {
const cardElement = e.target.closest('.card');
cardElement.remove();
}

// @todo: Вывести карточки на страницу
function loadCards(initialCards) {
  initialCards.forEach(cards => {
    const cardNode = createCard(cards);
    cardList.append(cardNode);
  });
}
loadCards(initialCards);