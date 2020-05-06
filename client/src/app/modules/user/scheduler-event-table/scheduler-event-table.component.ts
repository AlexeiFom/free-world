import { Component, OnInit, Directive, EventEmitter, Input, Output, QueryList, ViewChildren } from '@angular/core';
import { SchedulerEvent } from '@app/shared/models/scheduler-event/scheduler-event';
import { EventService } from '@app/shared/services/event.service';

export type SortColumn = keyof SchedulerEvent | '';
export type SortDirection = 'asc' | 'desc' | '';
const rotate: { [key: string]: SortDirection } = { 'asc': 'desc', 'desc': '', '': 'asc' };
const compare = (v1: string, v2: string) => v1 < v2 ? -1 : v1 > v2 ? 1 : 0;

export interface SortEvent {
  column: SortColumn;
  direction: SortDirection;
}

@Directive({
  selector: 'th[sortable]',
  host: {
    '[class.asc]': 'direction === "asc"',
    '[class.desc]': 'direction === "desc"',
    '(click)': 'rotate()'
  }
})
export class NgbdSortableHeader {

  @Input() sortable: SortColumn = '';
  @Input() direction: SortDirection = '';
  @Output() sort = new EventEmitter<SortEvent>();

  rotate() {
    this.direction = rotate[this.direction];
    this.sort.emit({ column: this.sortable, direction: this.direction });
  }
}


@Component({
  selector: 'app-scheduler-event-table',
  templateUrl: './scheduler-event-table.component.html',
  styleUrls: ['./scheduler-event-table.component.scss']
})
export class SchedulerEventTableComponent implements OnInit {
  //countries = COUNTRIES;
  events: SchedulerEvent[]

  constructor(private eventService: EventService) { }

  ngOnInit() {
    this.eventService.getEvents().subscribe(result => {
      debugger
      this.events = result
    },
      (error) => {
        debugger
      }
    );

  }


  @ViewChildren(NgbdSortableHeader) headers: QueryList<NgbdSortableHeader>;

  onSort({ column, direction }: SortEvent) {
    // resetting other headers
    this.headers.forEach(header => {
      if (header.sortable !== column) {
        header.direction = '';
      }
    });

    // sorting countries
    if (direction === '' || column === '') {
      this.events = this.events;
    } else {
      this.events = [...this.events].sort((a, b) => {
        const res = compare(`${a[column]}`, `${b[column]}`);
        return direction === 'asc' ? res : -res;
      });
    }
  }

}



