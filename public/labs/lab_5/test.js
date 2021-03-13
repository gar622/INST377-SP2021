
function mapInit() {
    const mymap = L.map('mapid').setView([39.045753, -76.641273], 10);
  
    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}',{
      attribution:'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      maxZoom: 18,
      id: 'mapbox/streets-v11',
      tileSize: 512,
      zoomOffSet: -1,
      accessToken: 'pk.eyJ1IjoibWdhcjU3OTYiLCJhIjoiY2ttNGIxcTV5MDJ1azJubzVscW9heW9veiJ9.IRhI7WElJukvcf0Ap8Bf8g'
    }).addTo(mymap);
    console.log('mymap', mymap)
    return mymap;
  }
  
  async function dataHandler(mapFromLeafLet){
    const form = document.querySelector('#search-form');
    const search = document.querySelector('#search');
    const targetList = document.querySelector('.target-list');
    const replyMessage = document.querySelector('.reply-message');
  
    const request = await fetch ('/api');
    const data = await request.json();
  
    form.addEventListener('submit', async(event) => {
        targetList.innerTest = '';   
       
        event.preventDefault();
        console.log('submit fired', search.value);
      
        const filtered = data.filter((record) => record.zip.includes(search.value) && record.geocoded_column_1);
        const topFive = filtered.slice(0,5);
      
        filtered.forEach((item) => {
          const longLat = item.geocoded_column_1.coordinates;
          console.log('markerLongLat', longLat[0], longLat[1]);
          const marker = L.marker([longLat[1], longLat[0]]).addTo(mapFromLeafLet);
                
          const appendItem = document.createElement('li');
          appendItem.classList.add('block');
          appendItem.classList.add('list-item');
          appendItem.innterHTML = `<div class = "list-header is-size-5">${item.name}</div><address class="is-size-6">${item.address_line_1}</address>`;
          targetList.append(appendItem);
        });
        
        const {coordinates} = topFive[0]?.geocoded_column_1;
        console.log('viewSet coords', coordinates);
        mapFromLeafLet.panTo([coordinates[1], coordinates[0]], 0);

    });  


    search.addEventListener('input', (event) => {
        console.log('input', event.target.value);
        if(search.value.length === 0) {
          //no matches found code??
          replyMessage.innerText ='';
          replyMessage.classList.remove('box');
        }
    });
}

async function windowActions(){
    console.log('window loaded');
    const endpoint = 'https://data.princegeorgescountymd.gov/resource/umjn-t2iz.json';
    const request = await fetch(endpoint);
    const data = await request.json();
    const mapObject = mapInit();
    await dataHandler(mapObject);
    

    function findMatches(wordToMatch, data){
      console.log('find matches')
      return data.filter(place => {
          const regex = new RegExp(wordToMatch, 'gi');
          return place.category.match(regex) || place.name.match(regex);
        });
      }   
          
          function displayMatches(event){
            console.log('display')
            const matchArray = findMatches(event.target.value, data);
            const html = matchArray.map(place => {
                const regex = new RegExp(event.target.value, 'gi');
                const restName = place.name; 
    
                return `
                <div class="box1">
                    <li>
                    ${restName}<br>
                    ${place.zip}
                    </li>
                </div>
                `;
            }).join('');
            suggestions.innerHTML = html;
        }
    
        const searchInput = document.querySelector('.userform');
        const suggestions = document.querySelector('.suggestions');
        
        searchInput.addEventListener('change', displayMatches);
        searchInput.addEventListener('keyup', (evt) => {
            evt.preventDefault()
            displayMatches(evt)
      
          
      });
}


window.onload = windowActions;