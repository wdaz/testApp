import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit } from '@angular/core';

import { first } from 'rxjs/operators';

import { UserService } from 'src/app/services/user/user.service';
import { CommentComponent } from 'src/app/shared/comment/comment.component';
import { User } from 'src/app/models/user';
import { Post } from 'src/app/models/post';
import { SwUpdate } from '@angular/service-worker';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  users: User[];
  posts: Post[];
  comments: Comment[];
  constructor(
    private userService: UserService,
    private dialog: MatDialog,
    updates: SwUpdate
  ) {
    updates.available.subscribe((event) => {
      updates.activateUpdate().then(() => document.location.reload());
    });
  }

  ngOnInit(): void {
    this.userService
      .allUsers()
      .pipe(first())
      .subscribe((users: User[]) => {
        this.users = users;
      });
  }

  openPosts(userId: number) {
    this.posts = null;
    this.userService
      .getUserPosts(userId)
      .pipe(first())
      .subscribe((posts: Post[]) => {
        this.posts = posts;
      });
  }

  openComments(postId: number) {
    this.userService
      .getUserComments(postId)
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
