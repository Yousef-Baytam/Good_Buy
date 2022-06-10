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

    const userCard = (name, email, phone, profile_pic, id, status) => {
        return `<div class="card-container">
            <div class="card">
                <div class="details">
                    <div class="img">
                        <img src="${ profile_pic ? profile_pic : '../assets/blank-profile.webp' }" alt="">
                    </div>
                    <div class="info">
                        <div id='user_name'>Name: ${ name }</div>
                        <div id='user_email'>Email: ${ email }</div>
                        <div id='user_phone'>Phone: ${ phone }</div>
                    </div>
                </div>
                <div>
                    <i class="fa-solid fa-ban ${ status == 'active' ? '' : 'fa-check' } U${ id }" id='${ id }'></i>
                </div>
            </div>
        </div>`
    }


    const ban = (x) => {
        let id = `.U${ x }`
        const btn = document.querySelector('#iframe').contentDocument.querySelector(id)
        btn.addEventListener('click', (e) => {
            console.log(e.target.id)
            if (btn.classList.contains('fa-check')) {
                let token
                if (localStorage.getItem('token'))
                    token = localStorage.getItem('token')
                let data = new FormData()
                axios.post(`http://127.0.0.1:8000/api/v1/admin/users/activate/${ e.target.id }`, data, {
                    headers: {
                        Authorization: `Bearer ${ token }`
                    }
                })
                    .then((res) => {
                        console.log(res)
                        btn.classList.toggle('fa-check')
                    }).catch((err) => {
                        console.log(err)
                    })
            } else {
                console.log('fuck me')
                let token
                if (localStorage.getItem('token'))
                    token = localStorage.getItem('token')
                let data = new FormData()
                axios.post(`http://127.0.0.1:8000/api/v1/admin/users/suspend/${ e.target.id }`, data, {
                    headers: {
                        Authorization: `Bearer ${ token }`
                    }
                })
                    .then((res) => {
                        console.log(res)
                        btn.classList.toggle('fa-check')
                    }).catch((err) => {
                        console.log(err)
                    })
            }
        })

    }


    const userCardGenerator = () => {
        let container = document.querySelector('#iframe').contentDocument.querySelector('.subview')
        container.innerHTML = ``
        for (let user of users) {
            let element = userCard(`${ user.first_name } ${ user.last_name }`, user.email, user.phone, user.profile_pic, user.id, user.status)
            container.insertAdjacentHTML('beforeend', element)
            ban(user.id)
        }
    }
}