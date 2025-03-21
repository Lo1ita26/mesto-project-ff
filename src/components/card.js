import { deleteCard, addLike, deleteLike } from "../api.js";
import { cardTemplate } from "../scripts/index.js";
// @todo: Функция создания карточки
function createCard(cardData, likeCard, openImage, myId, removeCard) {
  const cardNode = cardTemplate.querySelector(".card").cloneNode(true);
  const cardImage = cardNode.querySelector(".card__image");
  const cardTitle = cardNode.querySelector(".card__title");
  const cardDeleteButton = cardNode.querySelector(".card__delete-button");
  const cardLikes = cardNode.querySelector(".likes");
  const cardLikeButton = cardNode.querySelector(".card__like-button");
  const cardId = cardData._id;
  if (cardData.owner._id != myId) {
    cardDeleteButton.style.display = "none";
  } else {
    cardDeleteButton.addEventListener("click", () =>
      removeCard(cardNode, cardId)
    );
  }

  if (
    cardData.likes.some((likes) => {
      return likes._id === myId;
    })
  ) {
    cardLikeButton.classList.add("card__like-button_is-active");
  } else {
    cardLikeButton.classList.remove("card__like-button_is-active");
  }

  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  cardTitle.textContent = cardData.name;
  cardLikes.textContent = cardData.likes.length;
  cardNode.addEventListener("click", (evt) => likeCard(evt, cardId, cardLikes));
  cardImage.addEventListener("click", () => openImage(cardData));
  return cardNode;
}

// @todo: Функция удаления карточки
function removeCard(card, cardId) {
  card.remove();
  deleteCard(cardId)
    .then(() => card.remove())
    .catch((err) => console.log(err));
}

//Лайк карточки
function likeCard(evt, cardId, likes) {
  if (evt.target.classList.contains("card__like-button")) {
    const likeMethod = evt.target.classList.contains(
      "card__like-button_is-active"
    )
      ? deleteLike
      : addLike;
    likeMethod(cardId)
      .then((res) => {
        likes.textContent = res.likes.length;
        evt.target.classList.toggle("card__like-button_is-active");
      })
      .catch((err) => console.log(err));
  }
}

export { createCard, removeCard, likeCard };
