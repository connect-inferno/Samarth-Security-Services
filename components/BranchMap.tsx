'use client';
import 'leaflet/dist/leaflet.css';

import { useEffect, useRef } from 'react';
import { branches, fullAddress, mapsHref } from '@/data/branches';

/** Sangli head-office Google Maps embed src */
const SANGLI_EMBED =
  'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3818.1313954280495!2d74.58858151073201!3d16.869393483865156!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc1191de17f8681%3A0x33d4b8036e1b1a22!2sSAMARTH%20SECURITY%20SERVICE!5e0!3m2!1sen!2sin!4v1786890393273!5m2!1sen!2sin';

export default function BranchMap({ className = '' }: { className?: string }) {
  // min-height is required for Leaflet to initialise — zero-height containers produce blank maps
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<import('leaflet').Map | null>(null);

  useEffect(() => {
    if (!mapRef.current) return;

    // `cancelled` flag prevents the async callback from touching the DOM after
    // React StrictMode's first cleanup has already run.
    let cancelled = false;

    (async () => {
      const L = (await import('leaflet')).default;

      // Bail out if unmounted or the container already has a Leaflet instance
      if (cancelled || !mapRef.current) return;
      if ('_leaflet_id' in mapRef.current) return;

      // Fix Leaflet's broken default icon paths when bundled by webpack/Next
      delete (L.Icon.Default.prototype as unknown as Record<string, unknown>)._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
        iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
        shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
      });

      // ── Custom SVG icon factories ──────────────────────────────────────────
      function makeIcon(color: string, label: string, size = 36) {
        const svg = `
          <svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size + 10}" viewBox="0 0 ${size} ${size + 10}">
            <filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
              <feDropShadow dx="0" dy="2" stdDeviation="2" flood-opacity="0.3"/>
            </filter>
            <circle cx="${size / 2}" cy="${size / 2}" r="${size / 2 - 2}" fill="${color}" filter="url(#shadow)" stroke="white" stroke-width="2.5"/>
            <text x="${size / 2}" y="${size / 2 + 5}" text-anchor="middle" fill="white" font-size="${size * 0.32}" font-family="Arial, sans-serif" font-weight="bold">${label}</text>
            <polygon points="${size / 2},${size + 8} ${size / 2 - 6},${size - 4} ${size / 2 + 6},${size - 4}" fill="${color}"/>
          </svg>`;
        return L.divIcon({
          html: svg,
          className: '',
          iconSize: [size, size + 10],
          iconAnchor: [size / 2, size + 10],
          popupAnchor: [0, -(size + 10)],
        });
      }

      const headIcon = makeIcon('#c5221f', 'HQ', 42);
      const branchIcon = makeIcon('#0a2540', 'B', 32);

      // ── Initialise Map ─────────────────────────────────────────────────────
      const map = L.map(mapRef.current, {
        center: [18.5, 75.8],
        zoom: 7,
        scrollWheelZoom: false,
        zoomControl: true,
      });

      mapInstanceRef.current = map;

      // OpenStreetMap tiles (free, no API key)
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 19,
      }).addTo(map);

      // ── Place markers ──────────────────────────────────────────────────────
      branches.forEach((b) => {
        const icon = b.isHeadOffice ? headIcon : branchIcon;
        const marker = L.marker([b.coords.lat, b.coords.lng], { icon }).addTo(map);

        const address = fullAddress(b);
        const directionsUrl = mapsHref(b);
        const labelHtml = b.label
          ? `<span style="display:inline-block;background:#c5221f;color:white;font-size:9px;font-weight:700;letter-spacing:.06em;padding:2px 6px;border-radius:999px;text-transform:uppercase;margin-bottom:6px">${b.label}</span><br/>`
          : '';

        const embedHtml = b.isHeadOffice
          ? `<iframe src="${SANGLI_EMBED}" width="220" height="140" style="border:0;border-radius:6px;margin-top:8px;display:block;max-width:100%" allowfullscreen="" loading="lazy" referrerpolicy="strict-origin-when-cross-origin"></iframe>`
          : '';

        const popupContent = `
          <div style="font-family:'Inter',sans-serif;min-width:200px;max-width:260px">
            ${labelHtml}
            <strong style="font-size:14px;color:#0a2540;display:block;margin-bottom:4px">${b.city}</strong>
            <p style="font-size:12px;color:#4b5563;margin:0 0 8px">${address}</p>
            <a href="${directionsUrl}" target="_blank" rel="noopener noreferrer"
               style="display:inline-flex;align-items:center;gap:4px;font-size:11px;font-weight:700;color:#c5221f;text-decoration:none;">
              ↗ Open in Google Maps
            </a>
            ${embedHtml}
          </div>`;

        marker.bindPopup(popupContent, { maxWidth: 280, className: 'branch-popup' });

        // Only auto-open head office popup on desktop — on mobile it covers the whole map
        if (b.isHeadOffice && typeof window !== 'undefined' && window.innerWidth >= 640) {
          marker.openPopup();
        }
      });

      // Fit map to show all markers
      const allLatLngs = branches.map(
        (b) => [b.coords.lat, b.coords.lng] as [number, number]
      );
      map.fitBounds(allLatLngs, { padding: [40, 40] });

      // Force tile repaint in case the container wasn't fully sized on first mount
      setTimeout(() => map.invalidateSize(), 100);
    })();

    return () => {
      cancelled = true;
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  return (
    <div
      ref={mapRef}
      className={`h-full w-full rounded-lg ${className}`}
      aria-label="Interactive map showing Samarth Security branch locations across Maharashtra"
    />
  );
}
