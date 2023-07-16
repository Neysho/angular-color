import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-color',
  template: `
    <h2 [style.background-color]="color">The background color is {{ color }}.</h2>
  `,
})
export class ColorComponent implements OnInit {
  color: string = '';

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.url.subscribe((urlSegments) => {
      const path = urlSegments[0].path;
      this.color = this.getColorByPath(path);
    });
  }

  getColorByPath(path: string): string {
    switch (path) {
      case 'red':
        return 'red';
      case 'blue':
        return 'blue';
      case 'purple':
        return 'purple';
      case 'yellow':
        return 'yellow';
      default:
        return '';
    }
  }
}
