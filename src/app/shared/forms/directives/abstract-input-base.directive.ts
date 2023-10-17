import {
  AfterViewInit,
  ChangeDetectorRef,
  Directive,
  ElementRef,
  HostListener,
  Injector,
  Input,
  OnDestroy,
  OnInit
} from '@angular/core';
import { ControlValueAccessor, FormControl, FormControlStatus, NgControl } from '@angular/forms';
import { BehaviorSubject, map, Observable, of, repeat, repeatWhen, Subject, tap } from 'rxjs';
import { isDirty } from 'ng-packagr/lib/graph/select';

@Directive()
export abstract class AbstractInputBase<T>
  implements ControlValueAccessor, OnInit {
  @Input() skipValidation = false;
  @Input() label!: string;
  @Input() required = true;
  @Input() errorKeys: string[] = [];
  @Input() readonly = false;

  @HostListener('document:click', ['$event'])
  private onClick(event: any): void {
    const path = event.path || event.composedPath();
    const inPath = path.find((e: any) => e === this.elRef.nativeElement);

    if (!!inPath) {
      this.isFocused = true;
      this.doOnFocusFn();
    } else {
      this.isFocused = false;
      this.doOnBlurFn();
    }
  }

  abstract doOnFocusFn(): void;

  abstract doOnBlurFn(): void;

  abstract value: T;

  abstract doOnInit(): void;

  public isFocused = false;
  public ngControl!: NgControl;

  get controlName(): string | null {
    return this.ngControl ? (this.ngControl.name as string) : null;
  }

  get validationEnabled(): boolean {
    return (
      this.isDirty &&
      this.isTouched &&
      !this.disabled &&
      !this.readonly
    );
  }

  get statusChanges$() {
    return this.formControl.statusChanges;
  }

  get isValid() {
    return this.validationEnabled ? this.formControl.valid : false;
  }

  get isInvalid() {
    return this.validationEnabled ? this.formControl.invalid : false;
  }

  get disabled(): boolean {
    return this.formControl?.disabled || false;
  }

  get formControl(): FormControl {
    return this.ngControl?.control as FormControl;
  }

  get isTouched(): boolean {
    return this.formControl.touched;
  }

  get isDirty(): boolean {
    return this.formControl.dirty;
  }

  get controlValue(): T {
    return this.formControl.value;
  }

  get forDisplay(): boolean {
    return this.readonly || this.disabled;
  }

  constructor(
    protected readonly injector: Injector,
    protected elRef: ElementRef
  ) {
  }

  onChange = (value: T): void => {
  };

  onTouch = (): void => {
  };

  writeValue(value: T): void {
    this.value = value;
    this.doUpdate();
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  ngOnInit(): void {
    this.ngControl = this.injector.get(NgControl);
    this.doOnInit();
  }

  protected doUpdate(): void {
    this.onChange(this.value);
    this.onTouch();
  }

}
