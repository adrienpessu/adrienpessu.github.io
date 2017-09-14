import {
  Component,
  Input
} from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';
import {MdDialog} from '@angular/material';
import {EnSavoirPlusComponent} from './ensavoirplus/ensavoirplus.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  constructor(public dialog: MdDialog) {}

  openDialog(): void {
    this.dialog.open(EnSavoirPlusComponent, {
      width: '250px'
    });
  }

  scroll(el) {
      el.scrollIntoView(true);
  }

  runScroll() {
    this.scrollTo(document.body, 0, 600);
  }

  scrollTo(element, to, duration) {
    if (duration <= 0) return;
    var difference = to - element.scrollTop;
    var perTick = difference / duration * 10;

    setTimeout(function() {
      element.scrollTop = element.scrollTop + perTick;
      if (element.scrollTop == to) return;
      this.scrollTo(element, to, duration - 10);
    }, 10);
  }
}
