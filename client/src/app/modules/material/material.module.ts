import {NgModule} from '@angular/core';
import {MatDialogModule, MAT_DIALOG_DEFAULT_OPTIONS, MatDialogConfig} from '@angular/material/dialog';

@NgModule({
  exports: [
    MatDialogModule
  ],
  providers: [
    { 
      provide: MAT_DIALOG_DEFAULT_OPTIONS, 
      useValue: {
        ...new MatDialogConfig(),
        disableClose: true ,
      } as MatDialogConfig
    },
  ],
})
export class MaterialModule { }
