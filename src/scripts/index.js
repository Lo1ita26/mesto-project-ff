import '../index.css';
import { initialCards } from './cards.js';
import {createCard, removeCard, likeCard} from '../components/card.js'
import {openPopup, closePopup, closeEsc, closeOverlay} from '../components/modal.js'

// @todo: Темплейт карточки
export const cardTemplate = document.querySelector("#card-template").content;

// @todo: DOM узлы
const placesList = document.querySelector(".places__list");

// @todo: Вывести карточки на страницу
function loadCards(initialCards) {
  initialCards.forEach((cards) => {
    const cardNode = createCard(cards, likeCard, openImage);
    placesList.append(cardNode);
  });
}
loadCards(initialCards);

// попап
const buttonEditProfile = document.querySelector('.profile__edit-button'); //кнопка редактирования профиля
const popupTypeEdit = document.querySelector('.popup_type_edit');  //попап редактирования профиля
const buttonProfileAdd = document.querySelector('.profile__add-button'); //кнопка добавления поста
const popupNewCard = document.querySelector('.popup_type_new-card'); //попап добавления поста
const popupTypeImage = document.querySelector('.popup_type_image'); //попап открытой картинки
const popupImage = document.querySelector('.popup__image'); //большая фотография
const popupImageCaptain = document.querySelector('.popup__caption'); //подпись к фотографии
//открытие
buttonEditProfile.addEventListener('click', function(){
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
  openPopup(popupTypeEdit);
})

buttonProfileAdd.addEventListener('click', function(){
  openPopup(popupNewCard);
})

//Открытие попапа с картинкой
function openImage(cardData){
  popupImage.src = cardData.link;
  popupImage.alt = cardData.name;
  popupImageCaptain.textContent = cardData.name;
  openPopup(popupTypeImage);
}

// закрытие попапов
popupTypeEdit.querySelector('.popup__close').addEventListener('click', function(){
  closePopup(popupTypeEdit);
})

popupNewCard.querySelector('.popup__close').addEventListener('click', function(){
  closePopup(popupNewCard);
})

popupTypeImage.querySelector('.popup__close').addEventListener('click', function(){
  closePopup(popupTypeImage);
})

popupTypeEdit.addEventListener('click', closeOverlay);
popupNewCard.addEventListener('click', closeOverlay);
popupTypeImage.addEventListener('click', closeOverlay);

//Редактирование имени и информации о себе
const profileEditingForm = document.querySelector('[name=edit-profile]');
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const nameInput = profileEditingForm.querySelector('.popup__input_type_name');
const jobInput = profileEditingForm.querySelector('.popup__input_type_description');

function handleFormSubmitProfile(evt) {
    evt.preventDefault();
    const name = nameInput.value;
    const job = jobInput.value;
    profileTitle.textContent = name;
    profileDescription.textContent = job;
    closePopup(popupTypeEdit);
}

profileEditingForm.addEventListener('submit', handleFormSubmitProfile);

//Добавление карточки
const newPlace = document.querySelector('[name=new-place]');
const cardNameInput = document.querySelector('.popup__input_type_card-name');
const cardLinkInput = document.querySelector('.popup__input_type_url');

function handleFormCard(evt){
  evt.preventDefault();
  const cardData = {
    name: cardNameInput.value,
    link: cardLinkInput.value
  }
  const cardNode = createCard(cardData, likeCard, openImage);
  placesList.prepend(cardNode);
  newPlace.reset();
  closePopup(popupNewCard);
} 
newPlace.addEventListener('submit', handleFormCard);