const PATH = 'https://nomoreparties.co/v1/wff-cohort-32';
const token = 'f6b1df2e-a365-40f5-8bfa-e503f70570b9';
const handleResponse = (result) => {
    return result.json();
  }

// Загрузка информации о пользователе с сервера
function getUserInformation () {
    return fetch(`${PATH}/users/me`, {
       method: "GET",
       headers: {
        authorization: token,
       }
    })
    .then(handleResponse)
}

//Загрузка карточек с сервера
function getServerCards () {
    return fetch(`${PATH}/cards`, {
        method: "GET",
        headers: {
         authorization: token,
        }
     })
     .then(handleResponse)
}

//Редактирование профиля
function editProfile (newName, newAbout) {
    return fetch(`${PATH}/users/me`, {
        method: "PATCH",
        headers: {
         authorization: token,
         'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            name: newName,
            about: newAbout
        })
     })
     .then(handleResponse)
}

//Добавление новой карточки
function createNewCard (cardName, cardLink) {
    return fetch(`${PATH}/cards`, {
        method: "POST",
        headers: {
         authorization: token,
         'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            name: cardName,
            link: cardLink
        })
     })
     .then(handleResponse)
}

//удаление карточки
function deleteCard (cardId) {
    return fetch(`${PATH}/cards/${cardId}`, {
    method: "DELETE",
    headers: {
        authorization: token
       },
})
.then(handleResponse);
}

//Постановка лайка
function addLike (cardId) {
    return fetch(`${PATH}/cards/likes/${cardId}`, {
        method: "PUT",
        headers: {
         authorization: token,
         'Content-Type': 'application/json',
        },
        
})
.then(handleResponse);
}

//Снятие лайка
function deleteLike (cardId) {
    return fetch(`${PATH}/cards/likes/${cardId}`, {
        method: "DELETE",
        headers: {
            authorization: token
           },
    })
    .then(handleResponse);
}

//Обновление аватара пользователя
function addAvatar (newAvatar) {
    return fetch(`${PATH}/users/me/avatar`, {
        method: "PATCH",
        headers: {
         authorization: token,
         'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            avatar: newAvatar
        })
     })
     .then(handleResponse)
}

export {getUserInformation, getServerCards, editProfile, createNewCard, deleteCard, addLike, deleteLike, addAvatar}