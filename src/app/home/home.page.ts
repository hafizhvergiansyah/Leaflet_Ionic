import { Component } from '@angular/core';
import * as L from 'leaflet';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  map!: L.Map;

  constructor() {}

  onOnInit() {}

  ionViewDidEnter() {
    this.map = L.map('mapId').setView([-7.5662, 110.8275], 14);

    // Menambahkan TileLayer
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.map);

    const customIcon = L.icon({
      iconUrl: 'https://www.freepnglogos.com/uploads/lokasi-logo-png/lokasi-logo-house-location-marker-icon-transparent-png-svg-vector-24.png', 
      iconSize: [80, 80], 
      iconAnchor: [12, 41],
      popupAnchor: [1, -34]
    });

    // Marker di Keraton Surakarta
    const markerKeraton = L.marker([-7.5662, 110.8275], { icon: customIcon }).addTo(this.map);
    const imageKeraton = 'https://th.bing.com/th/id/OIP.AyQ1MfbDtcbEw9nefde9qgHaD8?rs=1&pid=ImgDetMain';

    markerKeraton.bindPopup(`
      <b>Keraton Surakarta</b><br>
      Pusat kebudayaan Jawa dan tempat tinggal Sultan Surakarta.<br>
      <img src="${imageKeraton}" alt="Keraton Surakarta" style="max-width: 100%; height: auto;"/>
    `).openPopup();

    // Marker di UNS
    const markerUNS = L.marker([-7.558, 110.856], { icon: customIcon }).addTo(this.map);
    const imageUNS = 'https://uns.ac.id/id/wp-content/uploads/2021/04/uns-masuk-peringkat-201-300-dunia.jpeg';

    markerUNS.bindPopup(`
      <b>Universitas Sebelas Maret (UNS)</b><br>
      Salah satu universitas terkemuka di Indonesia.<br>
      <img src="${imageUNS}" alt="UNS" style="max-width: 100%; height: auto;"/>
    `);

    // Marker di Pasar Legi
    const markerPasar = L.marker([-7.562723450414307, 110.82424399421002], { icon: customIcon }).addTo(this.map);
    const imagePasar = 'https://awsimages.detik.net.id/community/media/visual/2021/12/04/pasar-legi-solo_169.jpeg?w=700&q=90';

    markerPasar.bindPopup(`
      <b>Pasar Legi Solo</b><br>
      Pasar tradisional yang populer di Surakarta.<br>
      <img src="${imagePasar}" alt="Pura Mangkunegaran" style="max-width: 100%; height: auto;"/>
    `);

    // Marker di UMS
    const markerUMS = L.marker([-7.5580102187851095, 110.77167260995654], { icon: customIcon }).addTo(this.map);
    const imageUMS = 'https://1.bp.blogspot.com/-I3fehN-OPmQ/WNTJ0rVqfHI/AAAAAAAABzk/3rXjxuryaa8SdvQ_Lu2FXbclh7NJN1HuACLcB/s1600/UMS.jpg';

    markerUMS.bindPopup(`
      <b>Universitas Muhammadiyah Surakarta (UMS)</b><br>
      Universitas swasta terkenal di Surakarta.<br>
      <img src="${imageUMS}" alt="UMS" style="max-width: 100%; height: auto;"/>
    `);

    // Base maps
    const satelliteLayer = L.tileLayer('https://{s}.google.com/vt?x={x}&y={y}&z={z}&s=Ga', {
      maxZoom: 20,
      attribution: '&copy; <a href="https://www.google.com/intl/en_us/help/terms_maps.html">Google Maps</a>',
      subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
    });

    const topoLayer = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://opentopomap.org/copyright">OpenTopoMap</a>'
    });

    const osmLayer = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    });

    const cartoDBLayer = L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://carto.com/attributions">CARTO</a>'
    });

    // Menambahkan layer satellite sebagai base map awal
    satelliteLayer.addTo(this.map);

    // Menambahkan layer control
    const baseMaps = {
      'Satellite': satelliteLayer,
      'Topographic': topoLayer,
      'OpenStreetMap': osmLayer,
      'CartoDB Dark Matter': cartoDBLayer
    };

    L.control.layers(baseMaps).addTo(this.map);
  }
}
