import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { master, margin } from '../Utilities/Styles';
import ChatInput from '../Components/Input/ChatInput';
import ChatItem from '../Components/ChatItem';
import { useEffect, useRef, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import {ref as firebaseRef, set, push, onValue} from "firebase/database";
import { auth, database } from '../../firebase';
import { currentDate, makeid } from '../Utilities/Functions';

export default function ChatScreen({route}) {

    const navigation = useNavigation();

    const [is_loading, setIsLoading] = useState(true)
    const [messages, setMessages] = useState([])
    const [defaultName, setDefaultName] = useState(makeid(5))
    const this_user = auth.currentUser ? auth.currentUser.email.replace('@g.com','') : defaultName

    // ! Changing Screen Header title
    useEffect(() => {
      let title = route.params.code
      if(route.params.title) title = route.params.title
      navigation.setOptions({
        title: `Chat - ${title}`,
      })
      getMessages()
    }, []);
    
    useEffect(() => {console.log(messages)}, [messages]);

    // ! ==========================
    // ! Get Messages from firebase
    // ! ==========================
    const getMessages = async () => {
      const messagesRef = firebaseRef(database, `secret-society/chat_group/${route.params.code}/messages`);

      onValue(messagesRef, async (snapshot) => {
          if (snapshot.exists()){

              data = snapshot.val();
              const messages = [];
              for (let key in data) {
                messages.push({key, ...data[key]})
              }
              setMessages(messages)
          } else {
            console.log("No messagefount");
          }
      })
    }

    const scrollViewRef = useRef();
    
    

    const send = (text, clearText) => {

        push(firebaseRef(database, `secret-society/chat_group/${route.params.code}/messages`), {
            user: this_user,
            msg: text,
            time: (new Date()).toString()
        }).then((pushed_item) => {
            clearText()
            scrollViewRef.current.scrollToEnd({ animated: true })
            console.log(pushed_item);
        }).catch((err) => {
            console.error(err);
        })   
    }
    
    return (
      <View style={[master.relative, styles.parent]}>
          <ScrollView 
            ref={scrollViewRef} style={styles.scrollView}
            // ! Scrolls at the bottom
            onContentSizeChange={() => scrollViewRef.current.scrollToEnd({ animated: true })}
          >
            {messages.map(message => (
              <ChatItem key={message.key} this_user={this_user} user={message.user} msg={message.msg} time={message.time}/>
            ))}
          </ScrollView>

          <ChatInput onClick={send}/>
          
      </View>
    );
}


const styles = StyleSheet.create({
    parent: {
      flex: 1
    },
    scrollView: {
      marginBottom: 60
    },
})