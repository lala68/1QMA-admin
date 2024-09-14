import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {
  AccordionButtonDirective,
  AccordionComponent, AccordionItemComponent,
  AvatarComponent, BgColorDirective, ButtonCloseDirective,
  ButtonDirective,
  ButtonGroupComponent,
  CardBodyComponent,
  CardComponent,
  CardFooterComponent,
  CardHeaderComponent,
  ColComponent, FormCheckComponent, FormCheckInputDirective,
  FormCheckLabelDirective, FormModule,
  GutterDirective,
  ModalBodyComponent,
  ModalComponent,
  ModalFooterComponent,
  ModalHeaderComponent,
  ModalTitleDirective,
  NavComponent,
  NavItemComponent,
  NavLinkDirective, PageItemDirective, PageLinkDirective,
  PaginationComponent, ProgressBarComponent,
  ProgressBarDirective,
  ProgressComponent,
  RowComponent,
  SpinnerComponent,
  TabContentComponent,
  TabContentRefDirective,
  TableDirective,
  TabPaneComponent, TemplateIdDirective,
  TextColorDirective, ToastBodyComponent, ToastComponent, ToasterComponent, ToastHeaderComponent
} from "@coreui/angular";
import {CommonModule, NgFor, NgStyle} from "@angular/common";
import {IconDirective} from "@coreui/icons-angular";
import {Router, RouterLink} from "@angular/router";
import {ChecksRadiosComponent} from "../forms/checks-radios/checks-radios.component";
import {DocsExampleComponent} from "@docs-components/docs-example/docs-example.component";
import {GameService} from "../../services/game.service";

@Component({
  selector: 'app-bug-type',
  standalone: true,
  imports: [CommonModule, ModalFooterComponent, ModalComponent, ModalHeaderComponent, ModalTitleDirective, ButtonCloseDirective, ModalBodyComponent, FormModule, ButtonDirective, SpinnerComponent, ReactiveFormsModule, IconDirective, RowComponent, ColComponent, TextColorDirective, CardComponent, CardHeaderComponent, CardBodyComponent, DocsExampleComponent, AccordionComponent, AccordionItemComponent, TemplateIdDirective, AccordionButtonDirective, BgColorDirective],
  templateUrl: './bug-type.component.html',
  styleUrl: './bug-type.component.scss'
})
export class BugTypeComponent implements OnInit{
  loading: boolean = true;
  bugs: any = [];
  displayForm: any = false;
  id: any;
  bugForm: FormGroup;
  loadingSubmit: boolean = false;
  public visible = false;
  public visibleToast = false;
  fileToUpload: any
  imgSrc: any;
  error: any = '';
  message: any;
  selectedId: any;

  constructor(private router: Router, private gameService: GameService, private fb: FormBuilder) {
    this.bugForm = this.fb.group({
      category: ['', [Validators.required]],
      subCategories : this.fb.array([this.createSubCategory()]),  // Dynamic form array for additional activities
    });
  }

  ngOnInit() {
    this.getBugTypes();
  }

  async getBugTypes() {
    this.loading = true;
    this.gameService.getBugTypes().subscribe(data => {
      this.bugs = data.data;
      this.loading = false;
    })
  }

  createSubCategory(subCategory?: any): FormGroup {
    return this.fb.group({
      title: [subCategory ? subCategory.title : '', Validators.required]
    });
  }

  get subCategories(): FormArray {
    return this.bugForm.get('subCategories') as FormArray;
  }

  addSubCategory() {
    this.subCategories.push(this.createSubCategory());
  }

  // Remove an activity input at a specific index
  removeSubCategory(index: number) {
    this.subCategories.removeAt(index);
  }

  displayAddBugType(category: any = null, subCategories: any = null, id: any = null, path: any = null) {
    this.id = id;
    this.imgSrc = '';
    this.fileToUpload = '';
    this.error = '';
    this.displayForm = !this.displayForm;

    // Reset and populate form based on whether category is provided
    if (this.displayForm && category) {
      this.bugForm.patchValue({ category });

      // Clear and re-populate subCategories array
      this.subCategories.clear();
      subCategories.forEach((activity: any) => {
        this.subCategories.push(this.createSubCategory(activity));
      });
      this.imgSrc = path;
    } else {
      this.bugForm.reset();
      this.subCategories.clear();  // Always clear subcategories
    }
  }

  submitNewBug() {
    this.loadingSubmit = true;
    this.error = '';
    if (this.id) {
      this.gameService.updateBugType(this.id, this.bugForm.value, this.fileToUpload).then(data => {
        this.loadingSubmit = false;
        if (data.status == 1) {
          this.displayForm = false;
          this.getBugTypes();
        } else {
          this.error = data?.message;
        }
      })
    } else {
      this.gameService.postNewBugTypes(this.bugForm.controls['category'].value, this.bugForm.controls['subCategories'].value, this.fileToUpload).then(data => {
        this.loadingSubmit = false;
        if (data.status == 1) {
          this.displayForm = false;
          this.getBugTypes();
        } else {
          this.error = data?.message;
        }
      })
    }
  }

  handleFileInput(event: any) {
    this.fileToUpload = event.target.files[0];
  }

  deleteBug() {
    this.gameService.deleteBugType(this.selectedId).then(data => {
      if (data.status == 1) {
        this.visible = !this.visible;
        this.getBugTypes();
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

}
