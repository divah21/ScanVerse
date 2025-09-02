'use client'

import { useState, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Upload, File, X, AlertCircle, CheckCircle } from 'lucide-react'
import { cn } from '@/lib/utils'

interface FileUploadProps {
  value: string[]
  onChange: (files: string[]) => void
  maxFiles?: number
  maxSize?: number
  accept?: Record<string, string[]>
}

interface UploadedFile {
  id: string
  name: string
  size: number
  type: string
  url: string
  status: 'uploading' | 'success' | 'error'
}

export function FileUpload({
  value = [],
  onChange,
  maxFiles = 5,
  maxSize = 10 * 1024 * 1024, // 10MB
  accept = {
    'image/*': ['.png', '.jpg', '.jpeg', '.gif', '.webp'],
    'application/pdf': ['.pdf'],
    'text/*': ['.txt'],
    'application/msword': ['.doc'],
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
  },
}: FileUploadProps) {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([])
  const [isUploading, setIsUploading] = useState(false)

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      if (uploadedFiles.length + acceptedFiles.length > maxFiles) {
        alert(`Maximum ${maxFiles} files allowed`)
        return
      }

      setIsUploading(true)

      const newFiles: UploadedFile[] = acceptedFiles.map((file) => ({
        id: Math.random().toString(36).substring(7),
        name: file.name,
        size: file.size,
        type: file.type,
        url: URL.createObjectURL(file),
        status: 'uploading' as const,
      }))

      setUploadedFiles((prev) => [...prev, ...newFiles])

      // Simulate file upload to Appwrite
      for (const file of newFiles) {
        try {
          // TODO: Replace with actual Appwrite file upload
          await new Promise((resolve) => setTimeout(resolve, 1000 + Math.random() * 2000))

          setUploadedFiles((prev) =>
            prev.map((f) => (f.id === file.id ? { ...f, status: 'success' as const } : f))
          )

          // Add to form value
          onChange([...value, file.id])
        } catch (error) {
          setUploadedFiles((prev) =>
            prev.map((f) => (f.id === file.id ? { ...f, status: 'error' as const } : f))
          )
        }
      }

      setIsUploading(false)
    },
    [uploadedFiles.length, maxFiles, value, onChange]
  )

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept,
    maxSize,
    multiple: true,
  })

  const removeFile = (fileId: string) => {
    setUploadedFiles((prev) => prev.filter((f) => f.id !== fileId))
    onChange(value.filter((id) => id !== fileId))
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  return (
    <div className="space-y-4">
      {/* Upload Area */}
      <Card
        {...getRootProps()}
        className={cn(
          'border-2 border-dashed cursor-pointer transition-colors hover:border-primary/50',
          isDragActive && 'border-primary bg-primary/5',
          isUploading && 'pointer-events-none opacity-50'
        )}
      >
        <CardContent className="flex flex-col items-center justify-center py-12 text-center">
          <input {...getInputProps()} />
          <Upload className="h-12 w-12 text-muted-foreground mb-4" />
          <div className="space-y-2">
            <p className="text-lg font-medium">
              {isDragActive ? 'Drop files here...' : 'Drag & drop files here, or click to browse'}
            </p>
            <p className="text-sm text-muted-foreground">
              Supports images, PDFs, and documents up to {formatFileSize(maxSize)} each
            </p>
            <p className="text-xs text-muted-foreground">Maximum {maxFiles} files</p>
          </div>
        </CardContent>
      </Card>

      {/* Uploaded Files */}
      {uploadedFiles.length > 0 && (
        <div className="space-y-2">
          <h4 className="text-sm font-medium">
            Uploaded Files ({uploadedFiles.length}/{maxFiles})
          </h4>
          <div className="space-y-2">
            {uploadedFiles.map((file) => (
              <Card key={file.id} className="p-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <File className="h-8 w-8 text-muted-foreground flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{file.name}</p>
                      <p className="text-xs text-muted-foreground">{formatFileSize(file.size)}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      {file.status === 'uploading' && (
                        <Badge variant="secondary" className="animate-pulse">
                          Uploading...
                        </Badge>
                      )}
                      {file.status === 'success' && (
                        <Badge variant="default" className="bg-primary">
                          <CheckCircle className="h-3 w-3 mr-1" />
                          Uploaded
                        </Badge>
                      )}
                      {file.status === 'error' && (
                        <Badge variant="destructive">
                          <AlertCircle className="h-3 w-3 mr-1" />
                          Failed
                        </Badge>
                      )}
                    </div>
                  </div>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => removeFile(file.id)}
                    className="ml-2 flex-shrink-0"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
