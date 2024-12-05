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
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {IconDirective} from "@coreui/icons-angular";
import {DocsExampleComponent} from "@docs-components/docs-example/docs-example.component";
import {GameService} from "../../services/game.service";
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-survival-league',
  standalone: true,
  imports: [CommonModule, ModalFooterComponent, ModalComponent, ModalHeaderComponent, ModalTitleDirective, ButtonCloseDirective,
    ModalBodyComponent, FormModule, ButtonDirective, SpinnerComponent, ReactiveFormsModule, IconDirective,
    RowComponent, ColComponent, TextColorDirective, CardComponent, CardHeaderComponent, CardBodyComponent,
    DocsExampleComponent, AccordionComponent, AccordionItemComponent, TemplateIdDirective, AccordionButtonDirective,
    BgColorDirective, ToastBodyComponent, ToastComponent, ToasterComponent, ToastHeaderComponent],
  templateUrl: './survival-league.component.html',
  styleUrl: './survival-league.component.scss'
})
export class SurvivalLeagueComponent {
  leagues: any = [];
  displayForm: any = false;
  id: any;
  active: any;
  leagueForm: FormGroup;
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

  constructor(private gameService: GameService, private fb: FormBuilder) {
    this.leagueForm = this.fb.group({
      title: ['', [Validators.required]],
      titleFa: ['', [Validators.required]],
      startDate: ['', []],
      endDate: ['', []],
      totalScore: ['', []],
      totalGames: ['', []],
    });
  }

  ngOnInit() {
    this.getLeagues();
  }

  async getLeagues() {
    this.loading = true;
    this.gameService.getLeagues().subscribe(data => {
      this.loading = false;
      if (data.status == 1) {
        this.leagues = data.data;
      }
    })
  }

  // Utility function to convert ISO date string to YYYY-MM-DD format
  convertIsoToDate(isoString: string): string {
    const date = new Date(isoString);
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2);  // Add leading zero
    const day = ('0' + date.getDate()).slice(-2);           // Add leading zero
    return `${year}-${month}-${day}`;  // Return date in YYYY-MM-DD format
  }

  displayAddLeague(data: any = null, id: any = null, active: any = null, path: any = null) {
    this.id = id;
    this.active = active;
    this.imgSrc = '';
    this.error = '';
    this.displayForm = !this.displayForm;
    if (this.displayForm && data) {
      this.leagueForm.patchValue({title: data.title});
      this.leagueForm.patchValue({titleFa: data.titleFa});
      this.leagueForm.patchValue({startDate: this.convertIsoToDate(data.startDate)});
      this.leagueForm.patchValue({endDate: this.convertIsoToDate(data.endDate)});
      this.leagueForm.patchValue({totalScore: data.totalScore});
      this.leagueForm.patchValue({totalGames: data.totalGames});
      this.imgSrc = path;
    } else {
      this.leagueForm.reset();
    }
  }

  submitNewLeague() {
    this.loadingSubmit = true;
    this.error = '';
    if (this.id) {
      this.gameService.updateLeague(this.id, this.leagueForm.value, this.active, this.fileToUpload).then(data => {
        this.loadingSubmit = false;
        if (data.status == 1) {
          this.displayForm = false;
          this.getLeagues();
        } else {
          this.error = data?.message;
        }
      })
    } else {
      this.gameService.postNewLeague(this.leagueForm.value, this.fileToUpload).then(data => {
        this.loadingSubmit = false;
        if (data.status == 1) {
          this.displayForm = false;
          this.getLeagues();
        } else {
          this.error = data?.message;
        }
      })
    }
  }

  handleFileInput(event: any) {
    this.fileToUpload = event.target.files[0];
  }

  deleteLeague() {
    this.gameService.deleteLeague(this.selectedId).then(data => {
      if (data.status == 1) {
        this.visible = !this.visible;
        this.getLeagues();
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

  onCheckedChange(id: any, name: any, event: Event): void {
    this.loading = true
    const inputElement = event.target as HTMLInputElement;

    this.gameService.updateLeague(id, name, inputElement.checked).then(data => {
      if (data?.status == 1) {
        this.message = data?.message;
      } else {
        this.message = data?.message;
      }
      this.getLeagues();
      this.toggleToast();
    })
    console.log('Checkbox checked state:', inputElement.checked);
    // Additional logic when the checked state changes
  }
}
