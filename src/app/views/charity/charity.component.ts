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
  TextColorDirective, ToastBodyComponent, ToastComponent, ToasterComponent, ToastHeaderComponent
} from "@coreui/angular";
import {IconDirective} from "@coreui/icons-angular";
import {DocsExampleComponent} from "@docs-components/docs-example/docs-example.component";
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-charity',
  standalone: true,
  imports: [CommonModule, ModalFooterComponent, ModalComponent, ModalHeaderComponent, ModalTitleDirective,
    ButtonCloseDirective, ModalBodyComponent, FormModule, ButtonDirective, SpinnerComponent, ReactiveFormsModule,
    IconDirective, RowComponent, ColComponent, TextColorDirective, CardComponent, CardHeaderComponent,
    CardBodyComponent, DocsExampleComponent, AccordionComponent, AccordionItemComponent, TemplateIdDirective,
    AccordionButtonDirective, BgColorDirective, ToastBodyComponent,
    ToastComponent,
    ToasterComponent,
    ToastHeaderComponent,],
  templateUrl: './charity.component.html',
  styleUrl: './charity.component.scss'
})
export class CharityComponent {
  charities: any = [];
  displayForm: any = false;
  id: any;
  active: any;
  charityForm: FormGroup;
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
  currencies: any;

  constructor(private gameService: GameService, private fb: FormBuilder) {
    this.charityForm = this.fb.group({
      title: ['', [Validators.required]],
      activities: this.fb.array([this.createActivity()]),  // Dynamic form array for additional activities
    });
  }

  ngOnInit() {
    this.getCharities();
  }

// Function to create a new activity form group
  createActivity(activity?: any): FormGroup {
    return this.fb.group({
      _id: [activity ? activity._id : ''],
      title: [activity ? activity.title : '', Validators.required],
      neededFund: [activity ? activity.neededFund : '', Validators.required],
      currency: [activity ? activity.currency : '', Validators.required],
      isDefault: [activity ? activity.isDefault : false]
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
        this.charities = data.data.charityCategories;
        this.currencies = data.data.currencies;
      }
    })
  }

  displayAddCharity(title: any = null, neededFund: any = null, isDefault: any = false, currency: any = null, activities: any = null, id: any = null, active: any = null, path: any = null) {
    this.id = id;
    this.active = active;
    this.imgSrc = '';
    this.fileToUpload = '';
    this.error = '';
    this.displayForm = !this.displayForm;
    if (this.displayForm && title) {
      this.charityForm.patchValue({title: title, neededFund: neededFund, currency: currency, isDefault: isDefault});

      // Clear the existing FormArray
      const activitiesArray = this.charityForm.get('activities') as FormArray;
      activitiesArray.clear();

      // Loop through the activities and populate the form array
      activities.forEach((activity: any) => {
        activitiesArray.push(this.createActivity(activity));
      });
      this.imgSrc = path;
    } else {
      this.charityForm.reset();
      const activitiesArray = this.charityForm.get('activities') as FormArray;
      activitiesArray.clear();
    }
  }

  submitNewCharity() {
    this.loadingSubmit = true;
    this.error = '';
    if (this.id) {
      this.gameService.updateCharity(this.id, this.charityForm.value, this.active, this.fileToUpload).then(data => {
        this.loadingSubmit = false;
        if (data.status == 1) {
          this.displayForm = false;
          this.getCharities();
        } else {
          this.error = data?.message;
        }
      })
    } else {
      this.gameService.postNewCharity(this.charityForm.controls['title'].value, this.charityForm.controls['activities'].value, this.fileToUpload).then(data => {
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

  onCheckedChange(id: any, item: any, event: Event): void {
    this.loading = true;
    const inputElement = event.target as HTMLInputElement;

    this.gameService.updateCharity(id, item, inputElement.checked).then(data => {
      if (data?.status == 1) {
        this.message = data?.message;
      } else {
        this.message = data?.message;
      }
      this.getCharities();
      this.toggleToast();
    })
    console.log('Checkbox checked state:', inputElement.checked);
    // Additional logic when the checked state changes
  }

  onCheckedDefaultChange(id: any): void {
    this.loading = true;

    this.gameService.makeAsDefault(id).then(data => {
      if (data?.status == 1) {
        this.message = data?.message;
      } else {
        this.message = data?.message;
      }
      this.getCharities();
    })
    // Additional logic when the checked state changes
  }

  onCheckedDefaultActivityChange(id: any): void {
    this.loading = true;
    this.gameService.makeAsDefaultActivity(this.id, id).then(data => {
      if (data?.status == 1) {
        this.displayForm = false;
        this.getCharities();
      } else {
        this.message = data?.message;
      }
      this.getCharities();
    })
    // Additional logic when the checked state changes
  }
}
