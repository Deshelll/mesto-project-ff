const config = {
    baseUrl: 'https://nomoreparties.co/v1/wff-cohort-23',
    headers: {
        authorization: '32e8c1f1-ea80-4f4d-a6f8-06d260fd59e1',
        'Content-Type': 'application/json'
    }
}

function resposeServer (res) {
    if (res.ok) {
        return res.json();
    }

    return Promise.reject(`Ошибка: ${res.status}`);
}

const getUser = () => {
    return fetch(`${config.baseUrl}/users/me`,{
        headers: config.headers,
        }).then(resposeServer)
};

const getCards = () => {
    return fetch(`${config.baseUrl}/cards`, {
        headers: config.headers,
    }).then(resposeServer);
}

const patchProfile = (data) => {
    return fetch(`${config.baseUrl}/users/me`, {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify(data)
    }).then(resposeServer);
}

const postCard = (name, link) => {
    return fetch(`${config.baseUrl}/cards`, {
        method: 'POST',
        headers: config.headers,
        body: JSON.stringify(name, link)
    }).then(resposeServer);
}

const removeCard = (id) => {
    return fetch(`${config.baseUrl}/cards/${id}`, {
        method:'DELETE',
        headers: config.headers,
    }).then(resposeServer);
}

const addLikeCard = (id, isLiked) => {
    return fetch(`${config.baseUrl}/cards/likes/${id}`, {
        method: isLiked ? 'DELETE':'PUT',
        headers: config.headers,
    }).then(resposeServer);
}

const patchImageProfile = (avatar) => {
    return fetch(`${config.baseUrl}/users/me/avatar `, {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify(avatar),
    }).then(resposeServer);
}

export {getUser, getCards, patchProfile, postCard, addLikeCard, removeCard, patchImageProfile};