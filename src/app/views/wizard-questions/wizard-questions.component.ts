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
  TextColorDirective, ToastBodyComponent, ToastComponent, ToasterComponent, ToastHeaderComponent
} from "@coreui/angular";
import {FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {IconDirective} from "@coreui/icons-angular";
import {DocsExampleComponent} from "@docs-components/docs-example/docs-example.component";
import {GameService} from "../../services/game.service";
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-wizard-questions',
  standalone: true,
  imports: [CommonModule, ModalFooterComponent, ModalComponent, ModalHeaderComponent, ModalTitleDirective,
    ButtonCloseDirective, ModalBodyComponent, FormModule, ButtonDirective, SpinnerComponent, ReactiveFormsModule,
    IconDirective, RowComponent, ColComponent, TextColorDirective, CardComponent, CardHeaderComponent,
    CardBodyComponent, DocsExampleComponent, AccordionComponent, AccordionItemComponent, TemplateIdDirective,
    AccordionButtonDirective, BgColorDirective, ToastBodyComponent,
    ToastComponent,
    ToasterComponent,
    ToastHeaderComponent,],
  templateUrl: './wizard-questions.component.html',
  styleUrl: './wizard-questions.component.scss'
})
export class WizardQuestionsComponent {
  questions: any = [];
  displayForm: any = false;
  id: any;
  active: any;
  questionForm: FormGroup;
  loading: boolean = true;
  loadingSubmit: boolean = false;
  public visible = false;
  error: any = '';
  dynamicForm: FormGroup;
  selectedId: any;
  public visibleToast = false;
  message: any;
  position = 'top-end';
  percentage = 0;

  constructor(private gameService: GameService, private fb: FormBuilder) {
    this.questionForm = this.fb.group({
      question: ['', [Validators.required]],
      type: ['', [Validators.required]],
      placeholder: ['', []],
    });

    this.dynamicForm = this.fb.group({
      textInputs: this.fb.array([])  // FormArray to hold dynamic text inputs
    });
  }

  ngOnInit() {
    this.getQuestions();
  }

  async getQuestions() {
    this.loading = true;
    this.gameService.getQuestions().subscribe(data => {
      this.loading = false;
      if (data.status == 1) {
        this.questions = data.data;
      }
    })
  }

  displayAddQuestion(data: any = null, id: any = null, active: any = null) {
    this.id = id;
    this.active = active;
    this.error = '';
    this.displayForm = !this.displayForm;
    if (this.displayForm && data) {
      this.questionForm.patchValue({question: data.question});
      this.questionForm.patchValue({type: data.type});
      this.questionForm.patchValue({placeholder: data.placeholder});
      data.options.forEach((value: any) => {
        this.textInputs.push(new FormControl(value));
      });
    } else {
      this.questionForm.reset();
      this.textInputs.clear();
    }
  }

  submitNewQuestion() {
    this.loadingSubmit = true;
    this.error = '';
    if (this.id) {
      const option = (this.questionForm.controls['type'].value == 'multiple_options' || this.questionForm.controls['type'].value == 'select') ? this.dynamicForm.value.textInputs : ''
      this.gameService.updateQuestion(this.id, this.questionForm.value, option, this.active).then(data => {
        this.loadingSubmit = false;
        if (data.status == 1) {
          this.displayForm = false;
          this.textInputs.clear();
          this.getQuestions();
        } else {
          this.error = data?.message;
        }
      })
    } else {
      const option = (this.questionForm.controls['type'].value == 'multiple_options' || this.questionForm.controls['type'].value == 'select') ? this.dynamicForm.value.textInputs : ''
      this.gameService.postNewQuestion(this.questionForm.value, option).then(data => {
        this.loadingSubmit = false;
        if (data.status == 1) {
          this.displayForm = false;
          this.textInputs.clear();
          this.getQuestions();
        } else {
          this.error = data?.message;
        }
      })
    }
  }

  deleteQuestion() {
    this.gameService.deleteQuestion(this.selectedId).then(data => {
      if (data.status == 1) {
        this.visible = !this.visible;
        this.getQuestions();
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

  get textInputs() {
    return this.dynamicForm.get('textInputs') as FormArray;
  }

  addTextInput() {
    this.textInputs.push(this.fb.control(''));
  }

  removeTextInput(index: number) {
    this.textInputs.removeAt(index);
  }

  onSubmit() {
    console.log(this.dynamicForm.value);
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
    const option = (item.type == 'multiple_options' || item.type == 'select') ? this.dynamicForm.value.textInputs : ''

    this.gameService.updateQuestion(id, item, option, inputElement.checked
    ).then(data => {
      if (data?.status == 1) {
        this.message = data?.message;
      } else {
        this.message = data?.message;
      }
      this.getQuestions();
      this.toggleToast();
    })
    console.log('Checkbox checked state:', inputElement.checked);
    // Additional logic when the checked state changes
  }
}
