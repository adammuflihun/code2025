#!/bin/bash

# Initialize git repository
git init

# Create README if it doesn't exist
if [ ! -f README.md ]; then
    echo "# My Project" > README.md
fi

# Add all files
git add .

# Make initial commit
git commit -m "first commit"

# Rename branch to main
git branch -M main

# Add remote (replace with your repository URL)
git remote add origin https://github.com/adammuflihun/code2025.git

# Push to GitHub
git push -u origin main

echo "✅ Repository initialized and pushed to GitHub!" 