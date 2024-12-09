
import {Component} from '@angular/core';
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
  TemplateIdDirective,
  TextColorDirective, ToastBodyComponent,
  ToastComponent,
  ToasterComponent,
  ToastHeaderComponent
} from "@coreui/angular";
import {DocsExampleComponent} from "@docs-components/docs-example/docs-example.component";
import {GameService} from "../../services/game.service";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {IconDirective} from "@coreui/icons-angular";
import {environment} from "../../../environments/environment";

@Component({
  selector: 'app-features',
  standalone: true,
  imports: [AccordionButtonDirective,
    AccordionComponent,
    AccordionItemComponent,
    BgColorDirective,
    ButtonCloseDirective,
    ButtonDirective,
    CardBodyComponent,
    CardComponent,
    CardHeaderComponent,
    ColComponent,
    TableDirective,
    FormModule,
    ToasterComponent, ToastComponent, ToastHeaderComponent, ToastBodyComponent,
    ModalBodyComponent,
    ModalComponent,
    ModalFooterComponent,
    ModalHeaderComponent,
    ModalTitleDirective,
    RowComponent,
    ReactiveFormsModule,
    SpinnerComponent,
    TemplateIdDirective,
    TextColorDirective,
    IconDirective],
  templateUrl: './features.component.html',
  styleUrl: './features.component.scss'
})
export class FeaturesComponent {
  features: any = [];
  displayForm: any = false;
  id: any;
  featureForm: FormGroup;
  loading: boolean = true;
  loadingSubmit: boolean = false;
  public visible = false;
  public visibleToast = false;
  fileToUpload: any
  imgSrc: any;
  error: any = '';
  message: any;
  selectedId: any;
  position = 'top-end';
  percentage = 0;
  environment = environment;

  constructor(private gameService: GameService, private fb: FormBuilder) {
    this.featureForm = this.fb.group({
      count: ['', [Validators.required]],
      title: ['', [Validators.required]],
      price: ['', []],
      coinPrice: ['', []],
      coinType: ['', []],
      description: ['', []],
      descriptionFa: ['', []],
    });
  }

  ngOnInit() {
    this.getFeatures();
  }

  async getFeatures() {
    this.features = [];
    this.loading = true;
    this.gameService.getAllShopItems().subscribe(data => {
      this.loading = false;
      if (data.status === 1) {
        this.features = data.data.shopItems
          .filter((feature: any) => feature.type === 'feature')  // Filter only 'feature' types
          .map((feature: any) => {
            if (feature.details && feature.details.length > 0) {
              try {
                // Parse the first item in the details array
                const parsedDetails = (feature.details[0]);
                // Return the feature with additional properties
                return {
                  ...feature,
                  title: parsedDetails.title || '', // Extract the title if available
                  count: parsedDetails.count || 0   // Extract the count if available
                };
              } catch (e) {
                console.error('Error parsing feature details:', e);
                // Return the original feature object in case of error
                return feature;
              }
            }
            return feature;
          });
      }
    })
  }

  displayAddFeature(item: any = null) {
    this.id = item?._id;
    this.imgSrc = '';
    this.error = '';
    this.displayForm = !this.displayForm;
    if (this.displayForm) {
      this.imgSrc = item?.icon;
      this.featureForm.controls['count'].setValue((item.details[0])?.count);
      this.featureForm.controls['title'].setValue((item.details[0])?.title)
      this.featureForm.controls['coinPrice'].setValue((item.coinPrice)?.price)
      this.featureForm.controls['coinType'].setValue((item.coinPrice)?.coin)
      this.featureForm.controls['price'].setValue(item?.realPrice)
      this.featureForm.controls['description'].setValue(item?.description)
      this.featureForm.controls['descriptionFa'].setValue(item?.descriptionFa)
    } else {
      this.featureForm.reset();
    }
  }

  submitNewFeature() {
    this.loadingSubmit = true;
    this.error = '';
    if (this.id) {
      this.gameService.updateShopItem(this.featureForm.value, this.id, 'feature', this.fileToUpload).then(data => {
        this.loadingSubmit = false;
        if (data.status == 1) {
          this.displayForm = false;
          this.getFeatures();
        } else {
          this.error = data?.message;
        }
      })
    } else {
      console.log(this.featureForm.value)
      this.gameService.postNewShopItem(this.featureForm.value, 'feature', this.fileToUpload).then(data => {
        this.loadingSubmit = false;
        if (data.status == 1) {
          this.displayForm = false;
          this.getFeatures();
        } else {
          this.error = data?.message;
        }
      })
    }
  }

  handleFileInput(event: any) {
    this.fileToUpload = event.target.files[0];
  }

  deleteFeature() {
    this.gameService.deleteShopItem(this.selectedId).then(data => {
      if (data.status == 1) {
        this.visible = !this.visible;
        this.getFeatures();
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
    this.loading = true;
    const inputElement = event.target as HTMLInputElement;
    this.gameService.toggleShopItemActivation(id, inputElement.checked).then(data => {
      if (data?.status == 1) {
        this.message = data?.message;
      } else {
        this.message = data?.message;
      }
      this.getFeatures();
      this.toggleToast();
    })
    console.log('Checkbox checked state:', inputElement.checked);
    // Additional logic when the checked state changes
  }

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

