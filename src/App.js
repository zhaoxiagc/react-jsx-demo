import './index.css'
import avatar from './images/avatar.png'
import { tab } from '@testing-library/user-event/dist/tab'
import React from 'react'
import {v4 as uuid} from 'uuid'

class App extends React.Component {
  // 依赖的数据
state = {
  // hot: 热度排序  time: 时间排序
  tabs: [
    {
      id: 1,
      name: '热度',
      type: 'hot'
    },
    {
      id: 2,
      name: '时间',
      type: 'time'
    }
  ],
  active: 'hot',   //控制激活的关键状态
  list: [
    {
      id: 1,
      author: '刘德华',
      comment: '给我一杯忘情水',
      time: new Date('2021-10-10 09:09:00'),
      // 1: 点赞 0：无态度 -1:踩
      attitude: 1
    },
    {
      id: 2,
      author: '周杰伦',
      comment: '哎哟，不错哦',
      time: new Date('2021-10-11 09:09:00'),
      // 1: 点赞 0：无态度 -1:踩
      attitude: 0
    },
    {
      id: 3,
      author: '五月天',
      comment: '不打扰，是我的温柔',
      time: new Date('2021-10-11 10:09:00'),
      // 1: 点赞 0：无态度 -1:踩
      attitude: -1
    }
  ],
  comment:"请输入内容"   //评论框中的内容
}

formatTime = (time) => {
  //时间的格式化 2022-2-28
  return `${time.getFullYear()}-${time.getMonth()+1}-${time.getDate()}`
}

  //tab 切换回调
  switchTab = (type) => {
    console.log("111",type);
    //实现思路：点击谁，就把谁的 type 属性交给 state 中的 active
    this.setState({active: type})
  }

  //受控组件 textarea 的回调
  textareaChange = (e) => {
    this.setState({comment: e.target.value})
  }

  //点击“发表评论”按钮的回调
  submitComment = () =>{
    //提交评论，state.list 的后面添加一项新的
    this.setState({list:[...this.state.list, {
      id: uuid(),    //独一无二的值
      author: 'cp',
      comment: this.state.comment,
      time: new Date(),
      // 1: 点赞 0：无态度 -1:踩
      attitude: 0
    }]})
  }

  //删除评论
  delComment = (id) => {
    console.log(id);
    this.setState({list: this.state.list.filter(item => item.id !== id)})
  }

  //切换喜欢
  toggleLike = (curItem) => {
    //逻辑： attitude 如果为0，就改为1， 如果为1，就改为0
    console.log(curItem);
    const {attitude, id} = curItem;   //解构赋值
    this.setState({
      list: this.state.list.map(item => {
        //判断条件，如果item.id === id，把item.attitude修改一下
        //否则原样返回
        if(item.id === id){
          return {
            ...item,
            //当属性发生重复，会以后面的为主进行覆盖
            attitude: attitude ===1 ? 0: 1
          }
        }
        else{
          return item;
        }
      })
    })
  }

  render(){
  return (
    <div className="App">
      <div className="comment-container">

        {/* 评论数 */}
        <div className="comment-head">
          <span>5 评论</span>
        </div>

        {/* 排序 */}
        <div className="tabs-order">
          <ul className="sort-container">
            {this.state.tabs.map(tab => 
            <li 
              onClick={() => this.switchTab(tab.type)}
              className={tab.type === this.state.active ? 'on': ''} 
              key={tab.id}>按{tab.name}排序
            </li>)}
          </ul>
        </div>

        {/* 添加评论 */}
        <div className="comment-send">
          <div className="user-face">
            <img className="user-head" src={avatar} alt="" />
          </div>
          <div className="textarea-container">
            {/* 输入框：建议永受控组件方式来获取其中的值，类似于 vue 中的双向绑定 */}
            <textarea
              cols="80"
              rows="5"
              placeholder="发条友善的评论"
              className="ipt-txt"
              value={this.state.comment}
              onChange={this.textareaChange}
            />
            <button className="comment-submit" onClick={this.submitComment}>发表评论</button>
          </div>
          <div className="comment-emoji">
            <i className="face"></i>
            <span className="text">表情</span>
          </div>
        </div>

        {/* 评论列表 */}
        <div className="comment-list">
        { this.state.list.map(item => (
          <div className="list-item" key={item.id}> 
            <div className="user-face">
              <img className="user-head" src={avatar} alt="" />
            </div>
            <div className="comment">
              <div className="user">{item.author}</div>
              <p className="text">{item.comment}</p>
              <div className="info">
                <span className="time">{this.formatTime(item.time)}</span>

                <span 
                  onClick={() => this.toggleLike(item)}
                  className={item.attitude === 1 ? 'like liked': 'like'}>
                  <i className="icon" />
                </span>
                <span className={item.attitude === -1 ? 'hate hated': 'hate'}>
                  <i className="icon" />
                </span>
                <span className="reply btn-hover" onClick={() => this.delComment(item.id)}>删除</span>
              </div>
            </div>
          </div>
        ))}
          
        </div>
      </div>
    </div>
  )
}
}

export default App
