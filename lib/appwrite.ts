import { Client, Account, Databases, Storage, Functions } from 'appwrite'

const client = new Client()

// Configure Appwrite client
client
  .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT || 'https://cloud.appwrite.io/v1')
  .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID || '')

// Initialize Appwrite services
export const account = new Account(client)
export const databases = new Databases(client)
export const storage = new Storage(client)
export const functions = new Functions(client)

// Database and collection IDs
export const DATABASE_ID = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID || ''
export const SCAM_REPORTS_COLLECTION_ID =
  process.env.NEXT_PUBLIC_APPWRITE_SCAM_REPORTS_COLLECTION_ID || ''
export const URL_ANALYSIS_COLLECTION_ID =
  process.env.NEXT_PUBLIC_APPWRITE_URL_ANALYSIS_COLLECTION_ID || ''
export const USERS_COLLECTION_ID = process.env.NEXT_PUBLIC_APPWRITE_USERS_COLLECTION_ID || ''

// Storage bucket IDs
export const EVIDENCE_BUCKET_ID = process.env.NEXT_PUBLIC_APPWRITE_EVIDENCE_BUCKET_ID || ''

export default client
