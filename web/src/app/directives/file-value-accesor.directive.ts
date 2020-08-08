import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
// import 'rxjs/add/operator/debounceTime';

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: 'input[type=file]',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: FileValueAccesorDirective,
      multi: true
    }
  ]
})

export class FileValueAccesorDirective implements ControlValueAccessor {

  onChange: any;

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  @HostListener('change', ['$event.target.files']) _handleInput(event) {

    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    this.onChange(event);
  }

  // eslint-disable-next-line @typescript-eslint/member-ordering
  constructor(private element: ElementRef, private render: Renderer2) {  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  writeValue(value: any) {

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const normalizedValue = value == null ? '' : value;
    this.render.setProperty(this.element.nativeElement, 'value', normalizedValue);
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  registerOnChange(fn) {

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    this.onChange = fn;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  registerOnTouched(fn): void {  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  nOnDestroy() {  }
}
