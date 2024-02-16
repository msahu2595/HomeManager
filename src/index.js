import * as Calendar from "expo-calendar";
import { StatusBar } from "expo-status-bar";
import React, { Component } from "react";
import { Platform } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

import { AppWrapper } from "./components";
import { CalendarNavigation } from "./navigation";

class App extends Component {
  async componentDidMount() {
    try {
      await this._askForCalendarPermissions();
      await this._askForReminderPermissions();
    } catch (error) {
      console.log("Error: ", error.message);
    }
  }

  _askForCalendarPermissions = async () => {
    try {
      const { status } = await Calendar.requestCalendarPermissionsAsync();
      if (status === "granted") {
        const calendars = await Calendar.getCalendarsAsync(
          Calendar.EntityTypes.EVENT,
        );
        console.log("Here are all your calendars:");
        console.log({ calendars });
      }
    } catch (error) {
      console.log("Error: ", error.message);
    }
  };

  _askForReminderPermissions = async () => {
    try {
      if (Platform.OS === "android") {
        return true;
      }

      const { status } = await Calendar.requestRemindersPermissionsAsync();
      if (status === "granted") {
        const calendars = await Calendar.getRemindersPermissionsAsync(
          Calendar.EntityTypes.REMINDER,
        );
        console.log("Here are all your calendars:");
        console.log({ calendars });
      }
    } catch (error) {
      console.log("Error: ", error.message);
    }
  };

  render = () => (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1 }}>
        <StatusBar style="auto" />
        <AppWrapper>
          <CalendarNavigation />
        </AppWrapper>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

export default App;
