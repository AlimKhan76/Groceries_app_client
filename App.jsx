import React from 'react';
import StackNavigator from './navigation/StackNavigator';
import { AlertNotificationRoot } from 'react-native-alert-notification';
import { Provider } from 'react-redux';
import { PaperProvider } from 'react-native-paper';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient()
function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <PaperProvider>

          <AlertNotificationRoot>
            <StackNavigator />
          </AlertNotificationRoot>

        </PaperProvider>
      </QueryClientProvider>
    </>
  );
}



export default App;
