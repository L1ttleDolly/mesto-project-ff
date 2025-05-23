import './pages/index.css'
import {initialCards} from './components/cards.js'
import {createCard, deleteCard, toggleLikeCard} from './components/card.js'
import {showModal, hideModal, closeModalOnEsc, closeModalOnOverlayClick} from './components/modal.js'

const $ = document.querySelector.bind(document)
const cardContainer = $('.places__list'); // контененр карточек
const cardTemplate = $('#card-template').content

const modalImg = $('.popup_type_image')
const modalAddCard = $('.popup_type_new-card') // модалка добавления краточек
const modalProfileEdit = $('.popup_type_edit') //модалка редактирования профиля
const buttonProfileEdit = $('.profile__edit-button') //кнопка редактирования профиля
const buttonAddCard = $('.profile__add-button') // плюс добаления карточек
const buttonsCloseModal = document.querySelectorAll('.popup__close') //все кнопки закрытия

const formElement = $('form[name="edit-profile"]')// форма
const nameInput = formElement.querySelector('.popup__input_type_name')
const jobInput = formElement.querySelector('.popup__input_type_description')
const formElementCard = $('form[name="new-place"]')
const nameCardInput = formElementCard.querySelector('.popup__input_type_card-name')
const cardUrlInput = formElementCard.querySelector('.popup__input_type_url')
const profileTitleName = $('.profile__title') //заголовок в профиле
const profileDescription = $('.profile__description') // описание

placeCards(); //вызываб функцию массива

/**
 * Обрабатывает клик по изображению карточки, открывая модальное окно с увеличенным изображением
 * @param {Object} card - Объект с данными карточки (name, link)
 */
function handleCardClick(card) {
    const popupImg = modalImg.querySelector('.popup__image')
    const imgTitle = modalImg.querySelector('.popup__caption')

    Object.assign(popupImg,
        {
            src: card.link,
            alt: card.name,
        })
    imgTitle.textContent = card.name
}

/**
 * Размещает начальные карточки на странице из массива initialCards
 */

function placeCards() {// через эту функцию заполняю карточки
    initialCards.forEach(function (card) {
        const cardData = createCard(
            card,
            cardTemplate,
            modalImg,
            handleCardClick,
            deleteCard,
            toggleLikeCard
        )
        cardContainer.append(cardData)
    })
}

/**
 * Создает новую карточку из данных формы и добавляет ее на страницу
 * @param {Event} evt - Событие отправки формы
 */

function makeNewCard(evt) { //функция создания новой карточки
    evt.preventDefault()

    const nameValue = nameCardInput.value //достаю ввеленное валуе в форму
    const cardUrl = cardUrlInput.value

    const newCard = { // создаю объект
        name: nameValue,
        link: cardUrl,
    }

    const cardData = createCard(newCard, deleteCard, toggleLikeCard) // кладу в переменную функцию создания с параметрами функций и объекта
    cardContainer.prepend(cardData)

    const openModal = document.querySelector('.popup_is-opened') //закрытие модалки после сощдания новой карточки
    hideModal(openModal)

    formElementCard.reset() // очищаю форму
}

formElementCard.addEventListener('submit', makeNewCard) //вещаю слушатель который после отправки создаст новую карьу

buttonProfileEdit.addEventListener('click', function () {  //открытие по клику
    showModal(modalProfileEdit)
    fillProfileForm()
})
buttonAddCard.addEventListener('click', function () {
    showModal(modalAddCard)
})

/*перебираю через форич кнопки закрытия, определаю через closest в котором попапе нажата кнопка закрытия, делаю поверку, чтоы действительно нашла попап и вызываю функцию*/
buttonsCloseModal.forEach(function (button) {
    button.addEventListener('click', function () {
        const modal = button.closest('.popup')
        if (modal) {
            hideModal(modal)
        }
    })
})

/**
 * Заполняет поля формы редактирования профиля текущими значениями из профиля
 * @description Берет текст из элементов профиля (имя и описание) и вставляет в соответствующие поля ввода формы
 */
function fillProfileForm() { //функция заполнения строк профиля
    nameInput.value = profileTitleName.textContent // берем текст из элемента профиля(титле и описание) и вставляем в поле ввода(инпут валуе)
    jobInput.value = profileDescription.textContent // same
}

/**
 * Обрабатывает отправку формы редактирования профиля
 * @param {Event} evt - Событие отправки формы
 * @description Обновляет информацию в профиле на основе данных, введенных пользователем в форму
 */
function handleFormSubmit(evt) {
    evt.preventDefault() // отменяю дефолтное поведение страницы
    const nameInputValue = nameInput.value // получаем текущее значение инпут валуе, то, что пользователь вел или изменил
    const jobInputValue = jobInput.value

    profileTitleName.textContent = nameInputValue// присваеваем текст контент в инпут валуе, т.к. эти данные изменены в форме и должнв отобразитьсч на странице
    profileDescription.textContent = jobInputValue
}

formElement.addEventListener('submit', handleFormSubmit) //вешаю слушатель на форму и при отправке вызывается функция, которая обновляет данные
