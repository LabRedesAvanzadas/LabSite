import {AfterViewInit, Component, OnInit} from '@angular/core';
declare var particlesJS: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit{
  title = 'LabSite';

  menuItems = [
    {
      label: 'Github',
      icon: 'github'
    },
    {
      label: 'Instagram',
      icon: 'instagram'
    },
    {
      label: 'Blog',
      icon: 'rss_feed'
    },
  ];

  ngOnInit(): void {
    particlesJS.load('particles-js', '../assets/particles.json', null);
  }


}
