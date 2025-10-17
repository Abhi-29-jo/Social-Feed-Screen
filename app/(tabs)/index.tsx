import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import FeedScreen from './src/screens/FeedScreen';

export default function App() {
    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
        <FeedScreen />
        </GestureHandlerRootView>
    );
}