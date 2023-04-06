import React from "react";
import Notification from "./Notification";

const reservedNotification = [
  {
    id : 1,
    message : "안녕하세요, 오늘 일정을 안내해드립니다.",
  },
  {
    id : 2,
    message : "점심식사 시간입니다.",
  },
  {
    id:3,
    message:"이제 곧 미팅이 시작됩니다.",
  },
];

var timers;

class NotificationList extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      notifications: [],
    };
  } 
  componentDidMount() {
    const{ notifications } =this.state
    timers = setInterval(() => {
      if (notifications.length < reservedNotification.length){
        const index = notifications.length;
        notifications.push(reservedNotification[index]);
        this.setState({
          notifications: notifications,
        });
      }else{
        //this.setState({
        //  notifications: [],
       // });
        clearInterval(timers);
      }
    },1000);
  }

  componentWillUnmount() {
    if (timers){
      clearInterval(timers);
    }
  }
  render() {
    return (
        <div>
            {this.state.notifications.map((notifications) => {
                return (
                    <Notification
                        key={notifications.id}
                        id={notifications.id}
                        message={notifications.message}
                    />
                );
            })}
        </div>
    );
  }
}
export default NotificationList;