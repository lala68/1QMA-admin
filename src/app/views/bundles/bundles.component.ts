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
  SpinnerComponent, TableDirective,
  TemplateIdDirective,
  TextColorDirective,
  ToastBodyComponent,
  ToastComponent,
  ToasterComponent,
  ToastHeaderComponent
} from "@coreui/angular";
import {DocsExampleComponent} from "@docs-components/docs-example/docs-example.component";
import {GameService} from "../../services/game.service";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {IconDirective} from "@coreui/icons-angular";

@Component({
  selector: 'app-bundles',
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
    FormModule,
    IconDirective,
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
    ToastBodyComponent,
    ToastComponent,
    ToasterComponent,
    ToastHeaderComponent,
    TableDirective],
  templateUrl: './bundles.component.html',
  styleUrl: './bundles.component.scss'
})
export class BundlesComponent {
  bundles: any = [];
  displayForm: any = false;
  id: any;
  bundleForm: FormGroup;
  loading: boolean = true;
  loadingSubmit: boolean = false;
  public visible = false;
  public visibleToast = false;
  fileToUpload: any
  imgSrc: any;
  error: any = '';
  message: any;

  constructor(private gameService: GameService, private fb: FormBuilder) {
    this.bundleForm = this.fb.group({
      featureCount: ['', [Validators.required]],
      assetCount: ['', [Validators.required]],
      featureTitle: ['', [Validators.required]],
      assetTitle: ['', [Validators.required]],
      coinPrice: ['', [Validators.required]],
      coinType: ['', [Validators.required]],
      price: ['', [Validators.required]],
    });
  }

  ngOnInit() {
    this.getBundles();
  }

  async getBundles() {
    this.loading = true;
    this.gameService.getAllShopItems().subscribe(data => {
      this.loading = false;
      if (data.status === 1) {
        this.bundles = data.data
          .filter((bundle: any) => bundle.type === 'bundle')  // Filter only 'feature' types
          .map((bundle: any) => {
            if (bundle.details && bundle.details.length > 0) {
              try {
                let jsonString = bundle.details[0];
                let parsedArray = JSON.parse(jsonString);
                console.log(parsedArray[0]);
                console.log(parsedArray[1]);
                // Parse the first item in the details array
                const parsedDetails = parsedArray[0];
                const parsedDetails2 = parsedArray[1];

                // Return the feature with additional properties
                return {
                  ...bundle,
                  featureTitle: parsedDetails.featureTitle || '', // Extract the title if available
                  featureCount: parsedDetails.featureCount || 0,  // Extract the count if available
                  assetTitle: parsedDetails2.assetTitle || '', // Extract the title if available
                  assetCount: parsedDetails2.assetCount || 0   // Extract the count if available
                };
              } catch (e) {
                console.error('Error parsing feature details:', e);
                // Return the original feature object in case of error
                return bundle;
              }
            }
            return bundle;
          });
      }
    })
  }

  displayAddBundle(item: any = null) {
    this.id = item?.id;
    this.imgSrc = '';
    this.error = '';
    this.displayForm = !this.displayForm;
    if (this.displayForm) {
      this.imgSrc = item?.icon;
      this.bundleForm.controls['featureCount'].setValue(JSON.parse(item.details[0])[0].count);
      this.bundleForm.controls['featureTitle'].setValue(JSON.parse(item.details[0])[0].title);
      this.bundleForm.controls['assetCount'].setValue(JSON.parse(item.details[0])[1].count);
      this.bundleForm.controls['assetTitle'].setValue(JSON.parse(item.details[0])[1].title);
      this.bundleForm.controls['coinPrice'].setValue(JSON.parse(item.coinPrice).price);
      this.bundleForm.controls['coinType'].setValue(JSON.parse(item.coinPrice).coin);
      this.bundleForm.controls['price'].setValue(item.realPrice)
    } else {
      this.bundleForm.reset();
    }
  }

  submitNewBundle() {
    this.loadingSubmit = true;
    this.error = '';
    if (this.id) {
      this.gameService.updateShopItem(this.bundleForm.value, this.id, 'bundle', this.fileToUpload).then(data => {
        this.loadingSubmit = false;
        if (data.status == 1) {
          this.displayForm = false;
          this.getBundles();
        } else {
          this.error = data?.message;
        }
      })
    } else {
      this.gameService.postNewShopItem(this.bundleForm.value, 'bundle', this.fileToUpload).then(data => {
        this.loadingSubmit = false;
        if (data.status == 1) {
          this.displayForm = false;
          this.getBundles();
        } else {
          this.error = data?.message;
        }
      })
    }
  }

  handleFileInput(event: any) {
    this.fileToUpload = event.target.files[0];
  }

  deleteBundle(id: any) {
    this.gameService.deleteShopItem(id).then(data => {
      if (data.status == 1) {
        this.visible = !this.visible;
        this.getBundles();
      }
    })
  }

  toggleModal() {
    this.visible = !this.visible;
  }

  handleLiveDemoChange(event: any) {
    this.visible = event;
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

  onCheckedChange(id: any, event: Event): void {
    const inputElement = event.target as HTMLInputElement;

    this.gameService.toggleShopItemActivation(id, inputElement.checked).then(data => {
      if (data?.status == 1) {
        this.message = data?.message;
      } else {
        this.message = data?.message;
      }
      this.toggleToast();
    })
    console.log('Checkbox checked state:', inputElement.checked);
    // Additional logic when the checked state changes
  }


}
