import * as React from 'react';
import { View, Text, Button, StyleSheet, TextInput } from 'react-native';
import { withTheme } from 'react-native-elements';
import CalendarWrapper from '../../../CalendarWrapper/CalendarWrapper'

export default class AddEventForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {eventName: '',
                    userName: '',
                    selected: '',
                    duration: '',
                    notes: ''};
        this.handleChange = this.handleChange.bind(this);
        this.handleChangeUser = this.handleChangeUser.bind(this);
        this.changeDate = this.changeDate.bind(this);
        this.changeDuration = this.changeDuration.bind(this);
        this.changeNotes = this.changeNotes.bind(this);
        this.changeType = this.changeType.bind(this);


      }

    formInputs() {
        
        const formInputs = 
        [ {
            labelName: 'Event Name',
            onChangeFunction: this.handleChange,
            value: this.state.eventName,
            inputStyles: styles.textInput
            },
            {
            labelName: 'UserName',
            onChangeFunction: this.handleChangeUser,
            value: this.state.userName,
            inputStyles: styles.textInput
            },
            {
            labelName: 'Duration',
            onChangeFunction: this.changeDuration,
            value: this.state.duration,
            inputStyles: styles.textInput
            }
            ,
            {
              labelName: 'Type',
              onChangeFunction: this.changeType,
              value: this.state.type,
              inputStyles: styles.textInput,
          },
            {
                labelName: 'Notes',
                onChangeFunction: this.changeNotes,
                value: this.state.notes,
                inputStyles: styles.notes,
                multiLine: true
            }
        ]
        
        return formInputs;
    
      }
    
      handleChange(text) {
        this.setState({eventName: text});
      }

      handleChangeUser(text) {
          this.setState({userName: text})
      }

      changeDate(date) {
          this.setState({selected: date.dateString})
      }

      changeDuration(duration) {
          this.setState({duration: duration})
      }

      changeNotes(notes) {
        this.setState({notes: notes})
      }

    changeType(type) {
      this.setState({type: type})
      }

      textInput(labelText, onChangeFunction, value, passedInStyle, multiLine) {
          if (multiLine === undefined) {
              multiLine = false;
          }
        return (
              <View>
                  <Text style={styles.inputLabel}>{labelText}</Text>
                  <TextInput
              onChangeText={text => onChangeFunction(text)} 
              style={passedInStyle}
              value={value}
              multiline={multiLine}/>
  
              </View>
        );
      }

      createEvent() {

        fetch('http://localhost:8080/event', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            name: this.state.name,
            type: this.state.type,
            startTime: this.state.selected,
            duration: this.state.duration,
            notes: this.state.notes
          })
        }).catch((error) => {
          console.error(error);
        });;

      }


      render() {
        return (
            <View style={styles.eventFormContainer}>
                {this.formInputs().map(input => this.textInput(input.labelName, input.onChangeFunction, input.value, input.inputStyles, input.multiLine))} 
                <Text style={styles.inputLabel}>Date</Text>
                <CalendarWrapper
                onDayPress={(date) => this.changeDate(date)}
                     markedDates={{
                    [this.state.selected]: {
                      selected: true,
                      disableTouchEvent: true,
                      selectedColor: 'orange',
                      selectedTextColor: 'red'
                    }
                }}
                        />  
                  <Button onPress={() => this.createEvent()} title="Add Event"/>
            </View>
           
           
        );
      }
  }



  

  const styles = StyleSheet.create({
    text: {
      fontSize: 20,
      width: '25%',
      backgroundColor: 'cyan'
    },
    textInput: {
        color: 'black',
        padding: 10,
        margin:10,
        backgroundColor: 'white'
    },
    inputLabel: {
        padding: 10,
        fontSize: 20,
        fontWeight: "bold"
    },
    notes : {
        height: 50,
        padding: 10,
        margin:10,
        backgroundColor: 'white'
    },
    calendarWrapper: {
      padding: 20,
      margin: 20
    },
    eventFormContainer : {
      width: '50%'
    }
  });

  