import React, { useState, useCallback, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { GiftedChat, Bubble, InputToolbar } from 'react-native-gifted-chat';
import { Dialogflow_V2 } from 'react-native-dialogflow';

// Remplacez par votre ID de projet et les clés d'API
const projectId = 'attakafouliachat-dlmg';



const ChatbotScreen = () => {
  const [response, setResponse] = useState(null);

  useEffect(() => {
    // Configure Dialogflow
    Dialogflow_V2.setConfiguration(
      'fathallah.meriem@esprit.tn',
      'console.cloud.google.com/iam-admin/troubleshooter;permissions=resourcemanager.projects.createBillingAssignment,resourcemanager.projects.get;principal=fathallah.meriem@esprit.tn;resources=%2F%2Fcloudresourcemanager.googleapis.com%2Fprojects%2Fattakafouliachat-dlmg,%2F%2Fcloudresourcemanager.googleapis.com%2Fprojects%2Fattakafouliachat-dlmg/result',
      Dialogflow_V2.LANG_ENGLISH_US,
      projectId
    );
  }, []);

  const runSample = async () => {
    const request = {
      sessionId: sessionId,
      queryInput: {
        text: {
          text: 'Hello!',
          languageCode: 'en-US',
        },
      },
    };

    Dialogflow_V2.requestQuery(
      request.queryInput.text.text,
      result => {
        console.log('Detected intent');
        console.log(`  Query: ${result.queryText}`);
        console.log(`  Response: ${result.fulfillmentText}`);
        if (result.intent) {
          console.log(`  Intent: ${result.intent.displayName}`);
        } else {
          console.log('  No intent matched.');
        }
        setResponse(result.fulfillmentText);
      },
      error => console.error(error)
    );
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Button title="Run Sample" onPress={runSample} />
      {response && (
        <Text style={{ marginTop: 20, fontSize: 16 }}>Response: {response}</Text>
      )}
    </View>
  );
};
export default ChatbotScreen;
