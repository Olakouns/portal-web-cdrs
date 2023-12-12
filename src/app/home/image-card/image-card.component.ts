import {AfterContentInit, Component, NgZone, OnDestroy, OnInit} from '@angular/core';

@Component({
  selector: 'app-image-card',
  standalone: true,
  imports: [],
  templateUrl: './image-card.component.html',
  styleUrl: './image-card.component.scss'
})
export class ImageCardComponent implements OnInit, OnDestroy{
  slides = ["slide-1.png", "slide-2.png", "slide-3.png"];
  currentSlide = this.slides[0];

  id : any;
  constructor(private ngZone: NgZone) {}
  ngOnInit(): void {
    this.ngZone.runOutsideAngular(() => setInterval(() => {
      const currentIndex = this.slides.indexOf(this.currentSlide);
      this.ngZone.run(() => {
        if (currentIndex < this.slides.length - 1) {
          this.currentSlide = this.slides[currentIndex + 1];
        } else {
          this.currentSlide = this.slides[0];
        }
      });
    }, 5000));
  }

  ngOnDestroy(): void {
    if (this.id) {
      clearInterval(this.id);
    }
  }

}
