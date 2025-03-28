#!/bin/bash

# Script: Automated Update, Git Setup, and Project Clone

# Configuration
REPO_URL="https://github.com/phe-rus/noblesse.git" # Replace with your repository URL
PROJECT_DIR="noblesse"     # Project directory name
PNPM_COMMAND="pnpm install" #pnpm install command

# Function: Detect Linux Distribution
detect_distro() {
  if command -v apt &> /dev/null; then
    echo "Debian-based"
    UPDATE_CMD="sudo apt update && sudo apt upgrade -y"
    INSTALL_GIT="sudo apt install -y git"
  elif command -v yum &> /dev/null; then
    echo "Red Hat-based"
    UPDATE_CMD="sudo yum update -y"
    INSTALL_GIT="sudo yum install -y git"
  elif command -v pacman &> /dev/null; then
    echo "Arch-based"
    UPDATE_CMD="sudo pacman -Syu --noconfirm"
    INSTALL_GIT="sudo pacman -S --noconfirm git"
  elif command -v dnf &> /dev/null; then
      echo "Fedora-based"
      UPDATE_CMD="sudo dnf update -y"
      INSTALL_GIT="sudo dnf install -y git"
  else
    echo "Unsupported distribution."
    exit 1
  fi
}

# Function: Run updates
run_updates() {
  echo "Running system updates..."
  $UPDATE_CMD
  if [ $? -ne 0 ]; then
    echo "Update failed."
    exit 1
  fi
  echo "Updates completed."
}

# Function: Install Git if not present
install_git() {
  if ! command -v git &> /dev/null; then
    echo "Git not found. Installing..."
    $INSTALL_GIT
    if [ $? -ne 0 ]; then
      echo "Git installation failed."
      exit 1
    fi
    echo "Git installed."
  else
    echo "Git is already installed."
  fi
}

# Function: Clone the repository
clone_repo() {
  echo "Cloning repository..."
  git clone "$REPO_URL" "$PROJECT_DIR"
  if [ $? -ne 0 ]; then
    echo "Repository cloning failed."
    exit 1
  fi
  echo "Repository cloned."
}

# Function: Install project dependencies
install_dependencies() {
  echo "Installing project dependencies (pnpm install)..."
  cd "$PROJECT_DIR"
  $PNPM_COMMAND
  if [ $? -ne 0 ]; then
    echo "Dependency installation failed."
    exit 1
  fi
  echo "Dependencies installed."
}

# Main script execution
detect_distro
run_updates
install_git
clone_repo
install_dependencies

echo "Setup complete. You are now in the project directory: $PROJECT_DIR"