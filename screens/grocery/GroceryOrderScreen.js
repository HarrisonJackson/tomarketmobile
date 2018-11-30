import React from 'react';
import moment from 'moment';
import _ from 'lodash';
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  Content,
  Header,
  Icon,
} from 'native-base';
import styleVariables from '../../assets/styles/variables';


// Fake data used to populate orders list
const oldOrder = {
  comment: 'Good to see you John! Looking forward to our next delivery!',
  lineItems: [
    {
      id: 0,
      productTitle: 'Chocolate Truffles, Pistachio (20 ct.)',
      inventory: '20',
      unitPrice: '$25.00',
      unit: 'ea',
      quantity: 3,
    },
    {
      id: 1,
      productTitle: 'Vanilla Truffles, Pistachio (20 ct.)',
      inventory: '20',
      unitPrice: '$25.00',
      unit: 'ea',
      quantity: 1,
    },
  ]
}

/**
 * Shows the newly created order alongside other open orders
 *
 * @class GroceryOrderScreen
 * @extends {React.Component}
 */
class GroceryOrderScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showSuccess: true,
    }
    this.hideSuccess = this.hideSuccess.bind(this);
  }

  hideSuccess() {
    this.state = Object.assign(this.state, { hideSuccess: true });
  }
  render() {
    const { navigation } = this.props;
    const order = navigation.getParam('order', {});
    const orderBy = moment().add(3, 'hour').startOf('hour').format('ddd, hA');
    const deliveryOn = moment().add(2, 'day').hour(7).format("ddd, hA");

    const lines = _.filter(order.lineItems, (line) => line.quantity > 0);

    // Do some maths to calculate money fields for each order
    const subtotal = _.reduce(lines, (subtotal, line) => {
      const {
        quantity,
        unitPrice,
      } = line;
      const unitPriceValue = Number(unitPrice.replace(/[^0-9.-]+/g, ""));
      return subtotal + (unitPriceValue * quantity)
    }, 0).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');

    const oldSubtotal = _.reduce(oldOrder.lineItems, (subtotal, line) => {
      const {
        quantity,
        unitPrice,
      } = line;
      const unitPriceValue = Number(unitPrice.replace(/[^0-9.-]+/g, ""));
      return subtotal + (unitPriceValue * quantity)
    }, 0).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');

    return (
      <Content style={{ backgroundColor: 'white' }}>
        <View style={[styles.headerSection]}>
          <Text style={styles.headerText}>OPEN ORDERS</Text>
        </View>
        <View style={{ padding: 10 }}>
          <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }} >
            <Text
              style={{
                color: styleVariables.colors.textGreen,
                fontFamily: styleVariables.fonts.mainFont,
                fontSize: 22,
              }}
            >Test Farmer</Text>
            <View style={{
              paddingHorizontal: 10,
              paddingVertical: 5,
              backgroundColor: styleVariables.colors.backgroundGreen,
              borderRadius: 3,
            }}>
              <Text style={{ color: styleVariables.colors.textWhite }}>EDIT</Text>
            </View>
          </View>
          <View style={styles.orderDetailsSection}>
            <View style={styles.summarySectionRow}>
              <Text style={styles.summarySectionRowDetails}>Delivery: </Text>
              <Text style={styles.summarySectionRowTitle}>{deliveryOn}</Text>
            </View>
            <View style={styles.summarySectionRow}>
              <Text style={styles.summarySectionRowDetails}>Order By: </Text>
              <Text style={styles.summarySectionRowTitle}>{orderBy}</Text>
            </View>
          </View>
          <View style={{ paddingVertical: 10 }}>
            {_.map(lines, (line, index) => {
              const {
                quantity,
                productTitle,
                unitPrice,
              } = line;
              const unitPriceValue = Number(unitPrice.replace(/[^0-9.-]+/g, ""));
              const lineTotal = (unitPriceValue * quantity).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
              return (
                <View key={index} style={{ flex: 1, flexDirection: 'row', paddingBottom: 10 }}>
                  <Text numberOfLines={3} style={{
                    fontFamily: styleVariables.fonts.mainFont,
                    flex: .5,
                    paddingRight: 5,
                  }}>{line.productTitle}</Text>
                  <Text style={{ fontFamily: styleVariables.fonts.mainFontThin, flex: .2 }}>{line.unitPrice}</Text>
                  <Text style={{ fontFamily: styleVariables.fonts.mainFontThin, flex: .1 }}>{line.quantity}</Text>
                  <Text style={{ fontFamily: styleVariables.fonts.mainFont, flex: .2, textAlign: 'right' }}>${lineTotal}</Text>
                </View>
              )
            })}
            <View style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingBottom: 20,
            }}>
              <Text style={{ fontFamily: styleVariables.fonts.mainFontBold }}>SUBTOTAL*: </Text>
              <Text style={{ fontFamily: styleVariables.fonts.mainFontBold, textAlign: 'right' }}>${subtotal}</Text>
            </View>
            {order.comment && (
              <React.Fragment>
                <View><Text style={{ fontFamily: styleVariables.fonts.mainFont, paddingBottom: 5 }}>Comments:</Text></View>
                <View><Text style={{ fontFamily: styleVariables.fonts.mainFontThin }}>{order.comment}</Text></View>
              </React.Fragment>
            )}
          </View>
          <View style={{ height: 1, backgroundColor: '#bdc3c7AA', flex: 1, marginTop: 15 }} />
        </View>

        <View style={{ padding: 10 }}>
          <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }} >
            <Text
              style={{
                color: styleVariables.colors.textGreen,
                fontFamily: styleVariables.fonts.mainFont,
                fontSize: 22,
              }}
            >Test Farmer</Text>
            <View style={{
              paddingHorizontal: 10,
              paddingVertical: 5,
              backgroundColor: styleVariables.colors.backgroundGreen,
              borderRadius: 3,
            }}>
              <Text style={{ color: styleVariables.colors.textWhite }}>EDIT</Text>
            </View>
          </View>
          <View style={styles.orderDetailsSection}>
            <View style={styles.summarySectionRow}>
              <Text style={styles.summarySectionRowDetails}>Delivery: </Text>
              <Text style={styles.summarySectionRowTitle}>10/12/2018</Text>
            </View>
            <View style={styles.summarySectionRow}>
              <Text style={styles.summarySectionRowDetails}>Order By: </Text>
              <Text style={styles.summarySectionRowTitle}>10/11/2018 10:00PM MST</Text>
            </View>
          </View>
          <View style={{ paddingVertical: 10 }}>
            {_.map(oldOrder.lineItems, (line, index) => {
              const {
                quantity,
                productTitle,
                unitPrice,
              } = line;
              const unitPriceValue = Number(unitPrice.replace(/[^0-9.-]+/g, ""));
              const lineTotal = (unitPriceValue * quantity).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
              return (
                <View key={index} style={{ flex: 1, flexDirection: 'row', paddingBottom: 10 }}>
                  <Text numberOfLines={3} style={{
                    fontFamily: styleVariables.fonts.mainFont,
                    flex: .5,
                    paddingRight: 5,
                  }}>{line.productTitle}</Text>
                  <Text style={{ fontFamily: styleVariables.fonts.mainFontThin, flex: .2 }}>{line.unitPrice}</Text>
                  <Text style={{ fontFamily: styleVariables.fonts.mainFontThin, flex: .1 }}>{line.quantity}</Text>
                  <Text style={{ fontFamily: styleVariables.fonts.mainFont, flex: .2, textAlign: 'right' }}>${lineTotal}</Text>
                </View>
              )
            })}
            <View style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingBottom: 20,
            }}>
              <Text style={{ fontFamily: styleVariables.fonts.mainFontBold }}>SUBTOTAL*: </Text>
              <Text style={{ fontFamily: styleVariables.fonts.mainFontBold, textAlign: 'right' }}>${oldSubtotal}</Text>
            </View>
            {oldOrder.comment && (
              <React.Fragment>
                <View><Text style={{ fontFamily: styleVariables.fonts.mainFont, paddingBottom: 5 }}>Comments:</Text></View>
                <View><Text style={{ fontFamily: styleVariables.fonts.mainFontThin }}>{oldOrder.comment}</Text></View>
              </React.Fragment>
            )}
            <View style={{ height: 1, backgroundColor: '#bdc3c7AA', flex: 1, marginTop: 15 }} />
          </View>
        </View>
      </Content>
    );
  }
}

GroceryOrderScreen.navigationOptions = ({ navigation }) => ({
  header: (
    <React.Fragment>
      <Header style={[styles.header, styles.headerWhite]} hasTabs>
        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon style={[styles.headlineIcon]} name="arrow-back" />
          </TouchableOpacity>
          <Image resizeMode="contain" style={{ width: 100, height: 30 }} source={require('../../assets/images/to-market-logo-long-green.png')} />
        </View>
      </Header>
    </React.Fragment>
  )
});

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
    paddingVertical: 10,
    flex: 1,
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
    flex: 1,
    flexDirection: 'row',
  },
  summarySectionRowDetails: {
    flex: .25,
    color: styleVariables.colors.textDark,
    fontFamily: styleVariables.fonts.mainFontThin,
  },
  summarySectionRowTitle: {
    flex: .75,
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


export default GroceryOrderScreen;
