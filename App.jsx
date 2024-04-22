import React, { useEffect, useState } from 'react';
import StackNavigator from './navigation/StackNavigator';
import { AlertNotificationRoot, Dialog } from 'react-native-alert-notification';
import { Provider } from 'react-redux';
import { PaperProvider } from 'react-native-paper';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Alert, StatusBar } from 'react-native';
import NetInfo from '@react-native-community/netinfo';


const queryClient = new QueryClient()
function App() {

  const [isConnected, setConnected] = useState(true);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      setConnected(state.isConnected);
      if (!state.isConnected) {
        showAlert();
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const showAlert = () => {
    Dialog.show({
      type: "DANGER",
      button: "OK",
      title: "No Internet Connection",
      textBody: "Please Enable internet connection",
    })
  };


  return (
    <>
      <QueryClientProvider client={queryClient}>
        <PaperProvider>

          <AlertNotificationRoot theme='light'
            toastConfig={{
              titleStyle: {
                fontFamily: "Mulish-SemiBold",
                textAlign: "center",

              },
              textBodyStyle: {
                fontFamily: "Mulish-SemiBold",
                textAlign: "center"
              }
            }}
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
