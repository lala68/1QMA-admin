import {NgStyle} from '@angular/common';
import {Component, OnInit} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {
  AvatarComponent,
  ButtonDirective,
  ButtonGroupComponent,
  CardBodyComponent,
  CardComponent,
  CardFooterComponent,
  CardHeaderComponent,
  ColComponent,
  FormCheckLabelDirective,
  GutterDirective, ProgressBarComponent,
  ProgressBarDirective,
  ProgressComponent,
  RowComponent,
  TableDirective, TemplateIdDirective,
  TextColorDirective, WidgetStatBComponent, WidgetStatCComponent, WidgetStatEComponent, WidgetStatFComponent
} from '@coreui/angular';

import {GameService} from "../../services/game.service";
import {IconDirective} from "@coreui/icons-angular";
import {cilArrowRight, cilChartPie} from "@coreui/icons";

@Component({
  templateUrl: 'dashboard.component.html',
  styleUrls: ['dashboard.component.scss'],
  standalone: true,
  imports: [TextColorDirective, CardComponent, CardBodyComponent, RowComponent, ColComponent, ButtonDirective,
    IconDirective, ReactiveFormsModule, ButtonGroupComponent, FormCheckLabelDirective, NgStyle, CardFooterComponent,
    GutterDirective, ProgressBarDirective, ProgressComponent, CardHeaderComponent, TableDirective, AvatarComponent,
    WidgetStatBComponent, WidgetStatFComponent, WidgetStatEComponent, ProgressBarComponent,
    TemplateIdDirective,]
})
export class DashboardComponent implements OnInit{
  dashboard: any;
  icons = { cilChartPie, cilArrowRight };

  constructor(private gameService: GameService) {
  }

  ngOnInit(): void {
    this.getDashboard();
  }

  async getDashboard() {
    this.gameService.getDashboard().subscribe(data => {
      if (data.status == 1) {
        this.dashboard = data.data;
      }
    })
  }

}
