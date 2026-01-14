#!/usr/bin/env python3
"""
Script to run the Autonomous Humanoid Robot System.

This script provides a simplified way to run the robot system modules.
Note: This project is designed for Linux/Ubuntu with ROS2, so you may need
to use WSL2, Docker, or a virtual machine to run it properly.
"""

import os
import sys
import subprocess
import argparse
from pathlib import Path


def check_ros2_installation():
    """Check if ROS2 is installed and accessible."""
    try:
        result = subprocess.run(['ros2', '--version'], 
                                capture_output=True, text=True, check=True)
        print(f"ROS2 version: {result.stdout.strip()}")
        return True
    except (subprocess.CalledProcessError, FileNotFoundError):
        print("ROS2 is not installed or not in PATH.")
        print("This project requires ROS2 Humble Hawksbill on Ubuntu 22.04.")
        return False


def run_module(module_name):
    """Run a specific module of the robot system."""
    print(f"Attempting to run {module_name} module...")
    
    # Check if we're in the robot_system directory
    robot_system_path = Path(__file__).parent / "robot_system"
    if not robot_system_path.exists():
        print(f"Robot system directory not found at {robot_system_path}")
        return False
    
    os.chdir(robot_system_path)
    
    # For now, just show what would be run
    print(f"Module {module_name} would be launched here.")
    print("In a proper ROS2 environment, this would execute:")
    
    if module_name == "ros2_nervous_system":
        print("  ros2 launch ros2_nervous_system core_system.launch.py")
    elif module_name == "digital_twin":
        print("  ros2 launch digital_twin simulation.launch.py")
    elif module_name == "ai_robot_brain":
        print("  ros2 launch ai_robot_brain perception_nav.launch.py")
    elif module_name == "vla_module":
        print("  ros2 launch vla_module vla_system.launch.py")
    else:
        print(f"  ros2 launch {module_name} [appropriate_launch_file].py")
    
    return True


def run_full_system():
    """Run the full robot system."""
    print("Attempting to run the full Autonomous Humanoid Robot System...")
    
    # Check for ROS2
    if not check_ros2_installation():
        print("\nTo run this system, you have several options:")
        print("1. Use Windows Subsystem for Linux (WSL2) with Ubuntu 22.04 and ROS2 Humble")
        print("2. Use Docker with a ROS2 container")
        print("3. Use a virtual machine with Ubuntu 22.04 and ROS2 Humble")
        print("4. Use a Linux machine with ROS2 Humble installed")
        return False
    
    print("\nRunning modules in recommended order:")
    
    modules = [
        "ros2_nervous_system",  # Core communication
        "digital_twin",         # Simulation environment
        "ai_robot_brain",       # Perception and navigation
        "vla_module"            # Voice and action planning
    ]
    
    for module in modules:
        print(f"\n--- Starting {module} ---")
        if not run_module(module):
            print(f"Failed to start {module}")
            return False
        
        print(f"{module} started successfully")
    
    print("\nAll modules started! The robot system is now running.")
    return True


def main():
    parser = argparse.ArgumentParser(description='Run the Autonomous Humanoid Robot System')
    parser.add_argument('module', nargs='?', default='all',
                        help='Specific module to run (ros2_nervous_system, digital_twin, ai_robot_brain, vla_module) or "all" for the complete system')
    
    args = parser.parse_args()
    
    if args.module == 'all':
        success = run_full_system()
    else:
        success = run_module(args.module)
    
    if success:
        print("\nSystem is running. Press Ctrl+C to stop.")
        try:
            # Keep the script running
            import time
            while True:
                time.sleep(1)
        except KeyboardInterrupt:
            print("\nShutting down robot system...")
    else:
        print("\nFailed to run the robot system.")
        sys.exit(1)


if __name__ == "__main__":
    main()