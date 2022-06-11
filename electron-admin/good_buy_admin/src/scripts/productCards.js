const axios = require('axios')

module.exports = () => {
    let products
    let token
    if (localStorage.getItem('token'))
        token = localStorage.getItem('token')
    const newProducts = () => {
        axios.get('http://127.0.0.1:8000/api/v1/admin/products/', {
            headers: {
                Authorization: `Bearer ${ token }`
            }
        })
            .then((res) => {
                addItem()
                products = res.data.res
                productCardGenerator()
            }).catch((err) => {
                console.log(err)
            })
    }
    newProducts()

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
            const addProductBtn = document.querySelector('#iframe').contentDocument.querySelector('.add-product')
            const addProductForm = document.querySelector('#iframe').contentDocument.querySelector('#add-product-form')
            addProductBtn.addEventListener('click', (e) => {
                e.target.classList.toggle('active')
                if (e.target.classList.contains('active'))
                    addProductForm.style.maxHeight = `600px`
                else
                    addProductForm.style.maxHeight = `0px`
            })
        }).catch((err) => {
            console.log(err)
        })

    const addItem = () => {
        const data = new FormData
        const addProductForm = document.querySelector('#iframe').contentDocument.querySelector('#add-product-form')
        const productImg = document.querySelector('#iframe').contentDocument.querySelector('#productImg')
        const productImgDsiplay = document.querySelector('#iframe').contentDocument.querySelector('#productImgDsiplay')
        productImg.addEventListener('change', (e) => {
            let reader = new FileReader()
            reader.readAsDataURL(e.target.files[0])
            reader.addEventListener('loadend', () => {
                productImgDsiplay.src = reader.result
            })
        })
        addProductForm.addEventListener('submit', (e) => {
            e.preventDefault()
            data.append('image', productImgDsiplay.src)
            data.append('product_name', document.querySelector('#iframe').contentDocument.querySelector('#name').value)
            data.append('price', document.querySelector('#iframe').contentDocument.querySelector('#price').value)
            data.append('inventory', document.querySelector('#iframe').contentDocument.querySelector('#inventory').value)
            data.append('category', document.querySelector('#iframe').contentDocument.querySelector('#product-category').value)
            axios.post('http://127.0.0.1:8000/api/v1/admin/products/add', data, {
                headers: {
                    Authorization: `Bearer ${ token }`,
                }
            })
                .then((res) => {
                    newProducts()
                    document.querySelector('#iframe').contentDocument.querySelector('#name').value = ""
                    document.querySelector('#iframe').contentDocument.querySelector('#price').value = ""
                    document.querySelector('#iframe').contentDocument.querySelector('#inventory').value = ""
                    document.querySelector('#iframe').contentDocument.querySelector('#product-category').value = ""
                    productImgDsiplay.src = "../assets/blank-profile.webp"
                }).catch((err) => {
                    console.log(err)
                });
        })
    }

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


    const edit = (x) => {
        let id = `.U${ x }`
        const btn = document.querySelector('#iframe').contentDocument.querySelector(id)
        const addProductForm = document.querySelector('#iframe').contentDocument.querySelector('#add-product-form')
        const productImgDsiplay = document.querySelector('#iframe').contentDocument.querySelector('#productImgDsiplay')
        const submit = document.querySelector('#iframe').contentDocument.querySelector("input[type='submit']")
        const update = document.querySelector('#iframe').contentDocument.querySelector("[update]")

        btn.addEventListener('click', (e) => {
            e.target.classList.toggle('clicked')
            if (e.target.classList.contains('clicked'))
                addProductForm.style.maxHeight = `600px`
            else
                addProductForm.style.maxHeight = `0px`
            let clicked
            for (let i of products) {
                if (i.id == e.target.id)
                    clicked = i
            }
            console.log(clicked)
            document.querySelector('#iframe').contentDocument.querySelector('#name').value = clicked.product_name
            document.querySelector('#iframe').contentDocument.querySelector('#price').value = clicked.price
            document.querySelector('#iframe').contentDocument.querySelector('#inventory').value = clicked.inventory_id == 1 ? 'In Stock' : 'Out of Stock'
            document.querySelector('#iframe').contentDocument.querySelector('#product-category').value = clicked.category.category
            productImgDsiplay.src = clicked.image
            submit.classList.toggle('d-none')
            update.classList.toggle('d-none')
        })
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
                    newProducts()
                }).catch((err) => {
                    console.log(err)
                })

        })

    }


    const productCardGenerator = () => {
        console.log(1)
        let container = document.querySelector('#iframe').contentDocument.querySelector('.subview')
        container.innerHTML = ``
        for (let product of products) {
            let element = productCard(product.product_name, product.price, product.image, product.inventory_id == 1 ? 'In Stock' : 'Out of Stock', product.id, product.category.category)
            container.insertAdjacentHTML('beforeend', element)
            ban(product.id)
            edit(product.id)
        }
    }
}