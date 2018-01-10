import React, { Component } from 'react';
import './assets/styles/popup.css';

export default class Popup extends Component {
    constructor(props) {
        super(props);
        this.props = props;
        this.width = this.props.width || '400px';
        this.popupBackground;
        this.myPopup;
        this.closeButton;
        this.pos = 0;
	this.animate = animate.bind(this);
    }

    togglePopupComponent(){
        this.popupBackground.classList.toggle('hide');
        this.myPopup.classList.toggle('zeroSize');
        this.pos = 0;
    }

    animate(){
        let elem = document.querySelector('.popupContentClass');
        //resets the width and minHeight to the value of 'this.pos' (zero)
        elem.style.minHeight = this.pos;
        elem.style.width = this.pos;

        let id = setInterval(() => {
            let exactWidth = this.width;
            //removes the 'px' from the end if the passed down width
            if (this.pos >= exactWidth.substring(0, exactWidth.length - 2)) {
                clearInterval(id);
            } else {
                this.pos = this.pos + 10;
                console.log('this.pos', this.pos);

                elem.style.width = this.pos + 'px';
                console.log('elem.style.top = pos + \'px\';', elem.style.width);
                elem.style.minHeight = this.pos + 'px';
            }
        }, 5);

    }
    componentDidMount(){
        this.popupBackground = document.createElement('div');
        this.popupBackground.setAttribute('class', 'popupBackgroundClass hide');

        this.myPopup = document.createElement('div');
        this.myPopup.setAttribute('style', 'width:0' );
        this.myPopup.setAttribute('class', 'popupContentClass zeroSize');
        this.myPopup.setAttribute('id', 'myPopupComponent');
        this.myPopup.innerHTML = this.props.children.props.children;

        this.closeButton = document.createElement('img');
        this.closeButton.setAttribute('src', 'images/closeButton.svg');
        this.closeButton.setAttribute('class', 'closeButtonImage');

        this.popupBackground.appendChild(this.closeButton);

        this.popupBackground.appendChild(this.myPopup);
        document.body.insertBefore(this.popupBackground, document.body.firstChild);


        this.popupBackground.addEventListener('click', () => {
           this.popupBackground.classList.toggle('hide');
           this.myPopup.classList.toggle('zeroSize');
        })
    }
    render(){
        return(
            <div>{console.log('Popup Component Activated')}</div>
        )
    }
}

