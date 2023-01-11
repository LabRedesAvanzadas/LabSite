import {AfterViewInit, Component, OnInit} from '@angular/core';
declare var anime: any;
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements AfterViewInit{

  images = ["./assets/img/LRA_photos_1.png", "./assets/img/LRA_photos_2.jpg", "./assets/img/LRA_photos_3.jpg","./assets/img/LRA_photos_4.jpg"];

  ngAfterViewInit(): void {
    var textWrapper = document.querySelector('.ml11 .letters');
    textWrapper!.innerHTML = textWrapper!.textContent!.replace(/([^\x00-\x80]|\w)/g, "<span class='letter'>$&</span>");

    anime.timeline({loop: true})
      .add({
        targets: '.ml11 .line',
        scaleY: [0,1],
        opacity: [0.5,1],
        easing: "easeOutExpo",
        duration: 700
      })
      .add({
        targets: '.ml11 .line',
        translateX: [0, document!.querySelector('.ml11 .letters')!.getBoundingClientRect().width + 10],
        easing: "easeOutExpo",
        duration: 700,
        delay: 100
      }).add({
      targets: '.ml11 .letter',
      opacity: [0,1],
      easing: "easeOutExpo",
      duration: 600,
      offset: '-=775',
      delay: (el:any, i:any) => 34 * (i+1)
    }).add({
      targets: '.ml11',
      opacity: 0,
      duration: 1000,
      easing: "easeOutExpo",
      delay: 10000000000
    });

    var textWrapper2 = document.querySelector('.ml16');
    textWrapper2!.innerHTML = textWrapper2!.textContent!.replace(/\S/g, "<span class='letter'>$&</span>");

    anime.timeline({loop: true})
      .add({
        targets: '.ml16 .letter',
        opacity: [0.05,1],
        easing: "easeOutExpo",
        duration: 800,
        offset: '-=775',
        delay: (el:any, i:any) => 50 * i
      }).add({
      targets: '.ml11',
      opacity: 0,
      duration: 1000,
      easing: "easeOutExpo",
      delay: 10000000000
    });

  }


}
