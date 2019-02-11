import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  public term: string;
  private tempTerm: string;
  constructor() { }

  ngOnInit() {
  }

  private onSearch() {
    this.term = this.tempTerm;
  }
}
