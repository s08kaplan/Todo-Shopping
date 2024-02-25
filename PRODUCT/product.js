
const urlParams = new URLSearchParams(window.location.search)
const productId = urlParams.get('id')
const productShow = document.querySelector(".chosen-product")

const getProduct = async (productId) => {
    try {
     const res = await fetch(`https://fakestoreapi.com/products/${productId}`)
    const data = await res.json()
    console.log(data);  
    return showItem(data)  
    } catch (error) {
        console.log("oops there is a problem", error);
    }
   
}

const showItem = (item) => {
    console.log(item);
    productShow.innerHTML = `
        <div class="card">
            <h3>${item.title}</h3> 
            <img src=${item.image} alt="product" width="400px">
            <div>${item.price} $</div>
        </div>
    `;
}

getProduct(productId)


