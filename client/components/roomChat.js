import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { ProgressCircle } from 'react-desktop/macOs';
import { getRoomMessages } from '../actions/room';
import { makeChatMenu } from '../actions/menu';
import RoomSelect from './roomSelect';
import RoomChatInput from './roomChatInput';
import Message from './message';


class RoomChat extends React.Component {
  constructor (props) {
    super(props);
  }

  componentWillMount () {
    const { router } = this.props;
    this.props.dispatch(getRoomMessages(global.localStorage.currentRoom));
    makeChatMenu(router);
  }

  leaveRoom () {
    const { router } = this.props;
    global.localStorage.currentRoom = 'lobby';
    router.replace('/');
    this.props.dispatch(getRoomMessages(global.localStorage.currentRoom));
  }

  componentDidUpdate () {
    const { router } = this.props;
    makeChatMenu(router);
  }

  render () {
    const { roomMsgs } = this.props;
    if (!roomMsgs) {
      <div className="progresscircle">
        <ProgressCircle size={40}/>
      </div>
    }

    return (
      <div className="lobby">
        <div className="mainHeader">
          {'Chat Room - ' + global.localStorage.currentRoom}
           <span className="btn btn-default pull-right icon icon-home" onClick={this.leaveRoom.bind(this)}>
           </span>
        </div>
        <div className="chat-container">
          <div className="chatBox">
            <table className="table-striped">
              <tbody>
                {roomMsgs.map(message => <Message key={message.id} userid={message.id} user={message.username} text={message.text} timestamp={message.createdAt}/>)}
              </tbody>
            </table>
            <RoomChatInput />
          </div>
        </div>
        <div className="chatBox">
          <table className="table-striped">
            <tbody>
              {roomMsgs.map(message => <Message key={message.id} userid={message.id} user={message.username} text={message.text} timestamp={message.createdAt}/>)}
            </tbody>
          </table>
          <RoomSelect />
          <RoomChatInput />
        </div>
      </div>
    );
  }
};


const mapStateToProps = (state) => state.roomChatReducer
export default connect(mapStateToProps)(withRouter(RoomChat));
