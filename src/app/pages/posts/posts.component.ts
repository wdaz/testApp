import { Component, OnInit, ViewChild } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';

import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { first } from 'rxjs/operators';

import { Post } from '../../models/post';

import { PostService } from 'src/app/services/post/post.service';

import { CommentComponent } from 'src/app/shared/comment/comment.component';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss'],
})
export class PostsComponent implements OnInit {
  dataSource: MatTableDataSource<Post>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  displayedColumns: string[] = ['id', 'title', 'body'];

  constructor(
    private postService: PostService,
    public dialog: MatDialog,
    updates: SwUpdate
  ) {
    updates.available.subscribe((event) => {
      updates.activateUpdate().then(() => document.location.reload());
    });
  }

  ngOnInit(): void {
    this.postService
      .allPosts()
      .pipe(first())
      .subscribe((posts: Post[]) => {
        this.dataSource = new MatTableDataSource(posts);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openDialog(postId: number) {
    this.postService
      .allComments(postId)
      .pipe(first())
      .subscribe((comments) => {
        this.dialog.open(CommentComponent, {
          height: '400px',
          width: '1000px',
          data: comments,
        });
      });
  }
}
