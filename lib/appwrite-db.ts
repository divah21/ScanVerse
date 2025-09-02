import { ID, Query } from 'appwrite'
import { databases, storage, DATABASE_ID, COLLECTIONS, BUCKETS } from './appwrite'
import type { ScamReport, ScamAnalysis, User } from '@/types/scam'

// User Management
export const createUser = async (userData: Partial<User>) => {
  try {
    return await databases.createDocument(DATABASE_ID, COLLECTIONS.USERS, ID.unique(), {
      ...userData,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    })
  } catch (error) {
    console.error('Error creating user:', error)
    throw error
  }
}

export const getUserById = async (userId: string) => {
  try {
    return await databases.getDocument(DATABASE_ID, COLLECTIONS.USERS, userId)
  } catch (error) {
    console.error('Error getting user:', error)
    throw error
  }
}

export const updateUser = async (userId: string, userData: Partial<User>) => {
  try {
    return await databases.updateDocument(DATABASE_ID, COLLECTIONS.USERS, userId, {
      ...userData,
      updated_at: new Date().toISOString(),
    })
  } catch (error) {
    console.error('Error updating user:', error)
    throw error
  }
}

// Scam Reports
export const createScamReport = async (reportData: Partial<ScamReport>) => {
  try {
    return await databases.createDocument(DATABASE_ID, COLLECTIONS.SCAM_REPORTS, ID.unique(), {
      ...reportData,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    })
  } catch (error) {
    console.error('Error creating scam report:', error)
    throw error
  }
}

export const getScamReports = async (
  limit: number = 20,
  offset: number = 0,
  filters?: { status?: string; category?: string; userId?: string }
) => {
  try {
    const queries = [Query.limit(limit), Query.offset(offset), Query.orderDesc('created_at')]

    if (filters?.status) {
      queries.push(Query.equal('status', filters.status))
    }
    if (filters?.category) {
      queries.push(Query.equal('category', filters.category))
    }
    if (filters?.userId) {
      queries.push(Query.equal('reporter_id', filters.userId))
    }

    return await databases.listDocuments(DATABASE_ID, COLLECTIONS.SCAM_REPORTS, queries)
  } catch (error) {
    console.error('Error getting scam reports:', error)
    throw error
  }
}

export const updateScamReportStatus = async (
  reportId: string,
  status: string,
  adminNotes?: string
) => {
  try {
    return await databases.updateDocument(DATABASE_ID, COLLECTIONS.SCAM_REPORTS, reportId, {
      status,
      admin_notes: adminNotes,
      updated_at: new Date().toISOString(),
    })
  } catch (error) {
    console.error('Error updating scam report status:', error)
    throw error
  }
}

// URL Analysis
export const createUrlAnalysis = async (analysisData: Partial<ScamAnalysis>) => {
  try {
    return await databases.createDocument(DATABASE_ID, COLLECTIONS.URL_ANALYSES, ID.unique(), {
      ...analysisData,
      created_at: new Date().toISOString(),
    })
  } catch (error) {
    console.error('Error creating URL analysis:', error)
    throw error
  }
}

export const getUrlAnalyses = async (limit: number = 20, offset: number = 0, userId?: string) => {
  try {
    const queries = [Query.limit(limit), Query.offset(offset), Query.orderDesc('created_at')]

    if (userId) {
      queries.push(Query.equal('user_id', userId))
    }

    return await databases.listDocuments(DATABASE_ID, COLLECTIONS.URL_ANALYSES, queries)
  } catch (error) {
    console.error('Error getting URL analyses:', error)
    throw error
  }
}

export const getUrlAnalysisByUrl = async (url: string) => {
  try {
    const response = await databases.listDocuments(DATABASE_ID, COLLECTIONS.URL_ANALYSES, [
      Query.equal('url', url),
      Query.orderDesc('created_at'),
      Query.limit(1),
    ])
    return response.documents[0] || null
  } catch (error) {
    console.error('Error getting URL analysis by URL:', error)
    throw error
  }
}

// AI Conversations
export const createAIConversation = async (conversationData: {
  user_id?: string
  session_id: string
  messages: any[]
  metadata?: any
}) => {
  try {
    return await databases.createDocument(DATABASE_ID, COLLECTIONS.AI_CONVERSATIONS, ID.unique(), {
      ...conversationData,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    })
  } catch (error) {
    console.error('Error creating AI conversation:', error)
    throw error
  }
}

export const updateAIConversation = async (
  conversationId: string,
  messages: any[],
  metadata?: any
) => {
  try {
    return await databases.updateDocument(
      DATABASE_ID,
      COLLECTIONS.AI_CONVERSATIONS,
      conversationId,
      {
        messages,
        metadata,
        updated_at: new Date().toISOString(),
      }
    )
  } catch (error) {
    console.error('Error updating AI conversation:', error)
    throw error
  }
}

export const getAIConversations = async (
  userId?: string,
  sessionId?: string,
  limit: number = 10
) => {
  try {
    const queries = [Query.limit(limit), Query.orderDesc('updated_at')]

    if (userId) {
      queries.push(Query.equal('user_id', userId))
    }
    if (sessionId) {
      queries.push(Query.equal('session_id', sessionId))
    }

    return await databases.listDocuments(DATABASE_ID, COLLECTIONS.AI_CONVERSATIONS, queries)
  } catch (error) {
    console.error('Error getting AI conversations:', error)
    throw error
  }
}

// Scam Database
export const addToScamDatabase = async (scamData: {
  url: string
  domain: string
  scam_type: string
  risk_score: number
  indicators: string[]
  verified_by?: string
  metadata?: any
}) => {
  try {
    return await databases.createDocument(DATABASE_ID, COLLECTIONS.SCAM_DATABASE, ID.unique(), {
      ...scamData,
      status: 'verified',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    })
  } catch (error) {
    console.error('Error adding to scam database:', error)
    throw error
  }
}

export const checkScamDatabase = async (url: string) => {
  try {
    const response = await databases.listDocuments(DATABASE_ID, COLLECTIONS.SCAM_DATABASE, [
      Query.equal('url', url),
      Query.equal('status', 'verified'),
      Query.limit(1),
    ])
    return response.documents[0] || null
  } catch (error) {
    console.error('Error checking scam database:', error)
    throw error
  }
}

export const searchScamDatabase = async (domain: string) => {
  try {
    return await databases.listDocuments(DATABASE_ID, COLLECTIONS.SCAM_DATABASE, [
      Query.equal('domain', domain),
      Query.equal('status', 'verified'),
      Query.orderDesc('created_at'),
    ])
  } catch (error) {
    console.error('Error searching scam database:', error)
    throw error
  }
}

// Analytics
export const recordAnalytics = async (eventData: {
  event_type: string
  user_id?: string
  url?: string
  metadata?: any
}) => {
  try {
    return await databases.createDocument(DATABASE_ID, COLLECTIONS.ANALYTICS, ID.unique(), {
      ...eventData,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error('Error recording analytics:', error)
    throw error
  }
}

export const getAnalytics = async (
  eventType?: string,
  startDate?: string,
  endDate?: string,
  limit: number = 100
) => {
  try {
    const queries = [Query.limit(limit), Query.orderDesc('timestamp')]

    if (eventType) {
      queries.push(Query.equal('event_type', eventType))
    }
    if (startDate) {
      queries.push(Query.greaterThanEqual('timestamp', startDate))
    }
    if (endDate) {
      queries.push(Query.lessThanEqual('timestamp', endDate))
    }

    return await databases.listDocuments(DATABASE_ID, COLLECTIONS.ANALYTICS, queries)
  } catch (error) {
    console.error('Error getting analytics:', error)
    throw error
  }
}

// Notifications
export const createNotification = async (notificationData: {
  user_id: string
  title: string
  message: string
  type: string
  metadata?: any
}) => {
  try {
    return await databases.createDocument(DATABASE_ID, COLLECTIONS.NOTIFICATIONS, ID.unique(), {
      ...notificationData,
      read: false,
      created_at: new Date().toISOString(),
    })
  } catch (error) {
    console.error('Error creating notification:', error)
    throw error
  }
}

export const getUserNotifications = async (userId: string, unreadOnly: boolean = false) => {
  try {
    const queries = [Query.equal('user_id', userId), Query.orderDesc('created_at'), Query.limit(50)]

    if (unreadOnly) {
      queries.push(Query.equal('read', false))
    }

    return await databases.listDocuments(DATABASE_ID, COLLECTIONS.NOTIFICATIONS, queries)
  } catch (error) {
    console.error('Error getting user notifications:', error)
    throw error
  }
}

export const markNotificationAsRead = async (notificationId: string) => {
  try {
    return await databases.updateDocument(DATABASE_ID, COLLECTIONS.NOTIFICATIONS, notificationId, {
      read: true,
    })
  } catch (error) {
    console.error('Error marking notification as read:', error)
    throw error
  }
}

// File Upload
export const uploadFile = async (file: File, bucketId: string) => {
  try {
    return await storage.createFile(bucketId, ID.unique(), file)
  } catch (error) {
    console.error('Error uploading file:', error)
    throw error
  }
}

export const getFileUrl = (bucketId: string, fileId: string) => {
  return storage.getFileView(bucketId, fileId)
}

export const deleteFile = async (bucketId: string, fileId: string) => {
  try {
    return await storage.deleteFile(bucketId, fileId)
  } catch (error) {
    console.error('Error deleting file:', error)
    throw error
  }
}

// System Settings
export const getSystemSettings = async () => {
  try {
    const response = await databases.listDocuments(DATABASE_ID, COLLECTIONS.SYSTEM_SETTINGS, [
      Query.limit(100),
    ])
    return response.documents
  } catch (error) {
    console.error('Error getting system settings:', error)
    throw error
  }
}

export const updateSystemSetting = async (key: string, value: any) => {
  try {
    // Try to find existing setting
    const existing = await databases.listDocuments(DATABASE_ID, COLLECTIONS.SYSTEM_SETTINGS, [
      Query.equal('key', key),
      Query.limit(1),
    ])

    if (existing.documents.length > 0) {
      // Update existing setting
      return await databases.updateDocument(
        DATABASE_ID,
        COLLECTIONS.SYSTEM_SETTINGS,
        existing.documents[0].$id,
        {
          value,
          updated_at: new Date().toISOString(),
        }
      )
    } else {
      // Create new setting
      return await databases.createDocument(DATABASE_ID, COLLECTIONS.SYSTEM_SETTINGS, ID.unique(), {
        key,
        value,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      })
    }
  } catch (error) {
    console.error('Error updating system setting:', error)
    throw error
  }
}
