
import {Component} from '@angular/core';
import {GameService} from "../../services/game.service";
import {FormBuilder, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {
  ButtonCloseDirective,
  ButtonDirective,
  CardBodyComponent,
  CardComponent,
  CardHeaderComponent,
  ColComponent,
  FormModule,
  RowComponent, ToastBodyComponent, ToastComponent, ToasterComponent, ToastHeaderComponent
} from "@coreui/angular";
import {QuillModule} from "ngx-quill";
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-terms',
  standalone: true,
  imports: [RowComponent, ColComponent, CardComponent, CardHeaderComponent, CardBodyComponent, QuillModule,
    CommonModule, FormModule, ReactiveFormsModule, ButtonDirective, ButtonCloseDirective,
    ToastBodyComponent, ToastComponent, ToasterComponent, ToastHeaderComponent,],
  templateUrl: './terms.component.html',
  styleUrl: './terms.component.scss'
})
export class TermsComponent {
  editorForm: FormGroup;
  loading: boolean = true;
  message: any;
  position = 'top-end';
  percentage = 0;
  public visibleToast = false;

  constructor(private gameService: GameService, private fb: FormBuilder) {
    this.editorForm = this.fb.group({
      terms: [''] ,// Initialize editor content
      termsFa: [''] // Initialize editor content
    });
  }

  ngOnInit() {
    this.getPrivacy();
  }

  async getPrivacy() {
    this.loading = true;
    this.gameService.getTerms().subscribe(data => {
      this.loading = false;
      if (data.status == 1) {
        this.editorForm.controls['terms'].setValue(data.data.terms.value);
        this.editorForm.controls['termsFa'].setValue(data.data.termsFa.value);
      }
    })
  }

  submitForm() {
    this.loading = true;
    this.gameService.postTerms(this.editorForm.value).then(data => {
      if (data?.status == 1) {
        this.message = data?.message;
      } else {
        this.message = data?.message;
      }
      this.loading = false;
      this.toggleToast();
    })
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


}
