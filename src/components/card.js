export {createCard, removeCard, likeCard}
import {cardTemplate} from '../scripts/index.js'
// @todo: Функция создания карточки
function createCard(cardData, likeCard, openImage) {
    const cardNode = cardTemplate.querySelector(".card").cloneNode(true);
    const cardImage = cardNode.querySelector(".card__image");
    const cardTitle = cardNode.querySelector(".card__title");
    const cardDeleteButton = cardNode.querySelector(".card__delete-button");
    cardImage.src = cardData.link;
    cardImage.alt = cardData.name;
    cardTitle.textContent = cardData.name;
    cardDeleteButton.addEventListener("click", () => removeCard(cardNode));
    cardNode.addEventListener('click', likeCard);
    cardImage.addEventListener('click', () => openImage(cardData));
    return cardNode;
  }

// @todo: Функция удаления карточки
function removeCard(card) {
    card.remove();
  }

//Лайк карточки
function likeCard(evt) {
    if (evt.target.classList.contains('card__like-button')) {
      evt.target.classList.toggle('card__like-button_is-active');
     }
    }