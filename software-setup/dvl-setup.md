---
title: DVL Setup
---

# DVL Setup

## On the Jetson

The DVL is run on a static IP port, and is currently connected via TCP connection. That means, for code, you need to use the TCP parser.

You can go into the network settings of the computer to set up the DVL for data transfer, by going to settings->network and selecting the right device that is connected to the DVL. You can figure this out typically by doing `ifconfig` and determining which MAC address belongs to the Internet connection device.

When setting up the DVL, navigate to the IPv4 section and select manual. The IP should be `192.168.194.90` and the gateway should be `24`. Save and close, and if you go to `192.168.194.95`, you should see the Waterlinked DVL control interface.

## On the Router

The router is set up for port forwarding of the `192.168.194.95` address, so users can verify that the DVL is connected and operational simply by going to this address on the network.
