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

The Angular team and many experienced Angular developers strongly recommend moving filtering and sorting logic into the component itself.
"
angular.io

So how do we do it?

(1) We need a list a filtered list of products that we can bind to. We can define a property for that here:
filteredProducts: IProduct[]; Why don't we just filter the products array? Because once we filter the products array, we lose our original data and can't get it back without re-getting the data from its source.

(2) Next we need a way to know when the user changes the filter criteria: listFilter: string = 'cart';

We could use event binding and watch for key presses or value changes, but an easier way is to change our listFilter property into a getter and setter, like this:

_listFilter: string;
get listFilter(): string {
  return this._listFilter;
}
set listFilter(value: string) {
  this._listFilter = value;
}

The property getter and setter above works just like a simple property. When the data binding needs the value, it will call the getter, and get the value. Every time the user modifies the value, the data binding calls the setter, passing in that changed value. If we want to perform some logic every time the value is changed, we can add it in the SETTER. 

We want to add our filtered product array to the filtered list of products, like this:
this.filteredProducts = this.listFilter ? this.performFilter(this.listFilter) : this.products;
          ( ^ )         (     **                         ^^                                    )

Here, (^^), in the ternary, we are handling the possibility that the listFilter string is empty, null, or undefined. If there is a listFilter value (**), the true condition filters on that value: 
this.performFilter(this.listFilter)
Otherwise, if the listFilter is not set, the filtered products property - the **this.products**, is assigned to the entire set of products, and that makes sense - if there is no filter, we should display all of the products. 

The messy part: 
performFilter(filterBy: string): IProduct[] {
  filterBy = filterBy.toLocaleLowerCase();
  return this.product.filter((product: IProduct) => product.productName.toLocaleLowerCase().indexOf(filterBy) !== -1);
}

Explanation of this code:
product.productname.toLowaceLowerCase().indexOd(filterBy) !== -1

For each product in the list, the productName is filtered to lowercase, and indexOf is used to determine if the filter text is found in the product name. If so, the element is added to the filtered list.  

https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter

(3) Set default values for both the filtered products and the listFilter properties. The best place to set default values for more complex properties is in the class constuctor:

constructor() {
  this.filteredProducts = this.products // we wanna set the filteredProducts to the full list of products...
  this.listFilter = 'cart'; // ...and we'll set this.listFilter to 'cart' like we had earlier
}

(4) Our last step then is to change our template to bind to our filteredProducts property instead of the products property:

from:
<tr *ngFor='let product of products'>...</tr>

to:
<tr *ngFor='let product of filteredProducts'>

*/
