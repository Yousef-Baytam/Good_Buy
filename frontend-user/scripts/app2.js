const container = document.querySelector('.container')
let products
let token
let user
let favourites

if (localStorage.getItem('token')) {
    token = localStorage.getItem('token')
    let data = new FormData()
    axios.post('http://127.0.0.1:8000/api/me', data, {
        headers: {
            Authorization: `Bearer ${ token }`
        }
    })
        .then((res) => {
            if (res.data.id) {
                user = res.data
            }
        })
        .catch((err) => window.location.href = '../')
}

const newProducts = async () => {
    await axios.get('http://127.0.0.1:8000/api/v1/user/products/', {
        headers: {
            Authorization: `Bearer ${ token }`
        }
    })
        .then(async (res) => {
            products = res.data.res
            await getFavourites()
            productCardGenerator(products)
        }).catch((err) => {
            console.log(err)
        })
}

newProducts()
const productCard = (name, price, inv, cat, fav, img, id) => {
    return `<div class="product-card-container">
                <div class="product-card">
                    <div class="product-image">
                        <img src="${ img ? img : '../assets/blank-profile.webp' }" alt="">
                    </div>
                    <div class="product-details">
                        <i class="fa-${ fav ? 'solid' : 'regular' } fa-heart F${ id }" style="color: red;" id='${ id }'></i>
                        <div class="name">
                            ${ name }
                        </div>
                        <div class="price">
                            price: $${ price }
                        </div>
                        <div class="inventory">
                            ${ inv }
                        </div>
                        <div class="category">
                            Category: ${ cat }
                        </div>
                    </div>
                </div>
            </div>`
}

const getFavourites = async () => {
    await axios.get('http://127.0.0.1:8000/api/v1/user/products/favourite/all', {
        headers: {
            Authorization: `Bearer ${ token }`
        }
    })
        .then((res) => {
            favourites = res.data.res
        }).catch((err) => {
            console.log(err)
        })

}


const productCardGenerator = async (arr) => {
    container.innerHTML = ``
    let favouritesIds = []
    for (let i of favourites) {
        favouritesIds.push(i.id)
    }
    for (let prod of arr) {
        let card = productCard(prod.product_name, prod.price, prod.inventory_id == 1 ? 'In Stock' : 'Out of Stock', prod.category ? prod.category.category : 'N/A', favouritesIds.includes(prod.id) ? true : false, prod.image, prod.id)
        container.insertAdjacentHTML('beforeend', card)
        listenToFavourites(`.F${ prod.id }`)
    }
}

const favouriteProduct = async (id, fav) => {
    const data = new FormData()
    if (fav)
        await axios.post(`http://127.0.0.1:8000/api/v1/user/products/favourite/add/${ id }`, data, {
            headers: {
                Authorization: `Bearer ${ token }`
            }
        })
            .catch((err) => {
                console.log(err)
            })
    else
        await axios.post(`http://127.0.0.1:8000/api/v1/user/products/favourite/remove/${ id }`, data, {
            headers: {
                Authorization: `Bearer ${ token }`
            }
        })
            .catch((err) => {
                console.log(err)
            })
}

const listenToFavourites = (heart) => {
    document.querySelector(heart).addEventListener('click', async (e) => {
        if (e.target.classList.contains('fa-regular')) {
            e.target.classList.toggle('fa-regular')
            e.target.classList.toggle('fa-solid')
            await favouriteProduct(e.target.id, true)
        }
        else {
            e.target.classList.toggle('fa-regular')
            e.target.classList.toggle('fa-solid')
            await favouriteProduct(e.target.id, false)
        }
    })
}