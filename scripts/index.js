const container = document.querySelector('.content') // ограничиваю область поиска
const addButton = container.querySelector('.profile__add-button') // кнопка добавления
const cardContainer = document.querySelector('.places__list') // контененр карточек
const cardTemplate = document.querySelector('#card-template').content

function cardAdd (cardItem) { // функция добавления карточек на страницу
  initialCards.forEach(function(card) { // обращаюсь к массиву через forEach , запускаю цикл перебора объектов массива, card - объект массива
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true) // клонирую карточку в переменную
    const deleteButton = cardElement.querySelector('.card__delete-button') //нахожу кнопку в карточке
    deleteButton.addEventListener('click',function() {
      cardDelete(cardElement)
      })
    Object.assign(cardElement.querySelector('.card__image'),{ // через Object.assign (в первый аргумент пиши куда хочу добавить, {пишу что хочу добавить, указывая объект массива и его значение})
      src: card.link,
      alt: card.name,
    })
    cardElement.querySelector('.card__title').textContent = card.name // нахожу тайтл и через текст контент перезаписываю тайтл из объекта массива
    cardContainer.append(cardElement) // через аppend вставляю карточку(кардЭлемент) в контейнер(кардКонтейнер(который плейс лист))
  })
}

cardAdd(initialCards) // вызываю  функцию передавая в аргументы массив данных

function cardDelete(cardElement){ //вызыываю функцию удаленеия карточки в аргументы передаю карточку
cardElement.remove()
}
