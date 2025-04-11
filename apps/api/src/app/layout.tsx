export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <main className="max-w-4xl mx-auto p-8">{children}</main>
      </body>
    </html>
  )
}
