const axios = require('axios')

window.addEventListener('DOMContentLoaded', () => {
    if (window.location.href.includes('index.html'))
        document.querySelector('#login-form').addEventListener('submit', async (e) => {
            e.preventDefault()
            const data = new FormData()
            data.append('email', document.querySelector('#email').value)
            data.append('password', document.querySelector('#password').value)

            await axios.post('http://127.0.0.1:8000/api/login', data)
                .then((res) => {
                    if (res.data) {
                        localStorage.setItem('token', res.data.authorisation.token)
                        adminPage()
                    }
                })
                .catch((err) => console.log(err))
        })

    const adminPage = async () => {
        let token
        if (localStorage.getItem('token'))
            token = localStorage.getItem('token')
        let data = new FormData()
        await axios.post('http://127.0.0.1:8000/api/me', data, {
            headers: {
                Authorization: `Bearer ${ token }`
            }
        })
            .then((res) => {
                if (res.data.status == 'active' && res.data.users_type_id == 2) {
                    if (!window.location.href.includes('admin.html'))
                        window.location.href = './admin.html'
                }

            })
            .catch((err) => {
                if (err.response.status == 401)
                    window.location.href = './index.html'
                console.log(err)
            })
    }

    if (!window.location.href.includes('index'))
        adminPage()

    if (document.querySelector('iframe'))
        if (document.querySelector('iframe').attributes.src.textContent.includes('user'))
            require('./userCards')()
})