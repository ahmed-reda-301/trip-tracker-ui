# إعداد خرائط جوجل - Google Maps Setup

## العربية

### الخطوات المطلوبة لتفعيل خرائط جوجل:

1. **إنشاء مشروع في Google Cloud Console:**
   - اذهب إلى [Google Cloud Console](https://console.cloud.google.com/)
   - أنشئ مشروع جديد أو اختر مشروع موجود

2. **تفعيل APIs المطلوبة:**
   - Maps JavaScript API
   - Places API (اختياري)
   - Geocoding API (اختياري)

3. **إنشاء مفتاح API:**
   - اذهب إلى "APIs & Services" > "Credentials"
   - انقر على "Create Credentials" > "API Key"
   - انسخ المفتاح

4. **إعداد المفتاح في التطبيق:**
   - أنشئ ملف `.env.local` في جذر المشروع
   - أضف السطر التالي:
   ```
   NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_api_key_here
   ```

5. **إعادة تشغيل التطبيق:**
   ```bash
   npm run dev
   ```

### ملاحظات مهمة:
- تأكد من تقييد استخدام المفتاح للنطاقات المصرح بها فقط
- راقب استخدام API لتجنب الرسوم الإضافية
- Google Maps يوفر رصيد مجاني شهري

---

## English

### Required Steps to Enable Google Maps:

1. **Create a Google Cloud Console Project:**
   - Go to [Google Cloud Console](https://console.cloud.google.com/)
   - Create a new project or select an existing one

2. **Enable Required APIs:**
   - Maps JavaScript API
   - Places API (optional)
   - Geocoding API (optional)

3. **Create API Key:**
   - Go to "APIs & Services" > "Credentials"
   - Click "Create Credentials" > "API Key"
   - Copy the key

4. **Configure the Key in Application:**
   - Create `.env.local` file in project root
   - Add the following line:
   ```
   NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_api_key_here
   ```

5. **Restart the Application:**
   ```bash
   npm run dev
   ```

### Important Notes:
- Make sure to restrict the API key to authorized domains only
- Monitor API usage to avoid additional charges
- Google Maps provides free monthly credits

## Current Fallback
When no API key is configured, the application shows a fallback map interface that displays:
- A visual representation of Saudi Arabia
- List of available locations
- Interactive location buttons
- Coordinate information

This ensures the application remains functional while you set up the Google Maps API key.
