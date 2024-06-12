window.onload = function() {
  let productContainer = document.getElementById('products_right');
  let mainProductContainer = document.getElementById('main_products');
  let loadMoreBtn = document.getElementById('load_more');

  let productsData = [];

  fetch('products.json')
    .then(response => response.json())
    .then(data => {
      productsData = data;
      loadInitialProducts();
    })
    .catch(error => console.error(error));

  function loadInitialProducts() {
    let products = productsData.slice(0, 4);
    let html = '';

    let mainProducts = productsData.slice(4, 10);
    let mainProductHtml = '';

    products.forEach(product => {
      html += createProductCard(product);
    });

    mainProducts.forEach(product => {
      mainProductHtml += createMainProductCard(product);
    });

    productContainer.innerHTML = html;
    mainProductContainer.innerHTML = mainProductHtml;
  }

  function createProductCard(product) {
    return `
      <div class="product-card">
      <div class="product-info">
        <img src="${product.image}" alt="${product.name}">
          <h3>${product.name}</h3>
          <p>${product.short_des}</p>
          <h4>
          <span style="color:red; margin:0;">$</span>${product.price}</h4>
        </div>
      </div>
    `;
  }

  function createMainProductCard(product) {
    return `
      <div class="main-product-card">
        <div class="main-product-image">
          <img src="${product.image}" alt="${product.name}">
        </div>
        <div class="main-product-info">
          <div class="main-product-left">
            <h3>${product.name}</h3>
            <button>Add To Cart</button>
          </div>
          <div class="main-product-right">
            <div class="rating"><span class="star-icon"></span> ${product.rating}</div>
            <h4>
              $${parseFloat(product.price).toFixed(2)}
            </h4>
          </div>
        </div>
      </div>
    `;
  }

  loadMoreBtn.addEventListener('click', function() {
    if (loadMoreBtn.value === "1") {
      let extraProducts = productsData.slice(4, 7);
      extraProducts.forEach(product => {
        mainProductContainer.innerHTML += createMainProductCard(product);
      });
      loadMoreBtn.innerHTML = "See Less Products<span id=\"load_arrow\"></span>";
      loadMoreBtn.value = "0";
    } else {
      loadInitialProducts();
      loadMoreBtn.innerHTML = "See More Products<span id=\"load_arrow\"></span>";
      loadMoreBtn.value = "1";
    }
  });
};



// newsletter functions
let newsletter_input = document.getElementById('newsletter_input');
let newsletter_button = document.getElementById('newsletter_button');
let newsletter_output = document.getElementById('newsletter_output');

let footer_input = document.getElementById('footer_input');
let footer_button = document.getElementById('footer_button');
let footer_output = document.getElementById('footer_output');

function validateEmail(email) {
  let re = /\S+@\S+\.\S+/;
  return re.test(email);
}

newsletter_button.addEventListener('click', function() {
  if (validateEmail(newsletter_input.value)) {
    newsletter_output.innerHTML = "Thank you for subscribing!";
    newsletter_output.style.color = "green";
  } else {
    newsletter_output.innerHTML = "Please enter a valid email address";
    newsletter_output.style.color = "red";
  }
  setTimeout(() => {
    newsletter_output.innerHTML = "";
  }, 2000);
});

footer_button.addEventListener('click', function() {
  if (validateEmail(footer_input.value)) {
    footer_output.innerHTML = "Thank you for subscribing!";
    footer_output.style.color = "green";
  } else {
    footer_output.innerHTML = "Please enter a valid email address";
    footer_output.style.color = "red";
  }
  setTimeout(() => {
    footer_output.innerHTML = "";
  }, 2000);
});

// small screen menu
document.getElementById('hamburger').addEventListener('click', function() {
  document.querySelector('.nav').classList.add('open');
});

document.getElementById('cross').addEventListener('click', function() {
  document.querySelector('.nav').classList.remove('open');
});