const container = document.querySelector('.container')
let products
let token
let user
let favourites

if (localStorage.getItem('token')) {
    token = localStorage.getItem('token')
    console.log(token)
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

const newProducts = () => {
    axios.get('http://127.0.0.1:8000/api/v1/user/products/', {
        headers: {
            Authorization: `Bearer ${ token }`
        }
    })
        .then((res) => {
            products = res.data.res
            console.log(products)
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
                        <i class="fa-${ fav ? 'solid' : 'regular' } fa-heart" style="color: red;" id='F${ id }'></i>
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

const getFavourites = () => {
    axios.get('http://127.0.0.1:8000/api/v1/user/products/favourite/all', {
        headers: {
            Authorization: `Bearer ${ token }`
        }
    })
        .then((res) => {
            console.log(res)
            favourites = res.data.res
            console.log(favourites)
        }).catch((err) => {
            console.log(err)
        })

}

const productCardGenerator = (arr) => {
    container.innerHTML = ``
    for (let prod of arr) {
        let card = productCard(prod.product_name, prod.price, prod.inventory_id == 1 ? 'In Stock' : 'Out of Stock', prod.category ? prod.category.category : 'N/A', favourites.include(prod) ? true : false, prod.img, prod.id)
        container.insertAdjacentHTML('beforeend', card)
    }
}