import {Component} from '@angular/core';
import {
  AccordionButtonDirective,
  AccordionComponent, AccordionItemComponent, BgColorDirective,
  ButtonCloseDirective,
  ButtonDirective, CardBodyComponent,
  CardComponent,
  CardHeaderComponent,
  ColComponent,
  FormModule,
  ModalBodyComponent,
  ModalComponent,
  ModalFooterComponent,
  ModalHeaderComponent,
  ModalTitleDirective,
  RowComponent,
  SpinnerComponent, TemplateIdDirective,
  TextColorDirective
} from "@coreui/angular";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {IconDirective} from "@coreui/icons-angular";
import {DocsExampleComponent} from "@docs-components/docs-example/docs-example.component";
import {GameService} from "../../services/game.service";

@Component({
  selector: 'app-setting',
  standalone: true,
  imports: [ModalFooterComponent, ModalComponent, ModalHeaderComponent, ModalTitleDirective, ButtonCloseDirective, ModalBodyComponent, FormModule, SpinnerComponent, ReactiveFormsModule, ButtonDirective, IconDirective, RowComponent, ColComponent, TextColorDirective, CardComponent, CardHeaderComponent, CardBodyComponent, DocsExampleComponent, AccordionComponent, AccordionItemComponent, TemplateIdDirective, AccordionButtonDirective, BgColorDirective],
  templateUrl: './setting.component.html',
  styleUrl: './setting.component.scss'
})
export class SettingComponent {
  settings: any = [];
  loading: boolean = true;
  loadingSubmit: boolean = false;
  settingsForm: FormGroup;
  id: any;
  displayForm: any = false;

  constructor(private gameService: GameService, private fb: FormBuilder) {
    this.settingsForm = this.fb.group({
      name: ['', [Validators.required]],
      key: ['', [Validators.required]],
      value: ['', [Validators.required]]
    });
  }

  ngOnInit() {
    this.getSettings();
  }

  async getSettings() {
    this.loading = true;
    this.gameService.getAllSettings().subscribe(data => {
      this.loading = false;
      if (data.status == 1) {
        this.settings = data.data;
      }
    })
  }

  displayAddSetting(name: any = null, value: any = null, id: any = null, key: any = null) {
    this.id = id;
    const nameControl = this.settingsForm.get('name');
    if (nameControl && this.id) {
      nameControl.disable();
    } else {
      nameControl?.enable();
    }
    this.displayForm = !this.displayForm;
    if (this.displayForm && value) {
      this.settingsForm.setValue({name: name, key: key, value: value})
    } else {
      this.settingsForm.reset();
    }
  }

  submitNewSetting() {
    this.loadingSubmit = true;
    const value = this.settingsForm.get('value')?.value;
    if (this.id) {
      this.gameService.updateSettings(this.id, value).then(data => {
        this.loadingSubmit = false;
        if (data.status == 1) {
          this.displayForm = false;
          this.getSettings();
        }
      })
    } else {
      this.gameService.postNewSettings(this.settingsForm.get('name')?.value, this.settingsForm.get('key')?.value, this.settingsForm.get('value')?.value).then(data => {
        this.loadingSubmit = false;
        if (data.status == 1) {
          this.displayForm = false;
          this.getSettings();
        }
      })
    }
  }

}
