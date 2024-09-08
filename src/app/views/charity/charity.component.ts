import {Component} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {GameService} from "../../services/game.service";
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
import {IconDirective} from "@coreui/icons-angular";
import {DocsExampleComponent} from "@docs-components/docs-example/docs-example.component";
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-charity',
  standalone: true,
  imports: [CommonModule, ModalFooterComponent, ModalComponent, ModalHeaderComponent, ModalTitleDirective, ButtonCloseDirective, ModalBodyComponent, FormModule, ButtonDirective, SpinnerComponent, ReactiveFormsModule, IconDirective, RowComponent, ColComponent, TextColorDirective, CardComponent, CardHeaderComponent, CardBodyComponent, DocsExampleComponent, AccordionComponent, AccordionItemComponent, TemplateIdDirective, AccordionButtonDirective, BgColorDirective],
  templateUrl: './charity.component.html',
  styleUrl: './charity.component.scss'
})
export class CharityComponent {
  charities: any = [];
  displayForm: any = false;
  id: any;
  charityForm: FormGroup;
  loading: boolean = true;
  loadingSubmit: boolean = false;
  public visible = false;
  public visibleToast = false;
  fileToUpload: any
  imgSrc: any;
  error: any = '';
  message: any;
  selectedId: any;

  constructor(private gameService: GameService, private fb: FormBuilder) {
    this.charityForm = this.fb.group({
      title: ['', [Validators.required]],
      activities: this.fb.array([this.createActivity()]),  // Dynamic form array for additional activities
    });
  }

  ngOnInit() {
    this.getCharities();
  }

  createActivity(): FormGroup {
    return this.fb.group({
      activity: ['']
    });
  }

  // Get the FormArray for dynamic activities
  get activities(): FormArray {
    return this.charityForm.get('activities') as FormArray;
  }

  // Add a new activity input
  addActivity() {
    this.activities.push(this.createActivity());
  }

  // Remove an activity input at a specific index
  removeActivity(index: number) {
    this.activities.removeAt(index);
  }


  async getCharities() {
    this.loading = true;
    this.gameService.getCharities().subscribe(data => {
      this.loading = false;
      if (data.status === 1) {
        this.charities = data.data;
      }
    })
  }

  displayAddCharity(title: any = null, id: any = null, path: any = null) {
    this.id = id;
    this.imgSrc = '';
    this.error = '';
    this.displayForm = !this.displayForm;
    if (this.displayForm && title) {
      this.charityForm.patchValue({title: title});
      this.imgSrc = path;
    } else {
      this.charityForm.reset();
    }
  }

  submitNewCharity() {
    this.loadingSubmit = true;
    this.error = '';
    const title = this.charityForm.get('title')?.value;
    if (this.id) {
      this.gameService.updateCharity(this.id, title, this.fileToUpload).then(data => {
        this.loadingSubmit = false;
        if (data.status == 1) {
          this.displayForm = false;
          this.getCharities();
        } else {
          this.error = data?.message;
        }
      })
    } else {
      this.gameService.postNewCharity(title, this.fileToUpload).then(data => {
        this.loadingSubmit = false;
        if (data.status == 1) {
          this.displayForm = false;
          this.getCharities();
        } else {
          this.error = data?.message;
        }
      })
    }
  }

  handleFileInput(event: any) {
    this.fileToUpload = event.target.files[0];
  }

  deleteCharity() {
    this.gameService.deleteCharity(this.selectedId).then(data => {
      if (data.status == 1) {
        this.visible = !this.visible;
        this.getCharities();
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
