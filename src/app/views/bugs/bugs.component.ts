import {Component, OnInit} from '@angular/core';
import {
  AvatarComponent,
  ButtonDirective,
  ButtonGroupComponent,
  CardBodyComponent,
  CardComponent,
  CardFooterComponent,
  CardHeaderComponent,
  ColComponent, FormCheckComponent, FormCheckInputDirective,
  FormCheckLabelDirective,
  GutterDirective, ModalBodyComponent, ModalComponent, ModalFooterComponent, ModalHeaderComponent, ModalTitleDirective,
  NavComponent,
  NavItemComponent, NavLinkDirective, PageItemDirective, PageLinkDirective, PaginationComponent, ProgressBarComponent,
  ProgressBarDirective,
  ProgressComponent,
  RowComponent,
  SpinnerComponent,
  TabContentComponent,
  TabContentRefDirective,
  TableDirective,
  TabPaneComponent,
  TextColorDirective, ToastBodyComponent, ToastComponent, ToasterComponent, ToastHeaderComponent
} from "@coreui/angular";
import {IconDirective} from "@coreui/icons-angular";
import {FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {CommonModule, NgFor, NgStyle} from "@angular/common";
import {Router, RouterLink} from "@angular/router";
import {ChecksRadiosComponent} from "../forms/checks-radios/checks-radios.component";
import {DocsExampleComponent} from "@docs-components/docs-example/docs-example.component";
import {GameService} from "../../services/game.service";

@Component({
  selector: 'app-bugs',
  standalone: true,
  imports: [TextColorDirective, CardComponent, CardBodyComponent, RowComponent, CommonModule,
    ColComponent, ButtonDirective, IconDirective, ReactiveFormsModule, ButtonGroupComponent, SpinnerComponent,
    FormCheckLabelDirective, NgStyle, CardFooterComponent, GutterDirective, RouterLink,
    ProgressBarDirective, ProgressComponent, CardHeaderComponent, TableDirective,
    ModalFooterComponent, ModalComponent, ModalHeaderComponent, ModalTitleDirective, ModalBodyComponent,
    AvatarComponent, TabContentComponent, TabContentRefDirective, TabPaneComponent, NavComponent, NavItemComponent,
    NavLinkDirective, NgFor, PaginationComponent, PageItemDirective, PageLinkDirective, FormsModule,
    ChecksRadiosComponent, FormCheckComponent, DocsExampleComponent, FormCheckInputDirective, FormCheckInputDirective,
    ToasterComponent, ToastComponent, ToastHeaderComponent, ToastBodyComponent, ProgressBarDirective, ProgressComponent, ProgressBarComponent],
  templateUrl: './bugs.component.html',
  styleUrl: './bugs.component.scss'
})
export class BugsComponent implements OnInit {
  public reports: any = [];
  public bugsArray: any = [];
  paginatedBugs: any[] = [];
  loading: boolean = true;
  currentPage: number = 1;
  pageSize: number = 10;
  totalItems: number = 0;
  pages: number[] = [];

  constructor(private router: Router, private gameService: GameService, private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.getBugReports();
  }

  async getBugReports() {
    this.gameService.getBugReports().subscribe(data => {
      this.reports = data.data;
      this.totalItems = data.data.length;
    })
  }

  calculatePages() {
    const totalPages = Math.ceil(this.bugsArray.length / this.pageSize);
    this.pages = Array.from({length: totalPages}, (_, i) => i + 1);
  }

  paginateBugs() {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.paginatedBugs = this.bugsArray.slice(startIndex, endIndex);
    this.loading = false;
  }

  goToPage(page: number) {
    this.currentPage = page;
    this.paginateBugs();
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.paginateBugs();
    }
  }

  nextPage() {
    if (this.currentPage < this.pages.length) {
      this.currentPage++;
      this.paginateBugs();
    }
  }

  gotoDetail(data: any) {

  }

}
