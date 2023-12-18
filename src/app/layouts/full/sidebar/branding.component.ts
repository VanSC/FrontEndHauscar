import { Component } from '@angular/core';

@Component({
  selector: 'app-branding',
  template: `
    <div class="branding">
      <style>
        img {
          width: 100%;
          height: 100%;
        }
      </style>
      <a href="/page/dashboard">
        <img
          src="./assets/images/logos/logo.png"
          class="align-middle m-2"
        />
      </a>
    </div>
  `,
})
export class BrandingComponent {
  constructor() {}
}
