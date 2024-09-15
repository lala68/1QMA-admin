import {Component} from '@angular/core';
import {IconDirective} from "@coreui/icons-angular";
import {
  AccordionButtonDirective,
  AccordionComponent,
  AccordionItemComponent,
  BgColorDirective,
  ButtonCloseDirective,
  ButtonDirective,
  CardBodyComponent,
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
  SpinnerComponent,
  TemplateIdDirective,
  TextColorDirective,
  ToastBodyComponent, ToastComponent, ToasterComponent, ToastHeaderComponent
} from "@coreui/angular";
import {DocsExampleComponent} from "@docs-components/docs-example/docs-example.component";
import {GameService} from "../../services/game.service";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";

@Component({
  selector: 'app-account-types',
  standalone: true,
  imports: [ModalFooterComponent, ModalComponent, ModalHeaderComponent, ModalTitleDirective, ButtonCloseDirective,
    ModalBodyComponent, FormModule, ButtonDirective, SpinnerComponent, ReactiveFormsModule, IconDirective,
    RowComponent, ColComponent, TextColorDirective, CardComponent, CardHeaderComponent, CardBodyComponent,
    DocsExampleComponent, AccordionComponent, AccordionItemComponent, TemplateIdDirective, AccordionButtonDirective,
    BgColorDirective, ToastBodyComponent, ToastComponent, ToasterComponent, ToastHeaderComponent],
  templateUrl: './account-types.component.html',
  styleUrl: './account-types.component.scss'
})
export class AccountTypesComponent {
  accountTypes: any = [];
  displayForm: any = false;
  id: any;
  active: any;
  accountTypeForm: FormGroup;
  loading: boolean = true;
  loadingSubmit: boolean = false;
  public visible = false;
  fileToUpload: any
  imgSrc: any;
  error: any = '';
  selectedId: any;
  public visibleToast = false;
  message: any;
  position = 'top-end';
  percentage = 0;

  constructor(private gameService: GameService, private fb: FormBuilder) {
    this.accountTypeForm = this.fb.group({
      name: ['', [Validators.required]],
    });
  }

  ngOnInit() {
    this.getAccountTypes();
  }

  async getAccountTypes() {
    this.loading = true;
    this.gameService.getAccountTypes().subscribe(data => {
      this.loading = false;
      if (data.status == 1) {
        this.accountTypes = data.data;
      }
    })
  }

  displayAddAccount(name: any = null, id: any = null, active: any = null, path: any = null) {
    this.id = id;
    this.active = active;
    this.imgSrc = '';
    this.error = '';
    this.displayForm = !this.displayForm;
    if (this.displayForm && name) {
      this.accountTypeForm.patchValue({name: name});
      this.imgSrc = path;
    } else {
      this.accountTypeForm.reset();
    }
  }

  submitNewAccountType() {
    this.loadingSubmit = true;
    this.error = '';
    const name = this.accountTypeForm.get('name')?.value;
    if (this.id) {
      this.gameService.updateAccountType(this.id, name, this.active, this.fileToUpload).then(data => {
        this.loadingSubmit = false;
        if (data.status == 1) {
          this.displayForm = false;
          this.getAccountTypes();
        } else {
          this.error = data?.message;
        }
      })
    } else {
      this.gameService.postNewAccountType(name, this.fileToUpload).then(data => {
        this.loadingSubmit = false;
        if (data.status == 1) {
          this.displayForm = false;
          this.getAccountTypes();
        } else {
          this.error = data?.message;
        }
      })
    }
  }

  handleFileInput(event: any) {
    this.fileToUpload = event.target.files[0];
  }

  deleteAccountType() {
    this.gameService.deleteAccountType(this.selectedId).then(data => {
      if (data.status == 1) {
        this.visible = !this.visible;
        this.getAccountTypes();
      }
    })
  }

  toggleModal(id: any = null) {
    this.visible = !this.visible;
    if (id) {
      this.selectedId = id;
    }
  }

  handleLiveDemoChange(event: any) {
    this.visible = event;
  }

  toggleToast() {
    this.visibleToast = !this.visibleToast;
  }

  onVisibleChange($event: boolean) {
    this.visibleToast = $event;
    this.percentage = !this.visibleToast ? 0 : this.percentage;
  }

  onTimerChange($event: number) {
    this.percentage = $event * 25;
  }

  onCheckedChange(id: any, name: any, event: Event): void {
    this.loading = true
    const inputElement = event.target as HTMLInputElement;

    this.gameService.updateAccountType(id, name, inputElement.checked).then(data => {
      if (data?.status == 1) {
        this.message = data?.message;
      } else {
        this.message = data?.message;
      }
      this.getAccountTypes();
      this.toggleToast();
    })
    console.log('Checkbox checked state:', inputElement.checked);
    // Additional logic when the checked state changes
  }
}
