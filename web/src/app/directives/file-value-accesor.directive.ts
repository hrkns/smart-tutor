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

  @HostListener('change', ['$event.target.files']) _handleInput(event) {

    this.onChange(event);
  }

  constructor(private element: ElementRef, private render: Renderer2) {}

  writeValue(value: any) {

    const normalizedValue = value == null ? '' : value;
    this.render.setProperty(this.element.nativeElement, 'value', normalizedValue);
  }

  registerOnChange(fn) {

    this.onChange = fn;
  }

  registerOnTouched(fn): void {}

  nOnDestroy() {}
}
