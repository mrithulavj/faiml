/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BloomsLevel } from './index';

export interface MindMapNode {
  id: string;
  label: string;
  category: string;
  description: string;
  bloomLevel: BloomsLevel;
  bloomLabel: string;
  formula?: string;
  keyPoints: string[];
  examSignificance: string;
  realWorldExample: string;
  linkedLabId?: string;
  linkedLabTitle?: string;
  connections?: string[]; // IDs of related nodes
}

export interface MindMapBranch {
  id: string;
  title: string;
  colorName: string;
  badgeBg: string;
  borderColor: string;
  textColor: string;
  cardBg: string;
  ringColor: string;
  accentHex: string;
  gradient: string;
  iconName: string;
  description: string;
  nodes: MindMapNode[];
}

export interface UnitMindMap {
  unitNumber: number;
  unitTitle: string;
  shortTitle: string;
  courseOutcome: string;
  coDescription: string;
  centralHub: {
    title: string;
    subtitle: string;
    description: string;
    gradient: string;
    accentHex: string;
    badgeColor: string;
  };
  branches: MindMapBranch[];
  examChecklist: string[];
  quickSummary: string[];
  knowledgeFlow: {
    step: number;
    title: string;
    desc: string;
    conceptId: string;
  }[];
}
