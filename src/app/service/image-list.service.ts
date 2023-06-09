import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class ImageListService {
  list: string[] = [];

  listChange: Subject<string[]> = new Subject<string[]>();

  constructor() {}

  public addImage(image: any) {
    if (image) {
      this.list = [...this.list, image];
      this.listChange.next(this.list);
    }
  }

  public removeImage(id: number) {
    let currentList = [...this.list];

    currentList.splice(id, 1);

    this.list = [...currentList];
    this.listChange.next(this.list);
  }
}
