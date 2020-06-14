import { Injectable } from '@angular/core';
import { HeaderData } from './header-data.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HeaderService {

  //O BehaviorSubject emite evento de modificação
  private _headerDate = new BehaviorSubject<HeaderData>({
    title: 'Início',
    icon: 'home',
    routeUrl: ''
  });

  constructor() { }

  get headerData(): HeaderData {
    return this._headerDate.value;
  }

  set headerData(headerData: HeaderData) {
    this._headerDate.next(headerData);
  }
  
}
