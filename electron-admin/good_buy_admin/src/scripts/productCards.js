const axios = require('axios')

module.exports = () => {
    let products
    let token
    if (localStorage.getItem('token'))
        token = localStorage.getItem('token')
    axios.get('http://127.0.0.1:8000/api/v1/admin/products/', {
        headers: {
            Authorization: `Bearer ${ token }`
        }
    })
        .then((res) => {
            products = res.data.res
            productCardGenerator()
        }).catch((err) => {
            console.log(err)
        })

    let categories
    axios.get('http://127.0.0.1:8000/api/v1/admin/categories/', {
        headers: {
            Authorization: `Bearer ${ token }`
        }
    })
        .then((res) => {
            categories = res.data.res
            const catSelect = document.querySelector('#iframe').contentDocument.querySelector('#product-category')
            for (let cat of categories) {
                catSelect.insertAdjacentHTML('beforeend', `<option value="${ cat.category }">${ cat.category }</option>`)
            }

        }).catch((err) => {
            console.log(err)
        })

    const productCard = (name, price, image, inv, id, cat) => {
        return `<div class="card-container">
            <div class="card">
                <div class="details">
                    <div class="img">
                        <img src="${ image ? image : '../assets/blank-profile.webp' }" alt="">
                    </div>
                    <div class="info">
                        <div id='user_name'>Name: ${ name }</div>
                        <div id='user_email'>Price: $${ price }</div>
                        <div id='user_phone'>Category: ${ cat }</div>
                        <div id='user_phone'>Inventory: ${ inv }</div>
                    </div>
                </div>
                <div>
                    <i class="fa-solid fa-pencil U${ id }" id='${ id }'></i>
                    <i class="fa-solid fa-trash T${ id }" id='${ id }'></i>
                </div>
            </div>
        </div>`
    }


    const ban = (x) => {
        let id = `.T${ x }`
        const btn = document.querySelector('#iframe').contentDocument.querySelector(id)
        btn.addEventListener('click', (e) => {
            let token
            if (localStorage.getItem('token'))
                token = localStorage.getItem('token')
            axios.delete(`http://127.0.0.1:8000/api/v1/admin/products/delete/${ e.target.id }`, {
                headers: {
                    Authorization: `Bearer ${ token }`
                }
            })
                .then((res) => {
                    console.log(res)
                    require('./productCards')()
                }).catch((err) => {
                    console.log(err)
                })

        })

    }


    const productCardGenerator = () => {
        let container = document.querySelector('#iframe').contentDocument.querySelector('.subview')
        container.innerHTML = ``
        for (let product of products) {
            let element = productCard(product.product_name, product.price, product.image, product.inventory_id == 1 ? 'In Stock' : 'Out of Stock', product.id, product.category.category)
            container.insertAdjacentHTML('beforeend', element)
            ban(product.id)
        }
    }
}