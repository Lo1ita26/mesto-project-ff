import '../index.css';
import { createCard, likeCard, removeCard } from '../components/card.js';
import { openPopup, closePopup, closeOverlay } from '../components/modal.js';
import { enableValidation, clearValidation } from '../components/validation.js';
import { editProfile, getServerCards, getUserInformation, createNewCard, addAvatar } from '../api.js';
// @todo: Темплейт карточки
export const cardTemplate = document.querySelector("#card-template").content;

// @todo: DOM узлы
const placesList = document.querySelector(".places__list");

// @todo: Вывести карточки на страницу
function loadCards(initialCards, myId) {
  initialCards.forEach((cards) => {
    const cardNode = createCard(cards, likeCard, openImage, myId, removeCard);
    placesList.append(cardNode);
  });
}

// попап
const buttonEditProfile = document.querySelector('.profile__edit-button'); //кнопка редактирования профиля
const popupTypeEdit = document.querySelector('.popup_type_edit');  //попап редактирования профиля
const buttonProfileAdd = document.querySelector('.profile__add-button'); //кнопка добавления поста
const popupNewCard = document.querySelector('.popup_type_new-card'); //попап добавления поста
const popupTypeImage = document.querySelector('.popup_type_image'); //попап открытой картинки
const popupImage = document.querySelector('.popup__image'); //большая фотография
const popupImageCaptain = document.querySelector('.popup__caption'); //подпись к фотографии

const buttonAvatar = document.querySelector('.profile__image');//кнопка открытия попапа(аватар)
const popupAvatar = document.querySelector('.popup_type_avatar');//попап добавления аватара

//открытие
buttonEditProfile.addEventListener('click', function(config){
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
  openPopup(popupTypeEdit);
  clearValidation(profileEditingForm, config)
})

buttonProfileAdd.addEventListener('click', function(config){
  openPopup(popupNewCard);
  clearValidation(newPlace, config)
})

buttonAvatar.addEventListener('click', function(){
  openPopup(popupAvatar);
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

popupAvatar.querySelector('.popup__close').addEventListener('click', function(){
  closePopup(popupAvatar);
})

popupTypeEdit.addEventListener('click', closeOverlay);
popupNewCard.addEventListener('click', closeOverlay);
popupTypeImage.addEventListener('click', closeOverlay);
popupAvatar.addEventListener('click', closeOverlay);

//Редактирование имени и информации о себе
const profileEditingForm = document.querySelector('[name=editProfile]');
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const nameInput = profileEditingForm.querySelector('.popup__input_type_name');
const jobInput = profileEditingForm.querySelector('.popup__input_type_description');

function handleFormSubmitProfile(evt) {
  evt.preventDefault();
  const name = nameInput.value;
  const job = jobInput.value;
  const submitButton = document.getElementById('profile-btn');
  const buttonText = submitButton.textContent;
  submitButton.textContent = 'Сохранение...';
  editProfile(name, job)
  .then((data) => {
  profileTitle.textContent = data.name;
  profileDescription.textContent = data.about;
})
.catch((err) => console.log(err))   /////добавила
.finally (() => {
  submitButton.textContent = buttonText;
})
  closePopup(popupTypeEdit);
}
profileEditingForm.addEventListener('submit', handleFormSubmitProfile);

//Обновление аватара пользователя
const avatarForm = document.querySelector('[name=newAvatar]');
const avatarInput = avatarForm.querySelector('.popup__input_type_avatar')
const profileAvatar = document.querySelector('.profile__image');

function updateAvatar(evt) {
  evt.preventDefault();
  const avatar = avatarInput.value;
  const submitButton = document.getElementById('avatar-btn');
  const buttonText = submitButton.textContent;
  submitButton.textContent = 'Сохранение...';
  //document.getElementById('avatar-btn').textContent = 'Сохранение...';
  addAvatar(avatar)
  .then((data) => {
    profileAvatar.src = data.avatar;
})
.catch((err) => console.log(err))  /////добавила
.finally (() => {
  submitButton.textContent = buttonText;
})
    closePopup(popupAvatar);
}

avatarForm.addEventListener('submit', updateAvatar);

//Добавление карточки
const newPlace = document.querySelector('[name=newPlace]');
const cardNameInput = document.querySelector('.popup__input_type_card-name');
const cardLinkInput = document.querySelector('.popup__input_type_url');

function handleFormCard(evt){
  evt.preventDefault();
  const submitButton = document.getElementById('card-btn');
  const buttonText = submitButton.textContent;
  submitButton.textContent = 'Сохранение...';
  createNewCard(cardNameInput.value, cardLinkInput.value)
  //document.getElementById('card-btn').textContent = 'Сохранение...';
  .then((cardData) => {
  const cardNode = createCard(cardData, likeCard, openImage, cardData.owner._id);
  placesList.prepend(cardNode);
  newPlace.reset()
})
  .catch((err) => console.log(err))   /////добавила
  .finally (() => {
    submitButton.textContent = buttonText;
})
closePopup(popupNewCard);
}

newPlace.addEventListener('submit', handleFormCard);

enableValidation ({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button-disabled',
  inputErrorClass: 'form__input_type_error', //'popup__input_type_error', //
  errorClass: 'span-popup__active'//'popup__error_visible' //
}); 

//Валидация
//enableValidation();

//API
Promise.all([getUserInformation(), getServerCards()])
.then(([userInformation, cards]) => {
  profileTitle.textContent = userInformation.name;
  profileDescription.textContent = userInformation.about;
  profileAvatar.src = userInformation.avatar
   loadCards(cards, userInformation._id);
})
.catch((err) => console.log(err));   /////добавила


