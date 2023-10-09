import {
  ChangeDetectorRef,
  Directive,
  ElementRef,
  HostListener,
  Injector,
  Input,
  OnInit,
} from '@angular/core';
import { ControlValueAccessor, FormControl, NgControl } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';

@Directive()
export abstract class AbstractInputBase<T>
  implements ControlValueAccessor, OnInit
{
  @Input() skipValidation = false;
  @Input() label!: string;
  @Input() required = true;
  @Input() errorKeys: string[] = [];
  @Input() readonly = false;

  @HostListener('document:click', ['$event'])
  private onClick(event: any): void {
    const path = event.path || event.composedPath();
    const inPath = path.find((e: any) => e === this.elRef.nativeElement);

    this.isFocused = !!inPath;
    if (!!inPath) {
      this.doOnFocusFn();
    } else {
      this.doOnBlurFn();
    }
  }

  abstract doOnFocusFn(): void;

  abstract doOnBlurFn(): void;

  get isPristine() {
    return !this.isTouched && !this.isDirty;
  }

  abstract value: T;

  abstract doOnInit(): void;

  status$ = new BehaviorSubject<'valid' | 'invalid' | 'pending'>('invalid');

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
      !this.readonly &&
      !this.isFocused
    );
  }

  get statusClass() {
    if (this.disabled) return 'disabled';
    if (this.readonly) return 'readonly';
    if (this.validationEnabled && !this.skipValidation) {
      console.log(':D');
      if (this.formControl.valid) return 'valid';
      if (this.formControl.invalid) return 'invalid';
      if (this.formControl.pending) return 'pending';
    }
    if (this.isFocused) return 'focus';
    return '';
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
    protected cdr: ChangeDetectorRef,
    protected elRef: ElementRef
  ) {}

  onChange = (value: T): void => {};

  onTouch = (): void => {};

  writeValue(value: T): void {
    this.value = value;
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
