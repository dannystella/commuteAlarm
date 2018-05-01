# Alarmoquy

<img src="https://i.imgur.com/JP18MDd.png" width="350">


Alarmoquy is a smart alarm that takes commute data from google maps and dynamically updates the alarm based on a desired arrival time. We run the data through our advanced algorithm by taking into account your actual daily commute length against google's estimated time. Add google calendar implementation, several custom user settings, and you have a highly accurate smart alarm that ensures you won't be late again!

## Table of Contents


1. [Team](#team)
1. [Development](#development)
    1. [How to install](#install)
1. [Usage](#usage)

## Team

- __Product Owner__: Danny Schrader
- __Scrum Master__: Rory Eagan
- __Development__: Quentin Vidal

## Development

### How to install

Fork and clone:
`git clone https://github.com/HouseMartell/commuteAlarm.git`

From within the root directory:
```npm install```
```npm start```

local server (optional)
```npm run server-dev```


## Usage

> Settings:
User inputs default preferences, and can log into google calendar.
<p align="left">
<img src="https://i.imgur.com/TeNCIxU.png?1" width="400">
<img src="https://i.imgur.com/3RBzUqc.png?1" width="400">
</p>


> Alarms Screen:
Add alarms and instantiate them when needed.
<p align="left">
<img src="https://i.imgur.com/t8UEK0J.png?1" width="400">
<img src="https://i.imgur.com/rzPuRDg.png?1" width="400">
</p>


> Alarm Detail Screen:
User Labels alarm, sets location and desired arrival time along with alarm specific preferences.
Alarm is set and alarm time is dynamically set based on user preferences, google maps commute data, and real life user location data. 
<p align="left">
<img src="https://i.imgur.com/JHdkjlt.png?1" width="400">
<img src="https://i.imgur.com/p4akdpC.png?1" width="400">
</p>



> Google Login:
User can log in with google oath to authenticate the use of adding alarms from their respective calendars.
<p align="left">
<img src="https://i.imgur.com/yKrOzRd.gif" width="700">
</p>

> Calendar Screen:
Calendar event data appears from the user's google calendar information, to add an alarm for an event the user simply clicks on the "add alarm" button on event they wish to create an alarm for.
<p align="left">
<img src="https://i.imgur.com/5xoqX7o.png?1" width="400">
<img src="https://i.imgur.com/gi1fLYF.png?1" width="400">
</p>


> Push Notification:
Alarm goes on just in time! 
<img src="https://i.imgur.com/GXslLoQ.png?1" width="400">








