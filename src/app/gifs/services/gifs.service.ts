
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SearchResponse ,Gif } from '../interfaces/gifs.interfaces';


@Injectable({
  providedIn: 'root'
})
export class GifsService {
  public gifList: Gif[] = [];

  private _tagsHistory: string[] = [];
  private apiKey = 'NGNvMv8Grq9J96hJnxtVUBGQ1RcG8r7w';
  private serviceUrl = 'https://api.giphy.com/v1/gifs';


  constructor(private http: HttpClient) {
    // this.loadLocalStorage();
    console.log('Gifs Service Ready');
  }

  get tagHistory() {
    return [...this._tagsHistory];
  }

private organizeHistory(tag:string){
  tag = tag.toLocaleLowerCase();

  if(this._tagsHistory.includes(tag)){
    this._tagsHistory= this._tagsHistory.filter((oldTag) => oldTag !== tag)
  }

  this._tagsHistory.unshift(tag);
  this._tagsHistory = this._tagsHistory.splice(0,10);
  //this.saveLocalStorage();
}

  searchTag(tag: string):void {

    if (tag.length === 0) return;
    this.organizeHistory(tag);


    const params = new HttpParams()
      .set('api_key', this.apiKey )
      .set('limit', '10' )
      .set('q', tag )


    this.http.get<SearchResponse>(`${ this.serviceUrl }/search`, { params })
      .subscribe( resp => {



        this.gifList = resp.data;
        console.log({ gifs: this.gifList });

      });




  }
}
