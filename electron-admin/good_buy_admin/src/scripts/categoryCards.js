const axios = require('axios')

module.exports = () => {
    let categories
    let token
    if (localStorage.getItem('token'))
        token = localStorage.getItem('token')
    document.querySelector('#iframe').addEventListener('load', () => {
        addItem()
        addCatBtn()
    })

    const getCat = () => {
        axios.get('http://127.0.0.1:8000/api/v1/admin/categories/', {
            headers: {
                Authorization: `Bearer ${ token }`
            }
        })
            .then((res) => {
                categories = res.data.res
                categoryCardGenerator()
            }).catch((err) => {
                console.log(err)
            })
    }
    getCat()

    const addCatBtn = () => {
        const addProductBtn = document.querySelector('#iframe').contentDocument.querySelector('.add-product')
        const addProductForm = document.querySelector('#iframe').contentDocument.querySelector('#add-product-form')
        addProductBtn.addEventListener('click', (e) => {
            e.target.classList.toggle('active')
            if (e.target.classList.contains('active'))
                addProductForm.style.maxHeight = `200px`
            else
                addProductForm.style.maxHeight = `0px`
        })
    }
    const addItem = () => {
        const data = new FormData
        const addProductForm = document.querySelector('#iframe').contentDocument.querySelector('#add-product-form')
        addProductForm.addEventListener('submit', (e) => {
            e.preventDefault()
            data.append('category_name', document.querySelector('#iframe').contentDocument.querySelector('#name').value)
            axios.post('http://127.0.0.1:8000/api/v1/admin/categories/add', data, {
                headers: {
                    Authorization: `Bearer ${ token }`,
                }
            })
                .then((res) => {
                    newProducts()
                    document.querySelector('#iframe').contentDocument.querySelector('#name').value = ""
                }).catch((err) => {
                    console.log(err)
                });
        })
    }

    const categoryCard = (name, id) => {
        return `<div class="card-container">
            <div class="card">
                <div class="details">
                    <div class="info">
                        <div id='user_name'>Name: ${ name }</div>
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
            update.id = e.target.id
        })
    }

    const updateProduct = () => {
        const update = document.querySelector('#iframe').contentDocument.querySelector("[update]")
        const addProductForm = document.querySelector('#iframe').contentDocument.querySelector('#add-product-form')
        const productImgDsiplay = document.querySelector('#iframe').contentDocument.querySelector('#productImgDsiplay')
        const submit = document.querySelector('#iframe').contentDocument.querySelector("input[type='submit']")
        update.addEventListener('click', (e) => {
            let id = `.U${ e.target.id }`
            const btn = document.querySelector('#iframe').contentDocument.querySelector(id)
            axios.patch(`http://127.0.0.1:8000/api/v1/admin/products/update/${ e.target.id }`, {
                'image': productImgDsiplay.src,
                'product_name': document.querySelector('#iframe').contentDocument.querySelector('#name').value,
                'price': document.querySelector('#iframe').contentDocument.querySelector('#price').value,
                'inventory': document.querySelector('#iframe').contentDocument.querySelector('#inventory').value,
                'category': document.querySelector('#iframe').contentDocument.querySelector('#product-category').value
            }, {
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
                    addProductForm.style.maxHeight = `0px`
                    btn.classList.toggle('clicked')
                    submit.classList.toggle('d-none')
                    update.classList.toggle('d-none')
                }).catch((err) => {
                    console.log(err)
                });
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

    const categoryCardGenerator = () => {
        let container = document.querySelector('#iframe').contentDocument.querySelector('.subview')
        container.innerHTML = ``
        for (let category of categories) {
            let element = categoryCard(category.category, category.id)
            container.insertAdjacentHTML('beforeend', element)
        }
    }
}