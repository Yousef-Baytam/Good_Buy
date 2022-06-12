const login = document.querySelector('#login-form')

if (localStorage.getItem('token')) {
    let token = localStorage.getItem('token')
    console.log(token)
    let data = new FormData()
    axios.post('http://127.0.0.1:8000/api/me', data, {
        headers: {
            Authorization: `Bearer ${ token }`
        }
    })
        .then((res) => {
            if (res.data.id) {
                window.location.href = './views/products.html'
            }
        })
        .catch((err) => console.log(err))
}


login.addEventListener('submit', async (e) => {
    e.preventDefault()
    const data = new FormData()
    data.append('email', document.querySelector('#login-email').value)
    data.append('password', document.querySelector('#login-password').value)

    await axios.post('http://127.0.0.1:8000/api/login', data)
        .then((res) => {
            if (res.data) {
                localStorage.setItem('token', res.data.authorisation.token)
                if (res.data.user.status == 'active')
                    window.location.href = './views/products.html'
            }
        })
        .catch((err) => console.log(err))
})

const register = document.querySelector('#register-form')
register.addEventListener('submit', async (e) => {
    e.preventDefault()
    const data = new FormData()
    data.append('first_name', document.querySelector('#first_name').value)
    data.append('last_name', document.querySelector('#last_name').value)
    data.append('phone', document.querySelector('#phone').value)
    data.append('email', document.querySelector('#email').value)
    data.append('password', document.querySelector('#password').value)

    await axios.post('http://127.0.0.1:8000/api/register', data)
        .then((res) => {
            if (res.data) {
                localStorage.setItem('token', res.data.authorisation.token)
                window.location.href = './views/products.html'
            }
        })
        .catch((err) => console.log(err))
})

const registerSpan = document.querySelector('[register-span]')
const backSpan = document.querySelector('[back-span]')
const loginContainer = document.querySelector('[loginContainer]')
const registerContainer = document.querySelector('[registerContainer]')

registerSpan.addEventListener('click', () => {
    loginContainer.classList.add('animate-rev')
    loginContainer.addEventListener('animationend', () => {
        loginContainer.classList.add('d-none')
        registerContainer.classList.remove('d-none')
        registerContainer.classList.add('animate')
        registerContainer.addEventListener('animationend', () => {
            registerContainer.classList.remove('animate')
            loginContainer.classList.remove('animate-rev')
        }, { once: true })
    }, { once: true })
})
backSpan.addEventListener('click', () => {
    registerContainer.classList.add('animate-rev')
    registerContainer.addEventListener('animationend', () => {
        registerContainer.classList.add('d-none')
        loginContainer.classList.remove('d-none')
        loginContainer.classList.add('animate')
        loginContainer.addEventListener('animationend', () => {
            registerContainer.classList.remove('animate-rev')
            loginContainer.classList.remove('animate')
        }, { once: true })
    }, { once: true })
})