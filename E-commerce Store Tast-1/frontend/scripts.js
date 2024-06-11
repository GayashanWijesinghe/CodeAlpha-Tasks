const products = [
    { id: 1, name: "Product 1", price: 10.0, image: "image/image1.jpg" },
    { id: 2, name: "Product 2", price: 20.0, image: "image/image2.jpg" },
    { id: 3, name: "Product 3", price: 30.0, image: "image/image3.jpg" },
    { id: 4, name: "Product 4", price: 40.0, image: "image/image4.jpg" },
    { id: 5, name: "Product 5", price: 20.0, image: "image/image5.jpg" },
    { id: 6, name: "Product 6", price: 50.0, image: "image/image6.jpg" }
];

let cart = [];

document.addEventListener('DOMContentLoaded', () => {
    const productContainer = document.getElementById('products');
    products.forEach(product => {
        const productElement = document.createElement('div');
        productElement.classList.add('product');
        productElement.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h2>${product.name}</h2>
            <p>$${product.price.toFixed(2)}</p>
            <button onclick="addToCart(${product.id})">Add to Cart</button>
        `;
        productContainer.appendChild(productElement);
    });
});

function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    cart.push(product);
    updateCart();
}

function updateCart() {
    const cartElement = document.getElementById('cart');
    cartElement.textContent = `Cart (${cart.length})`;
}
