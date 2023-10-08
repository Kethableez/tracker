import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ktbz-calendars',
  templateUrl: 'calendars.component.html',
  styleUrls: ['./calendars.component.scss'],
})
export class CalendarsComponent implements OnInit {
  constructor() {}

  ngOnInit() {}

  date: Date | null = null;
  dateRange: { from: Date; to: Date } | null = null;

  selectedDate(date: Date) {
    this.date = date;
  }

  selectedRange(dates: Date[]) {
    this.dateRange = {
      from: dates[0],
      to: dates[1],
    };
  }
}
