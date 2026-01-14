---
sidebar_position: 2
---

# Quick Start

This guide will help you get the Autonomous Humanoid Robot System up and running quickly.

## Prerequisites

Make sure you have completed the [Installation Guide](./installation.md) before proceeding.

## Running the System

### 1. Source the Workspace

First, make sure your ROS workspace is sourced:

```bash
source ~/robot_system_ws/install/setup.bash
```

### 2. Launch the Robotic Nervous System

The nervous system is the core communication layer:

```bash
ros2 launch ros2_nervous_system core_system.launch.py
```

### 3. Launch the Digital Twin (Simulation)

To run the system in simulation mode:

```bash
ros2 launch digital_twin simulation.launch.py
```

### 4. Launch the AI-Robot Brain

For perception and navigation:

```bash
ros2 launch ai_robot_brain perception_nav.launch.py
```

### 5. Launch the VLA Module

For voice and action processing:

```bash
ros2 launch vla_module vla_system.launch.py
```

## Running Individual Components

You can also run individual components for testing:

### Running the Action Planner

```bash
ros2 run vla_module action_planner
```

### Running the Voice Service

```bash
ros2 run vla_module voice_service
```

### Running the Navigation System

```bash
ros2 run ai_robot_brain navigation_node
```

## Testing the System

To test the system, you can send a sample command:

```bash
ros2 topic pub /user_command robot_system_msgs/UserCommand "command_text: 'Move to the kitchen' intent: 'NAVIGATE' command_id: 'test_1'"
```

## Troubleshooting

If you encounter issues:

1. Make sure all terminals have the workspace sourced
2. Check that no other ROS processes are running
3. Verify that your hardware (if using real robot) is properly connected

## Next Steps

- Learn about the [ROS2 Nervous System](../modules/ros2-nervous-system.md)
- Explore the [Digital Twin](../modules/digital-twin.md)
- Understand the [AI-Robot Brain](../modules/ai-robot-brain.md)
- Discover the [VLA Module](../modules/vla-module.md)