const axios = require('axios')

module.exports = (arr) => {
    let users
    let token
    if (localStorage.getItem('token'))
        token = localStorage.getItem('token')
    axios.get('http://127.0.0.1:8000/api/v1/admin/users/', {
        headers: {
            Authorization: `Bearer ${ token }`
        }
    })
        .then((res) => {
            console.log(res.data.res)
            users = res.data.res
            userCardGenerator()
        }).catch((err) => {
            console.log(err)
        })

    const userCard = (name, email, phone, id) => {
        return `<div class="card-container">
            <div class="card">
                <div class="details">
                    <div class="img">
                        <img src="../assets/blank-profile.webp" alt="">
                    </div>
                    <div class="info">
                        <div id='user_name'>Name: ${ name }</div>
                        <div id='user_email'>Email: ${ email }</div>
                        <div id='user_phone'>Phone: ${ phone }</div>
                    </div>
                </div>
                <div>
                    <i class="fa-solid fa-ban" id='${ id }'></i>
                    <i class="fa-solid fa-check d-none" id='${ id }'></i>
                </div>
            </div>
        </div>`
    }


    const ban = () => {
        const btn = document.querySelectorAll('i')
        for (let i of btn) {
            if (i.classList.contains('fa-ban'))
                i.addEventListener('click', (e) => {
                    axios.post('api/v1/admin/users/activate/{id}')
                })
        }

    }

    const userCardGenerator = () => {
        let container = document.querySelector('#iframe').contentDocument.querySelector('.subview')
        container.innerHTML = ``
        for (let user of users) {
            let element = userCard(`${ user.first_name } ${ user.last_name }`, user.email, user.phone, user.id)
            container.insertAdjacentHTML('beforeend', element)
        }
    }
}