import { Component } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {GameService} from "../../services/game.service";
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
  ToastBodyComponent,
  ToastComponent,
  ToasterComponent,
  ToastHeaderComponent
} from "@coreui/angular";
import {IconDirective} from "@coreui/icons-angular";
import {DocsExampleComponent} from "@docs-components/public-api";
import {environment} from "../../../environments/environment";

@Component({
  selector: 'app-sponsores',
  standalone: true,
  imports: [ModalFooterComponent, ModalComponent, ModalHeaderComponent, ModalTitleDirective, ButtonCloseDirective,
    ModalBodyComponent, FormModule, ButtonDirective, SpinnerComponent, ReactiveFormsModule, IconDirective,
    RowComponent, ColComponent, TextColorDirective, CardComponent, CardHeaderComponent, CardBodyComponent,
    DocsExampleComponent, AccordionComponent, AccordionItemComponent, TemplateIdDirective, AccordionButtonDirective,
    BgColorDirective, ToastBodyComponent,
    ToastComponent,
    ToasterComponent,
    ToastHeaderComponent,],
  templateUrl: './sponsores.component.html',
  styleUrl: './sponsores.component.scss'
})
export class SponsoresComponent {
  sponsors: any = [];
  displayForm: any = false;
  id: any;
  active: any;
  sponsorForm: FormGroup;
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
    this.sponsorForm = this.fb.group({
      name: ['', [Validators.required]],
      link: ['', [Validators.required]],
    });
  }

  ngOnInit() {
    this.getSponsors();
  }

  async getSponsors() {
    this.loading = true;
    this.gameService.getSponsors().subscribe(data => {
      this.loading = false;
      if (data.status == 1) {
        this.sponsors = data.data;
      }
    })
  }

  displayAddSponsor(name: any = null, link: any =null, id: any = null, active: any = null, path: any = null) {
    this.id = id;
    this.active = active;
    this.imgSrc = '';
    this.error = '';
    this.displayForm = !this.displayForm;
    if (this.displayForm && name) {
      this.sponsorForm.patchValue({name: name});
      this.sponsorForm.patchValue({link: link});
      this.imgSrc = path;
    } else {
      this.sponsorForm.reset();
    }
  }

  submitNewSponsor() {
    this.loadingSubmit = true;
    this.error = '';
    if (this.id) {
      this.gameService.updateSponsors(this.id, this.sponsorForm.value, this.active, this.fileToUpload).then(data => {
        this.loadingSubmit = false;
        if (data.status == 1) {
          this.displayForm = false;
          this.getSponsors();
        } else {
          this.error = data?.message;
        }
      })
    } else {
      console.log(this.sponsorForm.value)
      this.gameService.postNewSponsors(this.sponsorForm.value, this.fileToUpload).then(data => {
        this.loadingSubmit = false;
        if (data.status == 1) {
          this.displayForm = false;
          this.getSponsors();
        } else {
          this.error = data?.message;
        }
      })
    }
  }

  handleFileInput(event: any) {
    this.fileToUpload = event.target.files[0];
  }

  deleteSponsor() {
    this.gameService.deleteSponsors(this.selectedId).then(data => {
      if (data.status == 1) {
        this.visible = !this.visible;
        this.getSponsors();
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

    this.gameService.updateSponsors(id, item, inputElement.checked).then(data => {
      if (data?.status == 1) {
        this.message = data?.message;
      } else {
        this.message = data?.message;
      }
      this.getSponsors();
      this.toggleToast();
    })
    console.log('Checkbox checked state:', inputElement.checked);
    // Additional logic when the checked state changes
  }
}
