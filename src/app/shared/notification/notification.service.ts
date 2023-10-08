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

@Injectable({ providedIn: 'root' })
export class NotificationService {
  refs: ComponentRef<NotificationComponent>[] = [];

  constructor(
    private appRef: ApplicationRef,
    private injector: EnvironmentInjector
  ) {}

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

  removeSelf(ref: ElementRef) {
    this.refs.find((r) => r.instance.ref === ref)?.destroy();
  }
}
