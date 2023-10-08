import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { TablerIconsModule } from 'angular-tabler-icons';
import { ButtonDirective } from '../directives/button.directive';

@Component({
  selector: 'ktbz-calendar',
  templateUrl: 'calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, TablerIconsModule, ButtonDirective],
})
export class CalendarComponent implements OnInit {
  @Input() anchorDate = new Date();
  @Input() range = false;
  @Input() pastDaySelectable = true;
  @Output() onSelectedDate = new EventEmitter<Date>();
  @Output() onSelectedDateRange = new EventEmitter<Date[]>();

  today = new Date();
  mode: 'days' | 'years' = 'days';

  anchorMonth!: number;
  anchorYear!: number;
  anchorDay!: number;
  selectedDate: Date | null = null;
  selectedDateFrom: Date | null = null;
  selectedDateTo: Date | null = null;
  yearFrom!: number;
  yearTo!: number;
  readonly weeks = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  readonly months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  get daysInSelectedMonth() {
    const nextMonth = this.anchorMonth === 11 ? 0 : this.anchorMonth + 1;
    const nextYear = nextMonth === 0 ? this.anchorYear + 1 : this.anchorYear;

    const previousLastDayOfMonth = new Date(
      this.anchorYear,
      this.anchorMonth,
      0
    ).getDate();

    const lastDayOfMonth = new Date(nextYear, nextMonth, 0).getDate();

    let firstDayOfWeek = new Date(
      this.anchorYear,
      this.anchorMonth,
      1
    ).getDay();

    firstDayOfWeek = (firstDayOfWeek === 0 ? 7 : firstDayOfWeek) - 1;
    const startFill = new Array(firstDayOfWeek)
      .fill(0)
      .map((_, i) => previousLastDayOfMonth - firstDayOfWeek + i + 1);
    let lastDayOfWeek = new Date(
      this.anchorYear,
      this.anchorMonth,
      lastDayOfMonth
    ).getDay();
    lastDayOfWeek = (lastDayOfWeek === 0 ? 7 : lastDayOfWeek) - 1;

    const endFill = new Array(7 - lastDayOfWeek - 1)
      .fill(0)
      .map((_, i) => i + 1);
    return [
      ...startFill.map((value) => ({ label: value, displayOnly: true })),
      ...Array(lastDayOfMonth)
        .fill(0)
        .map((_, i) => i + 1)
        .map((value) => ({
          label: value,
          displayOnly: this.pastDaySelectable
            ? false
            : value < this.today.getDate(),
        })),
      ...endFill.map((value) => ({ label: value, displayOnly: true })),
    ];
  }

  get yearsList() {
    return new Array(25).fill(0).map((_, i) => this.yearFrom + i);
  }

  constructor() {}

  ngOnInit() {
    this.anchorMonth = this.anchorDate.getMonth();
    this.anchorYear = this.anchorDate.getFullYear();
    this.anchorDay = this.anchorDate.getDate();
    this.yearFrom = this.anchorYear - 12;
    this.yearTo = this.anchorYear + 12;
  }

  selectYear(year: number) {
    this.anchorYear = year;
    this.toggleMode('days');
  }

  selectDay(day: number, forDisplay: boolean) {
    if (forDisplay) return;
    if (!this.range) {
      this.selectDate(day);
      return;
    } else {
      this.selectDateRange(day);
      return;
    }
  }

  inRange(day: number, displayOnly: boolean) {
    if (displayOnly) return false;
    if (this.selectedDateFrom && this.selectedDateTo) {
      const times = [
        this.selectedDateFrom.getTime(),
        this.selectedDateTo.getTime(),
      ];
      times.sort();
      const dayTime = new Date(
        this.anchorYear,
        this.anchorMonth,
        day
      ).getTime();
      return dayTime > times[0] && dayTime < times[1];
    }
    return false;
  }

  isToday(day: number, displayOnly: boolean) {
    if (displayOnly) return false;
    const [yr, mth, dy] = this.destructDate(this.today);
    return day === dy && mth === this.anchorMonth && yr === this.anchorYear;
  }

  isSelected(day: number, forDisplay: boolean) {
    if (forDisplay) return false;
    return (
      this.isSelectedPart(day, this.selectedDate) ||
      this.isSelectedPart(day, this.selectedDateFrom) ||
      this.isSelectedPart(day, this.selectedDateTo)
    );
  }

  toggleMode(mode?: 'days' | 'years') {
    if (mode) {
      this.mode = mode;
      return;
    }
    this.mode = this.mode === 'days' ? 'years' : 'days';
  }

  next() {
    if (this.mode === 'days') {
      this.nextMonth();
      return;
    }
    this.nextYearRange();
  }
  previous() {
    if (this.mode === 'days') {
      this.previousMonth();
      return;
    }
    this.previousYearRange();
  }

  resetDate() {
    this.anchorMonth = new Date().getMonth();
    this.anchorYear = new Date().getFullYear();
    this.yearFrom = this.anchorYear - 12;
    this.yearTo = this.anchorYear + 12;
  }

  resetRange() {
    this.selectedDateFrom = null;
    this.selectedDateTo = null;
  }

  private selectDate(day: number) {
    this.selectedDate = new Date(this.anchorYear, this.anchorMonth, day);
    this.onSelectedDate.emit(this.selectedDate);
  }

  private selectDateRange(day: number) {
    if (!this.selectedDateFrom && !this.selectedDateTo) {
      this.selectedDateFrom = new Date(this.anchorYear, this.anchorMonth, day);
    } else if (!!this.selectedDateFrom && !this.selectedDateTo) {
      this.selectedDateTo = new Date(this.anchorYear, this.anchorMonth, day);
    } else {
      this.selectedDateFrom = new Date(this.anchorYear, this.anchorMonth, day);
      this.selectedDateTo = null;
    }
    if ((this.selectedDateFrom, this.selectedDateTo)) {
      const dateRange = [this.selectedDateFrom, this.selectedDateTo];
      dateRange.sort((from, to) => from.getTime() - to.getTime());

      this.onSelectedDateRange.emit(dateRange);
    }
  }

  private isSelectedPart(day: number, givenDate: Date | null) {
    if (!givenDate) return false;
    const [selectedYear, selectedMonth, selectedDay] =
      this.destructDate(givenDate);
    return (
      selectedDay === day &&
      selectedMonth === this.anchorMonth &&
      selectedYear === this.anchorYear
    );
  }

  private nextMonth() {
    if (this.anchorMonth + 1 === 12) {
      this.anchorMonth = 0;
      this.anchorYear++;
      return;
    }
    this.anchorMonth++;
  }

  private previousMonth() {
    if (this.anchorMonth - 1 === -1) {
      this.anchorMonth = 11;
      this.anchorYear--;
      return;
    }
    this.anchorMonth--;
  }

  private nextYearRange() {
    this.yearFrom = this.yearsList[12] + 25 - 12;
    this.yearTo = this.yearsList[12] + 25 + 12;
  }

  private previousYearRange() {
    this.yearFrom = this.yearsList[12] - 25 - 12;
    this.yearTo = this.yearsList[12] - 25 + 12;
  }

  private destructDate(date: Date) {
    const day = date.getDate();
    const month = date.getMonth();
    const year = date.getFullYear();
    return [year, month, day];
  }
}
