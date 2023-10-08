export class MenuItem {
  constructor(
    public label: string,
    public path: string,
    public parent?: MenuItem
  ) {}

  get links(): string[] {
    if (this.parent) {
      return [this.parent.path, this.path];
    } else return [this.path];
  }
}

export class AppRoutes {
  static HOME = new MenuItem('Home', 'home');
  static GUIDELINES = new MenuItem('Guidelines', 'guidelines');
  static COLORS = new MenuItem('Colors', 'colors', this.GUIDELINES);
  static TYPOGRAPHY = new MenuItem('Typography', 'typography', this.GUIDELINES);
  static SPACING = new MenuItem('Spacing', 'spacing', this.GUIDELINES);
  static BREAKPOINTS = new MenuItem(
    'Breakpoints',
    'breakpoints',
    this.GUIDELINES
  );

  static COMPONENTS = new MenuItem('Components', 'components');
  static ACTION_BUTTON = new MenuItem(
    'Action button',
    'action-button',
    this.COMPONENTS
  );
  static AVATAR = new MenuItem('Avatar', 'avatar', this.COMPONENTS);
  static BADGE = new MenuItem('Badge', 'badge', this.COMPONENTS);
  static BUTTON = new MenuItem('Button', 'button', this.COMPONENTS);
  static BREADCRUMB = new MenuItem('Breadcrumb', 'breadcrumb', this.COMPONENTS);
  static CALENDAR = new MenuItem('Calendar', 'calendar', this.COMPONENTS);
  static NOTIFICATION = new MenuItem(
    'Notification',
    'notification',
    this.COMPONENTS
  );
}

export const APP_ROUTES: MenuItem[] = Object.values(AppRoutes);

export const MENU_ITEMS = [
  {
    route: AppRoutes.HOME,
    icon: 'home',
  },
  {
    route: AppRoutes.GUIDELINES,
    icon: 'bookmarks',
    children: [
      {
        route: AppRoutes.COLORS,
      },
      {
        route: AppRoutes.TYPOGRAPHY,
      },
      {
        route: AppRoutes.SPACING,
      },
      {
        route: AppRoutes.BREAKPOINTS,
      },
    ],
  },
  {
    route: AppRoutes.COMPONENTS,
    icon: 'components',
    children: [
      {
        route: AppRoutes.ACTION_BUTTON,
      },
      {
        route: AppRoutes.AVATAR,
      },
      {
        route: AppRoutes.BADGE,
      },
      {
        route: AppRoutes.BUTTON,
      },
      {
        route: AppRoutes.BREADCRUMB,
      },
      {
        route: AppRoutes.CALENDAR,
      },
      {
        route: AppRoutes.NOTIFICATION,
      },
    ],
  },
];
