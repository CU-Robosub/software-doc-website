---
title: Software Setup Intro
---

# Software Setup

This first part holds infromation on how to start the submarine such that ROS2 nodes are running. If something does not work in this setup process, you can refer to the subsequent documentation to ensure everything is installed correctly.

## Starting The Sub

### Power and tethering

Plug in the anderson connector from the sub to the one on the power supply, and plug the power supply into power. Plug in the ethernet into the CUDY router, and plug in the router. The sub should beep a couple of times, indicating that the servos are recieving power. The DVL (under the hull) should be blinking.

### Initializing ROS via SSH

Using your laptop's terminal, you can SSH into the sub to turn on all of the necessary ROS2 nodes to get the sub to run. To SSH, do the following:

```bash
nmap -sP 192.168.1.*
ssh chimera@192.168.1.<Last three digits>
password: chimera
ros
```

As of writing this documentation the sub's IP is `192.168.1.171`, so if that is still the case you can skip the first `nmap` step. The last command `ros` is an alias that starts a docker container for ROS2 Humble. Once in the docker container, run the following command:

```bash
source startup.sh
```

This should successfully launch the motor drivers, cameras, and DVL data collection nodes. In order to drive the sub around with the Logitech Joystick, on your own laptop terminal (with ROS2 installed) run:

```bash
ros2 launch teleop_twist_joy teleop-launch.py
```

The rest of this section holds all of the necessary information to get the computer up and running again, with the DVL such that if something were to break it can be fixed rather quickly.

## Quick Links
