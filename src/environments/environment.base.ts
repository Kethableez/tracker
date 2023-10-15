import { Currency } from 'src/app/tracker/core/enums/currencies.enum';
import { LabelValue } from 'src/app/tracker/core/models/label-value.model';

const currencies: LabelValue<Currency>[] = [
  {
    label: 'Dolar',
    value: Currency.USD,
  },
  {
    label: 'Złoty',
    value: Currency.PLN,
  },
  {
    label: 'Euro',
    value: Currency.EUR,
  },
];

const menuItems = [
  {
    label: 'Start',
    link: 'dashboard',
    icon: 'home',
    isMain: false,
    // style: 'menu-item'
  },
  {
    label: 'Lista',
    link: 'list',
    icon: 'layout-list',
    isMain: false,
    // style: 'menu-item'
  },
  {
    label: 'Dodaj',
    link: 'create',
    icon: 'square-rounded-plus',
    isMain: true,
    // style: 'menu-item--main'
  },
  {
    label: 'Wykres',
    link: 'charts',
    icon: 'chart-pie',
    isMain: false,
    // style: 'menu-item'
  },
  {
    label: 'Ustawienia',
    link: 'settings',
    icon: 'settings',
    isMain: false,
    // style: 'menu-item'
  },
];

export const environmentBase = {
  apiUrl: 'http://localhost:3000',
  currencies,
  menuItems,
};
