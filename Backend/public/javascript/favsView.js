const favsContainer = document.querySelector(".favs-data-container");
const userID = document.querySelector(".user-data").id;
let favCard = `<article class="cardFavs">
<a href="/product//detail"> <img src=/images/products/ alt="img product"></a>
<span class="icon-card-container">
    <svg xmlns="http://www.w3.org/2000/svg" class="fav-icon" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
        <path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
    </svg>
</span>
<span class="icon-card-container">                        
    <svg xmlns="http://www.w3.org/2000/svg" class="share-icon" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6" id="">
        <path fill-rule="evenodd" d="M15.75 4.5a3 3 0 11.825 2.066l-8.421 4.679a3.002 3.002 0 010 1.51l8.421 4.679a3 3 0 11-.729 1.31l-8.421-4.678a3 3 0 110-4.132l8.421-4.679a3 3 0 01-.096-.755z" clip-rule="evenodd" />
    </svg>
</span>   
<a href="/product//detail">                       
    <div class="content-art">
        <h3 class="p-title"></h3>
        <p class="p-description"></p>
        <p class="price"></p>
    </div>
</a> 
</article>`

let favsItemsArray = [];

async function getFavsForView () {
    let response = await fetch(`http://localhost:3001/api/favProducts/all/${userIDfav}/get`);
    let favsProductsData =  await response.json();
    if (favsProductsData.meta.success){
        favsItemsArray = favsProductsData.data.favItems;
    };
};


setTimeout(async () => {
    await getFavsForView();
    
    if(favsItemsArray.length > 0){
        favsItemsArray.forEach(favItem => {
            const prod = favItem.favproduct;
            favsContainer.innerHTML += favCard;

            let card = document.querySelector('.cardFavs');
            card.id = prod.id;

            let detailLinks = card.querySelectorAll('a');
            detailLinks.forEach(a => {
                a.href = `/product/${prod.id}/detail`;
            });

            let image = card.querySelector("img");
            image.src = `/images/products/${prod.image}`;

            let pTitle = card.querySelector('.p-title');
            pTitle.textContent = prod.title;

            let favIcon = card.querySelector('.fav-icon');
            let shareIcon = card.querySelector('.share-icon');
            favIcon.id = prod.id;
            shareIcon.id = prod.id;

            let pDescription = card.querySelector('.p-description');
            pDescription.textContent = prod.description;

            if(prod.discount > 0){
                let discountDiv = document.createElement('div');
                discountDiv.classList.add('discount');
                discountDiv.innerHTML = `<b class="old-price">$${prod.price}</b><b class="off"> - ${prod.discount}% OFF</b>
                </div>`;
                pDescription.parentNode.insertBefore(discountDiv, pDescription.nextSibling);

                let pPrice = card.querySelector('.price');
                pPrice.textContent = `$ ${Math.round(((prod.price)* ((100 - prod.discount)/100 )), -2)}`;
            }else{
                let pPrice = card.querySelector('.price');
                pPrice.textContent = `$ ${prod.price}`;   
            };

            card.classList.remove('cardFavs');
            card.classList.add('cardFavs-active');    
        });
    };
}, 200);

setTimeout(() => {
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
    
}, 250);
