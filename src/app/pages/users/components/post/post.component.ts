import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Post } from 'src/app/models/post';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
})
export class PostComponent implements OnInit {
  displayedColumns: string[] = ['id', 'title', 'body'];
  dataSource: MatTableDataSource<Post>;

  @Input() posts: Post[];
  @Output() showComment = new EventEmitter<number>();

  constructor() {}

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource(this.posts);
  }

  openComments(postId: number) {
    this.showComment.emit(postId);
  }
}
