# Digital Twin

The Digital Twin module provides physics simulation and environment modeling for the Autonomous Humanoid Robot System. It enables virtual testing for humanoid robots using Gazebo and Unity.

## Overview

The Digital Twin serves as a virtual representation of the physical robot and its environment. It allows for:

- Safe testing without physical hardware
- Simulation of various environments
- Testing of navigation algorithms
- Validation of control systems
- Training of AI models

## Components

### Gazebo Simulation

The primary simulation environment uses Gazebo Garden for physics simulation:

- Physics engine for realistic robot dynamics
- Sensor simulation (cameras, LIDAR, IMU)
- Environment modeling
- Plugin system for custom sensors/actuators

### Unity Visualization (Optional)

For high-fidelity visualization, Unity 2022.3 LTS can be used:

- Photorealistic rendering
- Advanced lighting and materials
- VR/AR support
- Custom visualization tools

## Launch Files

The simulation can be launched using:

```bash
ros2 launch digital_twin simulation.launch.py
```

## Configuration

Simulation parameters can be configured in:

- `config/simulation.yaml` - General simulation parameters
- `gazebo_models/` - 3D models for simulation
- `urdf/` - Robot description files
- `unity_scenes/` - Unity scene files

## Features

### Physics Simulation

- Realistic robot dynamics
- Accurate sensor simulation
- Collision detection
- Environmental interactions

### Environment Modeling

- Indoor and outdoor environments
- Dynamic objects
- Weather conditions
- Multi-floor buildings

### Integration with Real Robot

- Sim-to-real transfer capabilities
- Parameter calibration
- Performance comparison
- Hardware-in-the-loop testing

## Running Simulation

### Basic Simulation

```bash
# Launch the simulation environment
ros2 launch digital_twin simulation.launch.py

# In another terminal, send commands to the simulated robot
ros2 topic pub /user_command robot_system_msgs/UserCommand "command_text: 'Move forward' intent: 'NAVIGATE' command_id: 'sim_1'"
```

### Advanced Simulation

```bash
# Launch with specific environment
ros2 launch digital_twin simulation.launch.py environment:=office_world

# Launch with Unity visualization (if available)
ros2 launch digital_twin unity_simulation.launch.py
```

## Troubleshooting

- If simulation runs slowly, reduce physics update rate in config
- If sensors don't respond, check Gazebo plugin configuration
- If robot doesn't move, verify controller configuration