import {Component} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {GameService} from "../../services/game.service";
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
  TableDirective,
  TemplateIdDirective, TextColorDirective,
  ToastBodyComponent,
  ToastComponent,
  ToasterComponent,
  ToastHeaderComponent
} from "@coreui/angular";
import {IconDirective} from "@coreui/icons-angular";
import {CommonModule} from "@angular/common";
import {environment} from "../../../environments/environment";

@Component({
  selector: 'app-gifts',
  standalone: true,
  imports: [CommonModule, AccordionButtonDirective,
    AccordionComponent,
    AccordionItemComponent,
    BgColorDirective,
    ButtonCloseDirective,
    ButtonDirective,
    ToasterComponent, ToastComponent, ToastHeaderComponent, ToastBodyComponent,
    CardBodyComponent,
    CardComponent,
    IconDirective,
    CardHeaderComponent,
    ColComponent,
    FormModule,
    ModalBodyComponent,
    ModalComponent,
    ModalFooterComponent,
    ModalHeaderComponent,
    ModalTitleDirective,
    RowComponent,
    ReactiveFormsModule,
    SpinnerComponent,
    TemplateIdDirective,
    TableDirective,
    TextColorDirective, FormModule,],
  templateUrl: './gifts.component.html',
  styleUrl: './gifts.component.scss'
})
export class GiftsComponent {
  gifts: any = [];
  displayForm: any = false;
  id: any;
  giftForm: FormGroup;
  loading: boolean = true;
  loadingSubmit: boolean = false;
  public visible = false;
  public visibleToast = false;
  fileToUpload: any
  imgSrc: any;
  error: any = '';
  message: any;
  selectedId: any;
  achievementRewards: any;
  achievementConditions: any;
  environment = environment;

  constructor(private gameService: GameService, private fb: FormBuilder) {
    this.giftForm = this.fb.group({
      condition: ['', [Validators.required]],
      conditionQuantity: ['', [Validators.required]],
      reward: ['', [Validators.required]],
      rewardQuantity: ['', [Validators.required]],
      showModal: [false],
      link: [''],
      description: ['', []],
      descriptionFa: ['', []],
    });
  }

  ngOnInit() {
    this.getGifts();
  }

  async getGifts() {
    this.loading = true;
    this.gameService.getAllGifts().subscribe(data => {
      this.loading = false;
      if (data.status === 1) {
        this.gifts = data.data.achievements
        this.achievementConditions = data.data.achievementConditions
        this.achievementRewards = data.data.achievementRewards
      }
    })
  }

  displayAddGift(item: any = null) {
    this.id = item?._id;
    this.imgSrc = '';
    this.error = '';
    this.displayForm = !this.displayForm;
    if (this.displayForm) {
      this.imgSrc = item?.icon;
      this.giftForm.controls['condition'].setValue(item?.condition?.type)
      this.giftForm.controls['conditionQuantity'].setValue(item?.condition?.quantity)
      this.giftForm.controls['reward'].setValue(item?.reward?.type)
      this.giftForm.controls['rewardQuantity'].setValue(item?.reward?.quantity)
      this.giftForm.controls['showModal'].setValue(item?.showModal)
      this.giftForm.controls['link'].setValue(item?.link)
      this.giftForm.controls['description'].setValue(item?.description)
      this.giftForm.controls['descriptionFa'].setValue(item?.descriptionFa)
    } else {
      this.giftForm.reset();
    }
  }

  submitNewGift() {
    this.loadingSubmit = true;
    this.error = '';
    if (this.id) {
      this.gameService.updateGift(this.giftForm.value, this.id, this.fileToUpload).then(data => {
        this.loadingSubmit = false;
        if (data.status == 1) {
          this.displayForm = false;
          this.getGifts();
        } else {
          this.error = data?.message;
        }
      })
    } else {
      this.gameService.postNewGift(this.giftForm.value, this.fileToUpload).then(data => {
        this.loadingSubmit = false;
        if (data.status == 1) {
          this.displayForm = false;
          this.getGifts();
        } else {
          this.error = data?.message;
        }
      })
    }
  }

  handleFileInput(event: any) {
    this.fileToUpload = event.target.files[0];
  }

  deleteGift() {
    this.gameService.deleteGift(this.selectedId).then(data => {
      if (data.status == 1) {
        this.visible = !this.visible;
        this.getGifts();
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

  onCheckedChange(id: any, event: Event): void {
    this.loading = true
    const inputElement = event.target as HTMLInputElement;

    this.gameService.toggleGiftActivation(id, inputElement.checked).then(data => {
      if (data?.status == 1) {
        this.message = data?.message;
      } else {
        this.message = data?.message;
      }
      this.getGifts();
      this.toggleToast();
    })
    console.log('Checkbox checked state:', inputElement.checked);
    // Additional logic when the checked state changes
  }

  position = 'top-end';
  percentage = 0;

  toggleToast() {
    this.visibleToast = !this.visibleToast;
  }

  onTimerChange($event: number) {
    this.percentage = $event * 25;
  }

  onVisibleChange($event: boolean) {
    this.visibleToast = $event;
    this.percentage = !this.visibleToast ? 0 : this.percentage;
  }

}
