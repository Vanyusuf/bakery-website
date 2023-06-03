const allProduk = 'data/produk.json';

const renderProduk = (allProduk) =>{
    let content = '';
    const containerCards = document.querySelector(".container-cards");
    allProduk.forEach(produk => {
        content += `
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
                <button class="btn-buy"><span class="material-symbols-outlined">shopping_cart</span>ADD TO CART</button>
            </div>
        </div>    
        `
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
    if(value > 0){
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
                                content += `
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
                                        <button class="btn-buy"><span class="material-symbols-outlined">shopping_cart</span>ADD TO CART</button>
                                    </div>
                            </div>    
                                `
                            };
                            containerCards.innerHTML = content;
                        })
                    })
            }
        })
    });
};

filterKategori();