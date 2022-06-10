const axios = require('axios')

module.exports = (arr) => {
    let users
    axios.get('http://127.0.0.1:8000/api/v1/admin/users')

    const UserCard = `<div class="card-container">
                        <div class="card">
                            <div class="details">
                                <div class="img">
                                    <img src="../assets/blank-profile.webp" alt="">
                                </div>
                                <div class="info">
                                    <div>Name:</div>
                                    <div>Email:</div>
                                    <div>Phone:</div>
                                </div>
                            </div>
                            <div>
                                <i class="fa-solid fa-ban"></i>
                                <i class="fa-solid fa-check d-none"></i>
                            </div>
                        </div>
                    </div>`

    const ban = () => {
        const btn = document.querySelectorAll('i')
        btn.addEventListener('click', (e) => {
            console.log('hello')
        })
    }


    const userCardGenerator = () => {

    }
}