import { Component, OnInit } from '@angular/core';
import { Result } from '../searchresult';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  public term: string;
  private tempTerm: string;
  public selectedArray: Result[] = [];
  constructor() { }

  ngOnInit() {
  }

  private onSearch() {
    this.term = this.tempTerm;
  }
}
