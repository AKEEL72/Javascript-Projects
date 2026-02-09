let basket = JSON.parse(localStorage.getItem('data')) || [];
const shoppingCart = document.getElementById('shopping-cart');
const label = document.getElementById('label');
const billingDetails = document.getElementById('billing-details');
const clearCart = document.getElementById('clear-cart');
const checkout = document.getElementById('checkout');

let calculation = () => {
  const cartAmt = document.getElementById('cart-amount');
  cartAmt.innerHTML = basket.map((x) => x.item).reduce((x,y) => x + y, 0);
}

calculation()

let generateCartItems = () => {
  if(basket.length !== 0){
    return (shoppingCart.innerHTML = basket.map((x) => {
      let {id, item } = x;
      let search = shopItemsData.find((y) => y.id === id) || {};
      return `
        <div class="cart-item">
          <img width="100px" src="${search.img}" />

          <div class="details">
            <div class="title-price-x">
              <h4 class="title-price">
                <p>${search.name}</p>
                <p class="price">$${search.price}</p>
              </h4>
              <i onclick="removeItem('${id}')" class="bi bi-x-lg"></i>
            </div>

            <div class="buttons">
              <i onclick="decrement('${x.id}')" class="bi bi-dash-lg"></i>

              <div id='${x.id}' class="quantity">
                ${item}
              </div>

              <i onclick="increment('${x.id}')" class="bi bi-plus-lg"></i>
            </div>

            <h2>$${item * search.price}</h2>
          </div>
        </div>
      `
    }).join(''))
  } else {
    shoppingCart.innerHTML = '';
    billingDetails.innerHTML = ""; 
    label.innerHTML = `
      <h2>Cart is Empty</h2>
      <a href="index.html">
        <button class="home-btn">Back to home</button>
      </a>
    `;
  }
}

generateCartItems();

let increment = (selectedItemId) => {
  let search = basket.find((x) => {
    return x.id === selectedItemId;
  });
  
  if(search === undefined){
    basket.push({
      id:selectedItemId,
      item: 1
    });
  } else {
    search.item += 1;
  }
  update(selectedItemId);
  generateCartItems();
  storage();
}

let decrement = (selectedItemId) => {
  let search = basket.find((x) => {
    return x.id === selectedItemId;
  });
  if (search === undefined){
    return;
  } else if(search.item === 0){
    return;
  } else {
    search.item -= 1;
  }
  update(selectedItemId);
  basket = basket.filter((x) => x.item !== 0);
  generateCartItems();
  storage();
}

let update = (selectedItemId) => {
  let search = basket.find((x) => {
    return x.id === selectedItemId;
  });

  document.getElementById(selectedItemId).innerText = search.item; 
  calculation();
  totalAmt();
}

let removeItem = (id) => {
  basket = basket.filter((x) => x.id !== id );
  storage();
  generateCartItems();
  calculation();
}

let storage = () => {
  localStorage.setItem('data', JSON.stringify(basket));
}

let totalAmt = () => {
  if(basket.length !== 0){
    let amt = basket.map((x) => {
      let {id, item } = x;
      let search = shopItemsData.find((y) => y.id === id) || {};
      return item * search.price;
    })
    amt = amt.reduce((x,y) => x+y, 0);
    document.getElementById('total-bill').innerHTML = `Total Bill : $ ${amt}`;
  } else return;
}

totalAmt();


clearCart.addEventListener('click', () => {
  basket = [];
  localStorage.clear();
  generateCartItems();
  calculation();
})