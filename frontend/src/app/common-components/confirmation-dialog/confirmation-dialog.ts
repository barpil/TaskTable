import {Component, inject, Input} from '@angular/core';
import {DIALOG_DATA, DialogRef} from '@angular/cdk/dialog';

@Component({
  selector: 'app-confirmation-dialog',
  imports: [],
  templateUrl: './confirmation-dialog.html',
  styleUrl: './confirmation-dialog.css'
})
export class ConfirmationDialog {
  title: string = 'Confirmation';
  text: string = 'Default text';
  private readonly dialogRef = inject(DialogRef);
  data: ConfirmationDialogData = inject(DIALOG_DATA);

  constructor() {
    if(this.data.title){
      this.title=this.data.title;
    }
    if(this.data.text){
      this.text=this.data.text;
    }
  }


  onConfirm(){
    this.dialogRef.close(true);
  }

  onCancel(){
    this.dialogRef.close(true);
  }
}

export interface ConfirmationDialogData{
  title?: string;
  text?: string;
}
