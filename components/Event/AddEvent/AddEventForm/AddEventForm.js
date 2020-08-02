import * as React from 'react';
import {View, Text, Button, StyleSheet, TextInput} from 'react-native';
import {withTheme} from 'react-native-elements';
import CalendarWrapper from '../../../CalendarWrapper/CalendarWrapper'
import Toast, {DURATION} from 'react-native-easy-toast'
import TimePicker from 'react-native-simple-time-picker';
import {concat} from "react-native-reanimated";

var emptyState = {
    eventName: '',
    userName: '',
    selected: '',
    selectedFormatted: '',
    duration: '',
    notes: '',
    type: '',
    startTime: {
        selectedHours: '12',
        selectedMinutes: '12'
    },
    endTime: {
        selectedHours: '12',
        selectedMinutes: '12'
    }
}

export default class AddEventForm extends React.Component {
    constructor(props) {
        super(props);
        this.failToastRef = React.createRef();
        this.successToastRef = React.createRef();
        this.state = {
            eventName: '',
            userName: '',
            selected: '',
            selectedFormatted: '',
            duration: '',
            notes: '',
            type: '',
            startTime: {
                selectedHours: '12',
                selectedMinutes: '12'
            },
            endTime: {
                selectedHours: '12',
                selectedMinutes: '12'
            }
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleChangeUser = this.handleChangeUser.bind(this);
        this.changeDate = this.changeDate.bind(this);
        this.changeDuration = this.changeDuration.bind(this);
        this.changeNotes = this.changeNotes.bind(this);
        this.changeType = this.changeType.bind(this);
        this.createEvent = this.createEvent.bind(this);
        this.clearInputs = this.clearInputs.bind(this);

    }

    formInputs() {

        const formInputs =
            [{
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
            ];

        return formInputs;

    }

    handleChange(text) {
        this.setState({eventName: text});
    }

    handleChangeUser(text) {
        this.setState({userName: text})
    }

    changeDate(date) {

        var dateString = date.dateString;
        var year = dateString.split("-")[0];
        var month = dateString.split("-")[1];
        var day = dateString.split("-")[2];

        var newDateString = month + "-" + day + "-" + year;
        this.setState({
            selected: dateString,
            selectedFormatted: newDateString
        })
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

    changeStartTime(startTime) {
        this.setState({
            startTime: startTime
        })
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
        startTime
    }

    createEvent(successToast, failToast, clearInputsRef) {

        var startTime = new Date(this.state.selectedFormatted);
        startTime.setMinutes(this.state.startTime.selectedMinutes);
        startTime.setHours(this.state.startTime.selectedHours);
        var endTime = new Date(this.state.selectedFormatted);
        endTime.setMinutes(this.state.endTime.selectedMinutes);
        endTime.setHours(this.state.endTime.selectedHours);


        fetch('http://localhost:8080/event', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: this.state.eventName,
                type: this.state.type,
                startTime: startTime,
                endTime: endTime,
                duration: this.state.duration,
                notes: this.state.notes
            })
        }).then(function(response) {
            if (!response.ok) {
                failToast.show('Add Event Failed');
                throw Error(response.statusText);
            }
            return response;
        }).then(function(response) {
            successToast.show('Event Added.');
            clearInputsRef();
            console.log("ok");
        }).catch(function(error) {
            console.log(error);
        });


    }

    clearInputs() {
        this.setState({
            eventName: '',
            userName: '',
            selected: '',
            selectedFormatted: '',
            duration: '',
            notes: '',
            type: '',
            startTime: {
                selectedHours: '12',
                selectedMinutes: '12'
            },
            endTime: {
                selectedHours: '12',
                selectedMinutes: '12'
            }
        })
    }

    render() {
        return (
            <View style={styles.eventFormContainer}>
                <Toast ref={this.failToastRef}
                       style={{backgroundColor: 'red'}}
                       position='top'
                       positionValue={10}
                />
                <Toast ref={this.successToastRef}
                       style={{backgroundColor: 'green'}}
                       position='top'
                       positionValue={10}
                />
                {this.formInputs().map(input => this.textInput(input.labelName,
                    input.onChangeFunction, input.value, input.inputStyles,
                    input.multiLine))}
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
                <View>
                    <Text style={styles.inputLabel}>Start Time</Text>
                    <TimePicker
                        selectedHours={this.state.startTime.selectedHours}
                        selectedMinutes={this.state.startTime.selectedMinutes}
                        onChange={(hours, minutes) => this.setState(
                            {
                                startTime: {
                                    selectedHours: hours,
                                    selectedMinutes: minutes
                                }
                            })}
                    />
                </View>
                <View>
                    <Text style={styles.inputLabel}>End Time</Text>
                    <TimePicker
                        selectedHours={this.state.endTime.selectedHours}
                        selectedMinutes={this.state.endTime.selectedMinutes}
                        onChange={(hours, minutes) => this.setState(
                            {
                                endTime: {
                                    selectedHours: hours,
                                    selectedMinutes: minutes
                                }
                            })}
                    />
                </View>

                <Button onPress={() => this.createEvent(
                    this.successToastRef.current, this.failToastRef.current,
                    this.clearInputs)}
                        title="Add Event"/>
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
        margin: 10,
        backgroundColor: 'white'
    },
    inputLabel: {
        padding: 10,
        fontSize: 20,
        fontWeight: "bold"
    },
    notes: {
        height: 50,
        padding: 10,
        margin: 10,
        backgroundColor: 'white'
    },
    calendarWrapper: {
        padding: 20,
        margin: 20
    },
    eventFormContainer: {
        width: '50%'
    }
});

  