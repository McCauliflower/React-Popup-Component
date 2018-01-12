import React, { Component } from 'react';
import './assets/styles/popup.css';

export default class Popup extends Component {
    constructor(props) {
        super(props);
        this.props = props;
        this.width = this.props.width || '400px';
        this.height = this.props.height || '400px';
        this.popupBackground;
        this.myPopup;
        this.closeButton;
        this.which = this.props.which;
        this.pos = 0;
        this.openPopupComponent = this.openPopupComponent.bind(this);
        this.close = this.close.bind(this);
    }

    openPopupComponent(which){
        //note: the CSS only loops the .popupBackgroundClass(number) up to 25. If you need a higher number of popups with this you will have to modify the CSS
        //the value of this.which changes in order to target the specific popupContent we want to target?
        this.which = which;


        //'which' refers to which props.children we want to work on
        this.popupBackground = document.querySelector(`.popupBackgroundClass-${this.which}`);
        //make sure it exists

        (this.popupBackground) ? this.popupBackground.classList.remove('hide') : null;

        //this ensures that when a popup is opened by another popup, then all open popups that are not supposed to be active are closed

        let allBackgrounds = document.querySelectorAll('.popupBackground');
        console.log('allBackgrounds', allBackgrounds);

        for(let i=0; i<allBackgrounds.length; i++){
            console.log('I in openPopup fn', i);
            let _current = `.popupBackgroundClass-${which}`;
            let _test = `.popupBackgroundClass-${i}`;
            // console.log(`.popupBackgroundClass-${i}`);
            // console.log('test', _test);

            //safety filter...sometimes the 'allBackgrounds' is showing up larger than it should be
            if(document.querySelector(`.popupBackgroundClass-${i}`)){
                (_current !== _test) ? document.querySelector(`.popupBackgroundClass-${i}`).classList.add('hide') : null;
            }
        }
    }

    componentDidMount(){

        //in case no specific popup was passed down with 'which', it defaults to 1 on mount
        this.popupBackground = document.querySelector(`.popupBackgroundClass-${this.which}`);
        // document.body.insertBefore(this.popupBackground, document.body.firstChild);
    }
    close(e){

        //to allows for things such has inputs or clickable events inside of the component, we only close the popup if the background or the 'X' button is clicked
        if(e.target === this.popupBackground || e.target === this.xButton){
            let instances = document.querySelectorAll(`.popupBackgroundClass-${this.which}`);
            for(let i=0; i<instances.length; i++){
                instances[i].classList.add('hide');
            }
        }
    }
    render(){

        {console.log('this.props.which', this.props.which)}
        return(
            <div onClick={(e)=>this.close(e)} className={`popupBackground popupBackgroundClass-${this.props.which} hide`}>
                <div id='myPopupComponent'
                     style={{width: this.props.width, height: this.props.height}}
                     className={`popupContentClass-${this.which}`}
                     ref={ref => this.myPopup = ref}>
                    <img ref={ref => this.xButton = ref} src='images/closeButton.svg' className='closeButtonImage'/>
                    {this.props.children}
                </div>
            </div>
        )
    }
}





