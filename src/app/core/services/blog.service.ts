import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "environments/environment";
import { Observable } from "rxjs";
import { BlogEntryDto } from "../dtos/marketing/blog-entry.dto";
import { ServiceBase } from "./base.service";

@Injectable({
   providedIn: 'root'
})
export class BlogService extends ServiceBase {

   constructor(protected _httpClient: HttpClient) {
      super(environment.apiUrl, "marketing", _httpClient)
   }

   public findBlogEntries(parameters?: { page?: number, itemsPerPage?: number, companyId?: number }): Observable<BlogEntryDto[]> {
      parameters = parameters ?? {};

      let queryString: HttpParams = new HttpParams()
         .set("page", (parameters.page ?? -1).toString())
         .set("itemsPerPage", (parameters.itemsPerPage ?? -1).toString())
         .set("companyId", (parameters.companyId ?? -1).toString());

      return this._httpClient.get<BlogEntryDto[]>(`${this.getPartialUrl()}/blog/entry`, { params: queryString });
   }

   public createBlogEntry(blogEntryDto: BlogEntryDto): Observable<BlogEntryDto> {
      return this._httpClient.post<BlogEntryDto>(`${this.getPartialUrl()}/blog/entry`, blogEntryDto);
   }

   public editBlogEntry(blogEntryDto: BlogEntryDto): Observable<BlogEntryDto> {
      return this._httpClient.put<BlogEntryDto>(`${this.getPartialUrl()}/blog/entry`, blogEntryDto);
   }

   public viewBlogEntry(blogEntryId: number): Observable<boolean> {
      return this._httpClient.put<boolean>(`${this.getPartialUrl()}/blog/entry/view?blogEntryId=${blogEntryId}`, {});
   }

   public likeBlogEntry(blogEntryId: number): Observable<boolean> {
      return this._httpClient.put<boolean>(`${this.getPartialUrl()}/blog/entry/like/?blogEntryId=${blogEntryId}`, {});
   }
}