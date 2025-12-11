# Contact Form Setup Guide

Your contact form is now **production-ready** with the following features:

## ✅ Features Implemented

1. **Real API Integration** - Form submissions are sent to `/api/contact` endpoint
2. **Email Service** - Integration with Resend for reliable email delivery
3. **Form Validation** - Client-side and server-side validation
4. **Error Handling** - Comprehensive error messages for users
5. **Loading States** - Visual feedback during form submission
6. **Rate Limiting** - Protection against spam (3 requests per minute per IP)
7. **Responsive Design** - Works on all devices
8. **Accessibility** - Proper labels and ARIA attributes

## 🚀 Quick Setup

### Step 1: Get Resend API Key

1. Go to [https://resend.com](https://resend.com) and create a free account
2. Navigate to **API Keys** section
3. Click **Create API Key**
4. Copy your API key (starts with `re_`)

### Step 2: Configure Environment Variables

1. Create a `.env.local` file in the root directory:

```bash
cp .env.example .env.local
```

2. Add your configuration:

```env
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxxxxxxxxxx
EMAIL_FROM=noreply@yourdomain.com
EMAIL_TO=your-email@example.com
```

### Step 3: Verify Domain (For Production)

**Important:** For production, you need to verify your domain with Resend:

1. Go to [https://resend.com/domains](https://resend.com/domains)
2. Click **Add Domain**
3. Enter your domain (e.g., `yourdomain.com`)
4. Add the provided DNS records to your domain
5. Wait for verification (usually 5-10 minutes)
6. Update `EMAIL_FROM` in `.env.local` to use your verified domain

**For Testing:**
- You can use `onboarding@resend.dev` as `EMAIL_FROM` without domain verification
- This works for testing but emails may be limited

## 📧 Email Configuration Examples

### Development (Testing)
```env
RESEND_API_KEY=re_xxx
EMAIL_FROM=onboarding@resend.dev
EMAIL_TO=your-test-email@gmail.com
```

### Production
```env
RESEND_API_KEY=re_xxx
EMAIL_FROM=contact@yourdomain.com
EMAIL_TO=support@yourdomain.com
```

## 🛡️ Security Features

1. **Rate Limiting**: 3 requests per minute per IP address
2. **Input Validation**: All fields are validated on server-side
3. **Sanitization**: User input is sanitized before processing
4. **Error Masking**: Configuration errors are not exposed to users

## 📊 Validation Rules

- **Name**: 2-100 characters
- **Email**: Valid email format
- **Subject**: 3-200 characters
- **Message**: 10-5000 characters

## 🧪 Testing

### Test Locally
```bash
npm run dev
```

Visit `http://localhost:3000/contact` and submit the form.

### Check API Health
```bash
curl http://localhost:3000/api/contact
```

Response should be:
```json
{
  "status": "Contact API is running",
  "configured": true
}
```

## 🚨 Troubleshooting

### Form submits but no email received

1. Check your `.env.local` file exists and has correct values
2. Verify your Resend API key is active
3. Check if `EMAIL_FROM` domain is verified (for production)
4. Look at server logs for error messages

### "Too many requests" error

This is rate limiting protection. Wait 1 minute and try again.

### Validation errors

The form will show specific error messages for each field. Fix the indicated issues and resubmit.

## 📦 Resend Free Tier Limits

- 100 emails per day
- 3,000 emails per month
- For higher volumes, check [Resend pricing](https://resend.com/pricing)

## 🔄 Alternative Email Services

If you want to use a different email service:

1. **SendGrid**: Replace Resend with SendGrid SDK
2. **Nodemailer**: Use with SMTP
3. **AWS SES**: Amazon's email service

The API route structure is designed to be easily adaptable.

## 📝 Production Checklist

Before going live, ensure:

- [ ] Resend API key is added to production environment variables
- [ ] Domain is verified with Resend
- [ ] `EMAIL_FROM` uses verified domain
- [ ] `EMAIL_TO` is set to correct recipient
- [ ] Test form submission in production environment
- [ ] Monitor email delivery in Resend dashboard

## 🎯 Next Steps

Your contact form is ready for production! When you deploy:

1. **Vercel**: Add environment variables in Project Settings → Environment Variables
2. **Netlify**: Add in Site Settings → Environment Variables
3. **Other Platforms**: Add according to platform documentation

## 💡 Tips

1. **Monitor Usage**: Check Resend dashboard for email delivery status
2. **Add Auto-responder**: Send confirmation email to users who submit the form
3. **Database Storage**: Consider storing submissions in a database for backup
4. **Analytics**: Track form submissions with analytics tools

---

**Need Help?** Check out:
- [Resend Documentation](https://resend.com/docs)
- [Next.js API Routes](https://nextjs.org/docs/api-routes/introduction)
