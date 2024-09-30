import { Component } from '@angular/core';
import * as L from 'leaflet';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  map!: L.Map;
  baseMaps: any = {}; // Store base map layers

  constructor() {}

  ionViewDidEnter() {
    // Initialize the map and set the view
    this.map = L.map('mapId').setView([51.505, -0.09], 10);

    // Define multiple base maps
    this.baseMaps = {
      osm: L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }),
      satellite: L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.opentopomap.org/copyright">OpenTopoMap</a> contributors'
      }),
      dark: L.tileLayer('https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>'
      }),
      terrain: L.tileLayer('https://tile.opentopomap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://opentopomap.org/">OpenTopoMap</a>'
      })
    };

    // Add the default base map (OSM) to the map
    this.baseMaps.osm.addTo(this.map);

    // Add a custom marker with a popup
    const customIcon = L.icon({
      iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
      iconSize: [38, 50],
      iconAnchor: [22, 50],
      popupAnchor: [-3, -40]
    });

    const marker = L.marker([51.505, -0.09], { icon: customIcon }).addTo(this.map);
    marker.bindPopup("<b>Custom Marker!</b><br>This marker has a custom icon.").openPopup();
  }

  // Handle base map selection change
  onBaseMapChange(event: any) {
    // Clear existing base layers
    this.map.eachLayer((layer: any) => {
      if (layer instanceof L.TileLayer) {
        this.map.removeLayer(layer);
      }
    });

    // Add the selected base map
    const selectedBaseMap = event.detail.value;
    this.baseMaps[selectedBaseMap].addTo(this.map);
  }
}
