'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'
import { Badge } from '@/components/ui/badge'
import { FileUpload } from '@/components/report/file-upload'
import { Loader2, Send, AlertCircle, CheckCircle } from 'lucide-react'
import type { ScamType, ScamSeverity } from '@/types/scam'

const reportFormSchema = z.object({
  title: z
    .string()
    .min(10, 'Title must be at least 10 characters')
    .max(100, 'Title must be less than 100 characters'),
  description: z
    .string()
    .min(50, 'Description must be at least 50 characters')
    .max(2000, 'Description must be less than 2000 characters'),
  scamUrl: z
    .string()
    .url('Please enter a valid URL')
    .or(z.literal('').transform(() => 'N/A')),
  scamType: z.enum([
    'phishing',
    'investment',
    'romance',
    'tech-support',
    'cryptocurrency',
    'shopping',
    'employment',
    'lottery',
    'charity',
    'other',
  ]),
  severity: z.enum(['low', 'medium', 'high', 'critical']),
  reporterEmail: z
    .string()
    .email('Please enter a valid email address')
    .optional()
    .or(z.literal('')),
  isPublic: z.boolean().default(true),
  tags: z.array(z.string()).optional(),
  evidenceFiles: z.array(z.string()).optional(),
})

type ReportFormValues = z.infer<typeof reportFormSchema>

export function ReportForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [customTags, setCustomTags] = useState<string[]>([])
  const [tagInput, setTagInput] = useState('')

  const form = useForm<ReportFormValues>({
    resolver: zodResolver(reportFormSchema),
    defaultValues: {
      title: '',
      description: '',
      scamUrl: '',
      scamType: 'other',
      severity: 'medium',
      reporterEmail: '',
      isPublic: true,
      tags: [],
      evidenceFiles: [],
    },
  })

  const onSubmit = async (values: ReportFormValues) => {
    setIsSubmitting(true)
    setSubmitStatus('idle')

    try {
      // Add custom tags to the form values
      const finalValues = {
        ...values,
        tags: [...(values.tags || []), ...customTags],
      }

      // TODO: Submit to Appwrite database
      console.log('Submitting report:', finalValues)

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000))

      setSubmitStatus('success')
      form.reset()
      setCustomTags([])
    } catch (error) {
      console.error('Error submitting report:', error)
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  const addCustomTag = () => {
    if (tagInput.trim() && !customTags.includes(tagInput.trim())) {
      setCustomTags([...customTags, tagInput.trim()])
      setTagInput('')
    }
  }

  const removeTag = (tagToRemove: string) => {
    setCustomTags(customTags.filter((tag) => tag !== tagToRemove))
  }

  const scamTypes: { value: ScamType; label: string }[] = [
    { value: 'phishing', label: 'Phishing / Fake Websites' },
    { value: 'investment', label: 'Investment Scam' },
    { value: 'romance', label: 'Romance Scam' },
    { value: 'tech-support', label: 'Tech Support Scam' },
    { value: 'cryptocurrency', label: 'Cryptocurrency Scam' },
    { value: 'shopping', label: 'Online Shopping Scam' },
    { value: 'employment', label: 'Employment Scam' },
    { value: 'lottery', label: 'Lottery / Prize Scam' },
    { value: 'charity', label: 'Charity Scam' },
    { value: 'other', label: 'Other' },
  ]

  const severityLevels: { value: ScamSeverity; label: string; description: string }[] = [
    { value: 'low', label: 'Low', description: 'Minor financial loss or inconvenience' },
    { value: 'medium', label: 'Medium', description: 'Moderate financial loss or data compromise' },
    { value: 'high', label: 'High', description: 'Significant financial loss or identity theft' },
    {
      value: 'critical',
      label: 'Critical',
      description: 'Major financial loss or widespread impact',
    },
  ]

  return (
    <section className="py-16 bg-background">
      <div className="container px-4 max-w-7xl mx-auto">
        <div className="max-w-4xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Submit Scam Report</CardTitle>
              <CardDescription>
                Please provide as much detail as possible to help us verify and categorize this scam
                effectively.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                  {/* Basic Information */}
                  <div className="space-y-6">
                    <h3 className="text-lg font-semibold border-b pb-2">Basic Information</h3>

                    <FormField
                      control={form.control}
                      name="title"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Report Title *</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Brief, descriptive title of the scam..."
                              {...field}
                            />
                          </FormControl>
                          <FormDescription>
                            A clear, concise title that summarizes the scam (10-100 characters)
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="description"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Detailed Description *</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Describe what happened, how you were contacted, what they asked for, and any other relevant details..."
                              className="min-h-32"
                              {...field}
                            />
                          </FormControl>
                          <FormDescription>
                            Provide a comprehensive description of the scam (50-2000 characters)
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="scamUrl"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Fraudulent Website URL</FormLabel>
                          <FormControl>
                            <Input placeholder="https://suspicious-website.com" {...field} />
                          </FormControl>
                          <FormDescription>
                            The URL of the scam website (leave empty if not applicable)
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* Categorization */}
                  <div className="space-y-6">
                    <h3 className="text-lg font-semibold border-b pb-2">Categorization</h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="scamType"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Scam Type *</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select scam type" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {scamTypes.map((type) => (
                                  <SelectItem key={type.value} value={type.value}>
                                    {type.label}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="severity"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Severity Level *</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select severity" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {severityLevels.map((level) => (
                                  <SelectItem key={level.value} value={level.value}>
                                    <div className="flex flex-col">
                                      <span>{level.label}</span>
                                      <span className="text-xs text-muted-foreground">
                                        {level.description}
                                      </span>
                                    </div>
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold border-b pb-2">Tags</h3>
                    <div className="space-y-4">
                      <div className="flex gap-2">
                        <Input
                          placeholder="Add custom tags..."
                          value={tagInput}
                          onChange={(e) => setTagInput(e.target.value)}
                          onKeyPress={(e) =>
                            e.key === 'Enter' && (e.preventDefault(), addCustomTag())
                          }
                        />
                        <Button type="button" variant="outline" onClick={addCustomTag}>
                          Add Tag
                        </Button>
                      </div>
                      {customTags.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {customTags.map((tag) => (
                            <Badge
                              key={tag}
                              variant="secondary"
                              className="cursor-pointer"
                              onClick={() => removeTag(tag)}
                            >
                              {tag} ×
                            </Badge>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* File Upload */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold border-b pb-2">Evidence</h3>
                    <FormField
                      control={form.control}
                      name="evidenceFiles"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Upload Evidence</FormLabel>
                          <FormControl>
                            <FileUpload
                              value={field.value || []}
                              onChange={field.onChange}
                              maxFiles={5}
                              maxSize={10 * 1024 * 1024} // 10MB
                            />
                          </FormControl>
                          <FormDescription>
                            Upload screenshots, emails, or other evidence (max 5 files, 10MB each)
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* Contact & Privacy */}
                  <div className="space-y-6">
                    <h3 className="text-lg font-semibold border-b pb-2">Contact & Privacy</h3>

                    <FormField
                      control={form.control}
                      name="reporterEmail"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Your Email (Optional)</FormLabel>
                          <FormControl>
                            <Input placeholder="your.email@example.com" {...field} />
                          </FormControl>
                          <FormDescription>
                            We may contact you for additional information. Your email will not be
                            made public.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="isPublic"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                          <FormControl>
                            <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel>Make this report public</FormLabel>
                            <FormDescription>
                              Allow other users to see this report in the community feed
                              (recommended)
                            </FormDescription>
                          </div>
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* Submit Status */}
                  {submitStatus === 'success' && (
                    <div className="flex items-center gap-2 p-4 bg-primary/10 text-primary rounded-lg">
                      <CheckCircle className="h-5 w-5" />
                      <span>
                        Report submitted successfully! Thank you for helping protect the community.
                      </span>
                    </div>
                  )}

                  {submitStatus === 'error' && (
                    <div className="flex items-center gap-2 p-4 bg-destructive/10 text-destructive rounded-lg">
                      <AlertCircle className="h-5 w-5" />
                      <span>There was an error submitting your report. Please try again.</span>
                    </div>
                  )}

                  {/* Submit Button */}
                  <div className="flex justify-end">
                    <Button type="submit" size="lg" disabled={isSubmitting}>
                      {isSubmitting ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Submitting Report...
                        </>
                      ) : (
                        <>
                          <Send className="mr-2 h-4 w-4" />
                          Submit Report
                        </>
                      )}
                    </Button>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
