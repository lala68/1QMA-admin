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
  ThemeDirective
} from "@coreui/angular";
import {DocsExampleComponent} from "@docs-components/docs-example/docs-example.component";
import {GameService} from "../../services/game.service";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";

@Component({
  selector: 'app-account-types',
  standalone: true,
  imports: [ModalFooterComponent, ModalComponent, ModalHeaderComponent, ModalTitleDirective, ButtonCloseDirective, ModalBodyComponent, FormModule, ButtonDirective, SpinnerComponent, ReactiveFormsModule, IconDirective, RowComponent, ColComponent, TextColorDirective, CardComponent, CardHeaderComponent, CardBodyComponent, DocsExampleComponent, AccordionComponent, AccordionItemComponent, TemplateIdDirective, AccordionButtonDirective, BgColorDirective],
  templateUrl: './account-types.component.html',
  styleUrl: './account-types.component.scss'
})
export class AccountTypesComponent {
  accountTypes: any = [];
  displayForm: any = false;
  id: any;
  accountTypeForm: FormGroup;
  loading: boolean = true;
  loadingSubmit: boolean = false;
  public visible = false;
  fileToUpload: any
  imgSrc: any;
  error: any = '';

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

  displayAddAccount(name: any = null, id: any = null, path: any = null) {
    this.id = id;
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
      this.gameService.updateAccountType(this.id, name, this.fileToUpload).then(data => {
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

  deleteAccountType(id: any) {
    this.gameService.deleteAccountType(id).then(data => {
      if (data.status == 1) {
        this.visible = !this.visible;
        this.getAccountTypes();
      }
    })
  }

  toggleModal() {
    this.visible = !this.visible;
  }

  handleLiveDemoChange(event: any) {
    this.visible = event;
  }
}
