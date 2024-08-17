import { Component, inject } from "@angular/core";
import { RouterLink } from "@angular/router";
import { NzAvatarModule } from "ng-zorro-antd/avatar";
import { NzDropDownModule } from "ng-zorro-antd/dropdown";
import { NzIconModule } from "ng-zorro-antd/icon";
import { NzLayoutModule } from "ng-zorro-antd/layout";
import { NzMenuModule } from "ng-zorro-antd/menu";
import { AuthService } from "../../services/auth/auth.service";

@Component({
    selector: "layout-header",
    standalone: true,
    imports: [NzLayoutModule, NzMenuModule, NzAvatarModule, NzIconModule, NzDropDownModule, RouterLink],
    templateUrl: "./layout-header.component.html"
})
export class LayoutHeader {
    private auth = inject(AuthService)
    logout = () => this.auth.logout()
}