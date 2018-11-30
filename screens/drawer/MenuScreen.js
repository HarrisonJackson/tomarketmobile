import React from 'react';
import moment from 'moment';

import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { WebBrowser } from 'expo';
import {
  Content,
  Header,
  Left,
  Button,
  Icon,
  Body,
  Right,
  Title,
} from 'native-base';
import { Notifications, Permissions } from 'expo';
import styleVariables from '../../assets/styles/variables';



async function getiOSNotificationPermission() {
  const { status } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
  if (status !== 'granted') {
    await Permissions.askAsync(Permissions.NOTIFICATIONS);
  }
}


class MenuScreen extends React.Component {
  _handleButtonPress = () => {

    const orderBy = moment().add(3, 'hour').startOf('hour').format('ddd, hA');
    const deliveryOn = moment().add(2, 'day').hour(7).format("ddd, hA");

    const localnotification = {
      title: 'To Market - New List',
      body: `Products are available for delivery ${deliveryOn}. Place your order by ${orderBy}!`,
      image: 'https://s3.amazonaws.com/untapp/media/untapp-e-commerce/static/media/to_market_green_icon.png',
      localnotification: false,
      android: {
        sound: true,
        icon:
          'https://s3.amazonaws.com/untapp/media/untapp-e-commerce/static/media/to_market_green_icon.png',
      },
      ios: {
        sound: true,
        image: 'https://s3.amazonaws.com/untapp/media/untapp-e-commerce/static/media/to_market_green_icon.png',
      },
    };
    let sendAfterFiveSeconds = Date.now();
    sendAfterFiveSeconds += 10000;

    const schedulingOptions = { time: sendAfterFiveSeconds };
    Notifications.scheduleLocalNotificationAsync(
      localnotification,
      schedulingOptions
    );
    this.props.navigation.closeDrawer();
  };
  listenForNotifications = () => {
    Notifications.addListener(notification => {
      if (notification.origin === 'received' && Platform.OS === 'ios') {
        alert(notification.title);
      }
    });
  };
  componentWillMount() {
    getiOSNotificationPermission();
    this.listenForNotifications();
  }
  render() {
    return (
      <Content style={styles.contentView}>
        <View style={styles.backgroundView}>
          <Image style={{ width: '100%' }} resizeMode='contain' source={require('../../assets/images/to-market-logo-long-white.png')} />
          <Text style={styles.headlineText}>MENU</Text>
          <Button onPress={this._handleButtonPress} transparent><Text style={styles.buttonText}>ORDERS</Text></Button>
          <Button transparent><Text style={styles.buttonText}>REFER A FRIEND</Text></Button>
          <Button transparent><Text style={styles.buttonText}>SIGN OUT</Text></Button>
        </View>
      </Content>
    );
  }
}

const styles = StyleSheet.create({
  contentView: {
    backgroundColor: styleVariables.colors.backgroundGreen,
    padding: 20,
    paddingTop: 60,
  },
  backgroundView: {
    backgroundColor: styleVariables.colors.backgroundGreen,
  },
  headlineText: {
    color: styleVariables.colors.textWhite,
    fontFamily: styleVariables.fonts.headlineFont,
  },
  buttonText: {
    color: styleVariables.colors.textWhite,
    fontFamily: styleVariables.fonts.mainFont,
  },
  mainText: {
    color: styleVariables.colors.textDark,
    fontFamily: styleVariables.fonts.mainFont,
  },
});

export default MenuScreen;
