import { Component, OnInit, AfterViewInit, Inject } from '@angular/core';
import { PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import Swiper from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';

Swiper.use([Navigation, Pagination]);

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, AfterViewInit {

  constructor(@Inject(PLATFORM_ID) private platformId: Object) { }

  ngOnInit(): void { }

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      // Initialize Swiper after view initialization, only in the browser
      const swiper = new Swiper('.swiper-container', {
        loop: true,  // Enable looping for continuous autoplay
        spaceBetween: 10,
        centeredSlides: true,
        autoplay: {
          delay: 2500,  // 2.5 seconds between slides
          disableOnInteraction: false,  // Autoplay will continue after user interaction
          pauseOnMouseEnter: true,  // Pause autoplay when the user hovers over the slider (optional)
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
        pagination: {
          el: '.swiper-pagination',
          clickable: true,  // Enable clickable pagination dots
        },
      });

      // Add resize observer to recalculate swiper when the window is resized
      const resizeObserver = new ResizeObserver(() => {
        swiper.update();
      });

      resizeObserver.observe(document.querySelector('.swiper-container') as Element);
    }
  }
}
