const axios = require('axios')

module.exports = () => {
    const ban = () => {
        const btn = document.querySelectorAll('i')
        btn.addEventListener('click', (e) => {
            console.log('hello')
        })
    }
}