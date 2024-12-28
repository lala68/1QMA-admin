import {Component, OnInit} from '@angular/core';
import {
  AccordionButtonDirective,
  AccordionComponent,
  AccordionItemComponent,
  BgColorDirective, ButtonCloseDirective,
  ButtonDirective,
  CardBodyComponent,
  CardComponent,
  CardHeaderComponent,
  ColComponent,
  FormControlDirective,
  FormDirective,
  FormModule, ModalBodyComponent,
  ModalComponent,
  ModalFooterComponent,
  ModalHeaderComponent, ModalTitleDirective,
  RowComponent,
  SpinnerComponent,
  TemplateIdDirective,
  TextColorDirective, ToastBodyComponent, ToastComponent, ToasterComponent, ToastHeaderComponent
} from "@coreui/angular";
import {DocsExampleComponent} from "@docs-components/docs-example/docs-example.component";
import {GameService} from "../../services/game.service";
import {IconDirective} from "@coreui/icons-angular";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {Environment} from "@angular/cli/lib/config/workspace-schema";
import {environment} from "../../../environments/environment";

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [CommonModule, ModalFooterComponent, ModalComponent, ModalHeaderComponent, ModalTitleDirective,
    ButtonCloseDirective, ModalBodyComponent, FormModule, SpinnerComponent, ReactiveFormsModule, ButtonDirective,
    IconDirective, RowComponent, ColComponent, TextColorDirective, CardComponent, CardHeaderComponent,
    CardBodyComponent, DocsExampleComponent, AccordionComponent, AccordionItemComponent, TemplateIdDirective,
    AccordionButtonDirective, BgColorDirective, ToastBodyComponent,
    ToastComponent,
    ToasterComponent,
    ToastHeaderComponent,],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss'
})
export class CategoriesComponent implements OnInit {
  categories: any = [];
  displayForm: any = false;
  id: any;
  categoryForm: FormGroup;
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
  environment = environment;

  constructor(private gameService: GameService, private fb: FormBuilder) {
    this.categoryForm = this.fb.group({
      name: ['', [Validators.required]]
    });
  }

  ngOnInit() {
    this.getCategories();
  }

  async getCategories() {
    this.loading = true;
    this.gameService.getCategories().subscribe(data => {
      this.loading = false;
      if (data.status == 1) {
        this.categories = data.data;
      }
    })
  }

  displayAddCategory(name: any = null, id: any = null, path: any = null) {
    this.id = id;
    this.imgSrc = '';
    this.error = '';
    this.displayForm = !this.displayForm;
    if (this.displayForm && name) {
      this.categoryForm.setValue({name: name});
      this.imgSrc = path;
    } else {
      this.categoryForm.reset();
    }
  }

  handleFileInput(event: any) {
    this.fileToUpload = event.target.files[0];
  }

  submitNewCategory() {
    this.loadingSubmit = true;
    this.error = '';
    const name = this.categoryForm.get('name')?.value;
    if (this.id) {
      this.gameService.updateCategory(this.id, name, this.fileToUpload).then(data => {
        this.loadingSubmit = false;
        if (data.status == 1) {
          this.displayForm = false;
          this.getCategories();
        } else {
          this.error = data?.message;
        }
      })
    } else {
      this.gameService.postNewCategory(name, this.fileToUpload).then(data => {
        this.loadingSubmit = false;
        if (data.status == 1) {
          this.displayForm = false;
          this.getCategories();
        } else {
          this.error = data?.message;
        }
      })
    }
  }

  deleteCategory() {
    this.gameService.deleteCategory(this.selectedId).then(data => {
      if (data.status == 1) {
        this.visible = !this.visible;
        this.getCategories();
      } else {
        this.error = data?.messsage;
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
    const inputElement = event.target as HTMLInputElement;

    this.gameService.updateCategory(id, name, inputElement.checked).then(data => {
      if (data?.status == 1) {
        this.message = data?.message;
      } else {
        this.message = data?.message;
      }
      this.toggleToast();
    })
    console.log('Checkbox checked state:', inputElement.checked);
    // Additional logic when the checked state changes
  }

}
