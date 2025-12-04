import {Component, Inject} from '@angular/core';
import {DIALOG_DATA, DialogRef} from '@angular/cdk/dialog';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-team-sort-dialog',
  imports: [
    FormsModule
  ],
  templateUrl: './team-sort-dialog.html',
  styleUrl: './team-sort-dialog.css'
})
export class TeamSortDialog {
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

export type SortCriteria = 'date_asc' | 'date_desc' | 'name_asc' | 'name_desc';

export interface SortResult {
  criteria: SortCriteria;
}
