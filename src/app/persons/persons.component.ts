import { Component, OnInit, OnDestroy } from '@angular/core';
import { PersonsService } from './persons.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-persons',
  templateUrl:  './persons.component.html',
  styleUrls: [ './persons.component.css' ]
})

export class PersonsComponent implements OnInit, OnDestroy {
  personList: string[];
  private personListSubs: Subscription;
  isFetching: boolean;

  constructor(private prsService: PersonsService) { }

  ngOnInit() {
    this.personListSubs =  this.prsService.personsChanged.subscribe(persons =>  {
      this.personList = persons;
      this.isFetching = false;
    });
    this.isFetching = true;
    this.prsService.fetchPersons();
  }

  onRemovePerson(name: string) {
    this.prsService.removePerson(name);
  }

  ngOnDestroy() {
    this.personListSubs.unsubscribe();
  }
}
