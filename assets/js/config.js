/*!
 * Config.js
 * Created by iqnaul | https://github.com/iqnaul
 *
 * Copyright(c) 2017 Muhammad Iqnaul <https://github.com/iqnaul>
 * CC BY-NC-SA 4.0 Licensed. https://creativecommons.org/licenses/by-nc-sa/4.0/
 *
 * https://github.com/iqnaul/pdam-simplewebgis
 */


var map;
var au = 4493370fd6ce68405c5ca55a76124f8c2c90fb5c;
map = L.map('map').setView([-6.2293734, 107.0000682], 13);
// saran saya buat user baru di mapbox.com dan paste tokennya disini
var osm = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
});
osm.addTo(map);

// isikan warna untuk tiap kategori pipa, pastikan penulisan sudah sesuai dengan field data
function style_pipa(feature) {
          switch(String(feature.properties['id'])) { //'id' diganti field yang dijadikan acuan simbologi
              case '1': //diisi value dari field yang dijadikan acuan
                  return {
              pane: 'pane_pipa',
              opacity: 1,
              color: 'rgba(94,158,236,1.0)', //warna
              dashArray: '',
              lineCap: 'square',
              lineJoin: 'bevel',
              weight: 2.0, //tebal garis
              fillOpacity: 0,
          }
                  break;
              case '2':
                  return {
              pane: 'pane_pipa',
              opacity: 1,
              color: 'rgba(151,224,95,1.0)',
              dashArray: '',
              lineCap: 'square',
              lineJoin: 'bevel',
              weight: 2.0, //tebal garis
              fillOpacity: 0,
          }
                  break;
          }
      }
function pop_pipa(feature, layer) {
var popupContent = '<table>\
                    <tr>\
                    <td colspan="2"><strong>id</strong><br />' + (feature.properties['id'] !== null ? Autolinker.link(String(feature.properties['id'])) : '') + '</td>\
                    </tr>\
                    <tr>\
                    <td colspan="2"><strong>test</strong><br />' + (feature.properties['test'] !== null ? Autolinker.link(String(feature.properties['test'])) : '') + '</td>\
                    </tr>\
                    </table>';
          layer.bindPopup(popupContent, {maxHeight: 400});
      }
map.createPane('pane_pipa');
map.getPane('pane_pipa').style.zIndex = 400;
map.getPane('pane_pipa').style['mix-blend-mode'] = 'normal';
var pipa = new L.geoJson(null, {
      pane: 'pane_pipa',
      opacity: 1,
      clickable: true,
      style: style_pipa,
      onEachFeature: pop_pipa,
  },
);
// ubah pipa.geojson sesuai nama file php
$.getJSON("assets/data/pipa.geojson", function (data) {
  pipa.addData(data);
});
pipa.addTo(map)
map.addLayer(pipa);

//layer SR
function pop_sr(feature, layer) {
         var popupContent = '<table>\
                 <tr>\
                     <td colspan="2"><strong>id</strong><br />' + (feature.properties['id'] !== null ? Autolinker.link(String(feature.properties['id'])) : '') + '</td>\
                 </tr>\
             </table>';
         layer.bindPopup(popupContent, {maxHeight: 400});
     }

     function style_sr() {
         return {
             pane: 'pane_sr',
             opacity: 1,
             color: 'rgba(35,35,35,1.0)',
             dashArray: '',
             lineCap: 'butt',
             lineJoin: 'miter',
             weight: 1.0,
             fill: true,
             fillOpacity: 1,
             fillColor: 'rgba(23,216,146,1.0)',
         }
     }

     map.createPane('pane_sr');
            map.getPane('pane_sr').style.zIndex = 401;
             map.getPane('pane_sr').style['mix-blend-mode'] = 'normal';
             var sr = new L.geoJson(null, {
                 attribution: '<a href="">PDAM Kota Bekasi</a>',
                 pane: 'pane_sr',
                 onEachFeature: pop_sr,
                 style: style_sr,
             });
             $.getJSON("assets/data/sr.geojson", function (data) {
               sr.addData(data);
             });
           sr.addTo(map);
           map.addLayer(sr);


var overlays = {
  "Pipa": pipa,
  "SR": sr
};
var basemap ={osm}
L.control.layers(basemap, overlays).addTo(map);
