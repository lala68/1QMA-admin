import { Component } from '@angular/core';
import { FooterComponent } from '@coreui/angular';
import {ConfigService} from "../../../services/config.service";

@Component({
    selector: 'app-default-footer',
    templateUrl: './default-footer.component.html',
    styleUrls: ['./default-footer.component.scss'],
    standalone: true,
})
export class DefaultFooterComponent extends FooterComponent {
  constructor(public configService: ConfigService) {
    super();
  }
}
