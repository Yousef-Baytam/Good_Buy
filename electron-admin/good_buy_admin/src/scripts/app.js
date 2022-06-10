const axios = require('axios')

window.addEventListener('DOMContentLoaded', () => {

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
        console.log(token)
        let data = new FormData()
        await axios.post('http://127.0.0.1:8000/api/me', data, {
            headers: {
                Authorization: `Bearer ${ token }`
            }
        })
            .then((res) => {
                console.log(res)
                if (res.data.status == 'active' && res.data.users_type_id == 2) {
                    window.location.href = './admin.html'
                }

            })
    }
    adminPage()
})