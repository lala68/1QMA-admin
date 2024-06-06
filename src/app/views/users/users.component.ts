import {Component, OnInit} from '@angular/core';
import {UserService} from "../../services/user.service";
import {WidgetsDropdownComponent} from "../widgets/widgets-dropdown/widgets-dropdown.component";
import {
  AvatarComponent,
  ButtonDirective,
  ButtonGroupComponent,
  CardBodyComponent,
  CardComponent,
  CardFooterComponent,
  CardHeaderComponent,
  ColComponent, FormCheckComponent,
  FormCheckLabelDirective, FormModule,
  GutterDirective,
  NavComponent,
  NavItemComponent, NavLinkDirective, PageItemDirective, PageLinkDirective, PaginationComponent,
  ProgressBarDirective,
  ProgressComponent,
  RowComponent,
  TabContentComponent,
  TabContentRefDirective,
  TableDirective,
  TabPaneComponent,
  TextColorDirective
} from "@coreui/angular";
import {IconDirective} from "@coreui/icons-angular";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ChartjsComponent} from "@coreui/angular-chartjs";
import {CommonModule, NgFor, NgStyle} from "@angular/common";
import {WidgetsBrandComponent} from "../widgets/widgets-brand/widgets-brand.component";
import {RouterLink} from "@angular/router";
import {ChecksRadiosComponent} from "../forms/checks-radios/checks-radios.component";

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [WidgetsDropdownComponent, TextColorDirective, CardComponent, CardBodyComponent, RowComponent,
    ColComponent, ButtonDirective, IconDirective, ReactiveFormsModule, ButtonGroupComponent,
    FormCheckLabelDirective, ChartjsComponent, NgStyle, CardFooterComponent, GutterDirective, RouterLink,
    ProgressBarDirective, ProgressComponent, WidgetsBrandComponent, CardHeaderComponent, TableDirective,
    AvatarComponent, TabContentComponent, TabContentRefDirective, TabPaneComponent, NavComponent, NavItemComponent,
    NavLinkDirective, NgFor, PaginationComponent, PageItemDirective, PageLinkDirective, FormsModule,
    ChecksRadiosComponent, FormCheckComponent],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})
export class UsersComponent implements OnInit {
  public users: any = [];
  public usersArray: any = [];
  filteredUsers: any[] = [];
  paginatedUsers: any[] = [];
  public panes = [
    {name: 'complete register', content: 'One'},
    {name: 'incoming register', content: 'Two'},
    {name: 'wait list', content: 'Three'},
  ];
  currentPage: number = 1;
  pageSize: number = 10;
  totalItems: number = 0;
  pages: number[] = [];
  activePane = 0;
  searchQuery: string = '';

  constructor(private userService: UserService) {
  }

  ngOnInit(): void {
    this.getUsers();
  }

  async getUsers() {
    this.userService.getUsers().subscribe(data => {
      if (data.status == 1) {
        this.users = data.data;
        this.totalItems = data.data.length;
        this.calculatePages();
        this.paginateUsers();
      }
    })
  }

  calculatePages() {
    const totalPages = Math.ceil(this.totalItems / this.pageSize);
    this.pages = Array.from({length: totalPages}, (_, i) => i + 1);
  }

  paginateUsers() {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.paginatedUsers = this.usersArray.slice(startIndex, endIndex);
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
    } else if ($event == 1) {
      this.users.filter((item: any) => {
        if (!item.hasCompletedSignup) {
          this.usersArray.push(item);
          this.goToPage(1);
        }
      })
    } else if ($event == 2) {
      this.users.filter((item: any) => {
        if (item.inWaitList) {
          this.usersArray.push(item);
          this.goToPage(1);
        }
      })
    }
    console.log('onTabChange', $event);
  }

  onCheckedChange(id: any, event: Event): void {
    const inputElement = event.target as HTMLInputElement;

    this.userService.toggleUserActivation(id, inputElement.checked).then(data => {

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
      this.usersArray = this.users;
    }
    this.totalItems = this.usersArray.length;
    this.currentPage = 1;
    this.calculatePages();
    this.paginateUsers();
  }

}
