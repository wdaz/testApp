import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';

import { Comment } from '../../models/comments';

@Component({
  selector: 'app-view-post',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss'],
})
export class CommentComponent implements OnInit {
  displayedColumns: string[] = ['name', 'email', 'body'];
  dataSource: MatTableDataSource<Comment>;

  constructor(@Inject(MAT_DIALOG_DATA) public data: Comment[]) {}

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource(this.data);
  }
}
