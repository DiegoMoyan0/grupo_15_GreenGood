const favsContainer = document.querySelector(".favs-data-container");
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

getFavsForView();

setTimeout(() => {
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
