import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ImagenService {

  cargarImagenComoDataUrl(ruta: string): Promise<string> {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.src = ruta;
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const context = canvas.getContext('2d');
        context?.drawImage(img, 0, 0);

        const dataUrl = canvas.toDataURL('image/png');
        resolve(dataUrl);
      };

      img.onerror = (error) => {
        reject(error);
      };
    });
  }
}
