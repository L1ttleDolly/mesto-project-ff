export {getUserProfile, getCards, editDataProfile, createCardOnServer, deleteServerCard, addLike, removeLike}

function getUserProfile() { //
    return fetch('https://nomoreparties.co/v1/wff-cohort-40/users/me', {
        headers: {
            authorization: '7e118dfc-cae6-4af0-96ac-0800487ee4ed',
            'Content-Type': 'application/json'
        },
    })
        .then((res) => {
            if (res.ok) {
                return res.json()
            }
        })
}

function getCards() { //карточки
    return fetch('https://nomoreparties.co/v1/wff-cohort-40/cards ', {
        headers: {
            authorization: '7e118dfc-cae6-4af0-96ac-0800487ee4ed' }
    })

        .then((res) => {
            if(res.ok) {
                return res.json() }
        })
        .then((cards) => {

            return cards

        })
        .catch((err) => {
            console.log(err); // выводим ошибку в консоль
        })
}

function  createCardOnServer(newCard) {
    return fetch('https://nomoreparties.co/v1/wff-cohort-40/cards',{
        method: 'POST',
        headers: {
            authorization: '7e118dfc-cae6-4af0-96ac-0800487ee4ed',
            'Content-Type': 'application/json'},
        body: JSON.stringify(newCard)
    })
        .then((res) => {
            if(res.ok) {
                return res.json() }

        })
}

function deleteServerCard(cardId) {
    return fetch(`https://nomoreparties.co/v1/wff-cohort-40/cards/${cardId}`, {
        method: 'DELETE',
        headers: {
            authorization: '7e118dfc-cae6-4af0-96ac-0800487ee4ed',
            'Content-Type': 'application/json'
        }
    })
        .then((res) => res.json())
}


function editDataProfile(name, about) {

    return fetch('https://nomoreparties.co/v1/wff-cohort-40/users/me', {
        method: 'PATCH',
        headers: {
            authorization: '7e118dfc-cae6-4af0-96ac-0800487ee4ed',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: name,
            about: about
        })
    })
        .then((res) => {
            return res.json()
        })
}

function addLike(id) {
    return fetch(`https://nomoreparties.co/v1/wff-cohort-40/cards/likes/${id}`,{
        method: 'PUT',
        headers: {
            authorization: '7e118dfc-cae6-4af0-96ac-0800487ee4ed',
            'Content-Type': 'application/json'
        },
    })
        .then((res) => {
            console.log('полученные данные:', res)
            return res.json()
        })

}

function removeLike(id) {
    return fetch(`https://nomoreparties.co/v1/wff-cohort-40/cards/likes/${id}`,{
        method: 'DELETE',
        headers: {
            authorization: '7e118dfc-cae6-4af0-96ac-0800487ee4ed',
            'Content-Type': 'application/json'
        },
    })
        .then((res) => {
            return res.json()
        })

}