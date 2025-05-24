export {showModal, hideModal, closeModalOnEsc, closeModalOnOverlayClick}
/**
 * Открывает модальное окно и добавляет необходимые слушатели событий.
 * @param {HTMLElement} element - Элемент модального окна для открытия.
 */
function showModal(element) { //открытие модалки + добавление слушайтелей
    element.classList.add('popup_is-opened')
    document.addEventListener('keydown', closeModalOnEsc)
    element.addEventListener('click', closeModalOnOverlayClick)
}
/**
 * Закрывает модальное окно и удаляет слушатели событий.
 * @param {HTMLElement} element - Элемент модального окна для закрытия.
 */
function hideModal(element) { //закрытие модалки + удаление слушателей
    element.classList.remove('popup_is-opened')
    document.removeEventListener('keydown', closeModalOnEsc)
    element.removeEventListener('click', closeModalOnOverlayClick)
}
/**
 * Обработчик события нажатия клавиши Escape.
 * Закрывает текущее открытое модальное окно, если Escape был нажат.
 * @param {KeyboardEvent} e - Событие нажатия клавиши.
 */
function closeModalOnEsc(e) {
    if (e.key === 'Escape') {

        if (document.querySelector('.popup_is-opened')) hideModal(document.querySelector('.popup_is-opened'))
    }
}
/**
 * Обработчик клика по оверлею модального окна.
 * Закрывает модальное окно, если клик произошёл по подложке (оверлею).
 * @param {MouseEvent} e - Событие клика.
 */
function closeModalOnOverlayClick(e) {
    if (e.target === e.currentTarget) {

        hideModal(e.target.closest('.popup'))
    }
}
