import {AfterViewInit, Component} from '@angular/core';
declare var anime: any;

@Component({
  selector: 'app-mask-detector',
  templateUrl: './mask-detector.component.html',
  styleUrls: ['./mask-detector.component.sass']
})
export class MaskDetectorComponent implements AfterViewInit{
  streamUrl: any;
  ngAfterViewInit(): void {
    this.streamUrl= 'http://200.126.12.8:2204/video_feed'
    var textWrapper = document.querySelector('.ml21 .letters');
    textWrapper!.innerHTML = textWrapper!.textContent!.replace(/([^\x00-\x80]|\w)/g, "<span class='letter'>$&</span>");

    anime.timeline({loop: true})
      .add({
        targets: '.ml21 .line',
        scaleY: [0,1],
        opacity: [0.5,1],
        easing: "easeOutExpo",
        duration: 700
      })
      .add({
        targets: '.ml21 .line',
        translateX: [0, document!.querySelector('.ml21 .letters')!.getBoundingClientRect().width + 10],
        easing: "easeOutExpo",
        duration: 700,
        delay: 100
      }).add({
      targets: '.ml21 .letter',
      opacity: [0,1],
      easing: "easeOutExpo",
      duration: 600,
      offset: '-=775',
      delay: (el:any, i:any) => 34 * (i+1)
    }).add({
      targets: '.ml21',
      opacity: 0,
      duration: 1000,
      easing: "easeOutExpo",
      delay: 10000000000
    });
  }
  errorWithStream(){
    this.streamUrl = '/assets/img/monitor.png'
  }
}
