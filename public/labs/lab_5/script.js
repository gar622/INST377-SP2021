
function mapScript(){
  const mymap = L.map('mapid').setView([38.9897, -76.9378], 13);

  L.titleLayer(''),{
    attribution:,
    maxZoom:,
    id:,
    tileSize: 512,
    accessToken:
  }).addTo(mymap);
  console.log('mymap', mymap)
  return mymap;
}

async function dataFilter(mapFromMapFunction){
  const form = document.querySelector('#search-form');
  const search = document.querySelector('#search');
  const targetList = document.querySelector('.target-list');
  const replyMessage = document.querySelecctor('.reply-message');

  const request = await fetch ('/api');
  const data = await request.json();
}



form.addEventListener('submit', async(event) => {
  targetList.innerTest = '';

  event.preventDefault();
  console.log('submit fired', search.value);


  const filter = data.filter((record) => record.zip.inclues(search.value) && record.geocoded_column_1);
  const topFive = filtered.slice(0,5);

  if(topFive.length < 1) {
    replyMessage.classList.add('box');
    replyMessage.innerText = 'No matches found';
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


search.addEventListener('input', (event) => {
  console.log('input', event.target.value);
  if(search.value.length === 0) {
    //no matches found code??
    replyMessage.innerText ='';
    replyMessage.classList.remove('box');
  }
});

function mapInit() {
  // follow the Leaflet Getting Started tutorial here
  const mymap = L.map('mapid').setView([51.505, -0.09],13);
  return mymap;

  
}

async function dataHandler(mapObjectFromFunction) {
  // use your assignment 1 data handling code here
  // and target mapObjectFromFunction to attach markers
}

async function windowActions() {
  console.log('window loaded');
  const mapObject = mapScript();
  await dataFilter(mapObject);
  const map = mapInit();
  await dataHandler(map);
}

window.onload = windowActions;