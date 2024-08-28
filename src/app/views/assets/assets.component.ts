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

@Component({
  selector: 'app-assets',
  standalone: true,
  imports: [AccordionButtonDirective,
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
    TextColorDirective],
  templateUrl: './assets.component.html',
  styleUrl: './assets.component.scss'
})
export class AssetsComponent {
  assets: any = [];
  displayForm: any = false;
  id: any;
  assetForm: FormGroup;
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
    this.assetForm = this.fb.group({
      count: ['', [Validators.required]],
      title: ['', [Validators.required]],
      price: ['', []],
      coinPrice: ['', []],
      coinType: ['', []],
    });
  }

  ngOnInit() {
    this.getAssets();
  }

  async getAssets() {
    this.loading = true;
    this.gameService.getAllShopItems().subscribe(data => {
      this.loading = false;
      if (data.status === 1) {
        this.assets = data.data
          .filter((assets: any) => assets.type === 'asset')  // Filter only 'feature' types
          .map((assets: any) => {
            if (assets.details && assets.details.length > 0) {
              try {
                // Parse the first item in the details array
                const parsedDetails = (assets.details[0]);

                // Return the feature with additional properties
                return {
                  ...assets,
                  title: parsedDetails.title || '', // Extract the title if available
                  count: parsedDetails.count || 0   // Extract the count if available
                };
              } catch (e) {
                console.error('Error parsing feature details:', e);
                // Return the original feature object in case of error
                return assets;
              }
            }
            return assets;
          });
      }
    })
  }

  displayAddAsset(item: any = null) {
    this.id = item?._id;
    this.imgSrc = '';
    this.error = '';
    this.displayForm = !this.displayForm;
    if (this.displayForm) {
      this.imgSrc = item.icon;
      this.assetForm.controls['count'].setValue((item.details[0])?.count);
      this.assetForm.controls['title'].setValue((item.details[0])?.title);
      this.assetForm.controls['coinPrice'].setValue((item.coinPrice)?.price);
      this.assetForm.controls['coinType'].setValue((item.coinPrice)?.coin);
      this.assetForm.controls['price'].setValue(item.realPrice)
    } else {
      this.assetForm.reset();
    }
  }

  submitNewAsset() {
    this.loadingSubmit = true;
    this.error = '';
    if (this.id) {
      this.gameService.updateShopItem(this.assetForm.value, this.id, 'asset', this.fileToUpload).then(data => {
        this.loadingSubmit = false;
        if (data.status == 1) {
          this.displayForm = false;
          this.getAssets();
        } else {
          this.error = data?.message;
        }
      })
    } else {
      this.gameService.postNewShopItem(this.assetForm.value, 'asset', this.fileToUpload).then(data => {
        this.loadingSubmit = false;
        if (data.status == 1) {
          this.displayForm = false;
          this.getAssets();
        } else {
          this.error = data?.message;
        }
      })
    }
  }

  handleFileInput(event: any) {
    this.fileToUpload = event.target.files[0];
  }

  deleteAsset() {
    this.gameService.deleteShopItem(this.selectedId).then(data => {
      if (data.status == 1) {
        this.visible = !this.visible;
        this.getAssets();
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
