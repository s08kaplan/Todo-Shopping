const cardSection = document.querySelector(".cards-main");
const searchInput = document.querySelector("#products");
const searchButton = document.querySelector("button");

const getProducts = async (endpoint = "products") => {
  try {
    const res = await fetch(`https://fakestoreapi.com/${endpoint}`);
    const data = await res.json();
    console.log(data);
    showProducts(data);
    return data;
  } catch (error) {
    console.log("Products couldn't fetch", error);
  }
};

const showProducts = (products) => {
  console.log(products);
  cardSection.innerHTML = "";
  products.forEach((product) => {
    const productCard = document.createElement("div");
    productCard.classList.add("card-container");

    productCard.innerHTML += `
        <div class="card">
           <h3>${product.title}</h3> 
           <img src=${product.image} alt="product" width="400px">
           <div>${product.price} $</div>
        </div>   
        `;
    cardSection?.appendChild(productCard);
    productCard.addEventListener("click", () => {
      console.log(window.location.pathname);
      window.location.href = `../PRODUCT/productPage.html?id=${product.id}`;
    });
  });
};

getProducts();

const getSearchedProducts = (data, inputValue) => {
  return data.filter((info) =>
    info.title.toLowerCase().includes(inputValue.toLowerCase())
  );
};

const handleSearch = async () => {
  const inputValue = searchInput.value;
  if (!inputValue) {
    getProducts();
  } else {
    const allProducts = await getProducts();
    const searchedProducts = getSearchedProducts(allProducts, inputValue);
    showProducts(searchedProducts);
  }
};

searchInput.addEventListener("keyup", (e) => {
  e.key === "Enter" && handleSearch();
});

searchButton.addEventListener("click", handleSearch);
