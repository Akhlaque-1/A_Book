# ROS2 Nervous System

The Robotic Nervous System is the core communication layer of the Autonomous Humanoid Robot System. It manages communication between sensors, actuators, and AI modules using ROS 2.

## Overview

The ROS2 Nervous System serves as the middleware that connects all components of the robot system. It handles:

- Sensor data distribution
- Actuator command execution
- Inter-module communication
- Safety monitoring
- System state management

## Components

### Sensor Fusion Node

The sensor fusion node collects data from multiple sensors and synchronizes it within a time window:

```python
class SensorFusionNode(Node):
    def __init__(self):
        super().__init__('sensor_fusion_node')
        self.synchronization_window = 0.1  # 100ms window for sensor synchronization
        # Publishers and subscribers for various sensor types
```

### VLA Interface

The VLA interface handles communication between the Vision-Language-Action module and the robot's control systems:

```python
class VlaInterface(Node):
    def __init__(self):
        super().__init__('vla_interface')
        # Publishers and subscribers for action plans and commands
```

## Launch Files

The system can be launched using:

```bash
ros2 launch ros2_nervous_system core_system.launch.py
```

## Configuration

The nervous system can be configured through YAML files in the `config` directory:

- `sensors.yaml` - Sensor configuration parameters
- `actuators.yaml` - Actuator configuration parameters
- `safety.yaml` - Safety limits and monitoring parameters

## Topics and Services

### Published Topics

- `/sensor_data` - Fused sensor information
- `/robot_state` - Current state of the robot
- `/system_status` - Overall system health

### Subscribed Topics

- `/action_plan` - Action plans from the VLA module
- `/navigation_goal` - Navigation goals from the AI brain
- `/emergency_stop` - Emergency stop commands

### Services

- `/execute_action` - Service to execute specific actions
- `/get_robot_state` - Service to query robot state
- `/reset_system` - Service to reset the system

## Safety Features

The nervous system implements several safety features:

- Velocity and acceleration limits
- Collision avoidance
- Emergency stop functionality
- System state monitoring