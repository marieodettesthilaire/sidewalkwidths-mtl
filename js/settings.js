var MAPBOX_TOKEN = 'pk.eyJ1IjoibWFyaWUtb2RldHRlIiwiYSI6ImNrYThvaTQ0bTBpZnIyenVseTN5bzUzZjYifQ.OYae7kSfn4DHI_xJ1nNAbg'
var MAPBOX_STYLE = 'mapbox://styles/marie-odette/ckachg18u4kt61is2f8nwmyip'
var SIDEWALKS_TILESET = 'mapbox://marie-odette.51iiymxx'
var SIDEWALKS_LAYER = 'sidewalkwidths_mtl-7md24x'
//var MAPBOX_TOKEN = 'pk.eyJ1IjoibWFyaWUtb2RldHRlIiwiYSI6ImNrYThvaTQ0bTBpZnIyenVseTN5bzUzZjYifQ.OYae7kSfn4DHI_xJ1nNAbg'
//var MAPBOX_STYLE = 'mapbox://styles/marie-odette/ckachg18u4kt61is2f8nwmyip'
//var SIDEWALKS_TILESET = 'mapbox://marie-odette.9ywq8spu'
//var SIDEWALKS_LAYER = 'sidewalkwidths_mtl-1gnbyd'

var UNITS = 'm' // change to 'm' for meters
var PRECISION = 0.1 // the number of decimal places
var CENTER = [-73.571439, 45.499761]
var MAX_BOUNDS =[[-73.818156, 45.292746], 
			[-73.318156, 45.692746]]
var ZOOM = 14
var MAX_ZOOM = 22
var MIN_ZOOM = 13

    
var GROUPS = [
  {
    "value": 0.0,
    "rating": "Impossible",
    "color": "#FF0049"
  },
  {
    "value": 1.0,
    "rating": "Ce trottoir est trop étroit pour la distanciation sociale.",
    "color": "#FF461E"
  },
  {
    "value": 2.0,
    "rating": "La distanciation sociale est diffcile sur ce trottroir.",
    "color": "#FF9300"
  },
  {
    "value": 3.0,
    "rating": "La distanciation sociale est possible sur ce trottroir.",
    "color": "#e4da27"
  },
  {
    "value": 5.0,
    "rating": "La distanciation sociale est facile sur ce trottroir",
    "color": "#1ce262"
  },
  {
    "value": 7.0,
    "rating": "La distanciation sociale est très facile sur ce trottroir.",
    "color": "#00D2FF"
  },

]
