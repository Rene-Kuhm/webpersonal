'use client'

import { motion } from 'framer-motion'

interface AnimatedSkillBarProps {
  skill: string
  percentage: number
}

export const AnimatedSkillBar: React.FC<AnimatedSkillBarProps> = ({ skill, percentage }) => {
  return (
    <div className="mb-6">
      <div className="flex justify-between mb-1">
        <span className="text-base font-medium text-gray-700 dark:text-gray-300">{skill}</span>
        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{percentage}%</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
        <motion.div 
          className="bg-blue-600 h-2.5 rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 1, ease: "easeOut" }}
        />
      </div>
    </div>
  )
}

