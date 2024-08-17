import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { LayoutHeader } from "./components/layout-header.component";

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [RouterOutlet, NzLayoutModule, LayoutHeader],
  templateUrl: './layout.component.html',
})
export class Layout {

}
