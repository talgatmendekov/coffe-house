let products = []
fetch('./products.json')
    .then(response => response.json())
    .then(data => {
        // Use the data here
        products = data;
        console.log(products);
        const initialCategory = 'coffee'
        const initialScreenWidth = window.innerWidth
        displayProducts(initialCategory, initialScreenWidth)
    })
    .catch(error => console.error('Error loading JSON:', error));

let currentCategory = 'coffee';
let visibleProducts = [];
 // Add a variable to track the selected size and additives
 let selectedSize = 'S';
 let selectedAdditives = [];

// Function to display products based on category and screen width
function displayProducts(category, screenWidth) {
    currentCategory = category;
    const menuContainer = document.getElementById('menuCardContainer');
    const loadMoreContainer = document.getElementById('loadMoreContainer');
    const loadMoreBtn = document.getElementById('loadMoreBtn');
    const offerSection = document.querySelector('.offer');
    const productDetail = document.createElement('div');

    menuContainer.innerHTML = '';

    const filteredProducts = products.filter(product => product.category === category);

    const productsPerPage = screenWidth <= 768 ? 4 : 8;
    visibleProducts = filteredProducts.slice(0, productsPerPage);

    function openModal(product) {
        productDetail.style.display = 'flex'
        document.body.style.overflow = 'hidden'

      
    
    
     const productInfo = `
        <div class="backdrop">
        <div class="modal">
            <div class="${product['name']}"></div>
            <div class="modalItem">
                <h3 class="modalTitle">${product.name}</h3>
                <p>${product.description}</p>
                <h5>Size</h5>
                <div class="sizeContainer">
                    <button id="coffeeBtn" class="menuBtn sizeBtn menuBtnDark" data-size="S">
                        <img src="./assets/icons/coffee.png" alt="coffee">
                        <span>${product.sizes.s.size}</span>
                    </button>
                    <button id="teaBtn" class="menuBtn additiveBtn" data-size="M">
                    <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="30" height="30" rx="15" fill="#C1B6AD"/>
                    <path d="M9.39773 9.36364H11.9773L15.4318 17.7955H15.5682L19.0227 9.36364H21.6023V21H19.5795V13.0057H19.4716L16.2557 20.9659H14.7443L11.5284 12.9886H11.4205V21H9.39773V9.36364Z" fill="#403F3D"/>
                    </svg>

                        <span>${product.sizes.m.size}</span>
                    </button>
                    <button id="dessertBtn" class="menuBtn sizeBtn" data-size="L">
                    
                    <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="30" height="30" rx="15" fill="#C1B6AD"/>
                    <path d="M11.6165 21V9.36364H13.7244V19.233H18.8494V21H11.6165Z" fill="#403F3D"/>
                    </svg>
                    
                        <span>${product.sizes.l.size}</span>
                    </button>
                </div>
                <h5>Additives</h5>
                <div class="additivesContainer">
                    <button id="coffeeBtn" class="menuBtn">
                         <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect width="30" height="30" rx="15" fill="#C1B6AD"/>
                            <path d="M16.9233 9.36364V21H14.8153V11.4148H14.7472L12.0256 13.1534V11.2216L14.9176 9.36364H16.9233Z" fill="#403F3D"/>
                         </svg>
                        <span>${product.additives[0].name}</span>
                    </button>
                    <button id="teaBtn" class="menuBtn">
                        <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect width="30" height="30" rx="15" fill="#C1B6AD"/>
                            <path d="M11.0653 21V19.4773L15.1051 15.517C15.4915 15.1269 15.8134 14.7803 16.071 14.4773C16.3286 14.1742 16.5218 13.8807 16.6506 13.5966C16.7794 13.3125 16.8438 13.0095 16.8438 12.6875C16.8438 12.3201 16.7604 12.0057 16.5938 11.7443C16.4271 11.4792 16.1979 11.2746 15.9062 11.1307C15.6146 10.9867 15.2831 10.9148 14.9119 10.9148C14.5294 10.9148 14.1941 10.9943 13.9062 11.1534C13.6184 11.3087 13.3949 11.5303 13.2358 11.8182C13.0805 12.1061 13.0028 12.4489 13.0028 12.8466H10.9972C10.9972 12.108 11.1657 11.4659 11.5028 10.9205C11.84 10.375 12.304 9.95265 12.8949 9.65341C13.4896 9.35417 14.1714 9.20455 14.9403 9.20455C15.7206 9.20455 16.4063 9.35038 16.9972 9.64205C17.5881 9.93371 18.0464 10.3333 18.3722 10.8409C18.7017 11.3485 18.8665 11.928 18.8665 12.5795C18.8665 13.0152 18.7831 13.4432 18.6165 13.8636C18.4498 14.2841 18.1563 14.75 17.7358 15.2614C17.3191 15.7727 16.7339 16.392 15.9801 17.1193L13.9744 19.1591V19.2386H19.0426V21H11.0653Z" fill="#403F3D"/>
                        </svg>
                        <span>${product.additives[1].name}</span>
                    </button>
                    <button id="dessertBtn" class="menuBtn">
                        <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect width="30" height="30" rx="15" fill="#C1B6AD"/>
                            <path d="M15.4993 21.1591C14.6811 21.1591 13.9538 21.0189 13.3175 20.7386C12.6849 20.4583 12.1849 20.0682 11.8175 19.5682C11.45 19.0682 11.255 18.4905 11.2322 17.8352H13.3686C13.3875 18.1496 13.4917 18.4242 13.6811 18.6591C13.8705 18.8902 14.1224 19.0701 14.4368 19.1989C14.7512 19.3277 15.1035 19.392 15.4936 19.392C15.9103 19.392 16.2796 19.3201 16.6016 19.1761C16.9235 19.0284 17.1754 18.8239 17.3572 18.5625C17.5391 18.3011 17.6281 18 17.6243 17.6591C17.6281 17.3068 17.5372 16.9962 17.3516 16.7273C17.166 16.4583 16.897 16.2481 16.5447 16.0966C16.1963 15.9451 15.7758 15.8693 15.2834 15.8693H14.255V14.2443H15.2834C15.6887 14.2443 16.0429 14.1742 16.3459 14.0341C16.6527 13.8939 16.8932 13.697 17.0675 13.4432C17.2417 13.1856 17.3269 12.8883 17.3232 12.5511C17.3269 12.2216 17.2531 11.9356 17.1016 11.6932C16.9538 11.447 16.7436 11.2557 16.4709 11.1193C16.2019 10.983 15.8857 10.9148 15.522 10.9148C15.166 10.9148 14.8364 10.9792 14.5334 11.108C14.2304 11.2367 13.986 11.4205 13.8004 11.6591C13.6148 11.8939 13.5163 12.1742 13.505 12.5H11.4766C11.4917 11.8485 11.6792 11.2765 12.0391 10.7841C12.4027 10.2879 12.8875 9.90151 13.4936 9.625C14.0997 9.3447 14.7796 9.20455 15.5334 9.20455C16.3099 9.20455 16.9841 9.35038 17.5561 9.64205C18.1319 9.92992 18.5769 10.3182 18.8913 10.8068C19.2057 11.2955 19.3629 11.8352 19.3629 12.4261C19.3667 13.0814 19.1735 13.6307 18.7834 14.0739C18.397 14.517 17.8894 14.8068 17.2607 14.9432V15.0341C18.0788 15.1477 18.7057 15.4508 19.1413 15.9432C19.5807 16.4318 19.7985 17.0398 19.7947 17.767C19.7947 18.4186 19.6091 19.0019 19.2379 19.517C18.8705 20.0284 18.3629 20.4299 17.7152 20.7216C17.0713 21.0133 16.3326 21.1591 15.4993 21.1591Z" fill="#403F3D"/>
                        </svg>
                        <span>${product.additives[2].name}</span>
                    </button>
                </div>
                <div class ='productPrice'>
                    <h3 class='totalTitle'>Total</h3>
                    <h3 class='totalPrice'>${product.price}</h3>
                </div>
                <div class="infoEmpty">
                    <img src="./assets/icons/info-empty.png" alt="">
                    <p>The cost is not final. Download our
                        mobile app to see the final price and place your
                        order. Earn loyalty points and enjoy your favorite
                        coffee with up to 20% discount.
                    </p>
                </div>
                <button class="closeModalBtn">Close</button>
            </div>
        </div>
    </div>
       
        `
        productDetail.innerHTML = productInfo
        offerSection.appendChild(productDetail)
        productDetail.addEventListener('click', (event) => closeModal(event))

          // del
          const sizeButtons = productDetail.querySelectorAll('.sizeContainer button');

          // Add event listener to handle size selection
          sizeButtons.forEach(button => {
              button.addEventListener('click', (e) => {
                  selectedSize = button.dataset.size; // Update selected size
                  console.log(selectedSize)
                  updateFinalPrice(product.price); // Update final price
              });
          });
          
          const additiveButtons = productDetail.querySelectorAll('.additivesContainer button');

    // Add event listeners to handle additive selection
    additiveButtons.forEach(button => {
        button.addEventListener('click', () => {
            const additiveName = button.dataset.additive;
            const isAdditiveSelected = selectedAdditives.includes(additiveName);

            if (isAdditiveSelected) {
                // Remove additive if already selected
                selectedAdditives = selectedAdditives.filter(name => name !== additiveName);
            } else {
                // Add additive if not selected
                selectedAdditives.push(additiveName);
            }

            updateFinalPrice(product.price); // Update final price
        });
    });
    }
function closeModal(event) {
        if (
            event.target.classList.contains('backdrop') ||
            event.target.classList.contains('closeModalBtn')
        ) {
            productDetail.style.display = 'none';
            document.body.style.overflow = 'auto';
            // Clear selected size and additives when closing the modal
            // const sizeButtons = productDetail.querySelectorAll('.sizeContainer button');
            // sizeButtons.forEach(button => button.classList.remove('selected'));
    
            // const additiveButtons = productDetail.querySelectorAll('.additivesContainer button');
            // additiveButtons.forEach(button => button.classList.remove('selected'));
        }
    }


    visibleProducts.forEach(product => {
        const productCard = document.createElement('div');
        productCard.classList.add('menuCard');
        const productHTML = `<div class="menuCard">
            <div class="${product['name']}"></div>
            <div class="menuInfo">
                <div class="title">
                     <h3>${product.name}</h3>
                    <p>${product.description}</p>
                </div>
                <span>${product.price}</span>
            </div>
        </div>`;

        productCard.innerHTML = productHTML;
        productCard.addEventListener('click', () => openModal(product));
        menuContainer.appendChild(productCard);
    });

    if (filteredProducts.length > visibleProducts.length) {
        loadMoreContainer.style.display = 'flex';

        // Add event listener to "Load More" button
        loadMoreBtn.addEventListener('click', () => {
            const remainingProducts = products.filter(product => product.category === currentCategory).slice(visibleProducts.length);
            // const remainingProducts = filteredProducts.slice(visibleProducts.length);
            const nextProducts = remainingProducts.slice(0, productsPerPage);

            // Check if there are no more remaining products
            if (remainingProducts.length <= productsPerPage) {
                loadMoreContainer.style.display = 'none';
            }

            // Update visibleProducts after loading more products
            visibleProducts = visibleProducts.concat(nextProducts);

            // Append the next products to the menuContainer
            nextProducts.forEach(product => {
                const productCard = document.createElement('div');
                productCard.classList.add('menuCard');

                const productHTML = `<div class="menuCard">
                                        <div class="${product['name']}"></div>
                                        <div class="menuInfo">
                                            <div class="title">
                                                <h3>${product.name}</h3>
                                                <p>${product.description}</p>
                                            </div>
                                            <span>${product.price}</span>
                                        </div>
                                    </div>`;

                productCard.innerHTML = productHTML;
                productCard.addEventListener('click', () => openModal(product));
                menuContainer.appendChild(productCard);
            });
        });
    } else {
        loadMoreContainer.style.display = 'none';
    }
}

// Set initial category and screen width
const initialCategory = 'coffee';
const initialScreenWidth = window.innerWidth;

// Display products based on the initial category and screen width
displayProducts(initialCategory, initialScreenWidth);

// Add event listener for window resize
window.addEventListener('resize', () => {
    const currentScreenWidth = window.innerWidth;
    // Redisplay products based on the current category and screen width
    displayProducts(initialCategory, currentScreenWidth);
});

const teaBtn = document.getElementById('teaBtn');
const dessertBtn = document.getElementById('dessertBtn');
const coffeeBtn = document.getElementById('coffeeBtn');

// Add click event listeners for category buttons
teaBtn.onclick = () => {
    currentCategory = 'tea';
    displayProducts(currentCategory, window.innerWidth);
};

dessertBtn.onclick = () => {
    currentCategory = 'dessert';
    displayProducts(currentCategory, window.innerWidth);
};

coffeeBtn.onclick = () => {
    currentCategory = 'coffee';
    displayProducts(currentCategory, window.innerWidth);
};



function updateFinalPrice(basePrice) {
    const totalPrice = document.querySelector('.totalPrice');
    const totalTitle = document.querySelector('.totalTitle');
    const numericBasePrice = parseFloat(basePrice);

    let totalAmount;

    // Update the final price based on the selected size
    switch (selectedSize) {
        case 'S':
            totalAmount = numericBasePrice;
            break;
        case 'M':
            totalAmount = numericBasePrice + 0.50;
            break;
        case 'L':
            totalAmount = numericBasePrice + 1.00;
            break;
        default:
            totalAmount = numericBasePrice;
            break;
    }

    const additiveCost = selectedAdditives.length * 0.50;

    // Update the final price based on the selected size and additives
    totalAmount += additiveCost;

    totalTitle.textContent = 'Total';
    totalPrice.textContent = `$${totalAmount.toFixed(2)}`;
}