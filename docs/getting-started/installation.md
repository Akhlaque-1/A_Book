---
sidebar_position: 1
---

# Installation

This guide will walk you through the installation process for the Autonomous Humanoid Robot System.

## Prerequisites

Before installing the system, ensure you have the following prerequisites:

- Ubuntu 22.04 LTS
- ROS 2 Humble Hawksbill
- NVIDIA Isaac ROS packages
- Gazebo Garden
- Unity 2022.3 LTS (optional, for high-fidelity visualization)
- Python 3.8+
- CUDA 11.8+ (for NVIDIA hardware acceleration)

## Installing ROS 2 Humble

1. Set up your Ubuntu repositories:
   ```bash
   sudo apt update && sudo apt install -y curl gnupg lsb-release
   curl -sSL https://raw.githubusercontent.com/ros/rosdistro/master/ros.key -o /usr/share/keyrings/ros-archive-keyring.gpg
   echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/ros-archive-keyring.gpg] http://packages.ros.org/ros2/ubuntu $(lsb_release -cs) main" | sudo tee /etc/apt/sources.list.d/ros2.list > /dev/null
   ```

2. Install ROS 2 Humble packages:
   ```bash
   sudo apt update
   sudo apt install ros-humble-desktop
   ```

3. Install colcon build system:
   ```bash
   sudo apt install python3-colcon-common-extensions
   ```

## Setting up the Workspace

1. Create a new ROS workspace:
   ```bash
   mkdir -p ~/robot_system_ws/src
   cd ~/robot_system_ws
   ```

2. Clone the robot system repository:
   ```bash
   cd ~/robot_system_ws/src
   git clone <repository-url>
   ```

3. Install ROS dependencies:
   ```bash
   cd ~/robot_system_ws
   rosdep install --from-paths src --ignore-src -r -y
   ```

## Building the System

1. Build the workspace:
   ```bash
   cd ~/robot_system_ws
   colcon build --packages-select ros2_nervous_system digital_twin ai_robot_brain vla_module
   ```

2. Source the workspace:
   ```bash
   source ~/robot_system_ws/install/setup.bash
   ```

## Verification

To verify that the installation was successful, try running:
```bash
ros2 run vla_module voice_service
```

If you see output indicating the service is running, the installation was successful.

## Next Steps

After installation, check out our [Quick Start](./quick-start.md) guide to learn how to run the system.