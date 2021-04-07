import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private baseUrl = environment.api;
  constructor(private http: HttpClient) {}

  allUsers() {
    return this.http.get(this.baseUrl + 'users');
  }

  getUserPosts(userId: number) {
    return this.http.get(this.baseUrl + 'posts?userId=' + userId);
  }

  getUserComments(postId: number) {
    return this.http.get(this.baseUrl + 'comments?postId=' + postId);
  }
}
