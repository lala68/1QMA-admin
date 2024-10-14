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
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-setting',
  standalone: true,
  imports: [CommonModule, ModalFooterComponent, ModalComponent, ModalHeaderComponent, ModalTitleDirective, ButtonCloseDirective, ModalBodyComponent, FormModule, SpinnerComponent, ReactiveFormsModule, ButtonDirective, IconDirective, RowComponent, ColComponent, TextColorDirective, CardComponent, CardHeaderComponent, CardBodyComponent, DocsExampleComponent, AccordionComponent, AccordionItemComponent, TemplateIdDirective, AccordionButtonDirective, BgColorDirective],
  templateUrl: './setting.component.html',
  styleUrl: './setting.component.scss'
})
export class SettingComponent {
  settings: any = [];
  loading: boolean = true;
  loadingSubmit: boolean = false;
  settingsForm: FormGroup;
  selectedType: any;
  id: any;
  settingTypes: any;
  displayForm: any = false;
  isEditing: boolean = false; // To track if we are editing or adding a new settin

  constructor(private gameService: GameService, private fb: FormBuilder) {
    this.settingsForm = this.fb.group({
      name: ['', [Validators.required]],
      key: ['', [Validators.required]],
      value: ['', [Validators.required]],
      type: ['', [Validators.required]]
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
        this.settings = data.data.settings;
        this.settingTypes = data.data.settingsTypes;
      }
    })
  }

  displayAddSetting(name: string | null = null, value: string | null = null, id: string | null = null,
                    key: string | null = null, type: any = '') {
    this.selectedType = type;
    this.isEditing = !!id; // Check if it's an edit (if `id` exists, it's an edit)
    this.id = id; // Set the ID

    const nameControl = this.settingsForm.get('name');
    if (nameControl && this.isEditing) {
      nameControl.disable(); // Disable name field during edit
    } else {
      nameControl?.enable(); // Enable name field when adding new setting
    }

    // Toggle form visibility and set form values based on add/edit mode
    this.displayForm = !this.displayForm;
    if (this.isEditing) {
      this.settingsForm.setValue({name: name, key: key, value: value, type: this.selectedType});
    } else {
      this.settingsForm.reset(); // Reset form for adding a new setting
    }
  }

  onTypeChange(event: Event): void {
    const selectedValue = (event.target as HTMLSelectElement).value;
    console.log('Selected value:', selectedValue);
    this.selectedType = selectedValue;

    // You can handle further logic based on the selected value here.
  }


  submitNewSetting() {
    this.loadingSubmit = true;
    const value = this.settingsForm.get('value')?.value;
    const type = this.settingsForm.get('type')?.value;
    if (this.id) {
      this.gameService.updateSettings(this.id, value, type).then(data => {
        this.loadingSubmit = false;
        if (data.status == 1) {
          this.displayForm = false;
          this.selectedType = '';
          this.getSettings();
        }
      })
    } else {
      this.gameService.postNewSettings(this.settingsForm.get('name')?.value, this.settingsForm.get('key')?.value, this.settingsForm.get('value')?.value, this.settingsForm.get('type')?.value).then(data => {
        this.loadingSubmit = false;
        if (data.status == 1) {
          this.displayForm = false;
          this.selectedType = '';
          this.getSettings();
        }
      })
    }
  }

}
