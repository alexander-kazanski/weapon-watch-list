import { weaponArray } from './weapons.js';

document.getElementById('body').innerHTML = weaponCardList();

const button = document.getElementById('weapon-filter')
if (button) button
.addEventListener('click', function() {
    const filterValue = document.getElementById('search').value;
    const weaponArrayFilter = weaponArray.filter(item => {
      return item.model.toLocaleLowerCase().includes(filterValue.toLocaleLowerCase())
    })
    document.getElementById('body').innerHTML = weaponArrayFilter.map(item => weaponCard(item)).join('')
})
window.addEventListener('click', function(e) {
  if (e.target.id !== 'add-to-watchlist') return;
  const parent = e.target.parentNode;
  const text = parent.children[0].textContent
  if (window.location.pathname === '/watchlist.html') {
    removeToWatchList(text);
    return
  }
  addToWatchList(
    text
  )
  alert(`Added ${text}`)
})

function weaponCardList() {
  if (window.location.pathname === "/index.html") {
    return weaponArray.map(item => weaponCard(item)).join('')
  } else {
    const storage = getWatchList()
    const storageArray = [];
    for (let storageName of storage) {
      for (let weaponObj of weaponArray) {
        if (storageName === weaponObj.model) {
          storageArray.push(weaponObj);
        }
      }
    }
    return storageArray.map(item => weaponCard(item)).join('')
  }
}


function getWatchList() {
  let list = localStorage.getItem('watchList') || []
  if (list.length) list = JSON.parse(list); 
  return list;
}

function addToWatchList(weapon) {
  let list = localStorage.getItem('watchList') || []
  if (list.length) list = JSON.parse(list); 
  localStorage.setItem('watchList', JSON.stringify(list.concat([weapon])))
}

function removeToWatchList(weaponName) {
  let list = localStorage.getItem('watchList') || [];
  if (list.length) list = JSON.parse(list); 
  list = list.filter(item => item !== weaponName)
  console.log(list);
  localStorage.setItem('watchList', JSON.stringify(list));
  alert(`Removed ${weaponName}`)
  const storage = getWatchList()
    const storageArray = [];
    for (let storageName of storage) {
      for (let weaponObj of weaponArray) {
        if (storageName === weaponObj.model) {
          storageArray.push(weaponObj);
        }
      }
    }
    document.getElementById('body').innerHTML = storageArray.map(item => weaponCard(item)).join('')
}


function weaponCard(weapon) {
  const { model, msrp, caliber, frameSize, features, imageUrl } = weapon;
  return `
    <div class="weapon-card">
      <img src="${imageUrl}" alt="${model}" />
      <span>
        <p class="title">${model}</p>
        <p class="caliber">
          <svg width="18" height="36" viewBox="0 0 18 36" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="Frame"><path id="Vector" d="M16.0347 32.7864L16.0347 31.8376L15.2222 31.8376L15.2222 30.9489L16.0038 30.0864L15.7416 13.4626L15.4279 13.4626C15.4279 4.71387 10.6249 2.65137 8.99996 2.65137C7.37499 2.65137 2.57205 4.71387 2.57205 13.4626L2.27894 13.4626L2.01668 30.0864L2.79831 30.9489L2.79831 31.8376L1.98583 31.8376L1.98583 32.7864L2.24809 33.1876L15.7724 33.1876L16.0347 32.7864Z" fill="#8D8D8D"></path></g></svg>
           ${caliber}</p>
        <p class="frame"><svg xmlns="http://www.w3.org/2000/svg" width="47" height="54" viewBox="0 0 47 54" fill="none"><path d="M27.1636 27.6797C26.8985 28.5059 27.2359 29.0292 28.0072 29.0843C29.2605 29.1945 29.6944 29.525 29.8631 30.9572C30.0318 32.3894 29.9836 33.8215 30.1282 35.2537C30.2487 36.5207 30.4415 37.7876 30.779 38.9719C31.2369 40.5693 32.2974 41.368 33.7918 41.368C35.6236 41.368 37.4554 41.3956 39.2631 41.368C40.7092 41.368 41.6733 40.5142 41.7939 38.8617C41.8903 37.5397 41.6251 34.8957 41.5528 34.8957C41.0226 32.3618 39.6969 30.3788 38.0339 28.6712C37.5036 28.1203 36.9733 27.5695 36.4431 27.0187C36.0092 26.5505 35.7682 25.9996 35.7923 25.3111C35.8164 24.953 35.7682 24.595 35.72 24.2645C35.479 22.5293 34.5149 21.6755 32.9964 22.0336C32.201 22.2264 31.4056 22.6395 30.7067 23.1352C29.5015 23.9615 28.4892 25.1183 27.6939 26.4678C27.501 26.8534 27.2841 27.2665 27.1636 27.6797ZM32.2251 25.7517C33.0205 25.5314 33.7918 26.0272 33.9846 26.881C34.1533 27.7072 33.6954 28.5059 32.9482 28.7263C32.201 28.9466 31.478 28.4509 31.3092 27.597C31.1164 26.8259 31.5503 25.9721 32.2251 25.7517Z" fill="#8D8D8D"></path><path d="M5.18213 16.2498V19.7476C5.18213 20.2158 5.51956 20.6014 5.92931 20.6014H6.09803V21.5929C9.01444 21.6205 11.9067 21.6205 14.8232 21.648C14.8232 23.3556 14.9196 25.0082 14.8232 26.6331C14.6062 29.9382 17.137 33.6563 21.1862 33.1881C23.9339 32.8852 25.356 31.4254 25.838 28.3407C26.0308 27.184 26.5611 26.2475 27.1637 25.3662C28.6098 23.2179 30.5139 21.7857 32.7073 20.7391C32.1047 20.4362 31.5262 20.1057 30.9237 19.8303C30.4175 19.5824 30.4657 19.2519 30.7067 18.8112C30.996 18.2879 31.4298 18.04 31.936 17.9849C32.2975 17.9299 32.6832 17.9849 33.0206 17.8748C33.2857 17.7646 33.6232 17.5443 33.7437 17.2688C33.9124 16.8557 33.6955 16.415 33.3339 16.2498C32.9483 16.057 32.4903 15.8367 32.0806 15.8642C31.0201 15.8917 29.9355 16.0295 28.875 16.1396C28.6339 16.1672 28.417 16.2773 28.1519 16.3324C27.6698 14.8452 27.2601 14.5422 25.9344 14.5422C21.0657 14.5146 16.2211 14.5146 11.3524 14.4596C11.0391 14.4596 10.7016 14.2668 10.4365 14.074C9.90623 13.6333 9.40008 13.1651 8.91803 12.6418C8.41187 12.091 7.56828 12.5316 7.56828 13.3303V14.432L6.21854 14.4871V15.4786H6.02572C5.51956 15.396 5.18213 15.7816 5.18213 16.2498ZM23.8375 19.1142C23.8375 19.2243 23.8134 19.362 23.7893 19.5273C22.3432 19.5273 20.9693 19.4998 19.5714 19.4998C19.4026 19.4998 19.2339 19.4998 19.0893 19.4722C18.6314 19.4171 18.318 19.1968 18.2939 18.6184C18.2698 18.1227 18.6073 17.7646 19.1134 17.7646C20.1498 17.7646 21.1862 17.7646 22.2226 17.7921C22.7529 17.7921 23.2591 17.8197 23.8134 17.8197C23.8375 18.343 23.8616 18.7286 23.8375 19.1142ZM19.1134 21.1523H19.7642C21.0898 21.1798 22.4155 21.1798 23.8134 21.2074C23.8134 21.8133 23.8134 22.3366 23.8375 22.97C22.1985 22.9425 20.6319 22.9425 19.0652 22.915C18.5832 22.915 18.2939 22.5294 18.2939 22.0612C18.318 21.5103 18.6314 21.1798 19.1134 21.1523ZM17.3057 25.7793C18.6555 25.6416 20.0052 25.6692 21.3791 25.6141C21.0657 26.3302 20.8247 27.0738 20.4873 27.7624C20.3185 28.1204 20.0052 28.3958 19.8124 28.7539C19.7883 28.8089 19.7642 28.8365 19.7401 28.8916C19.5955 29.2496 19.8365 29.6903 20.198 29.6628C20.2462 29.6628 20.2944 29.6352 20.3185 29.6352C20.8729 29.3047 21.4996 29.0017 21.9093 28.4784C22.4396 27.8174 22.777 26.9636 23.2591 26.1098C23.717 26.2751 24.0785 26.6607 24.1267 27.3217C24.2232 28.5886 23.958 29.7454 23.018 30.489C21.7165 31.5356 20.2462 31.6458 18.8001 30.9297C17.6673 30.3513 16.8237 29.167 16.5585 27.7899C16.3175 26.4954 16.438 25.862 17.3057 25.7793Z" fill="#8D8D8D"></path></svg> 
        ${frameSize}</p>
        <button id="add-to-watchlist" type="button">
          <img alt="crosshairs" src="https://images.contentstack.io/v3/assets/bltb61dcb3c40854cd9/blt0f5015c03eb41764/6352d92a79e53d728aa2459e/crosshairs-solid.svg" id="watch"/>
          ${window.location.pathname === '/index.html' ? 'Watchlist' : 'Remove'}
        </button>
        </span>
      <p class="msrp">MSRP: $${msrp}</p>
      <ul class="features">
        ${features.map(item => {
          return `<li>${item}</li>`
        }).join('')}
      </ul>
    </div>`
}
