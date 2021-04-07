import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Post } from '../../models/post';
import { Comment } from '../../models/comments';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  private baseUrl = environment.api;

  constructor(private http: HttpClient) {}

  allPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(this.baseUrl + 'posts');
  }

  allComments(postId: number): Observable<Comment[]> {
    return this.http.get<Comment[]>(
      this.baseUrl + 'posts/' + postId + '/comments'
    );
  }
}
