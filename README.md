# react-popup-component
  
:black_square_button: **React Popup Component** is a simple popup that creates a wrapper component around your text and lets you pass down whatever content you wish inside props.children.

:waning_gibbous_moon: Current status: **Minimal testing has been done. Use at your own risk**


# Installation


```bash
# With npm
npm install react-popup-component --save
# Or yarn
yarn add react-popup-component
```


# Instructions

```js
//import the component
import Popup from 'react-popup-component';
```

Next, you will need to add the method to your class. 
```js
togglePopupComponent = (which) => {
    this.popup.togglePopupComponent(which);
}
```
**NOTE: This component will ONLY work with an ES6 Class because of its reliance on props.children and refs**

Lastly, you will need to make an instance of the component, and for every instance you will need to have a corresponding onClick event to toggle that specific component. The specific popup you are targeting is passed down as an argument in the togglePopupComponent method, starting with 0.

For example:

```js

 <button onClick={(which) => this.togglePopupComponent(0)}>OPEN</button>
 //note that the first instance's 'which' variable is 0 and counts upward
<Popup which='0' ref={popup => this.popup = popup} width='400px' height='auto'>
    <h1>Anything you wish.</h1>
</Popup>
```


Make sure to mark the appropriate 'which' prop that you attached to each component instance. Our second popup component, for example, would be 

```js
<button onClick={(which) => this.togglePopupComponent(1)}>OPEN </button>

<Popup which='1' ref={popup => this.popup = popup} width='400px' height='auto'>
    <h1>Popup Component Numero Dos</h1>
</Popup>
```


# TODO

-Set default values for a single popup in case no props are passed down<br/>
-Write Tests <br/>
-Integrate SCSS into webpack configuration to utilize for loops instead of manually writing out each class incrementer <br/>
-Add animations <br/>


