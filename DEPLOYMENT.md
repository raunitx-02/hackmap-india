# 🚀 HackMap India - Complete Deployment Guide

## ✅ What's Already Done

- ✅ Full React + Vite application structure
- ✅ Firebase Authentication (Google Sign-in)
- ✅ Firestore Database configuration
- ✅ Cashfree Payment Gateway integration
- ✅ All components (Navbar, MapView, HackathonCard, etc.)
- ✅ Payment Modal and Success/Failure pages
- ✅ Zustand state management
- ✅ Tailwind CSS styling
- ✅ Firestore initialization script with sample data

## 📦 Step 1: Clone & Install (5 mins)

```bash
git clone https://github.com/raunitx-02/hackmap-india.git
cd hackmap-india
npm install
npm install @cashfreepayments/cashfree-js
```

## 🔥 Step 2: Environment Setup (Already Configured!)

Your `.env.example` already has all credentials:
- Firebase configuration
- Cashfree App ID and Secret Key

Just copy it:
```bash
cp .env.example .env
```

The `.env` file is already populated with:
- Firebase API Key
- Cashfree Production credentials

## 🗄️ Step 3: Initialize Firestore Database (2 mins)

Run the initialization script to add 5 sample hackathons:

```bash
npm install dotenv
node scripts/initFirestore.js
```

This will create:
- ✅ 5 hackathons (SIH, HackIITB, DevFest, ETHIndia, HackBVP)
- ✅ Complete hackathon data with prizes, dates, locations
- ✅ GPS coordinates for map markers

## 🔐 Step 4: Firebase Security Rules

Go to Firebase Console → Firestore → Rules:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /hackathons/{hackathon} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    match /registrations/{registration} {
      allow read, write: if request.auth != null;
    }
    match /payments/{payment} {
      allow read, write: if request.auth != null;
    }
    match /users/{userId} {
      allow read: if true;
      allow write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

## 🧪 Step 5: Test Locally (3 mins)

```bash
npm run dev
```

Open `http://localhost:5173` and test:
- ✅ Google Sign-in
- ✅ Hackathon map view
- ✅ Search and filters
- ✅ Hackathon detail pages
- ✅ Payment modal (test with Cashfree test cards)

## 🌐 Step 6: Deploy to Vercel (5 mins)

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
vercel
```

Follow the prompts:
1. Set up and deploy
2. Link to existing project or create new
3. Accept defaults

### Add Environment Variables in Vercel Dashboard:

1. Go to Vercel Dashboard → Your Project → Settings → Environment Variables
2. Add all variables from `.env`:
   - `VITE_FIREBASE_API_KEY`
   - `VITE_FIREBASE_AUTH_DOMAIN`
   - `VITE_FIREBASE_PROJECT_ID`
   - `VITE_FIREBASE_STORAGE_BUCKET`
   - `VITE_FIREBASE_MESSAGING_SENDER_ID`
   - `VITE_FIREBASE_APP_ID`
   - `VITE_FIREBASE_MEASUREMENT_ID`
   - `VITE_CASHFREE_APP_ID`
   - `VITE_CASHFREE_SECRET_KEY`
   - `VITE_CASHFREE_ENV=PROD`

3. Redeploy:
```bash
vercel --prod
```

## 💳 Step 7: Cashfree Payment Testing

### Test Cards (Sandbox):
- Card: 4111 1111 1111 1111
- CVV: 123
- Expiry: Any future date

### Production:
Your Cashfree account is already in **PROD** mode!

## 🎯 What Users Can Do:

1. **Browse Hackathons** - View all hackathons on interactive map
2. **Search & Filter** - Find hackathons by location, date, theme
3. **View Details** - See prize money, team size, registration deadlines
4. **Google Sign-in** - Authenticate with Google
5. **Pay & Register** - Complete registration with Cashfree
6. **Payment Verification** - Automatic payment status checking

## 📊 Admin Features (Add Later):

- Add new hackathons
- Edit/Delete hackathons
- View registrations
- Export payment reports

## 🔧 Troubleshooting:

### Firestore Init Script Fails:
```bash
# Make sure dotenv is installed
npm install dotenv

# Check .env file exists
cat .env
```

### Payment Not Working:
- Verify Cashfree credentials in Vercel
- Check browser console for errors
- Ensure HTTPS (Vercel auto-provides)

### Map Not Showing:
- Check if hackathons have `coordinates` field
- Verify Firestore data

## 🎉 You're Done!

Your app is now live with:
- ✅ Firebase Authentication
- ✅ Real-time Firestore Database
- ✅ Cash free Payment Integration
- ✅ Interactive Map View
- ✅ Responsive Design
- ✅ Production Ready

## 🔗 Important Links:

- **Repository**: https://github.com/raunitx-02/hackmap-india
- **Firebase Console**: https://console.firebase.google.com/project/hackmap-india
- **Cashfree Dashboard**: https://merchant.cashfree.com/
- **Vercel Dashboard**: https://vercel.com/dashboard

---

**Need Help?** Check README.md or raise an issue on GitHub!
