import React from 'react';

import { createStackNavigator } from 'react-navigation';

import GroceryListScreen from '../screens/grocery/GroceryListScreen';
import GroceryOrderScreen from '../screens/grocery/GroceryOrderScreen';

export default createStackNavigator({
  // For each screen that you can navigate to, create a new entry like this:
  GroceryList: {
    // `ProfileScreen` is a React component that will be the main content of the screen.
    screen: GroceryListScreen,
    // When `ProfileScreen` is loaded by the StackNavigator, it will be given a `navigation` prop.

    // Optional: When deep linking or using react-navigation in a web app, this path is used:
    path: 'groceries/:id/',
    // The action and route params are extracted from the path.

    // Optional: Override the `navigationOptions` for the screen
    navigationOptions: ({ navigation }) => ({
      title: ``,
    }),
  },
  GroceryOrder: {
    // `ProfileScreen` is a React component that will be the main content of the screen.
    screen: GroceryOrderScreen,
    // When `ProfileScreen` is loaded by the StackNavigator, it will be given a `navigation` prop.

    // Optional: When deep linking or using react-navigation in a web app, this path is used:
    path: 'groceries/:id/order/',
    // The action and route params are extracted from the path.

    // Optional: Override the `navigationOptions` for the screen
    navigationOptions: ({ navigation }) => ({
      title: ``,
    }),
  },
});
