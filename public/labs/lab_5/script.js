
function mapInit() {
  // follow the Leaflet Getting Started tutorial here
  const mymap = L.map('mapid').setView([38.9897, -76.9378], 13);

  L.titleLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}',{
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

async function dataHandler(mapFromMapFunction){
  // use your assignment 1 data handling code here
  // and target mapObjectFromFunction to attach markers
  const form = document.querySelector('#search-form');
  const search = document.querySelector('#search');
  const targetList = document.querySelector('.target-list');
  const replyMessage = document.querySelecctor('.reply-message');

  const request = await fetch ('/api');
  const data = await request.json();

  async function windowsActions() {
    console.log('window loaded')
    const endpoint = 'https://data.princegeorgescountymd.gov/resource/umjn-t2iz.json';
    const request = await fetch(endpoint);
    const data = await request.json();
      const mapObject = mapScript();
      await dataFilter(mapObject);
      const map = mapInit();
      await dataHandler(map);
    }

    function findMatches(wordToMatch, data){
        console.log('find matches')
        return data.filter(place => {
            const regex = new RegExp(wordToMatch, 'gi');
            return place.zip.match(regex) || place.name.match(regex);
            
        });
    }

function displayMatches(event){
    console.log('display')
    const matchArray = findMatches(event.target.value, data);
    const html = matchArray.map(place => {
       const regex = new RegExp(event.target.value, 'gi');
       const zipCode = place.zip; 
  
       return `
       <div class="box1">
            <li>
            ${place.zip}<br>
            ${restName}<br>
            ${place.address_line_1}<br>
            ${place.address_line_2}<br>
            ${place.city}
            ${place.state}
            ${place.category}
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
       

form.addEventListener('submit', async(event) => {
  targetList.innerTest = '';

  
  event.preventDefault();
  console.log('submit fired', search.value);


  const filter = data.filter((record) => record.zip.includes(search.value) && record.geocoded_column_1);
  const topFive = filtered.slice(0,5);

  if(topFive.length < 1) {
    replyMessage.classList.add('box');
    replyMessage.innerText = 'No matches found';
    return;
  }

  console.table(topFive);

  topFive.forEach((item) => {
    const longLat = item.geocoded_column_1.coordinates;
    console.log('markerLongLat', longLat[0], longLat[1]);
    const marker = L.marker([longLat[1], longLat[0]]).addTo(mapFromMapFunction);

    const appendItem = document.createElement('li');
    appendItem.classList.add('block');
    appendItem.classList.add('list-item');
    appendItem.innterHTML = `<div class = "list-header is-size-5">${item.name}</div><address class="is-size-6">${item.address_line_1}</address>`;
    targetList.append(appendItem);
  });

  const {coordinates} = topFive[0]?.geocoded_column_1;
  console.log('viewSet coords', coordinates);
  mapFromMapFunction.panTo([coordinate[1], coordinates[0]], 0);
});
}