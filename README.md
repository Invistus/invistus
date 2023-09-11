# Invistus

This project is a suite of tools aimed at assisting individuals and investors in personal wealth management and investment decision-making. 

The project is AWS-hosted project scales seamlessly to meet scalable, secure and reliable tech requirements.

## Project Structure

```plan
project/
├── android/ # Folder containing the Android implementation
│   └── src/   
│
├── ios/  # Folder containing the IOS implementation
│   └── src/   
│
├── web/  # Folder containing the frontend web artifacts
│   ├── src/             
│   │   ├── components/
│   │   ├── layout/
│   │   ├── pages/
│   │   ├── language/
│   │   ├── service/
│   │   └── App.tsx
│   ├── public/
│   ├── package.json
│   └── tsconfig.json
│
└── service/ # Folder containing the backend files
    ├── src/           
    │   ├── controllers/ # Controllers to handle business logic
    │   ├── models/      # Models for structuring data
    │   └── routes/      # Routes to access the API endpoints
    ├── package.json
    └── tsconfig.json
```