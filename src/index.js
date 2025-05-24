import './pages/index.css'
import {initialCards} from './components/cards.js'
import {createCard, deleteCard, toggleLikeCard} from './components/card.js'
import {showModal, hideModal, closeModalOnEsc, closeModalOnOverlayClick} from './components/modal.js'

const $ = document.querySelector.bind(document)
const cardContainer = $('.places__list'); // контененр карточек
const cardTemplate = $('#card-template').content

const popup = document.querySelector('.popup') //попап
const modalImg = $('.popup_type_image') //модалка картинки
const modalAddCard = $('.popup_type_new-card') // модалка добавления краточек
const modalProfileEdit = $('.popup_type_edit') //модалка редактирования профиля
const buttonProfileEdit = $('.profile__edit-button') //кнопка редактирования профиля
const buttonAddCard = $('.profile__add-button') // плюс добаления карточек
const buttonsCloseModal = document.querySelectorAll('.popup__close') //все кнопки закрытия

const formElementProfile = $('form[name="edit-profile"]')// форма профиля
const nameInput = formElementProfile.querySelector('.popup__input_type_name')
const jobInput = formElementProfile.querySelector('.popup__input_type_description')
const formElementCard = $('form[name="new-place"]') // форма карты
const nameCardInput = formElementCard.querySelector('.popup__input_type_card-name')
const cardUrlInput = formElementCard.querySelector('.popup__input_type_url')
const profileTitleName = $('.profile__title') //заголовок в профиле
const profileDescription = $('.profile__description') // описание

const popupImg = modalImg.querySelector('.popup__image')
const imgTitle = modalImg.querySelector('.popup__caption')

placeCards(); //вызываб функцию массива

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
 * Обрабатывает клик по карточке: открывает модальное окно с увеличенным изображением.
 * @param {Object} card - Объект карточки с полями `name` и `link`.
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
/**
 * Создаёт и добавляет карточки из массива initialCards в контейнер на странице.
 */
function placeCards() {
    initialCards.forEach(function (card) {
        const cardData = createCard( // записываю в переменную функцию создания с параметрами функций и объекта
            card,
            cardTemplate,
            modalImg,
            handleCardClick,
            deleteCard,
            toggleLikeCard
        )
        cardContainer.append(cardData) //вывожу в контейнер вызов функцию, которая делает все то,что перечислено в параметрах
    })
}
/**
 * Заполняет форму редактирования профиля текущими данными из профиля.
 */
function fillProfileForm() {
    nameInput.value = profileTitleName.textContent // достаем текст из элемента профиля(тайлт и описание) и вставляем в поле ввода(инпут валуе)
    jobInput.value = profileDescription.textContent
}
/**
 * Обрабатывает отправку формы редактирования профиля.
 * Обновляет данные профиля на странице и закрывает модальное окно.
 * @param {Event} evt - Событие отправки формы.
 */
function handleFormSubmitProfile(evt) {
    evt.preventDefault()
    const nameInputValue = nameInput.value // получаем текущее значение инпут валуе, то, что пользователь вел или изменил
    const jobInputValue = jobInput.value

    profileTitleName.textContent = nameInputValue// присваеваем текст контент в инпут валуе, т.к. эти данные изменены в форме и должны отобразиться на странице
    profileDescription.textContent = jobInputValue

    hideModal(popup)//закрытие модалки после создания новой карточки
}
/**
 * Обрабатывает создание новой карточки на основе данных из формы.
 * Добавляет карточку в начало списка и закрывает модальное окно.
 * @param {Event} evt - Событие отправки формы.
 */
function makeNewCard(evt) {
    evt.preventDefault()

    const nameValue = nameCardInput.value //достаю ввеленное валуе в форму
    const cardUrl = cardUrlInput.value

    const newCard = { // создаю объект
        name: nameValue,
        link: cardUrl,
    }

    const cardData = createCard( // кладу в переменную функцию создания с параметрами функций и объекта
        newCard,
        cardTemplate,
        modalImg,
        handleCardClick,
        deleteCard,
        toggleLikeCard
    )
    cardContainer.prepend(cardData)

    hideModal($('.popup_is-opened')) //закрытие модалки после сощдания новой карточки

    formElementCard.reset() // очищаю форму
}

    formElementCard.addEventListener('submit', makeNewCard) //вещаю слушатель который после отправки создаст новую карьу

    buttonProfileEdit.addEventListener('click', function () {  //открытие по клику
    showModal(modalProfileEdit) // вызыв модалки профиля
    fillProfileForm() // заполняю данные модалки, чтоб в ней уже была данные со страницы
    })

    buttonAddCard.addEventListener('click', function () {
        showModal(modalAddCard) //вызываю модалку по плюсику для доблавения карточки
    })

    formElementProfile.addEventListener('submit', handleFormSubmitProfile) //вешаю слушатель на форму и при отправке вызывается функция, которая обновляет данные