import React from 'react';
import StackNavigator from './navigation/StackNavigator';
import { AlertNotificationRoot } from 'react-native-alert-notification';
import { Provider } from 'react-redux';
import { PaperProvider } from 'react-native-paper';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { StatusBar } from 'react-native';

const queryClient = new QueryClient()
function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <PaperProvider>

          <AlertNotificationRoot theme='light'
            colors={[
              {
                card: "white",
                label: "black",
                success: "rgb(83 177 117)",
                danger: "red",
                warning: "orange"
              }]
            }
          >
            <StatusBar backgroundColor="white" barStyle="dark-content" />

            <StackNavigator />
          </AlertNotificationRoot>

        </PaperProvider>
      </QueryClientProvider >
    </>
  );
}



export default App;
