"use client";

export default function TestStylesPage() {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-blue-600 mb-8 text-center">
          اختبار التنسيقات - Styles Test
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Card 1 */}
          <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              بطاقة اختبار 1
            </h2>
            <p className="text-gray-600 mb-4">
              هذا نص تجريبي لاختبار التنسيقات والألوان.
            </p>
            <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition-colors">
              زر تجريبي
            </button>
          </div>

          {/* Card 2 */}
          <div className="bg-gradient-to-br from-green-400 to-blue-500 rounded-lg shadow-lg p-6 text-white">
            <h2 className="text-xl font-semibold mb-4">
              Test Card 2
            </h2>
            <p className="mb-4">
              This is a test text for styling and colors.
            </p>
            <button className="bg-white text-blue-600 hover:bg-gray-100 px-4 py-2 rounded-md transition-colors">
              Test Button
            </button>
          </div>

          {/* Card 3 */}
          <div className="bg-yellow-100 border-l-4 border-yellow-500 rounded-lg p-6">
            <h2 className="text-xl font-semibold text-yellow-800 mb-4">
              تحذير تجريبي
            </h2>
            <p className="text-yellow-700 mb-4">
              هذا مثال على رسالة تحذير بتنسيق مختلف.
            </p>
            <div className="flex space-x-2">
              <span className="bg-yellow-500 text-white px-3 py-1 rounded-full text-sm">
                تسمية
              </span>
              <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm">
                مهم
              </span>
            </div>
          </div>
        </div>

        {/* Navigation Test */}
        <div className="mt-8 bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            اختبار التنقل - Navigation Test
          </h2>
          <nav className="flex space-x-4">
            <a href="#" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors">
              الرئيسية
            </a>
            <a href="#" className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300 transition-colors">
              حول
            </a>
            <a href="#" className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition-colors">
              اتصل بنا
            </a>
          </nav>
        </div>

        {/* Form Test */}
        <div className="mt-8 bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            اختبار النموذج - Form Test
          </h2>
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                الاسم
              </label>
              <input 
                type="text" 
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="أدخل اسمك"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                البريد الإلكتروني
              </label>
              <input 
                type="email" 
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="أدخل بريدك الإلكتروني"
              />
            </div>
            <button 
              type="submit"
              className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors"
            >
              إرسال
            </button>
          </form>
        </div>

        {/* Back to Home */}
        <div className="mt-8 text-center">
          <a 
            href="/"
            className="inline-block bg-gray-800 text-white px-6 py-3 rounded-md hover:bg-gray-900 transition-colors"
          >
            العودة للصفحة الرئيسية
          </a>
        </div>
      </div>
    </div>
  );
}
