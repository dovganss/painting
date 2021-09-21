import React from 'react';
import { Component } from 'react';
import ReactDOM from 'react-dom';

export default class Canvas extends Component {
  constructor(props) {
    super(props);
    this.state={
        isDown: false,
        previousPointX:'',
        previousPointY:''
    }
    this.handleMouseDown = this.handleMouseDown.bind(this);
    this.handleMouseUp = this.handleMouseUp.bind(this);
}
render() {
    return (
        <div>    
            <canvas id="canvas" ref="canvas"
                    height={'500px'}
                    width={'1000px'}
                    onMouseDown={
                        e => {
                            let nativeEvent = e.nativeEvent;
                            this.handleMouseDown(nativeEvent);
                        }}
                    onMouseUp={
                        e => {
                            let nativeEvent = e.nativeEvent;
                            this.handleMouseUp(nativeEvent);
                        }}
            />
        </div>    
    );
}

handleMouseDown(event){   
    this.setState({
        isDown: true,
        previousPointX:event.offsetX,
        previousPointY:event.offsetY
    },()=>{    
        const canvas = ReactDOM.findDOMNode(this.refs.canvas);    
        const x = event.offsetX;
        const y = event.offsetY;
        const ctx = canvas.getContext("2d");
        ctx.fillStyle = 'black';
        ctx.moveTo(x,y);
        ctx.lineTo(x+1,y+1);
        ctx.stroke();
    })
}

handleMouseUp(event){
    this.setState({
        isDown: false
    });
        const canvas = ReactDOM.findDOMNode(this.refs.canvas);
        const x = event.offsetX;
        const y = event.offsetY;
        const ctx = canvas.getContext("2d");
        ctx.fillStyle = 'black';
        ctx.moveTo(this.state.previousPointX,this.state.previousPointY);
        ctx.lineTo(x,y);
        ctx.stroke();
        ctx.closePath();
 }
}