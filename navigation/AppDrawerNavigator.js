import React from 'react';
import { createDrawerNavigator } from 'react-navigation';
import MenuScreen from '../screens/drawer/MenuScreen';
import OrderStack from './OrderStack';


// Basic Drawer Navigator w/ the OrderStack and the drawer menu screen
const App = createDrawerNavigator({
  Home: {
    screen: OrderStack,
  },
}, {
  contentComponent: MenuScreen
});

export default App;
