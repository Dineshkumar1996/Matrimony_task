import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { AppComponent } from "./app.component";
import { FormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatButtonModule } from "@angular/material/button";
import {
  MatBottomSheet,
  MatBottomSheetModule,
  MatBottomSheetRef,
} from "@angular/material/bottom-sheet";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatIconModule } from "@angular/material/icon";
import { MatListModule } from "@angular/material/list";
import { from } from "rxjs";
import {
  BottomSheetList,
  HomePageComponent,
} from "./components/home-page/home-page.component";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { MatCardModule } from "@angular/material/card";
import { WebcamModule } from "ngx-webcam";
import { WebcamComponent } from "./components/webcam/webcam.component";
import { MatDialogModule, MatDialogRef } from "@angular/material/dialog";
import { FilePickerDirective } from "./directive/file-picker.directive";

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    BottomSheetList,
    WebcamComponent,
    FilePickerDirective,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    MatButtonModule,
    MatBottomSheetModule,
    MatListModule,
    MatToolbarModule,
    MatIconModule,
    NgbModule,
    MatCardModule,
    WebcamModule,
    MatDialogModule,
  ],
  providers: [
    {
      provide: MatDialogRef,
      useValue: {},
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
