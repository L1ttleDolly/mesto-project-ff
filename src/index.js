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

const popup = document.querySelector('.popup')

const formElementProfile = $('form[name="edit-profile"]')// форма
const nameInput = formElementProfile.querySelector('.popup__input_type_name')
const jobInput = formElementProfile.querySelector('.popup__input_type_description')
const formElementCard = $('form[name="new-place"]')
const nameCardInput = formElementCard.querySelector('.popup__input_type_card-name')
const cardUrlInput = formElementCard.querySelector('.popup__input_type_url')
const profileTitleName = $('.profile__title') //заголовок в профиле
const profileDescription = $('.profile__description') // описание

const popupImg = modalImg.querySelector('.popup__image')
const imgTitle = modalImg.querySelector('.popup__caption')

placeCards(); //вызываб функцию массива

/**
 * Обрабатывает клик по изображению карточки, открывая модальное окно с увеличенным изображением
 * @param {Object} card - Объект с данными карточки (name, link)
 */
function handleCardClick(card) {
    Object.assign(popupImg,
        {
            src: card.link,
            alt: card.name,
        })
    imgTitle.textContent = card.name
    showModal(modalImg)
}

function placeCards() {// через эту функцию заполняю карточки
    initialCards.forEach(function (card) {
        const cardData = createCard(
            card, cardTemplate, modalImg, handleCardClick, deleteCard, toggleLikeCard
        )
        cardContainer.append(cardData)
    })
}

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


function fillProfileForm() { //функция заполнения строк профиля
    nameInput.value = profileTitleName.textContent // берем текст из элемента профиля(титле и описание) и вставляем в поле ввода(инпут валуе)
    jobInput.value = profileDescription.textContent // same
}

function handleFormSubmitProfile(evt) {
    evt.preventDefault() // отменяю дефолтное поведение страницы
    const nameInputValue = nameInput.value // получаем текущее значение инпут валуе, то, что пользователь вел или изменил
    const jobInputValue = jobInput.value

    profileTitleName.textContent = nameInputValue// присваеваем текст контент в инпут валуе, т.к. эти данные изменены в форме и должнв отобразитьсч на странице
    profileDescription.textContent = jobInputValue

    hideModal(popup)//закрытие модалки после сощдания новой карточки
}

formElementProfile.addEventListener('submit', handleFormSubmitProfile) //вешаю слушатель на форму и при отправке вызывается функция, которая обновляет данные

function makeNewCard(evt) { //функция создания новой карточки
    evt.preventDefault()

    const nameValue = nameCardInput.value //достаю ввеленное валуе в форму
    const cardUrl = cardUrlInput.value

    const newCard = { // создаю объект
        name: nameValue,
        link: cardUrl,
    }

    const cardData = createCard(newCard, cardTemplate, modalImg, handleCardClick, deleteCard, toggleLikeCard) // кладу в переменную функцию создания с параметрами функций и объекта
    cardContainer.prepend(cardData)


    hideModal($('.popup_is-opened')) //закрытие модалки после сощдания новой карточки

    formElementCard.reset() // очищаю форму
}

formElementCard.addEventListener('submit', makeNewCard) //вещаю слушатель который после отправки создаст новую карьу