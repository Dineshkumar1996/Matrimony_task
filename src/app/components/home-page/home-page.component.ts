import { Component, Inject, OnInit, ViewChild } from "@angular/core";
import {
  MatBottomSheet,
  MatBottomSheetRef,
} from "@angular/material/bottom-sheet";
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogModule,
  MatDialogRef,
} from "@angular/material/dialog";
import { WebcamComponent } from "../webcam/webcam.component";
import { ImageListService } from "src/app/service/image-list.service";

import { FilePickerDirective } from "../../directive/file-picker.directive";
import { NgIf } from "@angular/common";

@Component({
  selector: "app-home-page",
  templateUrl: "./home-page.component.html",
  styleUrls: ["./home-page.component.css"],
})
export class HomePageComponent implements OnInit {
  images: string[] = [];
  showModal: Boolean = true;

  private _subscription: any;

  constructor(
    private _bottomSheet: MatBottomSheet,
    public imageList: ImageListService,
    public dialog: MatDialog
  ) {
    this.images = imageList.list;
    this._subscription = imageList.listChange.subscribe((value) => {
      this.images = value;
    });
  }

  ngOnDestroy() {
    //prevent memory leak when component destroyed
    this._subscription.unsubscribe();
  }

  public ngOnInit(): void {}

  public openBottomSheet(): void {
    this._bottomSheet.open(BottomSheetList);
  }

  public clearImageSelected(index: number): void {
    this.dialog.open(AppConfirmation, {
      data: {
        index: index,
      },
    });
  }
}

@Component({
  selector: "bottom-sheet-list",
  templateUrl: "bottom-sheet-list.html",
  providers: [HomePageComponent],
})
export class BottomSheetList {
  constructor(
    private _bottomSheetRef: MatBottomSheetRef<BottomSheetList>,
    private homePage: HomePageComponent,
    public dialog: MatDialog,
    public imageList: ImageListService
  ) {}

  @ViewChild("buttonPicker", { static: true })
  _buttonPicker: FilePickerDirective | undefined;

  openLink(event: MouseEvent): void {
    this._bottomSheetRef.dismiss();
    //event.preventDefault();
  }

  _onFilesChanged(files: FileList) {
    console.log(files);
    const reader = new FileReader();
    reader.addEventListener(
      "load",
      () => {
        console.log(reader.result);
        this.imageList.addImage(reader.result);
        this._bottomSheetRef.dismiss();
      },
      false
    );

    reader.readAsDataURL(files[0]);
  }

  public openCamera() {
    const dialogRef = this.dialog.open(WebcamComponent);
    // return this.homePage.openCamera();
  }
}
@Component({
  selector: "app-confirmation",
  templateUrl: "./app-confirmation.html",
  standalone: true,
  imports: [MatDialogModule, NgIf],
})
export class AppConfirmation implements OnInit {
  constructor(
    public imageList: ImageListService,
    public dialogRef: MatDialogRef<AppConfirmation>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {}

  public RemoveImageHandler(index: number) {
    this.imageList.removeImage(index);
    this.dialogRef.close();
  }

  public ClosePopupHandler() {
    this.dialogRef.close();
  }
}
