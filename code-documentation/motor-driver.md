---
title: Code Documentation
next:
  text: DVL Driver
  link: code-documentation/dvl-node
prev:
  text: Intro
  link: code-documentation/code-documentation-intro
---

# Motor Drivers

Everything to do with the motor drivers is within the `motor_control` directory.

## Philosophy/High Level Description

The motor drivers work by taking messages from two ROS topics:

- `cmd_vel` (from teleop input)
- `sys_cmd_vel` (from PID loop input)

The idea is to essentially take the joystick input as the primary method of control, overriding anything that comes from the system. But, if there is no joystick input, the system is free to take input from its PID loops.

The challenge comes with the depth, as well as the orientation of the sub. We need to isolate our depth control to be completely PID controlled, becuase we want to be able to click "up" on our joystick d-pad and have the sub go up, similarly for down; the depth is controlled by current and goal states, and should not take constant joystick input. We also need to keep the sub in proper orientation, so we need to still use PID loops even while we move the sub.

As of now, there are not existing control loops in the main branch, with the exception of a depth controller. They are currently under development.

## cmd_convert

Takes `cmd_vel` input values and maps them to a corresponding PWM output for each of the motors, using the `motorController` class. It has been expanded to take the `goal_pose` and `pose` subscribers to include PID loops for roll, pitch and yaw, but those are not implemented yet.

Makes use of the `experimental_callback` function to convert the `cmd_vel` values to appropriate PWM values. The motor configuration is as follows (relative facing outward from the gripper side):

::: warning
These values may be incorrect, Jake broke the maestro so things need to be plugged in again :)
:::

```yml
XY channels:
  Motor 0: Back Right
  Motor 1: Front Right
  Motor 2: Front Left
  Motor 7: Back Left

Z channels:
  Motor 3: Back Right
  Motor 4: Front Right
  Motor 5: Front Left
  Motor 6: Front Left
```

For every channel, the appropriate PWM is calculated via `calculate_motor_pwm`, and the command is sent.

### calculate_motor_pwm

From a set of PWM values (typically the x-target, y-target and angular-z-target), sum them and add them to the neutral PWM (1490). Bound them by the safe max and min values, 1650 and 1330.

## motorController

For interfacing with the Pololu Mini Maestro. It is dependent on the maestro file found within `submodules/Maestro`. For the motors we use, they have a PWM range of around 1190-1900. The Maestro is capable of a lot finer detail, so we multiply our target PWM by 4 when sending data to the Maestro. Notice the `run` method:

```python
if not raw_pwm:
    targetPWM = round(4 * (NEUTRAL_PWM + INVERTER * (target * multiplier)))
else:
    targetPWM = round(target * 4)

if (targetPWM > MAX_PWM * 4): targetPWM = MAX_PWM * 4
elif (targetPWM < MIN_PWM * 4): targetPWM = MIN_PWM * 4
```

The major function in this class is the `run` method, that takes the channels list, the target to send to each of the channels, and a couple other optional parameters. In most cases, the raw PWM is sent to this method, so `raw_pwm` would be set to true.

The Maestro requires two 7-bit values for each target. The following code segment results in the following list of commands to the Maestro:

```python
[0x84, channel, targetBytes[0], targetBytes[1]]
```

Where 0x84 represents a command to change the PWM value of a channel, and the target bytes.

```python
targetBytes = [(targetPWM & 0x7F), ((targetPWM >> 7) & 0x7F)]
    for channel in channels: # loop through channels
        finalCommand = [0x84, channel] + targetBytes # Send 4 byte command to maestro
        if self.serial is not None: self.serial.write(bytearray(finalCommand))
    return targetPWM
```

## joyListener

This takes joystick input as well as `sys_cmd_vel` input (originally designed for PID controllers) and maps it to `cmd_vel`. It subscribes to the `joy` topic, which is what the joystick publishes to, and essentially maps the maximum value from the joystick to an estimated velocity value. Those maximum values are set in the `cfg/sub_properties.yaml` file.

This file is largely depricated and needs refactoring.

## PID_controller

Basic class to calculate output, and set KP, KD, and KI values.

## Resetting the Maestro

The Maestro requires an error clear upon startup. This is can be done with the `emergencyMotorKill.py` file, but it should clear upon node startup now.
