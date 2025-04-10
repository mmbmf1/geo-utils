export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <div className="min-h-screen flex">
          {/* Sidebar Navigation */}
          <nav className="w-64 border-r p-4">
            <h1 className="text-xl font-bold mb-4">Geo Utils API</h1>
            <ul className="space-y-2">
              <li>
                <a href="/" className="hover:text-blue-500">
                  Overview
                </a>
              </li>
              <li>
                <a href="/docs/distance" className="hover:text-blue-500">
                  Distance Calculation
                </a>
              </li>
            </ul>
          </nav>

          {/* Main Content */}
          <main className="flex-1 p-8">{children}</main>
        </div>
      </body>
    </html>
  )
}
