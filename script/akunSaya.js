// responsive navbar akun saya
// const hamburgerBtnAkunSaya = document.querySelector(".hamburgerAkunSaya");

// const leftAkun = document.querySelector(".left-akun");
// hamburgerBtnAkunSaya.addEventListener("click", function() {
    //     console.log("hhh")
    // })
    
// function ubah(){
//     leftAkun.classList.toggle("left-akun-muncul");
//     console.log('kkk')
//     // leftAkun.style.transform = 'translateX(0)'
//     function a(e) {
//         const targetElement = e.target;
      
//         if (!targetElement.closest(".left-akun") && !targetElement.closest(".hamburgerAkunSaya")) {
//           wrapperNav.classList.remove("left-akun-muncul");
//         }
//     };
//     a()
// }

const leftAkun = document.querySelector(".left-akun");
const wrapperNav = document.querySelector(".wrapper-nav");
const hamburgerBtnAkunSaya = document.querySelector(".hamburgerAkunSaya");


function ubah() {
    leftAkun.classList.toggle("left-akun-muncul");
}

hamburgerBtnAkunSaya.addEventListener("click", ubah);

function tutup(){
    document.addEventListener("click", function(e) {
        const targetElement = e.target;
      
        if (!targetElement.closest(".left-akun") && !targetElement.closest(".hamburgerAkunSaya")) {
          wrapperNav.classList.remove("left-akun-muncul");
          wrapperNav.classList.remove("left-akun");
        }
    });
}
tutup()