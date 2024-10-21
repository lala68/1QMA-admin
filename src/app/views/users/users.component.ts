import {Component, OnInit} from '@angular/core';
import {UserService} from "../../services/user.service";
import {
  AvatarComponent,
  ButtonDirective,
  ButtonGroupComponent,
  CardBodyComponent,
  CardComponent,
  CardFooterComponent,
  CardHeaderComponent,
  ColComponent, FormCheckComponent, FormCheckInputDirective,
  FormCheckLabelDirective, FormModule,
  GutterDirective,
  NavComponent,
  NavItemComponent, NavLinkDirective, PageItemDirective, PageLinkDirective, PaginationComponent, ProgressBarComponent,
  ProgressBarDirective,
  ProgressComponent,
  RowComponent, SpinnerComponent,
  TabContentComponent,
  TabContentRefDirective,
  TableDirective,
  TabPaneComponent,
  TextColorDirective, ToastBodyComponent, ToastComponent, ToasterComponent, ToastHeaderComponent
} from "@coreui/angular";
import {IconDirective} from "@coreui/icons-angular";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {CommonModule, NgFor, NgStyle} from "@angular/common";
import {Route, Router, RouterLink} from "@angular/router";
import {ChecksRadiosComponent} from "../forms/checks-radios/checks-radios.component";
import {DocsExampleComponent} from "@docs-components/public-api";
import {Preferences} from "@capacitor/preferences";
import {GeneralService} from "../../services/general.service";

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [TextColorDirective, CardComponent, CardBodyComponent, RowComponent,
    ColComponent, ButtonDirective, IconDirective, ReactiveFormsModule, ButtonGroupComponent, SpinnerComponent,
    FormCheckLabelDirective, NgStyle, CardFooterComponent, GutterDirective, RouterLink,
    ProgressBarDirective, ProgressComponent, CardHeaderComponent, TableDirective,
    AvatarComponent, TabContentComponent, TabContentRefDirective, TabPaneComponent, NavComponent, NavItemComponent,
    NavLinkDirective, NgFor, PaginationComponent, PageItemDirective, PageLinkDirective, FormsModule,
    ChecksRadiosComponent, FormCheckComponent, DocsExampleComponent, FormCheckInputDirective, FormCheckInputDirective,
    ToasterComponent, ToastComponent, ToastHeaderComponent, ToastBodyComponent, ProgressBarDirective, ProgressComponent, ProgressBarComponent],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})
export class UsersComponent implements OnInit {
  public users: any = [];
  public usersArray: any = [];
  filteredUsers: any[] = [];
  paginatedUsers: any[] = [];
  loading: boolean = true;
  public panes = [
    {name: 'Registered', content: 'One'},
    {name: 'incomplete registered', content: 'Two'},
    {name: 'wait list', content: 'Three'},
  ];
  currentPage: number = 1;
  pageSize: number = 10;
  totalItems: number = 0;
  pages: number[] = [];
  activePane = 0;
  searchQuery: string = '';
  message: any;

  constructor(private userService: UserService, private router: Router, private generalService: GeneralService) {
  }

  ngOnInit(): void {
    this.getUsers();
  }

  async getUsers() {
    this.userService.getUsers().subscribe(data => {
      // if (data.status == 1) {
        this.users = data.users.data.users;
        this.totalItems = data.users.data.length;
        this.onTabChange(0)
      // }
    })
  }

  calculatePages() {
    const totalPages = Math.ceil(this.usersArray.length / this.pageSize);
    this.pages = Array.from({length: totalPages}, (_, i) => i + 1);
  }

  paginateUsers() {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.paginatedUsers = this.usersArray.slice(startIndex, endIndex);
    this.loading = false;
  }

  goToPage(page: number) {
    console.log(this.usersArray)
    this.currentPage = page;
    this.paginateUsers();
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.paginateUsers();
    }
  }

  nextPage() {
    if (this.currentPage < this.pages.length) {
      this.currentPage++;
      this.paginateUsers();
    }
  }

  onTabChange($event: number) {
    this.loading = true;
    this.activePane = $event;
    this.usersArray = [];
    this.paginatedUsers = [];
    if ($event == 0) {
      this.users.filter((item: any) => {
        if (item.hasCompletedSignup) {
          this.usersArray.push(item);
          this.goToPage(1);
        }
      })
      this.calculatePages();
      this.paginateUsers();
    } else if ($event == 1) {
      this.users.filter((item: any) => {
        if (!item.hasCompletedSignup) {
          this.usersArray.push(item);
          this.goToPage(1);
        }
      })
      this.calculatePages();
      this.paginateUsers();
    } else if ($event == 2) {
      this.users.filter((item: any) => {
        if (item.inWaitList) {
          this.usersArray.push(item);
          this.goToPage(1);
        }
      })
      this.calculatePages();
      this.paginateUsers();
    }
    console.log('onTabChange', $event);
  }

  onCheckedChange(id: any, event: Event): void {
    const inputElement = event.target as HTMLInputElement;

    this.userService.toggleUserActivation(id, inputElement.checked).then(data => {
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

  searchUsers() {
    if (this.searchQuery) {
      const query = this.searchQuery.toLowerCase();
      this.usersArray = this.users.filter((user: any) =>
        (user.firstName && user.firstName.toLowerCase().includes(query)) ||
        (user.lastName && user.lastName.toLowerCase().includes(query)) ||
        (user.email && user.email.toLowerCase().includes(query))
      );
    } else {
      // this.usersArray = this.users;
      this.onTabChange(this.activePane)
    }
    this.totalItems = this.usersArray.length;
    this.currentPage = 1;
    this.calculatePages();
    this.paginateUsers();
  }

  position = 'top-end';
  visible = false;
  percentage = 0;

  toggleToast() {
    this.visible = !this.visible;
  }

  onVisibleChange($event: boolean) {
    this.visible = $event;
    this.percentage = !this.visible ? 0 : this.percentage;
  }

  onTimerChange($event: number) {
    this.percentage = $event * 25;
  }

  async gotoDetail(user: any) {
    await this.router.navigate(['/user-detail'], {state: {user: user}});
  }


}
