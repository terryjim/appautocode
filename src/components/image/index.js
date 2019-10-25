import React, {
    Component
} from 'react';


export default class BCC_Image extends Component {
   
    render() {
        const {width,height}=this.props.payload
        return ( <
            img src = {
                process.env.PUBLIC_URL + '/img/blank_img.jpg'
            }
            style = {
                {
                    width: width||'auto',
                    height: height||'auto',
                    maxWidth: '100%',
                    maxHeight: '100%'
                }
            }
            draggable = {
                false
            }
            />
        );
    }
}