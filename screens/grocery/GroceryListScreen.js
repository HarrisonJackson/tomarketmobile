import React from 'react';
import moment from 'moment';
import {update, $set, $each} from 'qim';
import _ from 'lodash';
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
} from 'react-native';
import {
  Content,
  Header,
  Button,
  Icon,
  Grid, Col, Row,
  Toast,
} from 'native-base';


import styleVariables from '../../assets/styles/variables';

// Fake data used to populate the available products
const initialState = {
  comment: null,
  lineItems: [
    {
      id: 0,
      productTitle: 'Chocolate Truffles, Pistachio (20 ct.)',
      inventory: '20',
      unitPrice: '$25.00',
      unit: 'ea',
      quantity: null,
    },
    {
      id: 1,
      productTitle: 'Vanilla Truffles, Pistachio (20 ct.)',
      inventory: '20',
      unitPrice: '$25.00',
      unit: 'ea',
      quantity: null,
    },
    {
      id: 2,
      productTitle: 'Strawberry Truffles, Pistachio (20 ct.)',
      inventory: '20',
      unitPrice: '$25.00',
      unit: 'ea',
      quantity: null,
    },
  ]
}

class GroceryListScreen extends React.Component {
  constructor(props){
    super(props)
    this.updateComment = this.updateComment.bind(this);
    this.updateQuantity = this.updateQuantity.bind(this);
    this.onCancel = this.onCancel.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.state = Object.assign({}, initialState);
  }
  updateComment(comment) {
    this.state = Object.assign(this.state, {comment});

  }
  updateQuantity(value, productId) {
    const newState = update([
      'lineItems', $each, value => value.id == productId, 'quantity',
      $set(value)], this.state);
      this.state = Object.assign(this.state, newState);

  }
  onCancel() {
    this.state = Object.assign({}, initialState);

  }
  onSubmit() {
    const { navigation } = this.props;
    _.delay(() => {
      Toast.show({
        text: 'Order Sent',
        buttonText: 'Okay'
      });
    }, 1000,);

    navigation.navigate('GroceryOrder', {order: this.state});
  }
  render() {
    const orderBy = moment().add(3, 'hour').startOf('hour').format('ddd, hA');
    const deliveryOn = moment().add(2, 'day').hour(7).format("ddd, hA");

    return (
      <Content style={{ backgroundColor: 'white' }}>
        <View style={[styles.headerSection]}>
          <Text style={styles.headerText}>TEST FARMER</Text>
          <Text style={[styles.subheaderText, styles.darkText]}>Product List</Text>
        </View>
        <Grid style={styles.orderDetailsSection}>
          <Row style={styles.summarySectionRow}>
            <Col size={25}>
              <Text style={styles.summarySectionRowDetails}>Delivery: </Text>
            </Col>
            <Col size={75}>
              <Text style={styles.summarySectionRowTitle}>{deliveryOn}</Text>
            </Col>
          </Row>
          <Row style={styles.summarySectionRow}>
            <Col size={25}>
              <Text style={styles.summarySectionRowDetails}>Order By: </Text>
            </Col>
            <Col size={75}>
              <Text style={styles.summarySectionRowTitle}>{orderBy}</Text>
            </Col>
          </Row>
          <Row style={styles.summarySectionRow}>
            <Col size={25}>
              <Text style={styles.summarySectionRowDetails}>Notes: </Text>
            </Col>
            <Col size={75}>
              <Text style={styles.summarySectionRowTitle}>Thanks Justin!</Text>
            </Col>
          </Row>
        </Grid>
        <Grid>
          {this.state.lineItems.map((line, index) => {
            return (
              <Row style={styles.lineItemRow} key={`line-${index}`}>
                <Col size={60} >
                  <Text style={{
                    fontSize: 12,
                    color: styleVariables.colors.textDark,
                    fontFamily: styleVariables.mainFontThin,
                    fontWeight: 'bold',
                  }}>{line.productTitle}</Text>
                  <Text style={{ fontSize: 10, color: styleVariables.colors.textOrange }}>{line.inventory} remaining</Text>
                </Col>
                <Col size={40}>
                  <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                    <View style={{ flex: .5, flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center' }}>
                      <Text style={{
                        textAlign: 'right',
                        fontSize: 12,
                        color: styleVariables.colors.textDark,
                        fontFamily: styleVariables.mainFontThin }}>{`${line.unitPrice}\n${line.unit}`}</Text>
                    </View>
                    <TextInput
                      style={{
                        marginLeft: 10,
                        height: 30,
                        padding: 3,
                        textAlign: 'right',
                        backgroundColor: 'white',
                        flex: .5,
                        paddingLeft: 10,
                        borderRadius: 3,
                        borderColor: 'gray',
                        borderWidth: 1,
                      }}
                      placeholder="qt"
                      keyboardType="numeric"
                      value={line.quantity}
                      onChangeText={(value) => this.updateQuantity(value, line.id)} />
                  </View>
                </Col>
              </Row>
            )
          })}


        </Grid>
        <Grid style={styles.commentsSection}>
          <Row style={styles.summarySectionRow}>
            <Col>
              <Text>Comments</Text>
            </Col>
          </Row>
          <Row style={[styles.summarySectionRow, { minHeight: 80 }]}>
            <Col>
              <View style={{
                minHeight: 80,
                backgroundColor: 'white',
                borderRadius: 3,
                borderColor: 'gray',
                borderWidth: 1,
              }}>
                <TextInput
                  style={{flex: 1, padding: 5}}
                  multiline={true}
                  numberOfLines={10}
                  value={this.state.comment}
                  onChangeText={this.updateComment}
                />
              </View>
            </Col>
          </Row>
        </Grid>
        <Button onPress={this.onSubmit} block style={{ backgroundColor: styleVariables.colors.backgroundGreen, margin: 10 }}><Text style={{ color: 'white' }}>Place Order</Text></Button>
        <Button onPress={this.onCancel} block style={{ backgroundColor: styleVariables.colors.backgroundLightGreen, marginHorizontal: 10, marginBottom: 60 }}><Text>Cancel</Text></Button>
      </Content>
    );
  }
}

/*
,--.  ,--.                  ,--.                 ,--.  ,--.
|  ,'.|  | ,--,--.,--.  ,--.`--' ,---.  ,--,--.,-'  '-.`--' ,---. ,--,--,
|  |' '  |' ,-.  | \  `'  / ,--.| .-. |' ,-.  |'-.  .-',--.| .-. ||      \
|  | `   |\ '-'  |  \    /  |  |' '-' '\ '-'  |  |  |  |  |' '-' '|  ||  |
`--'  `--' `--`--'   `--'   `--'.`-  /  `--`--'  `--'  `--' `---' `--''--'
 ,---.   ,--.           ,--.    `---'
'   .-',-'  '-.,--. ,--.|  | ,---.  ,---.
`.  `-.'-.  .-' \  '  / |  || .-. :(  .-'
.-'    | |  |    \   '  |  |\   --..-'  `)
`-----'  `--'  .-'  /   `--' `----'`----'
               `---'
*/


/*
GroceryListScreen.navigationOptions = ({ navigation }) => ({
  header: (
    <ImageBackground style={styles.headerBackgroundImage} source={require('../../assets/images/roots.jpg')}>
      <Header style={styles.headerTransparent} hasTabs>
        <Left>
          <Button transparent onPress={() => navigation.openDrawer()}>
            <Icon style={styles.headlineText} name="menu" />
          </Button>
        </Left>
        <Right />
      </Header>
      <View style={[styles.headerTransparent, styles.headerTitle]}>
        <Title
          numberOfLines={1}
          style={styles.headlineText}>TEST FARMER</Title>
        <Title
          numberOfLines={1}
          style={styles.subheaderText}>Product List</Title>
      </View>
    </ImageBackground>
  )
});
*/

GroceryListScreen.navigationOptions = ({ navigation }) => ({
  header: (
    <React.Fragment>
      <Header style={[styles.header, styles.headerWhite]} hasTabs>
        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <TouchableOpacity onPress={() => navigation.openDrawer()}>
            <Icon style={[styles.headlineIcon]} name="menu" />
          </TouchableOpacity>
          <Image resizeMode="contain" style={{ width: 100, height: 30 }} source={require('../../assets/images/to-market-logo-long-green.png')} />
        </View>
      </Header>
    </React.Fragment>
  )
});

/*
GroceryListScreen.navigationOptions = ({ navigation }) => ({
  header: (
    <React.Fragment>
    <Header style={styles.headerGreen} hasTabs>
      <Left>
      <Button transparent onPress={() => navigation.openDrawer()}>
          <Icon style={styles.headlineText} name="menu" />
        </Button>
      </Left>
      <Right/>
    </Header>
    <View style={[styles.headerGreen, styles.headerTitle]}>
      <Title
        numberOfLines={1}
        style={styles.headlineText}>TEST FARMER</Title>
      <Title
        numberOfLines={1}
        style={styles.subheaderText}>Product List</Title>
    </View>
    </React.Fragment>
  )
});
*/

const styles = StyleSheet.create({
  lightGreenSection: {
    backgroundColor: styleVariables.colors.backgroundLightGreen,
  },
  commentsSection: {
    padding: 10,
    backgroundColor: styleVariables.colors.backgroundLightGreen,
  },
  headerSection: {
    padding: 10,
  },
  orderDetailsSection: {
    backgroundColor: styleVariables.colors.backgroundLightGreen,
    padding: 10,
  },
  headerText: {
    fontFamily: styleVariables.fonts.headlineFont,
    fontSize: 32,
    height: 32,
    color: styleVariables.colors.textGreen,
  },
  subheaderText: {
    fontFamily: styleVariables.fonts.mainFontBold,
    fontSize: 22,
    color: styleVariables.colors.textGreen,
  },
  lineItemRow: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
  },
  summarySectionRow: {
    paddingVertical: 2,
  },
  summarySectionRowDetails: {
    color: styleVariables.colors.textDark,
    fontFamily: styleVariables.fonts.mainFontThin,
  },
  summarySectionRowTitle: {
    color: styleVariables.colors.textDark,
    fontFamily: styleVariables.fonts.mainFont,
  },
  headerBackgroundImage: {
    width: styleVariables.width,
  },
  headerTransparent: {
    backgroundColor: 'transparent',
  },
  header: {
    elevation: 1,
    shadowOpacity: .3,
    shadowOffset: {
      height: 1,
    },
    shadowRadius: 5,
    paddingBottom: 10,
  },
  headerWhite: {
    backgroundColor: styleVariables.colors.backgroundWhite,
  },
  headerGreen: {
    backgroundColor: styleVariables.colors.backgroundGreen,
  },
  backgroundView: {
    backgroundColor: styleVariables.colors.backgroundWhite,
  },

  headlineIcon: {
    fontSize: 40,
    color: styleVariables.colors.textGreen,
  },
});

export default GroceryListScreen;
