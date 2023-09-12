window.onload = function () {

    let openModalLink = document.getElementById('openModalLink');
    let closeModalButton = document.getElementById('closeModalButton');
    let modal = document.getElementById('myModal');
    let cancelLogoutLink = document.getElementById('cancelLogoutLink');
    let confirmLogoutLink = document.getElementById('confirmLogoutLink');

    if(openModalLink){
        openModalLink.onclick = function (e) {
            e.preventDefault(); 
            const userOptions = document.getElementById('userOptions');
            userOptions.classList.toggle('show');
            modal.style.display = 'block';
        };
    };
   
    closeModalButton.onclick = function () {
        modal.style.display = 'none';
    }

    cancelLogoutLink.onclick = function (e) {
        e.preventDefault(); 
        modal.style.display = 'none';
    }

    confirmLogoutLink.onclick = function (e) {
        modal.style.display = 'none';
        window.location.href = '/user/logout';
    }

    // To handle logout when any link to "/user/logout" is clicked:
    document.addEventListener("click", function (event) {
        if (event.target.tagName === "A") {
            if (event.target.getAttribute("href") === "/user/logout") {
                event.preventDefault()
                modal.style.display = 'block';
            };
        };
    });

    const allAddCartBtns = Array.from(document.querySelectorAll(".btn-product"));
    const cartItemCountInput = document.getElementById('cartItemCount');
    const userID = document.querySelector(".user-data").id;
    let shoppingSessionFlag = false;
    let shoppingSession;
    
    //-----------------------------------Cart counter------------------------------------------//
    const amountInputDetail = document.getElementById('amount');
    let quantityFront = 1;
    if (amountInputDetail) {
        amountInputDetail.onchange = () => {
            let value = Number(amountInputDetail.value);
            value > 50 || value < 1?  quantityFront = 1 : quantityFront = value;
        };
    };

    if (!userID) {
        cartItemCountInput.value = 0;
    } else {
        async function initCountInput() {
            let response = await fetch(`http://localhost:3001/api/cart/shoppingSession/${userID}/get`);
            shoppingSession = await response.json();
            if (shoppingSession.meta.success) {
                cartItemCountInput.value = Number(shoppingSession.data.cartItems.length);
            } else {
                cartItemCountInput.value = 0;
            };
        };
        initCountInput();
    };

    //-----------------------------------Handle Shopping Cart------------------------------------------//
    let alertMessage = "Debes iniciar sesión para agregar ítems al carrito. ¿Deseas iniciar sesión ahora?";

    allAddCartBtns.forEach(btn => {
        btn.addEventListener("click", async e => {
            e.preventDefault();

            if (!shoppingSessionFlag) {
                if (!userID) {
                    shoppingSessionFlag = false;
                    showCustomLogoutModal(alertMessage);
                } else {
                    let response = await fetch(`http://localhost:3001/api/cart/shoppingSession/${userID}/get`);

                    shoppingSession = await response.json();

                    if (shoppingSession.meta.success) {
                        shoppingSessionFlag = true;
                    } else {
                        let response = await fetch(`http://localhost:3001/api/cart/shoppingSession/${userID}/init`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: "" })
                        shoppingSession = await response.json();
                        if (shoppingSession.meta.success) {
                            shoppingSessionFlag = true;
                        };
                    };
                };
            };

            function showCustomLogoutModal(message) {
                let modal = document.getElementById('logoutModal');
                let modalMessage = document.getElementById('logoutModalMessage');

                modalMessage.textContent = message;
            
                modal.style.display = 'block';
            
                document.getElementById('cancelLogoutButton').addEventListener('click', function(e) {
                e.preventDefault();
                modal.style.display = 'none';
                });
            
                document.getElementById('acceptLogoutButton').addEventListener('click', function() {
                modal.style.display = 'none';
                window.location.href = '/user/login';
                });
            }

            const idProduct = Number(btn.id);
            const idSession = Number(shoppingSession.data.id);
            const url = `http://localhost:3001/api/cart/add`;
            const data = {
                product_id: idProduct,
                shopping_session_id: idSession,
                quantity: quantityFront
            };
     
            const requestOptions = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            };

            try {
                const response = await fetch(url, requestOptions);
                const responseData = await response.json();

                if (responseData.meta.success) {
                    btn.classList.add('clicked');
                    btn.textContent = "Producto agregado"
                    setTimeout(() => {
                        btn.classList.remove('clicked');
                        !amountInputDetail ? btn.textContent = "Agragar otra unidad al carrito" : null
                    }, 3001);
                    if (responseData.meta.created) {
                        cartItemCountInput.value++;
                    };
                };

            } catch (error) {
                console.error('Error:', error);
            };
        });
    });

    //-----------------------------------FAV ICONS------------------------------------------//

    const favIcons = Array.from(document.getElementsByClassName('fav-icon'));
    const userIDfav = document.querySelector(".user-data").id;
    let preFavsStorage;

    if (!userIDfav) {
        preFavsStorage = localStorage.getItem('favs');
        favIcons.forEach(fIcon => {
            if (preFavsStorage != null && preFavsStorage != '') {
                let prevFavArray = preFavsStorage.split(",");
                if (prevFavArray.includes(fIcon.id)) {
                    fIcon.classList.add('fav-icon-selected');
                    fIcon.setAttribute('fill', 'currentColor');
                };
            };
        });
    } else {
        async function initPrevsFavs() {
            let response = await fetch(`http://localhost:3001/api/favProducts/all/${userID}/get`);
            let prevFavsData = await response.json();

            if (prevFavsData.meta.success) {
                localStorage.setItem("favs", prevFavsData.data.favStorage);
                preFavsStorage = localStorage.getItem('favs');
                favIcons.forEach(fIcon => {
                    if (preFavsStorage != null && preFavsStorage != '') {
                        let prevFavArray = preFavsStorage.split(",");
                        if (prevFavArray.includes(fIcon.id)) {
                            fIcon.classList.add('fav-icon-selected');
                            fIcon.setAttribute('fill', 'currentColor');
                        };
                    };
                });
            } else {
                preFavsStorage = localStorage.getItem('favs');
            };
        };
        initPrevsFavs();
    };
 
    favIcons.forEach(fIcon => {

        fIcon.onclick = function () {
            let favDivMsg = document.createElement('span');
            favDivMsg.classList.add('share-msg');
            favDivMsg.classList.add('fav');

            if (!Array.from(fIcon.classList).includes('fav-icon-selected')) {
                let favProducts = localStorage.getItem('favs');
                if (favProducts != null) {
                    let favArray = favProducts.split(",");
                    favArray.push(fIcon.id);
                    localStorage.setItem("favs", favArray);
                } else {
                    localStorage.setItem("favs", fIcon.id);
                };
                fIcon.classList.add('fav-icon-selected');
                fIcon.setAttribute('fill', 'currentColor');

                favDivMsg.textContent = "Agregado a favoritos";
                fIcon.parentElement.appendChild(favDivMsg);
            } else {
                let favArray = localStorage.getItem('favs').split(",");
                let newFavArray = favArray.filter(item => item != fIcon.id);
                fIcon.classList.remove('fav-icon-selected');
                fIcon.setAttribute('fill', 'none');
                localStorage.setItem("favs", newFavArray);

                favDivMsg.textContent = "Se quitó de favoritos";
                fIcon.parentElement.appendChild(favDivMsg);
            };
            setTimeout(function () {
                fIcon.parentElement.removeChild(favDivMsg);
            }, 1500);
        };
    });
    
    //-----------------------------------SHARE ICONS------------------------------------------//
    
    setTimeout(() => {
        const shareIcons = Array.from(document.getElementsByClassName('share-icon'));
        shareIcons.forEach(shIcon => {
    
            shIcon.addEventListener('click', copyLink);
    
            async function copyLink() {
                let url = `http://localhost:3001/product/${shIcon.id}/detail`;
    
                try {
                    await navigator.clipboard.writeText(url);
    
                    shIcon.innerHTML = `<path fill-rule="evenodd" d="M19.902 4.098a3.75 3.75 0 00-5.304 0l-4.5 4.5a3.75 3.75 0 001.035 6.037.75.75 0 01-.646 1.353 5.25 5.25 0 01-1.449-8.45l4.5-4.5a5.25 5.25 0 117.424 7.424l-1.757 1.757a.75.75 0 11-1.06-1.06l1.757-1.757a3.75 3.75 0 000-5.304zm-7.389 4.267a.75.75 0 011-.353 5.25 5.25 0 011.449 8.45l-4.5 4.5a5.25 5.25 0 11-7.424-7.424l1.757-1.757a.75.75 0 111.06 1.06l-1.757 1.757a3.75 3.75 0 105.304 5.304l4.5-4.5a3.75 3.75 0 00-1.035-6.037.75.75 0 01-.354-1z" clip-rule="evenodd" />`;
                    let copiedDiv = document.createElement('span');
                    copiedDiv.textContent = "Enlace copiado! Ya lo puedes compartir donde desees.";
                    copiedDiv.classList.add('share-msg');
                    shIcon.parentElement.appendChild(copiedDiv);
                    setTimeout(function () {
                        shIcon.parentElement.removeChild(copiedDiv);
                    }, 2000); 
                } catch (error) {
                    console.error('No se pudo copiar el enlace: ', error);
                };
            };
        });    
    }, 280);

    ////////////////////////////////////////////////////////////////////

    // Search-bar script

    const searchInput = document.getElementById("search-input");
    const searchForm = document.getElementById('search-form');

    searchForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const productQuery = searchInput.value.trim();
        if (productQuery !== "") {
            searchForm.submit();
        }
    })

    ////////////////////////////////////////////////////////////////////

};

//----------------Store fav products into DDBB--------------//

const userIDfav = document.querySelector(".user-data").id;

async function favProductsStore(e) {
    let idProducts = localStorage.getItem('favs');
    let idProductsToStore = idProducts?.replace(/^,/, '');

    const url = `http://localhost:3001/api/favProducts/${userIDfav}/store`;
    const data = {
        favProducts: idProductsToStore,
    };
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    };
    try {
        const response = await fetch(url, requestOptions);
        const responseData = await response.json();

        if (!responseData.meta.success) {
            e.preventDefault();
        };
    } catch (error) {
        console.error('Hubo un error al cargar los productos favoritos: ', error);
    };
};

let urlActual = window.location.href;

userIDfav? window.addEventListener('beforeunload', favProductsStore) : ""; 




