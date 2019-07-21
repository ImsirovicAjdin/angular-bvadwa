import { Component } from '@angular/core';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent  {
  name = 'Angular';
}

/*

Filtering a list
###################

"
Angular doesn't offer filtering or sorting pipes because they perform poorly and prevent aggressive minification.
"
angular.io





*/
