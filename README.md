# Archive Manage

## Overview
**Archive Manage** is a React.js frontend application for managing archived sales documents.  
It allows users to view, search, and manage documents, as well as monitor and fix any issues with document reading.  
The panel also integrates with the **Tracking Service** logs, providing a centralized place for document and tracking management.  
A dedicated **user system** ensures that each user has appropriate permissions for accessing and managing data.  

The frontend communicates with a separate backend service (**Archive Manage API**) for data storage and operations.

## Features
- View and manage archived sales documents.  
- Search and filter documents by various criteria.  
- Monitor and fix issues in document reading.  
- Access and manage tracking service logs.  
- User management with role-based permissions.  
- Modern UI built with Ant Design and Tailwind CSS.  

## Tech Stack
- **Frontend:** React.js  
- **Languages:** JavaScript  
- **UI Frameworks:** Ant Design, Tailwind CSS  
- **Backend API:** Node.js (see [Archive Manage API](https://github.com/agshinzada/mz-archive-manage-api))  

## Installation
```bash
# Clone the repository
git clone https://github.com/agshinzada/mz-archive-manage.git

# Navigate into the project directory
cd mz-archive-manage

# Install dependencies
npm install

# Start the development server
npm run dev
