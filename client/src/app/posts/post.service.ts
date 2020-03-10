import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Post } from './post';
import { map } from 'rxjs/operators';
// import { Owner } from '../owners/owner';

@Injectable()
export class PostService {
  readonly postUrl: string = environment.API_URL + 'posts';
  readonly ownerUrl: string = environment.API_URL + 'owner';

  constructor(private httpClient: HttpClient) {
  }

  getPosts(filters?: { message?: string, owner?: string, owner_id?: string }): Observable<Post[]> {
    let httpParams: HttpParams = new HttpParams();
    if (filters) {
    //   if (filters.message) {
    //     httpParams = httpParams.set('message', filters.message);
    //   }
      if (filters.owner) {
        httpParams = httpParams.set('owner', filters.owner);
      }
      if (filters.owner_id){
        httpParams = httpParams.set('owner_id', filters.owner_id);
      }
    }
    return this.httpClient.get<Post[]>(this.postUrl, {
      params: httpParams,
    });
  }
  // this will get passed the owner id and display all the messages from that owner
  // maybe this needs to be formatted like getPosts where we return with params:httpParams?
  // currently this doesn't filter anything. It just displays all the posts.




  getOwnerPosts(filters?: { owner_id?: string}): Observable<Post[]> {
    let httpParams: HttpParams = new HttpParams();
    if (filters.owner_id) {
      httpParams = httpParams.set('owner_id', filters.owner_id);
    }
    return this.httpClient.get<Post[]>(this.postUrl, {
      params: httpParams,
    });
  }

  filterPosts(posts: Post[], filters: { message?: string, owner_id?: string }): Post[] {

    let filteredPosts = posts;

    // Filter by message
    // if (filters.message) {
    //   filters.message = filters.message.toLowerCase();

    //   filteredPosts = filteredPosts.filter(post => {
    //     return post.message.toLowerCase().indexOf(filters.message) !== -1;
    //   });
    // }

    return filteredPosts;
  }

  addPost(newPost: Post): Observable<string> {
    // Send post request to add a new user with the user data as the body.
    return this.httpClient.post<{id: string}>(this.postUrl + '/new', newPost).pipe(map(res => res.id));
  }
}
