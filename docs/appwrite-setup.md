# Appwrite Configuration for ScamVerse

## Environment Variables Needed

Add these to your `.env.local` file:

```env
# Appwrite Configuration
NEXT_PUBLIC_APPWRITE_ENDPOINT=https://cloud.appwrite.io/v1
NEXT_PUBLIC_APPWRITE_PROJECT_ID=your_project_id_here
APPWRITE_API_KEY=your_api_key_here

# Database Configuration
NEXT_PUBLIC_APPWRITE_DATABASE_ID=scamverse_db
```

## Quick Setup Commands

### 1. Install Appwrite CLI

```bash
npm install -g appwrite-cli
```

### 2. Login to Appwrite

```bash
appwrite login
```

### 3. Initialize Project

```bash
appwrite init project
```

### 4. Create Collections (run these commands)

```bash
# Create Database
appwrite databases create --databaseId scamverse_db --name "ScamVerse Database"

# Create Users Collection
appwrite databases createCollection \
  --databaseId scamverse_db \
  --collectionId users \
  --name "Users" \
  --permissions 'read("users"),write("users")'

# Create Scam Reports Collection
appwrite databases createCollection \
  --databaseId scamverse_db \
  --collectionId scam_reports \
  --name "Scam Reports" \
  --permissions 'read("any"),write("users")'

# Create URL Analyses Collection
appwrite databases createCollection \
  --databaseId scamverse_db \
  --collectionId url_analyses \
  --name "URL Analyses" \
  --permissions 'read("any"),write("any")'

# Create AI Conversations Collection
appwrite databases createCollection \
  --databaseId scamverse_db \
  --collectionId ai_conversations \
  --name "AI Conversations" \
  --permissions 'read("users"),write("any")'

# Create Scam Database Collection
appwrite databases createCollection \
  --databaseId scamverse_db \
  --collectionId scam_database \
  --name "Scam Database" \
  --permissions 'read("any"),write("admins")'

# Create Analytics Collection
appwrite databases createCollection \
  --databaseId scamverse_db \
  --collectionId analytics \
  --name "Analytics" \
  --permissions 'read("admins"),write("any")'

# Create Notifications Collection
appwrite databases createCollection \
  --databaseId scamverse_db \
  --collectionId notifications \
  --name "Notifications" \
  --permissions 'read("users"),write("users")'

# Create System Settings Collection
appwrite databases createCollection \
  --databaseId scamverse_db \
  --collectionId system_settings \
  --name "System Settings" \
  --permissions 'read("any"),write("admins")'
```

## Manual Setup in Appwrite Console

If you prefer using the web console:

1. Go to your Appwrite Console
2. Create a new database named "ScamVerse Database" with ID `scamverse_db`
3. Create each collection with the attributes listed in the database schema
4. Set up proper permissions for each collection
5. Create indexes for better performance

## Collection IDs to Use:

- `users`
- `scam_reports`
- `url_analyses`
- `ai_conversations`
- `scam_database`
- `analytics`
- `notifications`
- `system_settings`

## Important Notes:

1. **Authentication**: Enable Email/Password authentication in Appwrite Auth settings
2. **File Storage**: Set up a bucket for evidence files and user avatars
3. **Functions**: You may want to create Appwrite Functions for complex operations
4. **Real-time**: Enable real-time for collections that need live updates
5. **Security**: Set up proper security rules and API key restrictions

## Testing the Setup

After creating the database, you can test the connection by updating your `lib/appwrite.ts` file with the correct configuration.
