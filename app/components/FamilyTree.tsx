'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'

interface TreeNode {
  id: string
  content: string
  children?: TreeNode[]
}

const treeData: TreeNode = {
  id: 'root',
  content: 'Mi Inicio',
  children: [
    {
      id: '1',
      content: 'Primeros Pasos',
      children: [
        { id: '1-1', content: 'Aprendizaje HTML/CSS' },
        { id: '1-2', content: 'JavaScript Básico' },
      ],
    },
    {
      id: '2',
      content: 'Desarrollo Frontend',
      children: [
        { id: '2-1', content: 'React' },
        { id: '2-2', content: 'Next.js' },
      ],
    },
    {
      id: '3',
      content: 'Proyectos y Clientes',
      children: [
        { id: '3-1', content: 'Primeros Proyectos' },
        { id: '3-2', content: 'Clientes Satisfechos' },
      ],
    },
  ],
}

const TreeNode: React.FC<{ node: TreeNode; isRoot?: boolean }> = ({ node, isRoot = false }) => {
  const [isOpen, setIsOpen] = useState(isRoot)

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mb-4"
    >
      <div
        className={`p-3 rounded-lg cursor-pointer ${
          isRoot ? 'bg-blue-500 text-white' : 'bg-gray-100 dark:bg-gray-700'
        }`}
        onClick={() => setIsOpen(!isOpen)}
      >
        {node.content}
      </div>
      {isOpen && node.children && (
        <div className="pl-4 mt-2 ml-8 border-l-2 border-gray-300 dark:border-gray-600">
          {node.children.map((child) => (
            <TreeNode key={child.id} node={child} />
          ))}
        </div>
      )}
    </motion.div>
  )
}

export const FamilyTree: React.FC = () => {
  return (
    <div className="max-w-3xl mx-auto mt-8">
      <TreeNode node={treeData} isRoot />
    </div>
  )
}
