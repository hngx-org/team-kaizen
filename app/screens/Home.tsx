import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Alert,
  Linking,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import AppText from '../components/AppText';
import DashboardLayout from '../layouts/DashboardLayout';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AppInput from '../components/shared/AppInput';
import {ApiService} from '../services/services';
import AppButton from '../components/shared/AppButton';
import Voice from '@react-native-community/voice';
import {LogBox} from 'react-native';
LogBox.ignoreLogs(['new NativeEventEmitter']); // Ignore log notification by message
LogBox.ignoreAllLogs(); //Ignore all log notifications

function HomeScreen({navigation}): JSX.Element {
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);
  const [loadingSpeech, setLoadingSpeech] = useState(false);
  const [response, setResponse] = useState();
  const [error, setError] = useState();
  const [open, setOpen] = useState(false);

  const [inputData, setInputData] = useState('');
  const [history, setHistory] = useState([]);
  const [history2, setHistory2] = useState([]);

  const newRes = response;
  const newInput = result;

  const chatWithAi = async () => {
    if (newInput) {
      setResponse();
      setLoading(true);
      setError();
      if (history?.includes(newInput)) {
        return;
      } else {
        setHistory(current => [...current, `user: ${newInput}`]);
      }
      try {
        const data = await ApiService.chatWithAI({
          history: history,
          user_input: newInput,
        });
        setResponse(data);
        setLoading(false);
        //setHistory(current => [...current.filter((item => item.split(' ').include('error:'))), `AI: ${data?.message}`])
        setHistory(current => [...current, `AI: ${data?.message}`]);
        setInputData('');
        setResult('');
      } catch (err) {
        console.log('newerror', err?.response);
        setLoading(false);
        if (err.message === 'Network Error') {
          setError([
            err?.message,
            err?.response?.data?.message,
            err?.response?.data?.error,
            err?.response?.data?.content,
          ]);
        } else {
          setError([
            err?.response?.data?.message,
            err?.response?.data?.error,
            err?.response?.data?.content,
          ]);
        }
      }
    } else {
      setError();
      setInputData('');
    }
  };

  const speechStartHandler = e => {
    console.log('speechStart successful', e);
  };

  const speechEndHandler = e => {
    setLoading(false);
    console.log('stop handler', e);
  };

  const speechResultsHandler = e => {
    const text = e.value[0];
    setResult(text);
  };

  const startRecording = async () => {
    setLoadingSpeech(true);
    try {
      await Voice.start('en-Us');
    } catch (error) {
      console.log('error', error);
    }
  };

  const stopRecording = async () => {
    try {
      await Voice.stop();
      setInputData(result);
      setLoadingSpeech(false);
    } catch (error) {
      console.log('error', error);
    }
  };

  console.log('speech', result);

  useEffect(() => {
    Voice.onSpeechStart = speechStartHandler;
    Voice.onSpeechEnd = speechEndHandler;
    Voice.onSpeechResults = speechResultsHandler;
    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);

  useEffect(() => {
    chatWithAi();
  }, [newInput]);
  return (
    <>
      <View
        style={{
          justifyContent: 'space-between',
          paddingHorizontal: 20,
          paddingVertical: 10,
          backgroundColor: '#fff',
          flexDirection: 'row',
          width: '100%',
        }}>
        <TouchableOpacity
          style={{width: '48%'}}
          onPress={() => {
            setOpen(false);
          }}>
          <View
            style={{
              marginTop: 0,
              width: '100%',
              backgroundColor: open ? '#ccccccdf' : '#98c28ddf',
              padding: 20,
              borderRadius: 10,
            }}>
            <AppText
              style={{
                color: '#fff',
                textAlign: 'center',
              }}>
              Use Assistant
            </AppText>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={{width: '48%'}}
          onPress={() => {
            setOpen(true);
          }}>
          <View
            style={{
              marginTop: 0,
              width: '100%',
              backgroundColor: open ? '#98c28ddf' : '#ccccccdf',
              borderRadius: 10,
              padding: 20,
            }}>
            <AppText
              style={{
                textAlign: 'center',
                color: '#fff',
              }}>
              Chat With AI
            </AppText>
          </View>
        </TouchableOpacity>
      </View>
      {open ? (
        <>
          {/* <View
            style={{
              backgroundColor: 'white',
              padding: 20,
              left: 0,
              width: '100%',
            }}>
            <AppInput
              setText={val => {
                setInputData(val);
              }}
              placeholder="what would you like me to do for you"
            />
            <AppButton
              title="Ask"
              disabled={loading}
              style={{
                marginTop: 0,
              }}
              onPress={() => {
                chatWithAi();
              }}
            />
          </View> */}
          <View
            style={{
              backgroundColor: 'white',
              padding: 20,
              width: '100%',
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <TouchableOpacity
              onPress={startRecording}
              disabled={loadingSpeech}
              style={styles.speak}>
              {loadingSpeech ? (
                <View
                  style={{
                    alignItems: 'center',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <AppText
                    style={{
                      color: 'white',
                      fontWeight: 'bold',
                    }}>
                    Speak...
                  </AppText>
                  {/* <ActivityIndicator size="small" color="white" /> */}
                </View>
              ) : (
                <Text style={{color: 'white', fontWeight: 'bold'}}>
                  Ask a question
                </Text>
              )}
            </TouchableOpacity>

            <TouchableOpacity
              onPress={stopRecording}
              disabled={!loadingSpeech}
              style={styles.stop(loadingSpeech)}>
              <Text style={{color: 'white', fontWeight: 'bold'}}>Complete</Text>
            </TouchableOpacity>
          </View>
          <DashboardLayout>
            {history?.length === 0 && (
              <AppText style={styles.empty}>What whould you like to do</AppText>
            )}
            {history?.map((item, index) => {
              return item.split(' ').includes('user:') ||
                item.split(' ').includes('error:') ? (
                <View key={index} style={{flexDirection: 'row', marginTop: 10}}>
                  <View
                    style={{
                      height: 40,
                      width: 40,
                      alignItems: 'center',
                      justifyContent: 'center',
                      backgroundColor: item.split(' ').includes('error:')
                        ? 'red'
                        : '#8c8c8ce3',
                      borderRadius: 1000,
                      marginRight: 10,
                    }}>
                    <AppText style={{color: '#fff'}}>
                      {item.split(' ').includes('error:') ? '' : 'M E'}
                    </AppText>
                  </View>
                  <AppText style={styles.person(item)}>
                    {item.split(' ').includes('error:')
                      ? item.replace('error:', '-')
                      : item.replace('user:', '-')}
                  </AppText>
                </View>
              ) : (
                <View
                  key={index}
                  style={{flexDirection: 'row', marginLeft: 'auto'}}>
                  <AppText style={styles.ai(item)}>
                    {item.replace('AI:', '-')}
                  </AppText>
                  <View
                    style={{
                      height: 40,
                      width: 40,
                      alignItems: 'center',
                      justifyContent: 'center',
                      backgroundColor: '#000000e2',
                      borderRadius: 1000,
                      marginLeft: 10,
                    }}>
                    <AppText style={{color: '#fff'}}>A I</AppText>
                  </View>
                </View>
              );
            })}
            {error && (
              <View style={{flexDirection: 'row', marginTop: 10}}>
                <View
                  style={{
                    height: 40,
                    width: 40,
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: '#ff0000df',
                    borderRadius: 1000,
                    marginRight: 10,
                  }}>
                  <AppText style={{color: '#fff'}}></AppText>
                </View>
                <AppText style={styles.error}>{error}</AppText>
              </View>
            )}
            {loading && (
              <View style={{flexDirection: 'row', marginTop: 10}}>
                <View
                  style={{
                    height: 40,
                    width: 40,
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: '#525252e0',
                    borderRadius: 1000,
                    marginRight: 10,
                  }}>
                  <AppText style={{color: '#fff'}}></AppText>
                </View>
                <AppText style={styles.loading}>Typing...</AppText>
              </View>
            )}
          </DashboardLayout>
        </>
      ) : (
        <>
          <View
            style={{
              paddingHorizontal: 20,
              backgroundColor: '#fff',
            }}>
            <AppText
              style={{
                marginTop: 20,
              }}>
              Basic Prompts
            </AppText>

            <View
              style={{
                flexDirection: 'row',
                width: '100%',
                justifyContent: 'space-between',
              }}>
              <AppText
                onPress={() => {
                  setHistory2(current => [
                    ...current,
                    `user: Generate Google Meet Link`,
                    `AI:https://meet.google.com/new`,
                  ]);
                }}
                style={styles.prompt}>
                Generate Google Meet Link
              </AppText>
              <AppText
                onPress={() => {
                  setHistory2(current => [
                    ...current,
                    `user: What's today's current Date?`,
                    `AI2: ${new Date()}`,
                  ]);
                }}
                style={styles.prompt}>
                Ask for Current Date
              </AppText>
            </View>
          </View>
          <DashboardLayout>
            {history2?.length === 0 && (
              <AppText style={styles.empty}>What whould you like to do</AppText>
            )}
            {history2?.map((item, index) => {
              return item.split(' ').includes('user:') ||
                item.split(' ').includes('error:') ? (
                <View key={index} style={{flexDirection: 'row', marginTop: 10}}>
                  <View
                    style={{
                      height: 40,
                      width: 40,
                      alignItems: 'center',
                      justifyContent: 'center',
                      backgroundColor: item.split(' ').includes('error:')
                        ? 'red'
                        : '#8c8c8ce3',
                      borderRadius: 1000,
                      marginRight: 10,
                    }}>
                    <AppText style={{color: '#fff'}}>
                      {item.split(' ').includes('error:') ? '' : 'M E'}
                    </AppText>
                  </View>
                  <AppText style={styles.person(item)}>
                    {item.replace('user:', '-')}
                  </AppText>
                </View>
              ) : (
                <View
                  key={index}
                  style={{flexDirection: 'row', marginLeft: 'auto'}}>
                  <AppText
                    onPress={() => {
                      if (item?.split(' ').includes('AI2:')) {
                        if (Platform.OS === 'ios') {
                          Linking.openURL('calshow:');
                        } else if (Platform.OS === 'android') {
                          Linking.openURL(
                            'content://com.android.calendar/time/',
                          );
                        }
                      } else {
                        Linking.openURL(item.replace('AI:', ''));
                      }
                    }}
                    style={styles.ai(item)}>
                    {item?.split(' ').includes('AI2:') ? (
                      <>
                        <AppText style={{color: 'white'}}>
                          Todays Date is
                        </AppText>
                        <AppText style={{color: '#1658ff'}}>
                          {item.replace('AI2:', ' - ')}
                        </AppText>
                      </>
                    ) : (
                      <>
                        <AppText style={{color: 'white'}}>
                          Here is your link
                        </AppText>
                        <AppText style={{color: '#1658ff'}}>
                          {item.replace('AI:', ' - ')}
                        </AppText>
                      </>
                    )}
                  </AppText>
                  <View
                    style={{
                      height: 40,
                      width: 40,
                      alignItems: 'center',
                      justifyContent: 'center',
                      backgroundColor: '#000000e2',
                      borderRadius: 1000,
                      marginLeft: 10,
                    }}>
                    <AppText style={{color: '#fff'}}>A I</AppText>
                  </View>
                </View>
              );
            })}
            {error && (
              <View style={{flexDirection: 'row', marginTop: 10}}>
                <View
                  style={{
                    height: 40,
                    width: 40,
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: '#ff0000df',
                    borderRadius: 1000,
                    marginRight: 10,
                  }}>
                  <AppText style={{color: '#fff'}}></AppText>
                </View>
                <AppText style={styles.error}>{error}</AppText>
              </View>
            )}
            {loading && (
              <View style={{flexDirection: 'row', marginTop: 10}}>
                <View
                  style={{
                    height: 40,
                    width: 40,
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: '#525252e0',
                    borderRadius: 1000,
                    marginRight: 10,
                  }}>
                  <AppText style={{color: '#fff'}}></AppText>
                </View>
                <AppText style={styles.loading}>Typing...</AppText>
              </View>
            )}
          </DashboardLayout>
        </>
      )}
    </>
  );
}
const styles = StyleSheet.create({
  person: item => ({
    backgroundColor: item.split(' ').includes('user:') ? '#8c8c8ce3' : 'red',
    color: '#fff',
    padding: 20,
    borderRadius: 20,
    marginBottom: 10,
    width: '60%',
  }),
  loading: {
    backgroundColor: '#525252e0',
    color: '#fff',
    padding: 20,
    borderRadius: 20,
    marginBottom: 10,
    width: '60%',
  },
  error: {
    backgroundColor: '#ff0000df',
    color: '#fff',
    padding: 20,
    borderRadius: 20,
    marginBottom: 10,
    width: '60%',
  },
  ai: item => ({
    backgroundColor: item.split(' ').includes('user:') ? '#8c8c8ce3' : '#000',
    color: '#fff',
    padding: 20,
    borderRadius: 20,
    marginBottom: 10,
    width: '80%',
  }),
  empty: {
    backgroundColor: '#8c8c8ce3',
    color: '#fff',
    padding: 20,
    borderRadius: 20,
    opacity: 0.6,
    marginTop: 40,
    marginBottom: 10,
  },
  prompt: {
    backgroundColor: '#bdbdbde1',
    color: '#000000',
    padding: 12,
    borderRadius: 10,
    opacity: 0.6,
    textAlign: 'center',
    width: '48%',
    fontSize: 12,
    marginTop: 10,
    marginBottom: 10,
  },

  lottie: {
    width: 100,
    height: 100,
  },
  speak: {
    backgroundColor: '#10B981',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
    width: '48%',
    borderRadius: 8,
  },
  stop: loading => ({
    backgroundColor: '#376254',
    opacity: loading ? 1 : 0.4,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
    borderRadius: 8,
    width: '48%',
  }),
});

export default HomeScreen;
