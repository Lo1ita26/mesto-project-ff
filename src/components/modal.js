export {openPopup, closePopup, closeEsc, closeOverlay}
// открытие попапов
function openPopup(popupElement) {
    popupElement.classList.add('popup_is-opened');
    document.addEventListener('keydown', closeEsc);
   }

// закрытие попапов
function closePopup(popupElement) {
    popupElement.classList.remove('popup_is-opened');
    document.removeEventListener('keydown', closeEsc);
  }
  
function closeEsc(evt){
    if (evt.key === 'Escape') {
      const popupIsOpened = document.querySelector('.popup_is-opened');
      closePopup(popupIsOpened);
  }}
  
function closeOverlay(evt){
      if (evt.target === evt.currentTarget){
      closePopup(evt.currentTarget)
      }
  }