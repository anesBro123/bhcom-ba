import { Component } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-guest-footer',
  imports: [TranslatePipe],
  templateUrl: './guest-footer.component.html',
  styleUrl: './guest-footer.component.scss',
})
export class GuestFooterComponent {}
