import {deleteServerCard, addLike, removeLike} from "./api"

export {createCard, deleteCard, toggleLikeCard}

function createCard(card, cardTemplate, modalImg, handleCardClick, deleteCard, toggleLikeCard, userProfile) {
  /*  console.log('аргументы:', { card, cardTemplate, modalImg, handleCardClick, deleteCard, toggleLikeCard, userProfile });*/
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true); //клонирую
    const deleteButton = cardElement.querySelector('.card__delete-button') //нахожу кнопку в карточке
    const likeButtonCard = cardElement.querySelector('.card__like-button')
    const cardImg = cardElement.querySelector('.card__image')
    const cardId = card._id
    const likesCounter = cardElement.querySelector('.card__like-count')
    likesCounter.textContent = card.likes.length
    console.log('span', likesCounter)

    if (card.likes.some(like => like._id === userProfile._id)) {
        likeButtonCard.classList.add('card__like-button_is-active')
    }

    Object.assign(cardElement.querySelector(".card__image"), { //чеоез этот метод (target, {source1, source2,})
        src: card.link,
        alt: card.name,
    })

    cardElement.querySelector('.card__title').textContent = card.name; //title

    if (card.owner._id === userProfile._id) {
        deleteButton.addEventListener('click', function () { //обработчик по клику внутри функции с карточкойй, чтобы было понятно где происходит клик
        deleteCard(cardElement, card, userProfile) // deletecard - функция
    })
    } else {
        deleteButton.remove()
    }

    likeButtonCard.addEventListener('click', function (e) {
        toggleLikeCard(likeButtonCard, cardId, likesCounter)
    })

    cardImg.addEventListener('click',function (){
        handleCardClick(card)
    })

    cardElement.id = `card-${card._id}`

    return cardElement //возвращаю 1 заполненную карточку
}

function deleteCard(cardElement, card, userProfile) {

    console.log('owner:', card.owner._id)
    console.log('user:', userProfile._id)

    if (card.owner._id === userProfile._id) {
        deleteServerCard(card._id)
            .then(() => {
                console.log('удалена:', card._id)
                cardElement.remove()
            })
            .catch((err) => {
                console.log('Ошибка')
            })
    }
}

/*
function toggleLikeCard(button) {
    // лайк карточки
    button.classList.toggle('card__like-button_is-active')
}
*/

/*
function countLikes(cardId) {
    console.log('лайки для карточки с id:', cardId)
    addLike(cardId)
        .then((data) => {
            const likesCounter = document.querySelector(`#card-${cardId} .card__like-count`)
            likesCounter.textContent = data.likes.length

        })
        .catch((err) => console.log('Ошибка при получении лайков:', err))
}
*/

function toggleLikeCard(likeButtonCard, cardId, likesCounter) {

    if (likeButtonCard.classList.contains('card__like-button_is-active'))
        removeLike(cardId)
            .then((data) => {
                likesCounter.textContent = data.likes.length
                likeButtonCard.classList.remove('card__like-button_is-active')
        })
    else {
    addLike(cardId)
        .then((data) => {
            likesCounter.textContent = data.likes.length
            likeButtonCard.classList.add('card__like-button_is-active')
        })
    }
}

