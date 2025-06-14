import { deleteServerCard, addLike, removeLike } from "./api";

export { createCard, deleteCard, toggleLikeCard };

/**
 * Создаёт DOM-элемент карточки на основе шаблона и данных с сервера.
 *
 * @param {Object} card - Объект карточки с сервера (содержит name, link, likes, owner, _id и т.д.).
 * @param {HTMLTemplateElement} cardTemplate - DOM-шаблон карточки.
 * @param {HTMLElement} modalImg - Элемент модального окна с изображением (не используется напрямую).
 * @param {Function} handleCardClick - Обработчик клика по изображению карточки.
 * @param {Function} deleteCard - Функция удаления карточки.
 * @param {Function} toggleLikeCard - Функция обработки лайка.
 * @param {Object} userProfile - Объект текущего пользователя (содержит _id).
 * @returns {HTMLElement} DOM-элемент заполненной карточки.
 */
function createCard(card, cardTemplate, handleCardClick, deleteCard, toggleLikeCard, userProfile) {
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    const deleteButton = cardElement.querySelector('.card__delete-button');
    const likeButtonCard = cardElement.querySelector('.card__like-button');
    const cardImg = cardElement.querySelector('.card__image');
    const cardId = card._id;
    const likesCounter = cardElement.querySelector('.card__like-count');
    likesCounter.textContent = card.likes.length; //span - счетчик

    if (card.likes.some(like => like._id === userProfile._id)) {  // проверка, поставил ли текущий пользователь лайк этой карточке
        likeButtonCard.classList.add('card__like-button_is-active'); // если да — активируем кнопку лайка
    }

    Object.assign(cardImg, {
        src: card.link,
        alt: card.name,
    });

    cardElement.querySelector('.card__title').textContent = card.name;

    if (card.owner._id === userProfile._id) {
        deleteButton.addEventListener('click', function () {
            deleteCard(cardElement, card, userProfile);
        });
    } else {
        deleteButton.remove();
    }

    likeButtonCard.addEventListener('click', function () {
        toggleLikeCard(likeButtonCard, cardId, likesCounter);
    });

    cardImg.addEventListener('click', function () {
        handleCardClick(card);
    });

    cardElement.id = `card-${card._id}`;

    return cardElement;
}

/**
 * Удаляет карточку, если она принадлежит текущему пользователю.
 *
 * @param {HTMLElement} cardElement - DOM-элемент карточки.
 * @param {Object} card - Объект карточки с сервера.
 * @param {Object} userProfile - Объект текущего пользователя (содержит _id).
 * @returns {void}
 */
function deleteCard(cardElement, card, userProfile) {
    if (card.owner._id === userProfile._id) {
        deleteServerCard(card._id)
            .then(() => {
                cardElement.remove();
            })
            .catch((err) => {
                console.error('Ошибка удаления карточки:', err);
            });
    }
}

/**
 * Обрабатывает лайк или дизлайк карточки: обновляет состояние и счётчик.
 *
 * @param {HTMLElement} likeButtonCard - Кнопка лайка на карточке.
 * @param {string} cardId - ID карточки.
 * @param {HTMLElement} likesCounter - DOM-элемент со счётчиком лайков.
 * @returns {void}
 */
function toggleLikeCard(likeButtonCard, cardId, likesCounter) {
    if (likeButtonCard.classList.contains('card__like-button_is-active')) {
        removeLike(cardId)
            .then((data) => {
                likesCounter.textContent = data.likes.length;
                likeButtonCard.classList.remove('card__like-button_is-active');
            })
            .catch((err) => console.error('Ошибка при удалении лайка:', err));
    } else {
        addLike(cardId)
            .then((data) => {
                likesCounter.textContent = data.likes.length;
                likeButtonCard.classList.add('card__like-button_is-active');
            })
            .catch((err) => console.error('Ошибка при добавлении лайка:', err));
    }
}
