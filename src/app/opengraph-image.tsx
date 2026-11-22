import { ImageResponse } from 'next/og';
import { OgCard } from '@/lib/og';

export const alt = 'SWAARA: Put a page down. Hear it read. A reading assistant for blind and low-vision people.';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OpenGraphImage() {
  return new ImageResponse(<OgCard />, { ...size });
}
