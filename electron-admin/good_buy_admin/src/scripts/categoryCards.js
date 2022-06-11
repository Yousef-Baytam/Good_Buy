const axios = require('axios')

module.exports = () => {
    let categories
    let token
    if (localStorage.getItem('token'))
        token = localStorage.getItem('token')

    document.querySelector('#iframe').addEventListener('load', () => {
        if (document.querySelector('iframe').attributes.src.textContent.includes('categories.html')) {
            addCat()
            addCatBtn()
            updateCategory()
        }
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
        const addCategroyBtn = document.querySelector('#iframe').contentDocument.querySelector('.add-category')
        const addCategroyForm = document.querySelector('#iframe').contentDocument.querySelector('#add-category-form')
        addCategroyBtn.addEventListener('click', (e) => {
            e.target.classList.toggle('active')
            if (e.target.classList.contains('active'))
                addCategroyForm.style.maxHeight = `200px`
            else
                addCategroyForm.style.maxHeight = `0px`
        })
    }

    const addCat = () => {
        const data = new FormData
        const addCategroyForm = document.querySelector('#iframe').contentDocument.querySelector('#add-category-form')
        addCategroyForm.addEventListener('submit', (e) => {
            e.preventDefault()
            data.append('category', document.querySelector('#iframe').contentDocument.querySelector('#name').value)
            axios.post('http://127.0.0.1:8000/api/v1/admin/categories/add', data, {
                headers: {
                    Authorization: `Bearer ${ token }`,
                }
            })
                .then((res) => {
                    getCat()
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
                        <div id='user_name'>Category: ${ name }</div>
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
        const addCategoryForm = document.querySelector('#iframe').contentDocument.querySelector('#add-category-form')
        const submit = document.querySelector('#iframe').contentDocument.querySelector("input[type='submit']")
        const update = document.querySelector('#iframe').contentDocument.querySelector("[update]")

        btn.addEventListener('click', (e) => {
            e.target.classList.toggle('clicked')
            if (e.target.classList.contains('clicked'))
                addCategoryForm.style.maxHeight = `200px`
            else
                addCategoryForm.style.maxHeight = `0px`
            let clicked
            for (let i of categories) {
                if (i.id == e.target.id)
                    clicked = i
            }
            console.log(clicked)
            document.querySelector('#iframe').contentDocument.querySelector('#name').value = clicked.category
            submit.classList.toggle('d-none')
            update.classList.toggle('d-none')
            update.id = e.target.id
        })
    }

    const updateCategory = () => {
        const update = document.querySelector('#iframe').contentDocument.querySelector("[update]")
        const addProductForm = document.querySelector('#iframe').contentDocument.querySelector('#add-category-form')
        const submit = document.querySelector('#iframe').contentDocument.querySelector("input[type='submit']")
        update.addEventListener('click', (e) => {
            let id = `.U${ e.target.id }`
            const btn = document.querySelector('#iframe').contentDocument.querySelector(id)
            axios.patch(`http://127.0.0.1:8000/api/v1/admin/categories/update/${ e.target.id }`,
                {
                    'category': document.querySelector('#iframe').contentDocument.querySelector('#name').value
                },
                {
                    headers: {
                        Authorization: `Bearer ${ token }`,
                    }
                })
                .then((res) => {
                    getCat()
                    document.querySelector('#iframe').contentDocument.querySelector('#name').value = ""
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
            axios.delete(`http://127.0.0.1:8000/api/v1/admin/categories/delete/${ e.target.id }`, {
                headers: {
                    Authorization: `Bearer ${ token }`
                }
            })
                .then((res) => {
                    console.log(res)
                    getCat()
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
            ban(category.id)
            edit(category.id)
        }
    }
}