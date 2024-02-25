const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get("id");
const productShow = document.querySelector(".chosen-product");

const getProduct = async (productId) => {
  try {
    const res = await fetch(`https://fakestoreapi.com/products/${productId}`);
    const data = await res.json();
    console.log(data);
    return showItem(data);
  } catch (error) {
    console.log("oops there is a problem", error);
  }
};

const showItem = (item) => {
  console.log(item);
  productShow.innerHTML = `
    <div class="card">
        <div class="card-info">
            <h3>${item.title}</h3> 
            <img src=${item.image} alt="product" width="400px">
            <div>${item.description}</div>
            <div>${item.price} $</div>
        </div>
        <div class="buttons">
          <button>-</button>
          <span>1</span>
          <button>+</button>
        </div>
        <span class="total">Total:${item.price} $</span>
    </div>
    `;
    const quantity = document.querySelector("span")
  let quantityOfItem = document.querySelector("span").textContent;
  let total = document.querySelector(".total");
  const buttons = document.querySelector(".buttons");
  buttons.addEventListener("click", (e) => {
    if (e.target.textContent.includes("-")) {
      if (quantityOfItem < 1) {
        return (quantityOfItem = 1 && item.price * quantityOfItem);
      } else if (quantityOfItem > 1) {
        quantityOfItem--;
        quantity.innerText = quantityOfItem
        total.textContent = `Total: ${item.price * quantityOfItem} $`;
        return total.textContent;
      }
    }
    if (e.target.textContent.includes("+")) {
      quantityOfItem++;
      quantity.innerText =quantityOfItem
      total.textContent = `Total: ${item.price * quantityOfItem} $`;
      return total.textContent;
    }
  });
};

getProduct(productId);
