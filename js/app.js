var filterRange = [0, Infinity];
var data = {};
var districts;
var chartsActive = false;
var lineColor = ["step", ["get", 'width']]

for (var i=0; i<GROUPS.length; i++) {
  if (i==0) lineColor.push(GROUPS[0].color)
  else lineColor.push(GROUPS[i].value, GROUPS[i].color)
}


function enterMap() {
  var x = document.getElementById('infoWindow')
  x.style.display = "none";
  x.classList.remove("landing");
  x.classList.add("menu")
  var y = document.getElementById('enter')
  y.style.display = "none";
  var z = document.getElementById('landingClose')
  z.style.display = "block";
}


function toggleWindow(id) {
  var x = document.getElementById(id);
  if (x.style.display === "block") {
    x.style.display = "none";
  } else {
    x.style.display = "block";
    var windows = document.querySelectorAll('.window');
    Array.prototype.forEach.call(windows, function(element, index) {
      if (element.id != id) {
        element.style.display = 'none';
      }
    });
  }

}

/* When the user clicks on the button,
toggle between hiding and showing the dropdown content */
function toggleDropdown() {
  document.getElementById("chartDropdown").classList.toggle("show");
}

// Close the dropdown menu if the user clicks outside of it
window.onclick = function(event) {
  if (!event.target.matches('.dropdown-btn')) {
    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
}

mapboxgl.accessToken = MAPBOX_TOKEN;
var map = new mapboxgl.Map({
  container: 'map',
  style: MAPBOX_STYLE,
  center: CENTER,
  zoom: ZOOM,
  maxZoom: MAX_ZOOM,
  minZoom: MIN_ZOOM,
  maxBounds: MAX_BOUNDS,
  hash: true
});

map.addControl(new mapboxgl.NavigationControl());
map.on('load', function() {

  map.addSource('sidewalks', {
     type: 'vector',
     url: SIDEWALKS_TILESET
  });

  map.addLayer({
    'id': 'sidewalks',
    'type': 'fill',
    'source': 'sidewalks',
    'source-layer': SIDEWALKS_LAYER,
    'layout': {
    },
    'paint': {
      'fill-color': lineColor,
      'fill-opacity': 0.96,
    },
  },
  'road-label'
  );

  map.addLayer(
    {
      'id': '3d-buildings',
      'source': 'composite',
      'source-layer': 'building',
      'filter': ['==', 'extrude', 'true'],
      'type': 'fill-extrusion',
      'minzoom': 15,
        'paint': {
        'fill-extrusion-color': '#141c26',
        'fill-extrusion-height': [
          'interpolate',
          ['linear'],
          ['zoom'],
          15, 0,
          15.05, ['get', 'height']
        ],
        'fill-extrusion-base': [
          'interpolate',
          ['linear'],
          ['zoom'],
          15, 0,
          15.05, ['get', 'min_height']
        ],
        'fill-extrusion-opacity': [
          'interpolate',
          ['linear'],
          ['zoom'],
          15, 0,
          16, 0.95
        ]
      }
    },
    'road-label'
  );

  var popup = new mapboxgl.Popup({
    closeButton: false,
    closeOnClick: false
  });

  function addPopup(e) {

    map.getCanvas().style.cursor = 'pointer';

    var lineWidth = e.features[0].properties.width
    var lineColor = e.features[0].layer.paint['line-color']
    var coordinates = e.lngLat;
    var stopIndex;

    for (i=0; i < GROUPS.length; i++) {
      if (GROUPS[i + 1] == null) {
        if (lineWidth >= GROUPS[i].value) {
          groupIndex = i;
        }
      } else {
        if (lineWidth >= GROUPS[i].value && lineWidth < GROUPS[i + 1].value) {
          groupIndex = i;
        }
      }
    }

    lineColor = GROUPS[groupIndex].color

    var description =
      '<div class="name">Largeur de trottoir:</div>' +
      '<div class="width">' + (Math.round(lineWidth * 10) / 10) + ' ' + UNITS + '</div>' +
      '<div class="message">'+GROUPS[groupIndex].rating+'</div>'

    popup.setLngLat(coordinates)
    popup.setHTML(description)
    popup.addTo(map)

    popup._content.style.color = lineColor
    popup._content.style.borderColor = lineColor

    if (popup._tip.offsetParent.className.includes('mapboxgl-popup-anchor-bottom')) {
      popup._tip.style.borderTopColor = lineColor
    }
    if (popup._tip.offsetParent.className.includes('mapboxgl-popup-anchor-top')) {
      popup._tip.style.borderBottomColor = lineColor
    }
    if (popup._tip.offsetParent.className.includes('mapboxgl-popup-anchor-right')) {
      popup._tip.style.borderLeftColor = lineColor
    }
    if (popup._tip.offsetParent.className.includes('mapboxgl-popup-anchor-left')) {
      popup._tip.style.borderRightColor = lineColor
    }

    popup.addTo(map)
  }

  map.on('touchstart', 'sidewalks', function(e) {
    addPopup(e);
  })

  map.on('mousemove', 'sidewalks', function(e) {
    addPopup(e);
  });

  map.on('mouseleave', 'sidewalks', function() {
    map.getCanvas().style.cursor = '';
    popup.remove();
  });
});

function getLowHigh(index) {

  var low, high;

  if (GROUPS[index - 1] == null) {
    low = item.value
    high = Infinity
  }

  else {
    if (item.value == 0)
      low = 0
    else
      low = item.value

    high = GROUPS[index - 1].value - PRECISION
  }
  return [low, high]
}

// add a legend item
function addLegendItem(item, index) {

  if (GROUPS[index - 1] == null) {
    var low = item.value
    var high = Infinity
    var string = low + UNITS + '+'
  }

  else {
    if (item.value == 0)
      var low = 0
    else
      var low = item.value

    var high = GROUPS[index - 1].value - PRECISION
    var string = low + ' - ' + high + UNITS
  }

  var row = document.createElement("LI");
  var rowContent = document.createElement("DIV");
  var rowLeft = document.createElement("DIV");
  var color = document.createElement("DIV");
  var rowRight = document.createElement("DIV");

  rowLeft.innerHTML = "<p>" + item.rating + "</p>"
  rowLeft.classList.add("row-left");
  color.classList.add("color");
  color.setAttribute("style", "background:" + item.color + ";");
  rowLeft.appendChild(color)
  row.appendChild(rowLeft)
  rowRight.classList.add("row-right");
  rowRight.innerHTML = "<p>" + string + "</p>";
  row.appendChild(rowRight);
  document.getElementById("legend-main").appendChild(row);
}

GROUPS.reverse().forEach(addLegendItem);
GROUPS.reverse()

function addToDropdown(d) {

  for (var type in d) {

    names = []

    for (var area in d[type]) {

      names.push(area)

    }

    var collator = new Intl.Collator(undefined, {numeric: true, sensitivity: 'base'});
    names.sort(collator.compare)

    for (var i=0; i<names.length; i++) {

      if (document.getElementById("list" + type) != null) {

        var dropdown = document.getElementById("chartDropdown");
        var list = document.getElementById("list" + type);
        var row = document.createElement("LI");

        row.innerHTML = names[i]
        row.classList.add('dropdown-item')
        row.setAttribute("onclick","selectArea('" + type + "','" + names[i] + "');")
        list.appendChild(row)

      } else {

        var dropdown = document.getElementById("chartDropdown");
        var list = document.createElement("UL");
        var header = document.createElement("LI");
        var row = document.createElement("LI");

        list.id = "list" + type

        header.classList.add('dropdown-header')
        header.innerHTML = type
        list.appendChild(header)
        row.innerHTML = names[i]
        row.classList.add('dropdown-item')
        row.setAttribute("onclick","selectArea('" + type + "','" + names[i] + "');")
        list.appendChild(row)
        dropdown.appendChild(list)
      }
    }
  }
  console.log('added data to dropdown', d)
}

var brush;
var brushArea;
var selected = null;
var svg;


function selectArea(type, area) {

  document.getElementById('chartDropdownButton').innerHTML = area;

  if (type == 'Districts') {
    var district = data[type][area]

    if (district.feature.geometry.type == 'MultiPolygon') {
      polygon = turf.multiPolygon(district.feature.geometry.coordinates)
    } else {
      polygon = turf.polygon(district.feature.geometry.coordinates)
    }

    map.easeTo({
      center: turf.centerOfMass(polygon).geometry.coordinates,
      zoom: 13
    });
  }

  map.setFilter('sidewalks', undefined);
  updateChart(type, area)

}


function filterSidewalks(low, high) {

  if (low == high) {

    map.setFilter('sidewalks', false);

  } else {

    map.setFilter('sidewalks', ['all', ['>=', 'width', low], ['<', 'width', high]]);
    results = map.querySourceFeatures('sidewalks', {sourceLayer: SIDEWALKS_LAYER, filter: map.getFilter('sidewalks')})

  }

}

function updateBrush(range) {

  document.getElementById('removeBrush').style.visibility = "visible";

  if (filterRange[0] != range[0] || filterRange[1] != range[1]) {

    filterSidewalks(range[0], range[1]);
    filterRange = range;

  }
}

function removeBrush() {

  document.getElementById('removeBrush').style.visibility = "hidden";

  d3.select(".brush").call(brush.clear());
  svg.selectAll('.bar').style('fill-opacity', 0.9)

  map.setFilter('sidewalks', undefined);
  filterRange = [0, Infinity];

}
