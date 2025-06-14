export {getUserProfile, getCards, editDataProfile, createCardOnServer, deleteServerCard, addLike, removeLike, changeAvatar}

/**
 * Конфигурация API-запросов.
 * @type {Object}
 */
const configApi = {
    baseUrl: 'https://nomoreparties.co/v1/wff-cohort-40',
    headers: {
        authorization: '7e118dfc-cae6-4af0-96ac-0800487ee4ed',
        'Content-Type': 'application/json'
    }
}

/**
 * Получает данные профиля текущего пользователя с сервера.
 * @returns {Promise<Object>} Объект с данными пользователя.
 */
function getUserProfile() { //
    return fetch(`${configApi.baseUrl}/users/me`, {
        headers: configApi.headers
    })
        .then(res => {
            if (res.ok) {
                return res.json()
            }
            return Promise.reject(`Ошибка: ${res.status}`)
        })
}

/**
 * Получает массив карточек с сервера.
 * @returns {Promise<Array<Object>>} Массив объектов карточек.
 */
function getCards() { //карточки
    return fetch(`${configApi.baseUrl}/cards`, {
        headers: configApi.headers
    })
        .then(res => {
            if (res.ok) {
                return res.json()
            }
            return Promise.reject(`Ошибка: ${res.status}`)
        })
}

/**
 * Отправляет обновлённые данные профиля на сервер.
 * @param {string} name - Новое имя пользователя.
 * @param {string} about - Новое описание/род деятельности.
 * @returns {Promise<Object>} Обновлённый объект профиля.
 */
function editDataProfile(name, about) {
    return fetch(`${configApi.baseUrl}/users/me`, {
        method: 'PATCH',
        headers: configApi.headers,
        body: JSON.stringify({
            name: name,
            about: about
        })
    })
        .then(res => {
            if (res.ok) {
                return res.json()
            }
            return Promise.reject(`Ошибка: ${res.status}`)
        })
}

/**
 * Создаёт новую карточку на сервере.
 * @param {Object} newCard - Объект карточки.
 * @param {string} newCard.name - Название карточки.
 * @param {string} newCard.link - Ссылка на изображение карточки.
 * @returns {Promise<Object>} Объект созданной карточки.
 */
function  createCardOnServer(newCard) {
    return fetch(`${configApi.baseUrl}/cards`,{
        method: 'POST',
        headers: configApi.headers,
        body: JSON.stringify(newCard)
    })
        .then(res => {
            if (res.ok) {
                return res.json()
            }
            return Promise.reject(`Ошибка: ${res.status}`)
        })
}

/**
 * Удаляет карточку с сервера по её ID.
 * @param {string} cardId - Уникальный идентификатор карточки.
 * @returns {Promise<Object>} Ответ сервера о результате удаления.
 */
function deleteServerCard(cardId) {
    return fetch(`${configApi.baseUrl}/cards/${cardId}`, {
        method: 'DELETE',
        headers: configApi.headers,
    })
        .then(res => {
            if (res.ok) {
                return res.json()
            }
            return Promise.reject(`Ошибка: ${res.status}`)
        })
}

/**
 * Ставит лайк на карточку по ID.
 * @param {string} id - ID карточки.
 * @returns {Promise<Object>} Обновлённый объект карточки.
 */
function addLike(id) {
    return fetch(`${configApi.baseUrl}/cards/likes/${id}`,{
        method: 'PUT',
        headers: configApi.headers,
    })
        .then((res) => {
            if(res.ok) {
                return res.json()
            }
            return Promise.reject(`Ошибка: ${res.status}`)
        })
}

/**
 * Удаляет лайк с карточки по ID.
 * @param {string} id - ID карточки.
 * @returns {Promise<Object>} Обновлённый объект карточки.
 */
function removeLike(id) {
    return fetch(`${configApi.baseUrl}/cards/likes/${id}`, {
        method: 'DELETE',
        headers: configApi.headers,
    })
        .then(res => {
            if (res.ok) {
                return res.json()
            }
            return Promise.reject(`Ошибка: ${res.status}`)
        })
}

/**
 * Обновляет аватар пользователя.
 * @param {string} avatarUrl - Ссылка на новый аватар.
 * @returns {Promise<Object>} Обновлённый объект пользователя с новым аватаром.
 */
function changeAvatar(avatarUrl) {
    return fetch(`${configApi.baseUrl}/users/me/avatar`, {
        method: 'PATCH',
        headers: configApi.headers,
        body: JSON.stringify({
            avatar: avatarUrl
        })
    })
        .then(res => {
            if (res.ok) {
                return res.json()
            }
            return Promise.reject(`Ошибка: ${res.status}`)
        })
}