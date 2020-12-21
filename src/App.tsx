import React from 'react';
import logo from './logo.svg';
import './App.css';
import liff from '@line/liff';

function App() {

  /* 追加: メッセージ送信 */
  const sendMessage = () => {
    liff.init({liffId: process.env.REACT_APP_LIFF_ID as string}) // LIFF IDをセットする
      .then(() => {
      
        const message = [
          {
            "type": "flex",
            "altText": "ようこそ",
            "contents":{
              "type": "carousel",
              "contents": [
                {
                  "type": "bubble",
                  "direction": "ltr",
                  "styles": {
                    "body": {
                      "backgroundColor": "#f5f5f5"
                    }
                  },
                  "body": {
                    "type": "box",
                    "layout": "vertical",
                    "contents": [
                      {
                            "type": "postback",
                            "label": "返信完了",
                            "data": "{\"scenario_id\":1,\"next_id\":\"MemberUpdateCompleted\",\"current_id\":\"A1\",\"type\":\"MemberUpdateCompleted\"}",
                            "displayText": "返信完了"
                        }
                    ]
                  }
                }
              ]
            }
          }
        ];

        if (!liff.isLoggedIn()) {
          liff.login({}) // ログインしていなければ最初にログインする
        } else if (liff.isInClient()) { // LIFFので動いているのであれば
          liff.sendMessages(message).then(function() {
            window.alert('Message sent');
          }).catch(function(error) {
            window.alert('Error sending message: ' + error);
          });
        }
      })
  }

  /* 追加: UserProfileをAlertで表示 */
  const getUserInfo = () => {
    liff.init({liffId: process.env.REACT_APP_LIFF_ID as string})
      .then(() => {
        if (!liff.isLoggedIn()) {
          liff.login({}) // ログインしていなければ最初にログインする
        } else if (liff.isInClient()) {
          liff.getProfile()  // ユーザ情報を取得する
            .then(profile => {
              const userId: string = profile.userId
              const displayName: string = profile.displayName
              alert(`Name: ${displayName}, userId: ${userId}`)
            }).catch(function(error) {
              window.alert('Error sending message: ' + error);
            });
        }
      })

  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <button className="button" onClick={sendMessage}>send message</button> // 追加
        <button className="button" onClick={getUserInfo}>show user info</button> // 追加
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
