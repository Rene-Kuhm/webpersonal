'use client'

import { motion } from 'framer-motion'

const codeSnippets = [
  {
    language: 'html',
    code: `<div class="hero">
  <h1>Hello World!</h1>
</div>`
  },
  {
    language: 'css',
    code: `.hero {
  display: flex;
  min-height: 100vh;
}`
  },
  {
    language: 'javascript',
    code: `function init() {
  console.log("Ready!");
}`
  }
]

export default function CodeBlock() {
  return (
    <motion.div
      initial={{ opacity: 0, x: -100 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8 }}
      className="bg-gray-900/80 backdrop-blur-sm rounded-lg p-4 font-mono text-sm text-white/90 w-full overflow-x-auto"
    >
      <div className="flex items-center gap-2 mb-3">
        <div className="w-3 h-3 rounded-full bg-red-500"></div>
        <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
        <div className="w-3 h-3 rounded-full bg-green-500"></div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {codeSnippets.map((snippet, index) => (
          <motion.div
            key={snippet.language}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.3 + 0.5, duration: 0.5 }}
            className="mb-4 last:mb-0"
          >
            <div className="text-blue-400 mb-1">{`// ${snippet.language}`}</div>
            <pre className="whitespace-pre-wrap break-words">
              {snippet.code}
            </pre>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}

