import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ktbz-colors',
  templateUrl: 'colors.component.html',
  styleUrls: ['./colors.component.scss'],
})
export class ColorsComponent implements OnInit {
  constructor() {}

  ngOnInit() {}

  readonly primary = [
    { label: 'Primary/900', value: '#1c2242' },
    { label: 'Primary/800', value: '#27305c' },
    { label: 'Primary/700', value: '#323d75' },
    { label: 'Primary/600', value: '#4758a8' },
    { label: 'Primary/500', value: '#5265c2' },
    { label: 'Primary/400', value: '#5d72db' },
    { label: 'Primary/300', value: '#6880f6' },
    { label: 'Primary/200', value: '#6b84ff' },
    { label: 'Primary/100', value: '#758dff' },
  ];

  readonly neutral = [
    { label: 'Neutral/900', value: '#0f0f0f' },
    { label: 'Neutral/800', value: '#282829' },
    { label: 'Neutral/700', value: '#424242' },
    { label: 'Neutral/600', value: '#5b5b5c' },
    { label: 'Neutral/500', value: '#747475' },
    { label: 'Neutral/400', value: '#8d8e8f' },
    { label: 'Neutral/300', value: '#a7a7a8' },
    { label: 'Neutral/200', value: '#c0c0c2' },
    { label: 'Neutral/100', value: '#d9d9db' },
    { label: 'Neutral/50', value: '#f2f3f5' },
    { label: 'Neutral/20', value: '#fafafc' },
    { label: 'Neutral/0', value: '#ffffff' },
  ];

  readonly success = [
    { label: 'Success/900', value: '#00592d' },
    { label: 'Success/800', value: '#006131' },
    { label: 'Success/700', value: '#006935' },
    { label: 'Success/600', value: '#00733a' },
    { label: 'Success/500', value: '#007d3f' },
    { label: 'Success/400', value: '#008744' },
    { label: 'Success/300', value: '#00944a' },
    { label: 'Success/200', value: '#00a151' },
    { label: 'Success/100', value: '#00b058' },
    { label: 'Success/10', value: '#dbffe4' },
  ];

  readonly error = [
    { label: 'Error/900', value: '#781818' },
    { label: 'Error/800', value: '#821a1a' },
    { label: 'Error/700', value: '#8f1d1d' },
    { label: 'Error/600', value: '#9c1f1f' },
    { label: 'Error/500', value: '#ab2222' },
    { label: 'Error/400', value: '#ba2525' },
    { label: 'Error/300', value: '#cc2929' },
    { label: 'Error/200', value: '#e02d2d' },
    { label: 'Error/100', value: '#f73131' },
    { label: 'Error/10', value: '#ffe7e0' },
  ];

  readonly warning = [
    { label: 'Warning/900', value: '#ff6f00' },
    { label: 'Warning/800', value: '#ff7a00' },
    { label: 'Warning/700', value: '#ff8600' },
    { label: 'Warning/600', value: '#ff9400' },
    { label: 'Warning/500', value: '#ffa300' },
    { label: 'Warning/400', value: '#ffb300' },
    { label: 'Warning/300', value: '#ffc500' },
    { label: 'Warning/200', value: '#ffd800' },
    { label: 'Warning/100', value: '#ffee00' },
    { label: 'Warning/10', value: '#fff8d6' },
  ];

  readonly info = [
    { label: 'Info/900', value: '#1f46a6' },
    { label: 'Info/800', value: '#214bb2' },
    { label: 'Info/700', value: '#2451c2' },
    { label: 'Info/600', value: '#2759d4' },
    { label: 'Info/500', value: '#2b61e8' },
    { label: 'Info/400', value: '#2f6bff' },
    { label: 'Info/300', value: '#4077ff' },
    { label: 'Info/200', value: '#4f82ff' },
    { label: 'Info/100', value: '#5e8dff' },
    { label: 'Info/10', value: '#e5ecff' },
  ];
}
