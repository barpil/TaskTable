import {Component, Inject} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {DIALOG_DATA, DialogRef} from '@angular/cdk/dialog';

@Component({
  selector: 'app-project-sort-dialog',
    imports: [
        FormsModule
    ],
  templateUrl: './project-sort-dialog.html',
  styleUrl: './project-sort-dialog.css'
})
export class ProjectSortDialog {
  selectedSort: SortCriteria = 'name_asc';

  constructor(
    public dialogRef: DialogRef<SortCriteria>,
    @Inject(DIALOG_DATA) public data: { currentSort: SortCriteria }
  ) {
    if (data?.currentSort) {
      this.selectedSort = data.currentSort;
    }
  }

  apply() {
    this.dialogRef.close(this.selectedSort);
  }

  close() {
    this.dialogRef.close();
  }
}
export type SortCriteria = 'name_asc' | 'name_desc';

export interface SortResult {
  criteria: SortCriteria;
}
