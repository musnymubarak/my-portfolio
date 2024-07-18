/**
 * Renders a JSON-LD block. The payload is always built from local content in
 * src/content, never from user input.
 */
export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}
