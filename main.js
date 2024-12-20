import Draw from 'https://cdn.skypack.dev/ol@6.5.0/interaction/Draw.js';
import Map from 'https://cdn.skypack.dev/ol@6.5.0/Map.js';
import View from 'https://cdn.skypack.dev/ol@6.5.0/View.js';
import { OSM, Vector as VectorSource } from 'https://cdn.skypack.dev/ol@6.5.0/source.js';
import { Tile as TileLayer, Vector as VectorLayer } from 'https://cdn.skypack.dev/ol@6.5.0/layer.js';



const raster = new TileLayer({
  source: new OSM(),
});

const source = new VectorSource({ wrapX: false });

const vector = new VectorLayer({
  source: source,
});

const map = new Map({
  layers: [raster, vector],
  target: 'map',
  view: new View({
    center: [0, 0], // Pusatkan peta agar terlihat di awal
    zoom: 2,        // Tingkat zoom awal
  }),
});

const typeSelect = document.getElementById('type');

let draw; // global so we can remove it later
function addInteraction() {
  const value = typeSelect.value;
  if (value !== 'None') {
    draw = new Draw({
      source: source,
      type: value,
      freehand: true, // Memungkinkan gambar bebas
    });
    map.addInteraction(draw);
  }
}

/**
 * Handle change event.
 */
typeSelect.onchange = function () {
  if (draw) {
    map.removeInteraction(draw);
  }
  addInteraction();
};

addInteraction();
