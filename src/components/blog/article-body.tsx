import type { ReactNode } from 'react'

/**
 * Minimal renderer for the Markdown subset used by the articles in
 * src/content/blog.ts: level-two headings, unordered and ordered lists,
 * pipe tables, paragraphs, and inline bold and code.
 *
 * Written rather than imported because the content is authored in this
 * repository and never comes from an untrusted source, so a general-purpose
 * Markdown pipeline would be weight without benefit. Nothing here uses
 * dangerouslySetInnerHTML — every node is real React output.
 */

type Block =
  | { kind: 'heading'; text: string }
  | { kind: 'paragraph'; text: string }
  | { kind: 'ul'; items: string[] }
  | { kind: 'ol'; items: string[] }
  | { kind: 'table'; head: string[]; rows: string[][] }

function splitRow(line: string): string[] {
  return line
    .trim()
    .replace(/^\|/, '')
    .replace(/\|$/, '')
    .split('|')
    .map((cell) => cell.trim())
}

function parse(markdown: string): Block[] {
  const lines = markdown.split('\n')
  const blocks: Block[] = []
  let paragraph: string[] = []

  const flushParagraph = () => {
    if (paragraph.length > 0) {
      blocks.push({ kind: 'paragraph', text: paragraph.join(' ') })
      paragraph = []
    }
  }

  for (let index = 0; index < lines.length; index++) {
    const line = lines[index] ?? ''
    const trimmed = line.trim()

    if (trimmed === '') {
      flushParagraph()
      continue
    }

    if (trimmed.startsWith('## ')) {
      flushParagraph()
      blocks.push({ kind: 'heading', text: trimmed.slice(3).trim() })
      continue
    }

    if (trimmed.startsWith('- ')) {
      flushParagraph()
      const items: string[] = []
      while (index < lines.length && (lines[index] ?? '').trim().startsWith('- ')) {
        items.push((lines[index] ?? '').trim().slice(2).trim())
        index++
      }
      index--
      blocks.push({ kind: 'ul', items })
      continue
    }

    if (/^\d+\.\s/.test(trimmed)) {
      flushParagraph()
      const items: string[] = []
      while (index < lines.length && /^\d+\.\s/.test((lines[index] ?? '').trim())) {
        items.push((lines[index] ?? '').trim().replace(/^\d+\.\s/, ''))
        index++
      }
      index--
      blocks.push({ kind: 'ol', items })
      continue
    }

    if (trimmed.startsWith('|')) {
      flushParagraph()
      const tableLines: string[] = []
      while (index < lines.length && (lines[index] ?? '').trim().startsWith('|')) {
        tableLines.push((lines[index] ?? '').trim())
        index++
      }
      index--

      const [headerLine, , ...bodyLines] = tableLines
      if (headerLine) {
        blocks.push({
          kind: 'table',
          head: splitRow(headerLine),
          rows: bodyLines.map(splitRow),
        })
      }
      continue
    }

    paragraph.push(trimmed)
  }

  flushParagraph()
  return blocks
}

/** Renders **bold** and `code` spans. */
function inline(text: string, keyPrefix: string): ReactNode[] {
  const nodes: ReactNode[] = []
  const pattern = /(\*\*[^*]+\*\*|`[^`]+`)/g
  let lastIndex = 0
  let match: RegExpExecArray | null
  let counter = 0

  while ((match = pattern.exec(text)) !== null) {
    if (match.index > lastIndex) {
      nodes.push(text.slice(lastIndex, match.index))
    }

    const token = match[0]
    const key = `${keyPrefix}-${counter++}`

    if (token.startsWith('**')) {
      nodes.push(<strong key={key}>{token.slice(2, -2)}</strong>)
    } else {
      nodes.push(<code key={key}>{token.slice(1, -1)}</code>)
    }

    lastIndex = match.index + token.length
  }

  if (lastIndex < text.length) nodes.push(text.slice(lastIndex))
  return nodes
}

export function ArticleBody({ markdown }: { markdown: string }) {
  const blocks = parse(markdown)

  return (
    <div className="prose-technical">
      {blocks.map((block, index) => {
        const key = `block-${index}`

        switch (block.kind) {
          case 'heading':
            return <h2 key={key}>{inline(block.text, key)}</h2>

          case 'paragraph':
            return <p key={key}>{inline(block.text, key)}</p>

          case 'ul':
            return (
              <ul key={key}>
                {block.items.map((item, itemIndex) => (
                  <li key={`${key}-${itemIndex}`}>{inline(item, `${key}-${itemIndex}`)}</li>
                ))}
              </ul>
            )

          case 'ol':
            return (
              <ol key={key}>
                {block.items.map((item, itemIndex) => (
                  <li key={`${key}-${itemIndex}`}>{inline(item, `${key}-${itemIndex}`)}</li>
                ))}
              </ol>
            )

          case 'table':
            return (
              <div key={key} className="-mx-1 overflow-x-auto">
                <table className="w-full min-w-[34rem] border-collapse text-left text-[0.9375rem]">
                  <thead>
                    <tr>
                      {block.head.map((cell, cellIndex) => (
                        <th
                          key={`${key}-h-${cellIndex}`}
                          scope="col"
                          className="border-b border-[var(--hairline-strong)] px-3 py-2.5 font-mono text-[0.75rem] uppercase tracking-wider text-ink-400"
                        >
                          {cell}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {block.rows.map((row, rowIndex) => (
                      <tr key={`${key}-r-${rowIndex}`}>
                        {row.map((cell, cellIndex) => (
                          <td
                            key={`${key}-r-${rowIndex}-${cellIndex}`}
                            className={
                              cellIndex === 0
                                ? 'border-b border-[var(--hairline)] px-3 py-2.5 text-ink-200'
                                : 'border-b border-[var(--hairline)] px-3 py-2.5 font-mono text-[0.875rem] text-ink-300'
                            }
                          >
                            {cell}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )
        }
      })}
    </div>
  )
}
