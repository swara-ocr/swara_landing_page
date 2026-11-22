import type { Block } from '@/lib/docs';

export default function DocBlocks({ blocks }: { blocks: Block[] }) {
  return (
    <div className="prose">
      {blocks.map((b, i) => {
        switch (b.t) {
          case 'p':
            return <p key={i}>{b.text}</p>;
          case 'h3':
            return (
              <h2 key={i} className="prose-h">
                {b.text}
              </h2>
            );
          case 'ul':
            return (
              <ul key={i}>
                {b.items.map((item, j) => (
                  <li key={j}>{item}</li>
                ))}
              </ul>
            );
          case 'ol':
            return (
              <ol key={i}>
                {b.items.map((item, j) => (
                  <li key={j}>{item}</li>
                ))}
              </ol>
            );
          case 'note':
            return (
              <p key={i} className="note">
                {b.text}
              </p>
            );
          case 'table':
            return (
              <div key={i} className="table-wrap" tabIndex={0} role="region" aria-label="Table">
                <table>
                  <thead>
                    <tr>
                      {b.head.map((h) => (
                        <th key={h} scope="col">
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {b.rows.map((row, r) => (
                      <tr key={r}>
                        {row.map((cell, c) =>
                          c === 0 ? (
                            <th key={c} scope="row">
                              {cell}
                            </th>
                          ) : (
                            <td key={c}>{cell}</td>
                          ),
                        )}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            );
          default:
            return null;
        }
      })}
    </div>
  );
}
