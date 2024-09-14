import {Component} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
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
import {GameService} from "../../services/game.service";

@Component({
  selector: 'app-faq',
  standalone: true,
  imports: [ModalFooterComponent, ModalComponent, ModalHeaderComponent, ModalTitleDirective, ButtonCloseDirective,
    ModalBodyComponent, FormModule, ButtonDirective, SpinnerComponent, ReactiveFormsModule, IconDirective,
    RowComponent, ColComponent, TextColorDirective, CardComponent, CardHeaderComponent, CardBodyComponent,
    DocsExampleComponent, AccordionComponent, AccordionItemComponent, TemplateIdDirective, AccordionButtonDirective,
    BgColorDirective, ToastBodyComponent,
    ToastComponent,
    ToasterComponent,
    ToastHeaderComponent,],
  templateUrl: './faq.component.html',
  styleUrl: './faq.component.scss'
})
export class FaqComponent {
  faqs: any = [];
  displayForm: any = false;
  id: any;
  active: any;
  faqForm: FormGroup;
  loading: boolean = true;
  loadingSubmit: boolean = false;
  public visible = false;
  error: any = '';
  selectedId: any;
  public visibleToast = false;
  message: any;
  position = 'top-end';
  percentage = 0;

  constructor(private gameService: GameService, private fb: FormBuilder) {
    this.faqForm = this.fb.group({
      question: ['', [Validators.required]],
      answer: ['', [Validators.required]],
    });
  }

  ngOnInit() {
    this.getFaqs();
  }

  async getFaqs() {
    this.loading = true;
    this.gameService.getFaqs().subscribe(data => {
      this.loading = false;
      if (data.status == 1) {
        this.faqs = data.data;
      }
    })
  }

  displayAddFaq(question: any = null, answer: any = null, id: any = null, active: any = null) {
    this.id = id;
    this.active = active;
    this.error = '';
    this.displayForm = !this.displayForm;
    if (this.displayForm && question) {
      this.faqForm.patchValue({question: question});
      this.faqForm.patchValue({answer: answer});
    } else {
      this.faqForm.reset();
    }
  }

  submitNewFaq() {
    this.loadingSubmit = true;
    this.error = '';
    if (this.id) {
      this.gameService.updateFaq(this.id, this.faqForm.value, this.active).then(data => {
        this.loadingSubmit = false;
        if (data.status == 1) {
          this.displayForm = false;
          this.getFaqs();
        } else {
          this.error = data?.message;
        }
      })
    } else {
      this.gameService.postNewFaq(this.faqForm.value).then(data => {
        this.loadingSubmit = false;
        if (data.status == 1) {
          this.displayForm = false;
          this.getFaqs();
        } else {
          this.error = data?.message;
        }
      })
    }
  }

  deleteFaq() {
    this.gameService.deleteFaq(this.selectedId).then(data => {
      if (data.status == 1) {
        this.visible = !this.visible;
        this.getFaqs();
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
    this.loading = true
    const inputElement = event.target as HTMLInputElement;

    this.gameService.updateFaq(id, item, inputElement.checked).then(data => {
      if (data?.status == 1) {
        this.message = data?.message;
      } else {
        this.message = data?.message;
      }
      this.getFaqs();
      this.toggleToast();
    })
    console.log('Checkbox checked state:', inputElement.checked);
    // Additional logic when the checked state changes
  }

}
