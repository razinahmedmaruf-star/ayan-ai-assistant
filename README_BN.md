# AYAN AI Assistant — Gemini backend সহ

এই প্রজেক্টে `public/index.html` (চ্যাট UI) এবং `server.js` (Gemini API-র নিরাপদ সার্ভার) আছে।

## নিরাপত্তা
- আসল API key `.env` ফাইলে বা hosting provider-এর Environment Variables-এ রাখবে।
- `.env` GitHub-এ আপলোড করবে না।
- API key HTML/JavaScript ফাইলে, স্ক্রিনশটে বা চ্যাটে শেয়ার করবে না।
- Gemini API-এর free quota/limits পরিবর্তন হতে পারে; ফ্রি ব্যবহার নিশ্চিত নয়।

## চালানোর জন্য
1. কম্পিউটারে Node.js 20 বা নতুন সংস্করণ ইনস্টল করো।
2. এই প্রজেক্ট ফোল্ডারে টার্মিনাল খোলো।
3. `npm install` চালাও।
4. `.env.example` কপি করে `.env` নাম দাও।
5. `.env` ফাইলে `GEMINI_API_KEY=`-এর পরে নিজের API key বসাও।
6. `npm start` চালাও।
7. ব্রাউজারে `http://localhost:3000` খোলো।

## ফোনে ব্যবহার
শুধু HTML ফাইল খুললে backend চলবে না। সার্ভারটি কম্পিউটার বা নিরাপদ hosting service-এ চালাতে হবে। তারপর hosting service-এর environment variables-এ `GEMINI_API_KEY` যোগ করে প্রকাশিত ওয়েব ঠিকানা খুলবে।

## API
- `GET /api/health` — সার্ভারের অবস্থা
- `POST /api/chat` — JSON body: `{"message":"তোমার প্রশ্ন"}`; response: `{"reply":"AI-এর উত্তর"}`

## মডেল
ডিফল্ট `gemini-2.5-flash`; তোমার অ্যাকাউন্টে মডেলটি না চললে `.env`-এর `GEMINI_MODEL`-এ Google AI Studio-তে উপলভ্য কোনো মডেলের নাম বসাও।
