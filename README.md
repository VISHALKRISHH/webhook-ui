# webhook-ui

This is the **React frontend** for displaying GitHub activity in real time. It polls the backend API every 15 seconds and shows a neatly formatted list of events.

## 🎯 Features

- Polls `GET /api/events` every 15 seconds
- Displays messages in the format:

### ✅ Push
> "VISHALKRISHH" pushed to "staging" on 1st April 2021 - 9:30 PM UTC

### ✅ Pull Request
> "VISHALKRISHH" submitted a pull request from "staging" to "master" on 1st April 2021 - 9:00 AM UTC

### ✅ Merge
> "VISHALKRISHH" merged branch "dev" to "master" on 2nd April 2021 - 12:00 PM UTC

![image](https://github.com/user-attachments/assets/57f1ddba-718f-4470-9bd6-117ffa9d59b6)

## 🛠️ Setup

```bash
npm install
npm start
