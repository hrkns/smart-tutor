import {
  Directive,
  ElementRef,
  HostListener,
  Renderer2
} from '@angular/core';
import {
  ControlValueAccessor,
  NG_VALUE_ACCESSOR
} from '@angular/forms';

@Directive({
  selector: 'input[type=file]',
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: FileValueAccesorDirective,
    multi: true
  }]
})

export class FileValueAccesorDirective implements ControlValueAccessor {

  onChange: any;

  constructor(private element: ElementRef, private render: Renderer2) {}

  @HostListener('change', ['$event.target.files']) handleInput(event: Array < File > ): void {

    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    this.onChange(event);
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  writeValue(value: any): void {

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const normalizedValue = value == null ? '' : value;
    this.render.setProperty(this.element.nativeElement, 'value', normalizedValue);
  }

  registerOnChange(fn: () => void): void {

    this.onChange = fn;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  registerOnTouched(fn: () => void): void {}

  nOnDestroy(): void {}
}
