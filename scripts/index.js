// @todo: Темплейт карточки
const cardTemplate = document.querySelector("#card-template").content;

// @todo: DOM узлы
const cardList = document.querySelector(".places__list");

// @todo: Функция создания карточки
function createCard(cardData) {
  const cardNode = cardTemplate.querySelector(".card").cloneNode(true);
  const cardImage = cardNode.querySelector(".card__image");
  const cardTitle = cardNode.querySelector(".card__title");
  const cardDeleteButton = cardNode.querySelector(".card__delete-button");
  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  cardTitle.textContent = cardData.name;
  cardDeleteButton.addEventListener("click", () => removeCard(cardNode));
  return cardNode;
}

// @todo: Функция удаления карточки
function removeCard(card) {
  card.remove();
}

// @todo: Вывести карточки на страницу
function loadCards(initialCards) {
  initialCards.forEach((cards) => {
    const cardNode = createCard(cards);
    cardList.append(cardNode);
  });
}
loadCards(initialCards);

// попап
const popap = document.querySelector('.popap');
const popapOpenButton = document.querySelector('.profile__add-button')
const popapCloseButton = document.querySelector('.popup__close');

// открытие попапов

popapOpenButton.addEventListener('click', function(){
  popap.style.display = 'block'
})

// закрытие попапов

function closePopap(){

}

