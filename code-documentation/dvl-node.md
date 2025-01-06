---
title: DVL Driver
next:
  text: Camera Driver
  link: code-documentation/camera-node
prev:
  text: Motor Driver
  link: code-documentation/motor-driver
---

# DVL Drivers

If you are looking for how to set it up, please look [here](../software-setup/dvl-setup.md). Everything in this document is found within the `dvl_data` package. For more helpful information on the DVL, please refer to the [waterlinked documentation](https://waterlinked.github.io/dvl/dvl-a50/)

## DVL_subpub

This node, as noted, essentially subscribes to the DVL through a TCP connection, makes use of the `dvl_tcp_parser` file and organizes the data to be published to the `pose` topic.

There is a `convert_to_pose` function that converts the string data obtained from the DVL into the appropriate `pose` topic, making use of the `euler_to_quaternion` function. It checks to see if the DVL is connected, and if so, reads the dead reckoning data.

## dvl_tcp_parser

Ripped partially from waterlink's github, this file does most of the heavy lifting for the parsing and collecting of the data. `DVL_Subpub` makes use of the datareader class directly, which has several methods to aid in data collection.

### connect_dvl

Connects the DVL with the specified baud rate of 16171, and returns a connection status.

### read_data

Reads the data from the specified command from the DVL. This formats the data such that it can be created into a `pose` topic for the subpub file.
