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
  TextColorDirective
} from "@coreui/angular";
import {DocsExampleComponent} from "@docs-components/docs-example/docs-example.component";
import {GameService} from "../../services/game.service";
import {IconDirective} from "@coreui/icons-angular";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [ModalFooterComponent, ModalComponent, ModalHeaderComponent, ModalTitleDirective, ButtonCloseDirective, ModalBodyComponent, FormModule, SpinnerComponent, ReactiveFormsModule, ButtonDirective, IconDirective, RowComponent, ColComponent, TextColorDirective, CardComponent, CardHeaderComponent, CardBodyComponent, DocsExampleComponent, AccordionComponent, AccordionItemComponent, TemplateIdDirective, AccordionButtonDirective, BgColorDirective],
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

  displayAddCategory(name: any = null, id: any = null) {
    this.id = id;
    this.displayForm = !this.displayForm;
    if (this.displayForm && name) {
      this.categoryForm.setValue({name: name})
    } else {
      this.categoryForm.reset();
    }
  }

  submitNewCategory() {
    this.loadingSubmit = true;
    const name = this.categoryForm.get('name')?.value;
    if (this.id) {
      this.gameService.updateCategory(this.id, name).then(data => {
        this.loadingSubmit = false;
        if (data.status == 1) {
          this.displayForm = false;
          this.getCategories();
        }
      })
    } else {
      this.gameService.postNewCategory(name).then(data => {
        this.loadingSubmit = false;
        if (data.status == 1) {
          this.displayForm = false;
          this.getCategories();
        }
      })
    }
  }

  deleteCategory(id: any) {
    this.gameService.deleteCategory(id).then(data => {
      if (data.status == 1) {
        this.visible = !this.visible;
        this.getCategories();
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
