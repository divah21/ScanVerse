# ScamVerse Database Schema for Appwrite

## Overview

This document outlines the complete database schema needed for ScamVerse on Appwrite, including all collections, fields, and relationships to support authentication, scam reporting, AI analysis, conversations, and admin functionality.

## Collections & Fields

### 1. Users Collection (`users`)

**Purpose**: Store user profiles and authentication data (extends Appwrite Auth)

| Field Name    | Type     | Required | Description                                     |
| ------------- | -------- | -------- | ----------------------------------------------- |
| `userId`      | String   | Yes      | Appwrite User ID (Primary Key)                  |
| `email`       | String   | Yes      | User email address                              |
| `name`        | String   | Yes      | Full name                                       |
| `avatar`      | String   | No       | Profile picture URL                             |
| `role`        | String   | Yes      | User role: 'user', 'moderator', 'admin'         |
| `isVerified`  | Boolean  | Yes      | Email verification status                       |
| `createdAt`   | DateTime | Yes      | Account creation timestamp                      |
| `lastLoginAt` | DateTime | No       | Last login timestamp                            |
| `preferences` | Object   | No       | User preferences (notifications, theme, etc.)   |
| `status`      | String   | Yes      | Account status: 'active', 'suspended', 'banned' |

**Indexes**:

- `email` (unique)
- `role`
- `status`
- `createdAt`

---

### 2. Scam Reports Collection (`scam_reports`)

**Purpose**: Store user-submitted scam reports

| Field Name     | Type     | Required | Description                                                        |
| -------------- | -------- | -------- | ------------------------------------------------------------------ |
| `reportId`     | String   | Yes      | Document ID (Primary Key)                                          |
| `reporterId`   | String   | Yes      | User ID who submitted report                                       |
| `title`        | String   | Yes      | Report title/summary                                               |
| `description`  | String   | Yes      | Detailed description                                               |
| `scamType`     | String   | Yes      | Type: 'phishing', 'investment', 'romance', 'tech_support', 'other' |
| `urls`         | Array    | No       | Related URLs/websites                                              |
| `amount`       | Number   | No       | Financial loss amount                                              |
| `currency`     | String   | No       | Currency code (USD, EUR, etc.)                                     |
| `dateOccurred` | DateTime | No       | When the scam occurred                                             |
| `evidence`     | Array    | No       | Evidence files (images, documents)                                 |
| `contactInfo`  | Object   | No       | Scammer contact details                                            |
| `status`       | String   | Yes      | Status: 'pending', 'reviewing', 'verified', 'rejected', 'resolved' |
| `severity`     | String   | Yes      | Severity: 'low', 'medium', 'high', 'critical'                      |
| `isPublic`     | Boolean  | Yes      | Whether to show in public feed                                     |
| `tags`         | Array    | No       | Classification tags                                                |
| `location`     | Object   | No       | Geographic location data                                           |
| `reportedAt`   | DateTime | Yes      | Submission timestamp                                               |
| `updatedAt`    | DateTime | Yes      | Last update timestamp                                              |
| `reviewedBy`   | String   | No       | Admin/moderator who reviewed                                       |
| `reviewedAt`   | DateTime | No       | Review timestamp                                                   |
| `reviewNotes`  | String   | No       | Internal review notes                                              |

**Indexes**:

- `reporterId`
- `scamType`
- `status`
- `severity`
- `reportedAt`
- `isPublic`

---

### 3. URL Analysis Collection (`url_analyses`)

**Purpose**: Store AI-powered URL analysis results

| Field Name        | Type     | Required | Description                                              |
| ----------------- | -------- | -------- | -------------------------------------------------------- |
| `analysisId`      | String   | Yes      | Document ID (Primary Key)                                |
| `url`             | String   | Yes      | Analyzed URL                                             |
| `urlHash`         | String   | Yes      | SHA-256 hash of URL for deduplication                    |
| `requestedBy`     | String   | No       | User ID (null for anonymous)                             |
| `riskScore`       | Number   | Yes      | Risk score 0-100                                         |
| `riskLevel`       | String   | Yes      | Risk level: 'low', 'medium', 'high', 'critical'          |
| `confidence`      | Number   | Yes      | AI confidence percentage                                 |
| `summary`         | String   | Yes      | Analysis summary                                         |
| `findings`        | Array    | Yes      | Detailed findings array                                  |
| `recommendations` | Array    | Yes      | Security recommendations                                 |
| `analysisType`    | String   | Yes      | Type: 'ai_analysis', 'manual_review', 'community_report' |
| `aiModel`         | String   | No       | AI model used for analysis                               |
| `processingTime`  | Number   | No       | Analysis duration in seconds                             |
| `metadata`        | Object   | No       | Additional technical metadata                            |
| `isPublic`        | Boolean  | Yes      | Whether analysis is public                               |
| `createdAt`       | DateTime | Yes      | Analysis timestamp                                       |
| `expiresAt`       | DateTime | No       | Cache expiration                                         |

**Indexes**:

- `url`
- `urlHash` (unique)
- `requestedBy`
- `riskLevel`
- `createdAt`
- `isPublic`

---

### 4. AI Conversations Collection (`ai_conversations`)

**Purpose**: Store AI assistant chat sessions

| Field Name       | Type     | Required | Description                                |
| ---------------- | -------- | -------- | ------------------------------------------ |
| `conversationId` | String   | Yes      | Document ID (Primary Key)                  |
| `userId`         | String   | No       | User ID (null for anonymous)               |
| `sessionId`      | String   | Yes      | Browser session identifier                 |
| `title`          | String   | No       | Conversation title (auto-generated)        |
| `messages`       | Array    | Yes      | Array of message objects                   |
| `status`         | String   | Yes      | Status: 'active', 'completed', 'archived'  |
| `totalMessages`  | Number   | Yes      | Total message count                        |
| `hasUrlAnalysis` | Boolean  | Yes      | Whether conversation included URL analysis |
| `analyzedUrls`   | Array    | No       | URLs analyzed in this conversation         |
| `satisfaction`   | Number   | No       | User satisfaction rating 1-5               |
| `feedback`       | String   | No       | User feedback text                         |
| `createdAt`      | DateTime | Yes      | Conversation start time                    |
| `lastMessageAt`  | DateTime | Yes      | Last message timestamp                     |
| `metadata`       | Object   | No       | Additional session data                    |

**Message Object Structure**:

```json
{
  "messageId": "string",
  "role": "user|assistant",
  "content": "string",
  "timestamp": "datetime",
  "metadata": {
    "requiresUrlAnalysis": "boolean",
    "extractedUrl": "string",
    "analysisId": "string"
  }
}
```

**Indexes**:

- `userId`
- `sessionId`
- `status`
- `createdAt`
- `lastMessageAt`

---

### 5. Scam Database Collection (`scam_database`)

**Purpose**: Curated database of known scams and threats

| Field Name    | Type     | Required | Description                                                 |
| ------------- | -------- | -------- | ----------------------------------------------------------- |
| `scamId`      | String   | Yes      | Document ID (Primary Key)                                   |
| `name`        | String   | Yes      | Scam name/title                                             |
| `description` | String   | Yes      | Detailed description                                        |
| `category`    | String   | Yes      | Category: 'phishing', 'investment', 'romance', etc.         |
| `urls`        | Array    | No       | Associated URLs/domains                                     |
| `keywords`    | Array    | Yes      | Detection keywords                                          |
| `patterns`    | Array    | No       | Common patterns/behaviors                                   |
| `severity`    | String   | Yes      | Threat severity level                                       |
| `isActive`    | Boolean  | Yes      | Whether threat is currently active                          |
| `firstSeen`   | DateTime | Yes      | First detection date                                        |
| `lastSeen`    | DateTime | No       | Most recent occurrence                                      |
| `reportCount` | Number   | Yes      | Number of reports received                                  |
| `addedBy`     | String   | Yes      | Admin who added the entry                                   |
| `source`      | String   | Yes      | Data source: 'user_report', 'ai_detection', 'external_feed' |
| `indicators`  | Object   | No       | Technical indicators (IPs, domains, etc.)                   |
| `mitigations` | Array    | No       | Recommended mitigations                                     |
| `createdAt`   | DateTime | Yes      | Entry creation time                                         |
| `updatedAt`   | DateTime | Yes      | Last update time                                            |

**Indexes**:

- `category`
- `severity`
- `isActive`
- `firstSeen`
- `addedBy`

---

### 6. Analytics Collection (`analytics`)

**Purpose**: Store platform analytics and metrics

| Field Name    | Type     | Required | Description                                                       |
| ------------- | -------- | -------- | ----------------------------------------------------------------- |
| `analyticsId` | String   | Yes      | Document ID (Primary Key)                                         |
| `eventType`   | String   | Yes      | Event type: 'page_view', 'url_analysis', 'report_submitted', etc. |
| `userId`      | String   | No       | User ID (null for anonymous)                                      |
| `sessionId`   | String   | No       | Session identifier                                                |
| `data`        | Object   | Yes      | Event-specific data                                               |
| `ipAddress`   | String   | No       | User IP (hashed for privacy)                                      |
| `userAgent`   | String   | No       | Browser user agent                                                |
| `referrer`    | String   | No       | Page referrer                                                     |
| `timestamp`   | DateTime | Yes      | Event timestamp                                                   |
| `metadata`    | Object   | No       | Additional event metadata                                         |

**Indexes**:

- `eventType`
- `userId`
- `timestamp`
- `sessionId`

---

### 7. Notifications Collection (`notifications`)

**Purpose**: Store user notifications and alerts

| Field Name       | Type     | Required | Description                                               |
| ---------------- | -------- | -------- | --------------------------------------------------------- |
| `notificationId` | String   | Yes      | Document ID (Primary Key)                                 |
| `userId`         | String   | Yes      | Target user ID                                            |
| `type`           | String   | Yes      | Type: 'report_update', 'security_alert', 'system_message' |
| `title`          | String   | Yes      | Notification title                                        |
| `message`        | String   | Yes      | Notification content                                      |
| `isRead`         | Boolean  | Yes      | Read status                                               |
| `priority`       | String   | Yes      | Priority: 'low', 'medium', 'high', 'urgent'               |
| `actionUrl`      | String   | No       | Associated action URL                                     |
| `metadata`       | Object   | No       | Additional notification data                              |
| `createdAt`      | DateTime | Yes      | Creation timestamp                                        |
| `readAt`         | DateTime | No       | Read timestamp                                            |
| `expiresAt`      | DateTime | No       | Expiration time                                           |

**Indexes**:

- `userId`
- `type`
- `isRead`
- `priority`
- `createdAt`

---

### 8. System Settings Collection (`system_settings`)

**Purpose**: Store application configuration and settings

| Field Name    | Type     | Required | Description                                     |
| ------------- | -------- | -------- | ----------------------------------------------- |
| `settingId`   | String   | Yes      | Document ID (Primary Key)                       |
| `key`         | String   | Yes      | Setting key name                                |
| `value`       | Object   | Yes      | Setting value (can be any type)                 |
| `description` | String   | No       | Setting description                             |
| `category`    | String   | Yes      | Category: 'ai', 'security', 'ui', 'email', etc. |
| `isPublic`    | Boolean  | Yes      | Whether setting is public                       |
| `updatedBy`   | String   | Yes      | Admin who last updated                          |
| `updatedAt`   | DateTime | Yes      | Last update timestamp                           |

**Indexes**:

- `key` (unique)
- `category`
- `isPublic`

---

## Relationships

### Key Relationships:

1. **Users → Scam Reports**: One-to-Many (one user can submit multiple reports)
2. **Users → AI Conversations**: One-to-Many (one user can have multiple conversations)
3. **Users → URL Analyses**: One-to-Many (one user can request multiple analyses)
4. **Users → Notifications**: One-to-Many (one user can have multiple notifications)
5. **AI Conversations → URL Analyses**: Many-to-Many (conversations can reference multiple analyses)
6. **Scam Reports → Scam Database**: Many-to-One (multiple reports can reference same scam type)

## Permissions Setup

### Collection Permissions:

- **Users**: Read (own), Update (own), Delete (admin only)
- **Scam Reports**: Create (authenticated), Read (own + public), Update (own), Delete (admin)
- **URL Analyses**: Create (any), Read (own + public), Update (admin), Delete (admin)
- **AI Conversations**: Create (any), Read (own), Update (own), Delete (own)
- **Scam Database**: Read (any), Create (admin), Update (admin), Delete (admin)
- **Analytics**: Create (system), Read (admin), Update (admin), Delete (admin)
- **Notifications**: Read (own), Update (own), Delete (own)
- **System Settings**: Read (public ones), Create (admin), Update (admin), Delete (admin)

## Next Steps

1. Create these collections in Appwrite Console
2. Set up proper indexes for performance
3. Configure collection permissions
4. Create API functions for complex operations
5. Set up real-time subscriptions for live updates
6. Implement data validation rules
7. Set up backup and archiving strategies

This schema provides a solid foundation for all current and future ScamVerse functionality while maintaining data integrity and performance.
