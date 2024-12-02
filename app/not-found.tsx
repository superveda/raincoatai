import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-blue-900 to-sky-900 flex items-center justify-center">
      <div className="text-center space-y-6">
        <h2 className="text-4xl font-bold text-white">Not Found</h2>
        <p className="text-sky-200">Could not find requested resource</p>
        <Link 
          href="/"
          className="inline-block bg-sky-500 text-white px-6 py-3 rounded-lg hover:bg-sky-600 transition-colors"
        >
          Return Home
        </Link>
      </div>
    </div>
  )
} 