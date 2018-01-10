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
        this.togglePopupComponent = this.togglePopupComponent.bind(this);
    }

    togglePopupComponent(){
        this.popupBackground.classList.toggle('hide');
        this.myPopup.classList.toggle('zeroSize');
        this.pos = 0;
        this.animate();
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
        document.body.insertBefore(this.popupBackground, document.body.firstChild);
    }
    close(){
        this.popupBackground.classList.toggle('hide');
        this.myPopup.classList.toggle('zeroSize');
    }
    render(){
        return(
            <div onClick={this.close.bind(this)} className='popupBackgroundClass hide'
                 ref={ref => this.popupBackground = ref}>
                    <div id='myPopupComponent'
                         style={{width: 0}}
                         className='popupContentClass zeroSize'
                         ref={ref => this.myPopup = ref}>
                            <img src='images/closeButton.svg' className='closeButtonImage'/>
                                {this.props.children}
                                <h1>Testing</h1>
                                {console.log('Popup Component Activated')}
                    </div>
            </div>
        )
    }
}

