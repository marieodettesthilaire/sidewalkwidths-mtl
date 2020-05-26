# Trottoirs Montréal

Trottoirs Montréal uses [Trottoir et îlot (Base de données des actifs de voirie)](http://donnees.ville.montreal.qc.ca/dataset/voirie-trottoir-ilot) to produce a map of sidewalk widths.

This repo contains the notebooks to reproduce this work, as well as the finished Trottoirs Montréal dataset in GeoJSON format.

This is inspired by, and forked from, Meli Harvey's Sidewalk Widths NYC project. We borrow code from the original project.

#### This readme is incomplete. Some figures will be added.

## Link
[www.sidewalkwidths.nyc](http://www.sidewalkwidths.nyc)

## Methodology

1) Polygons from Montreal open data

2) Approximate each polygon by a rectangle

3) Find width using polygon's perimeter and area

### Mapbox
Trottoirs Montréal uses Mapbox for the custom map style and serve the sidewalk widths data as a tileset. 

#### Tilesets
To create a tileset from your sidewalk width GeoJSON, following the [Mapbox documentation here](https://docs.mapbox.com/studio-manual/reference/tilesets/).
