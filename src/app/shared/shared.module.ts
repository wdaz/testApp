import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatDialogModule } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';

import { CommentComponent } from './comment/comment.component';

@NgModule({
  declarations: [CommentComponent],
  imports: [CommonModule, MatTableModule, MatDialogModule],
  exports: [CommentComponent],
})
export class SharedModule {}
