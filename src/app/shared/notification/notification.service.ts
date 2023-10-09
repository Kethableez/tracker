import {
  ApplicationRef,
  ComponentRef,
  ElementRef,
  EnvironmentInjector,
  Injectable,
  createComponent,
  createEnvironmentInjector,
} from '@angular/core';
import { NotificationComponent } from './notification.component';
import { ServiceNotification } from 'src/app/tracker/core/models/notification.model';
import { NavigationEnd, Router } from '@angular/router';
import { filter, map } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class NotificationService {
  refs: ComponentRef<NotificationComponent>[] = [];

  constructor(private appRef: ApplicationRef, private router: Router) {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => this.removeAll());
  }

  addNotification(notification: ServiceNotification) {
    const host = document.getElementById('notifications') as HTMLElement;

    const ref = createComponent(NotificationComponent, {
      environmentInjector: this.appRef.injector,
    });

    ref.instance.header = notification.header;
    ref.instance.message = notification.message;
    ref.instance.type = notification.type;
    ref.instance.withAction = false;

    host.appendChild(ref.location.nativeElement);
    this.appRef.attachView(ref.hostView);
    this.refs.push(ref);
  }

  addErrorNotification(header?: string, message?: string) {
    const notification: ServiceNotification = {
      header,
      message,
      type: 'error',
    };
    this.addNotification(notification);
  }

  addSuccessNotification(header?: string, message?: string) {
    const notification: ServiceNotification = {
      header,
      message,
      type: 'success',
    };
    this.addNotification(notification);
  }

  addInfoNotification(header?: string, message?: string) {
    const notification: ServiceNotification = {
      header,
      message,
      type: 'info',
    };
    this.addNotification(notification);
  }

  addWarningNotification(header?: string, message?: string) {
    const notification: ServiceNotification = {
      header,
      message,
      type: 'warning',
    };
    this.addNotification(notification);
  }

  removeSelf(ref: ElementRef) {
    this.refs.find((r) => r.instance.ref === ref)?.destroy();
  }

  removeByType(type: 'error' | 'info' | 'success' | 'warning') {
    this.refs.forEach((ref) => {
      if (ref.instance.type === type) {
        ref.destroy();
      }
    });
  }

  removeAll() {
    this.refs.forEach((ref) => ref.destroy());
  }
}
