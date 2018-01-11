import React, { Component } from 'react';

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
        this.close = this.close.bind(this);
        this.which = this.props.which || '1';
    }

    togglePopupComponent(which){
        //note: the CSS only loops the .popupBackgroundClass(number) up to 10. If you need a higher number of popups with this you will have to modify the CSS
        this.which = which;
        //'which' refers to which props.children we want to work on
        this.popupBackground = document.querySelector(`.popupBackgroundClass-${this.which}`);
        this.popupBackground.classList.toggle('hide');
        this.myPopup.classList.toggle('zeroSize');
        this.pos = 0;
        this.animate();
    }

    animate(){
        //set elem to the class that was passed down with the variable 'which'
        let elem = document.querySelector(`.popupContentClass-${this.which}`);
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
                elem.style.width = this.pos + 'px';
                elem.style.minHeight = this.pos + 'px';
            }
        }, 5);

    }
    componentDidMount(){
        //in case no specific popup was passed down with 'which', it defaults to 1 on mount
        this.popupBackground = document.querySelector(`.popupBackgroundClass-${this.which}`);
        // document.body.insertBefore(this.popupBackground, document.body.firstChild);
    }
    close(e){
        //to allows for things suc has inputs or clickable events inside of the component, we only close the popup if the background or the 'X' button is clicked
        if(e.target === this.popupBackground || e.target === this.xButton) {
            this.popupBackground.classList.toggle('hide');
            this.myPopup.classList.toggle('zeroSize');
        }
    }
    render(){
        return(
            <div onClick={(e)=>this.close(e)} className={`popupBackgroundClass-${this.which} hide`}>
                <div id='myPopupComponent'
                     style={{width: 0, height: 0}}
                     className={`popupContentClass-${this.which}`} //zeroSize
                     ref={ref => this.myPopup = ref}>
                    <img ref={ref => this.xButton = ref} src='images/closeButton.svg' className='closeButtonImage'/>
                    {this.props.children}
                </div>
            </div>
        )
    }
}
