  
import React, { PureComponent } from 'react';
import { Layout,Button,Input } from 'antd';
import { WidthProvider, Responsive } from "react-grid-layout";

import BCC_Image from './components/image'
import BCC_Text from './components/text'
import BCC_View from './components/view'
import　BCC_Button　from './components/button'

const ResponsiveReactGridLayout = WidthProvider(Responsive);
const { Header, Content,Sider} = Layout;
export default class DragLayout extends PureComponent {
  static defaultProps = {
    cols: { lg: 12, md: 12, sm: 12, xs: 12, xxs: 12 },
    rowHeight: 1,
    onLayoutChange:()=>{},
    margin:[0,0],
    compactType:'vertical'
  };

  constructor(props) {
    super(props);

    this.state = {
      //layouts: this.getFromLS("layouts") || {},
      currentWidgetIndex:-1,//当前选中的控件
      layout:[],//位置信息
      widgets:[]//组件信息，与layout坐标一一对应
    }
    this.addWidget=this.addWidget.bind(this)
    this.onLayoutChange = this.onLayoutChange.bind(this);
  }

  /* getFromLS(key) {
    let ls = {};
    if (global.localStorage) {
      try {
        ls = JSON.parse(global.localStorage.getItem("rgl-8")) || {};
      } catch (e) {
       
      }
    }
    return ls[key];
  }

  saveToLS(key, value) {
    if (global.localStorage) {
      global.localStorage.setItem(
        "rgl-8",
        JSON.stringify({
          [key]: value
        })
      );
    }
  } */
  generateDOM = () => {
    return this.state.widgets.map((l, i) => {
      let component;
      let layout=this.state.layout[i]
      let payload=l.payload
      if (l.type === 'image') {
        component=(<BCC_Image payload/>)
      }else if (l.type === 'text') {
        component=(<BCC_Text payload/>)
      }else if (l.type === 'view') {
        component=(<BCC_View payload/>)
      }else if (l.type === 'button') {
        component=(<BCC_Button payload/>)
      }
     
      return (
        <div key={layout.i} data-grid={layout} style={{backgroundColor:'red'}} onClick={()=>this.setState({currentWidgetIndex:i})}>
          <span className='remove' onClick={this.onRemoveItem.bind(this, i)}>x</span>
          {component }
          {this.state.currentWidgetIndex}
          {JSON.stringify(this.state.widgets)}
        </div>
      );
    });
  };

  addWidget(type) {
    const addItem = {
     // x: (this.state.widgets.length * 3) % (this.state.cols || 12),
      x:Infinity,
      y: Infinity, // puts it at the bottom
      w: 12,
      h: 100,
      i: new Date().getTime().toString(),
    };
    this.setState(
      {
        layout:this.state.layout.concat({
          ...addItem
        }),
        widgets: this.state.widgets.concat({
         
          type,
        }),
      },
    )
    this.setState({currentWidgetIndex:this.state.layout.length})
    }

  onRemoveItem(i) {
    console.log('-----------------------------####################')
    console.log(this.state.widgets)
    this.setState({
      widgets: this.state.widgets.filter((item,index) => index !=i),
      currentWidgetIndex:-1
    });

  }

  onLayoutChange(layout, layouts) {
   
    //this.saveToLS("layouts", layouts);
    this.setState({ layout });

  }
  onChange = e => {
    const { value } = e.target;
    console.log('--------------------------------------')
   console.log(e)
   this.state.widgets[this.state.currentWidgetIndex].w=value
   this.setState({widgets:this.state.widgets.concat([])})
   console.log(value)
  };
  render() {
   return(
     <Layout>
      <Header className='header' >
       {/*  <Button type="primary" style={{'marginRight':'7px'}} onClick={this.addWidget.bind(this,'image')}>添加图</Button>
        <Button type="primary" style={{'marginRight':'7px'}} onClick={this.addWidget.bind(this,'text')}>添加文本</Button>
        <Button type="primary" style={{'marginRight':'7px'}} onClick={this.addWidget.bind(this,'view')}>添加view</Button> */}
      </Header>
    
     
        <Layout >
        <Sider width={300} style={{background: '#fff00' }}>
       
       <Button type="primary" style={{'marginRight':'7px'}} onClick={this.addWidget.bind(this,'image')}>添加图</Button>
          <Button type="primary" style={{'marginRight':'7px'}} onClick={this.addWidget.bind(this,'text')}>添加文本</Button>
          <Button type="primary" style={{'marginRight':'7px'}}/*  onClick={this.addWidget.bind(this,'view')} */>添加view</Button>
          <Button type="primary" style={{'marginRight':'7px'}} onClick={this.addWidget.bind(this,'button')}>添加button</Button>
          <div style={{color:'#FFFFFF'}}>{JSON.stringify(this.state.layout)}
          --------------------
          {JSON.stringify(this.state.widgets)}</div>
         </Sider>
         <Content style={{backgroundColor:'#cccccc',display:'flex',alignItems:'center',justifyContent: 'center',height:800}}>
      <div  /* onClick={()=>alert('layout')}  */style={{ backgroundColor:'#ffffff',width:375, height:600,overflow:'auto' }}>
        
          <ResponsiveReactGridLayout
   
            className="layout"
            {...this.props}
            layouts={this.state.layouts}
            onLayoutChange={  this.onLayoutChange }

          /*   cols={24} */
    
          >
            {this.generateDOM()}
          </ResponsiveReactGridLayout>
        </div>
      </Content>
      <Sider width={300} collapsible={true} style={{flex:1,background:'green'}} >
       
          {this.state.currentWidgetIndex!=-1&&this.state.widgets[this.state.currentWidgetIndex]? <div>
       (<Input addonBefore='宽' placeholder="0" onChange={this.onChange} value={this.state.layout[this.state.currentWidgetIndex].w}/>
        <Input addonBefore='高' placeholder="100" value={this.state.layout[this.state.currentWidgetIndex].h}/> 
        <Input addonBefore='颜色' placeholder="100" value={this.state.widgets[this.state.currentWidgetIndex].h}/> 
        <Input addonBefore='背景色' placeholder="100" value={this.state.widgets[this.state.currentWidgetIndex].h}/> 
        <Input addonBefore='外边距(margin)' placeholder="100" value={this.state.widgets[this.state.currentWidgetIndex].h}/> 
       <Input addonBefore='内边距(padding)' placeholder="100" value={this.state.widgets[this.state.currentWidgetIndex].h}/>   </div>
     :''}
     

      
        </Sider>
        </Layout>
       
    </Layout>
   )}
}

