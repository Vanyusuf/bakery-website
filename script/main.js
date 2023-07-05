const allProduk = 'data/produk.json';

const isi  = (produk) =>{
    return `
    <div class="card">
        <div class="card-img">
            <img src="${produk.src}" alt="${produk.nama}">
        </div>
        <div class="container-title">
            <h4 class="produk-name">${produk.nama}</h4>
            <div class="star-rating">
                <span class="fa fa-star checked"></span>
                <span class="fa fa-star checked"></span>
                <span class="fa fa-star checked"></span>
                <span class="fa fa-star checked"></span>
                <span class="fa fa-star checked"></span>
            </div>
        </div>
        <div class="container-price">
            <h5>Rp.${produk.harga}</h5>
            <div class="counter">
                <div class="kurang" onclick="kurangKuantiti(this.nextElementSibling)">-</div>
                <div class="value">1</div>
                <div class="tambah" onclick="tambahKuantiti(this.previousElementSibling)">+</div>
            </div>
        </div>
        <div class="container-btn">
            <button class="btn-buy" onclick="add('${produk.src}','${produk.nama}',${produk.harga},parseInt(this.parentElement.previousElementSibling.querySelector('.value').innerText))"><span class="material-symbols-outlined">shopping_cart</span>ADD TO CART</button>
        </div>
    </div>    
    `
}

const renderProduk = (allProduk) =>{
    let content = '';
    const containerCards = document.querySelector(".container-cards");
    allProduk.forEach(produk => {
        content += isi(produk)
    });
    containerCards.innerHTML = content;
}

// Fungsi Fetch/Ambil data
const fetchProduk = (datas) =>{
    fetch(datas)
        .then((response) => response.json())
        .then(data =>{
            renderProduk(data.produks);
        })
}
fetchProduk(allProduk)


// Fungsi Tambah Kuantiti
const tambahKuantiti = (counter) => {
    let value = parseInt(counter.innerText);
    value += 1
    counter.innerHTML = value
};

// Fungsi Kurang Kuantiti
const kurangKuantiti = (counter) => {
    let value = parseInt(counter.innerText);
    if(value > 1){
        value -= 1;
    }
    counter.innerHTML = value;
};


// Fungsi Searching produk
const searchInput = document.querySelector(".search-input");
const containerCards = document.querySelector(".container-cards");


const search = () =>{
    searchInput.addEventListener("keyup", () => {
        const keyword = searchInput.value.toLowerCase();
        const allCards = containerCards.getElementsByClassName("card");
    
        Array.from(allCards).forEach((card) => {
            const namaProduk = card.querySelector(".produk-name").innerText.toLowerCase();
            if (namaProduk.includes(keyword)) {
                card.style.display = "grid";
            } else {
                card.style.display = "none";
            }
        });
    });
}
search();

searchInput.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        event.preventDefault();
    }
});



// Fungsi Filter Kategori

const kategori = document.querySelectorAll(".kategori");

const filterKategori = () => {
    kategori.forEach((item) => {
        let namaProduk = item.innerText;
        item.addEventListener("click", () => {
            item.classList.toggle("active");
            kategori.forEach((otherKategori) => {
                if (otherKategori != item) {
                    otherKategori.classList.remove("active");
                }
            });
            const activeKategori = document.querySelector(".kategori.active")
            if (!activeKategori) {
                fetchProduk(allProduk)
            }else{
                fetch(allProduk)
                    .then((response) => response.json())
                    .then(data =>{
                        let content = '';
                        const containerCards = document.querySelector(".container-cards");
                        data.produks.forEach(produk =>{
                            if (namaProduk.toLowerCase() == produk.kategori.toLowerCase()) {
                                content += isi(produk);
                            };
                            containerCards.innerHTML = content;
                        })
                    })
            }
        })
    });
};

filterKategori();


// addToCart()
const cart = [];

const add = (image,name,price,quantity) =>{
    const cartItem = {
        img : image,
        nama : name,
        harga : price,
        kuantitas : quantity
    }
    cart.push(cartItem);
    console.log(cart)
    let cartLenght = getTotal(cart)
    console.log(cartLenght)
    addToCart(cartLenght)
};

let cartItemValue = document.querySelector(".cart-item");
const addToCart = (a) =>{
    cartItemValue.innerHTML = a;
};

const getTotal = (cart) => {
    let total = 0;
    for (const item of cart) {
        total += item.kuantitas;
    }
    return total
}


const mediaQueryMobile = window.matchMedia(('max-width : 576px'));
const mediaQueryTab = window.matchMedia(('max-width : 884px'));
// const mediaQueryLaptop = window.matchMedia(('max-width : 576px'));


// Fitur Hover Keranjang
// const dropdown = document.querySelector(".dropdown");
// const dropdownCart = document.querySelector(".dropdown-cart");
// if(mediaQueryMobile.matches){
//     dropdown.addEventListener("mouseover", ()=>{
//         dropdownCart.style.display = 'none';
//     })
//     dropdown.addEventListener("mouseleave", ()=>{
//         dropdownCart.style.display = 'none';
//     })
    
// } else{
//     dropdown.addEventListener("mouseover", ()=>{
//         dropdownCart.style.display = 'block';
//     })
//     dropdown.addEventListener("mouseleave", ()=>{
//         dropdownCart.style.display = 'none';
//     })
    
// }


// document.addEventListener("click", (e) =>{
//     const isInsideCartWrapper = cartWrapper.contains(e.target);
//     if(!isInsideCartWrapper){
//         cartWrapper.style.display = 'none';
//     }
// })

// Fitur Hover Akun Saya
// const imgProfile = document.querySelector(".img-profile");
// const akunSayaWrapper = document.querySelector(".akun-saya-wrapper");

// imgProfile.addEventListener("mouseover", () =>{
//     akunSayaWrapper.style.display = 'flex';
// })

// document.addEventListener("click", (e) =>{
//     const isInsideAkunSayaWrapper = akunSayaWrapper.contains(e.target);
//     if (!isInsideAkunSayaWrapper) {
//         akunSayaWrapper.style.display = 'none';
//     }
// })