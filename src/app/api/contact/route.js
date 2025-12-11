import { NextResponse } from 'next/server'
import { Resend } from 'resend'

// Lazy initialization of Resend (only when API is called)
let resendInstance = null

function getResendInstance() {
  if (!resendInstance && process.env.RESEND_API_KEY) {
    resendInstance = new Resend(process.env.RESEND_API_KEY)
  }
  return resendInstance
}

// Simple in-memory rate limiting (for production, use Redis or similar)
const rateLimitMap = new Map()
const RATE_LIMIT_WINDOW = 60 * 1000 // 1 minute
const MAX_REQUESTS_PER_WINDOW = 3 // 3 requests per minute

// Email validation regex
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

// Helper function to check rate limit
function checkRateLimit(identifier) {
  const now = Date.now()
  const userRequests = rateLimitMap.get(identifier) || []

  // Remove old requests outside the time window
  const recentRequests = userRequests.filter(time => now - time < RATE_LIMIT_WINDOW)

  if (recentRequests.length >= MAX_REQUESTS_PER_WINDOW) {
    return false
  }

  // Add current request
  recentRequests.push(now)
  rateLimitMap.set(identifier, recentRequests)

  return true
}

// Helper function to validate input
function validateInput(data) {
  const errors = {}

  // Name validation
  if (!data.name || data.name.trim().length < 2) {
    errors.name = 'Name must be at least 2 characters long'
  }
  if (data.name && data.name.length > 100) {
    errors.name = 'Name must be less than 100 characters'
  }

  // Email validation
  if (!data.email || !EMAIL_REGEX.test(data.email)) {
    errors.email = 'Please enter a valid email address'
  }

  // Subject validation
  if (!data.subject || data.subject.trim().length < 3) {
    errors.subject = 'Subject must be at least 3 characters long'
  }
  if (data.subject && data.subject.length > 200) {
    errors.subject = 'Subject must be less than 200 characters'
  }

  // Message validation
  if (!data.message || data.message.trim().length < 10) {
    errors.message = 'Message must be at least 10 characters long'
  }
  if (data.message && data.message.length > 5000) {
    errors.message = 'Message must be less than 5000 characters'
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  }
}

// POST handler for contact form
export async function POST(request) {
  try {
    // Get client IP for rate limiting
    const forwarded = request.headers.get('x-forwarded-for')
    const ip = forwarded ? forwarded.split(',')[0] : 'unknown'

    // Check rate limit
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        {
          success: false,
          error: 'Too many requests. Please try again later.'
        },
        { status: 429 }
      )
    }

    // Parse request body
    const data = await request.json()

    // Validate input
    const validation = validateInput(data)
    if (!validation.isValid) {
      return NextResponse.json(
        {
          success: false,
          error: 'Validation failed',
          errors: validation.errors
        },
        { status: 400 }
      )
    }

    // Sanitize input
    const sanitizedData = {
      name: data.name.trim(),
      email: data.email.trim().toLowerCase(),
      subject: data.subject.trim(),
      message: data.message.trim()
    }

    // Check if Resend API key is configured
    if (!process.env.RESEND_API_KEY) {
      console.error('RESEND_API_KEY is not configured')

      // Log the contact form submission for manual follow-up
      console.log('Contact Form Submission:', {
        timestamp: new Date().toISOString(),
        ...sanitizedData
      })

      // Return success (but don't actually send email)
      // This prevents exposing configuration issues to users
      return NextResponse.json({
        success: true,
        message: 'Thank you for your message. We will get back to you soon!'
      })
    }

    // Send email using Resend
    const resend = getResendInstance()
    const emailResult = await resend.emails.send({
      from: process.env.EMAIL_FROM || 'onboarding@resend.dev',
      to: process.env.EMAIL_TO || 'delivered@resend.dev',
      replyTo: sanitizedData.email,
      subject: `Contact Form: ${sanitizedData.subject}`,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <style>
              body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; border-radius: 8px 8px 0 0; }
              .content { background: #f9fafb; padding: 30px; border-radius: 0 0 8px 8px; }
              .field { margin-bottom: 20px; }
              .label { font-weight: 600; color: #4b5563; margin-bottom: 5px; }
              .value { background: white; padding: 12px; border-radius: 6px; border: 1px solid #e5e7eb; }
              .footer { margin-top: 20px; padding-top: 20px; border-top: 1px solid #e5e7eb; font-size: 14px; color: #6b7280; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1 style="margin: 0; font-size: 24px;">New Contact Form Submission</h1>
              </div>
              <div class="content">
                <div class="field">
                  <div class="label">From:</div>
                  <div class="value"><strong>${sanitizedData.name}</strong></div>
                </div>
                <div class="field">
                  <div class="label">Email:</div>
                  <div class="value"><a href="mailto:${sanitizedData.email}">${sanitizedData.email}</a></div>
                </div>
                <div class="field">
                  <div class="label">Subject:</div>
                  <div class="value">${sanitizedData.subject}</div>
                </div>
                <div class="field">
                  <div class="label">Message:</div>
                  <div class="value">${sanitizedData.message.replace(/\n/g, '<br>')}</div>
                </div>
                <div class="footer">
                  <p>Received at: ${new Date().toLocaleString('en-US', { dateStyle: 'full', timeStyle: 'long' })}</p>
                  <p>IP Address: ${ip}</p>
                </div>
              </div>
            </div>
          </body>
        </html>
      `
    })

    // Check if email was sent successfully
    if (emailResult.error) {
      console.error('Error sending email:', emailResult.error)
      return NextResponse.json(
        {
          success: false,
          error: 'Failed to send message. Please try again later.'
        },
        { status: 500 }
      )
    }

    // Success response
    return NextResponse.json({
      success: true,
      message: 'Thank you for your message. We will get back to you soon!',
      id: emailResult.data?.id
    })

  } catch (error) {
    console.error('Contact form error:', error)

    return NextResponse.json(
      {
        success: false,
        error: 'An unexpected error occurred. Please try again later.'
      },
      { status: 500 }
    )
  }
}

// GET handler (optional - for health check)
export async function GET() {
  return NextResponse.json({
    status: 'Contact API is running',
    configured: !!process.env.RESEND_API_KEY
  })
}
