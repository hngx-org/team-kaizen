/* eslint-disable prettier/prettier */
import React from 'react';
import { Text, View, Image, StyleSheet } from 'react-native';



const EventComponent = ({ event }) => {
  // Destrucure the event object
  let { title, description, start_date, start_time, location, attending } = event;

  // Set attending to 0 if it's null
  if (!attending) { attending = 0; }

  // Get start date readable format
  const startDate = new Date(Number(start_date));

  // Get start time readable format
  const startTime = new Date(Number(start_time));

  // Create readable start date format
  const date = `${startDate.getFullYear()}-${Number(startDate.getMonth()) + 1}-${startDate.getDate()}`;

  // Create readable start time format
  const time = `${startTime.getHours()}:${startTime.getMinutes()}`;

  // Variable for the share icon
  const shareIcon = 'https://img.icons8.com/windows/32/share-rounded.png';
  // Variable for the like icon
  const likeIcon = 'https://img.icons8.com/ios/50/facebook-like--v1.png';

  return (
    <View style={styles.container}>
      {/* Event name */}
      <View style={styles.eventNameContainer}>
        <Text style={styles.eventName}>{ title }</Text>
        <Image source={{uri:shareIcon}} style={styles.icon} />
      </View>
      {/* Event description */}
      <View>
        <Text style={styles.eventDescription}>{description}</Text>
        <Text style={styles.eventDateTime}>{date} - {time}</Text>
        <Text style={styles.eventLocation}>{location}</Text>
      </View>
      {/* Attendees */}
      <View style={styles.eventAttendeeContainer}>
        <Text style={styles.attendingCount}> <Image source={require('../../assets/images/people.png')}/> {attending} attending</Text>
        <Image source={{uri: likeIcon}} style={styles.icon} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 150,
    backgroundColor: 'white',
    borderRadius: 10,
    marginBottom: 20,
    paddingTop: 15,
    paddingBottom: 20,
    paddingHorizontal: 25,
  },
  eventNameContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 7,
  },
  eventName: {
    textTransform: 'capitalize',
    fontWeight: 'bold',
    fontSize: 16,
  },
  icon: {
    width: 16,
    height: 16,
  },
  eventDescription: {
    fontSize: 13,
    marginBottom: 5,
  },
  eventDateTime: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#FF9405',
  },
  eventLocation: {
    fontSize: 12,
    color: '#75818F',
  },
  eventAttendeeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 5,
  },
  attendingCount: {
    fontWeight: '400',
    fontSize: 12,
  },
});

export default EventComponent;
