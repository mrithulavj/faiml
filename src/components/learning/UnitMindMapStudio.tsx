/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo, useRef, useEffect } from 'react';
import {
  Brain,
  Compass,
  Cpu,
  Layers,
  Sparkles,
  GitBranch,
  Shield,
  Home,
  Award,
  ChevronRight,
  ChevronDown,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Search,
  BookOpen,
  Filter,
  CheckCircle2,
  ExternalLink,
  Sliders,
  Palette,
  Maximize2,
  Minimize2,
  ListTree,
  Network,
  Milestone,
  CheckSquare,
  ArrowRight,
  Zap,
  Grid,
  Move,
  GitFork,
  Eye,
  Plus,
  Minus
} from 'lucide-react';

import { unitMindMaps } from '../../data/mindMapData';
import { UnitMindMap, MindMapBranch, MindMapNode } from '../../types/mindmap';

interface UnitMindMapStudioProps {
  initialUnitNumber?: number;
  onLaunchLab?: (labId: string, unitNumber: number) => void;
}

// Icon mapper helper
const getBranchIcon = (iconName: string) => {
  switch (iconName) {
    case 'Cpu': return Cpu;
    case 'Compass': return Compass;
    case 'Layers': return Layers;
    case 'GitBranch': return GitBranch;
    case 'Sparkles': return Sparkles;
    case 'Brain': return Brain;
    case 'Shield': return Shield;
    case 'Home': return Home;
    case 'Award': return Award;
    case 'Palette': return Palette;
    case 'Sliders': return Sliders;
    case 'Grid': return Grid;
    default: return Sparkles;
  }
};

export const UnitMindMapStudio: React.FC<UnitMindMapStudioProps> = ({
  initialUnitNumber = 1,
  onLaunchLab
}) => {
  const [selectedUnitNum, setSelectedUnitNum] = useState<number>(initialUnitNumber);
  const [viewMode, setViewMode] = useState<'canvas' | 'tree' | 'flow' | 'checklist'>('canvas');
  const [treeLayout, setTreeLayout] = useState<'bilateral' | 'horizontal'>('bilateral');
  const [selectedNode, setSelectedNode] = useState<MindMapNode | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBloomFilter, setSelectedBloomFilter] = useState<string>('ALL');
  const [labsOnlyFilter, setLabsOnlyFilter] = useState(false);
  const [zoomLevel, setZoomLevel] = useState<number>(0.95);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [expandedBranches, setExpandedBranches] = useState<Record<string, boolean>>({});

  // Canvas pan & drag state
  const [panOffset, setPanOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const canvasRef = useRef<HTMLDivElement>(null);

  // Active unit mind map
  const activeMindMap = useMemo(() => {
    return unitMindMaps.find(m => m.unitNumber === selectedUnitNum) || unitMindMaps[0];
  }, [selectedUnitNum]);

  // Set initial selected node and expanded branches when unit changes
  useEffect(() => {
    if (activeMindMap.branches.length > 0 && activeMindMap.branches[0].nodes.length > 0) {
      setSelectedNode(activeMindMap.branches[0].nodes[0]);
    }
    const initialExpanded: Record<string, boolean> = {};
    activeMindMap.branches.forEach(b => {
      initialExpanded[b.id] = true;
    });
    setExpandedBranches(initialExpanded);
    setPanOffset({ x: 0, y: 0 });
  }, [activeMindMap]);

  // Filter nodes according to search and filters
  const filteredBranches = useMemo(() => {
    return activeMindMap.branches.map(branch => {
      const filteredNodes = branch.nodes.filter(node => {
        const matchesQuery =
          searchQuery.trim() === '' ||
          node.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
          node.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          node.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
          node.keyPoints.some(kp => kp.toLowerCase().includes(searchQuery.toLowerCase()));

        const matchesBloom =
          selectedBloomFilter === 'ALL' || node.bloomLevel === selectedBloomFilter;

        const matchesLabsOnly = !labsOnlyFilter || !!node.linkedLabId;

        return matchesQuery && matchesBloom && matchesLabsOnly;
      });

      return {
        ...branch,
        nodes: filteredNodes
      };
    });
  }, [activeMindMap, searchQuery, selectedBloomFilter, labsOnlyFilter]);

  // Stats calculation
  const totalConcepts = useMemo(() => {
    return activeMindMap.branches.reduce((acc, b) => acc + b.nodes.length, 0);
  }, [activeMindMap]);

  const totalInteractiveLabs = useMemo(() => {
    return activeMindMap.branches.reduce(
      (acc, b) => acc + b.nodes.filter(n => !!n.linkedLabId).length,
      0
    );
  }, [activeMindMap]);

  // Toggle branch collapse/expand
  const toggleBranch = (branchId: string) => {
    setExpandedBranches(prev => ({
      ...prev,
      [branchId]: !prev[branchId]
    }));
  };

  // Expand or collapse all branches
  const setAllBranchesExpanded = (expanded: boolean) => {
    const updated: Record<string, boolean> = {};
    activeMindMap.branches.forEach(b => {
      updated[b.id] = expanded;
    });
    setExpandedBranches(updated);
  };

  // Find node by ID across branches for connection links
  const findNodeById = (nodeId: string): MindMapNode | undefined => {
    for (const b of activeMindMap.branches) {
      const found = b.nodes.find(n => n.id === nodeId);
      if (found) return found;
    }
    return undefined;
  };

  // Mouse pan handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    // Only drag on canvas background
    if ((e.target as HTMLElement).closest('.mind-map-node-interactive')) return;
    setIsDragging(true);
    setDragStart({ x: e.clientX - panOffset.x, y: e.clientY - panOffset.y });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    setPanOffset({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // =========================================================================
  // MIND MAP TREE GEOMETRY COMPUTATION (Tree with Organic Curved Branches)
  // =========================================================================
  const SVG_WIDTH = 1800;
  const SVG_HEIGHT = 1000;

  interface TreeBranchLayout {
    branch: MindMapBranch;
    side: 'left' | 'right';
    startX: number;
    startY: number;
    branchX: number;
    branchY: number;
    pathD: string;
    isExpanded: boolean;
    nodes: {
      node: MindMapNode;
      x: number;
      y: number;
      pathD: string;
      isSelected: boolean;
    }[];
  }

  const treeLayoutData = useMemo(() => {
    const rootX = treeLayout === 'bilateral' ? 900 : 220;
    const rootY = 500;
    const rootWidth = 260;
    const rootHeight = 90;

    const branchesToRender = filteredBranches;

    if (treeLayout === 'bilateral') {
      // Split branches into right and left side
      const rightBranches = branchesToRender.filter((_, idx) => idx % 2 === 0);
      const leftBranches = branchesToRender.filter((_, idx) => idx % 2 === 1);

      const rightTotal = Math.max(rightBranches.length, 1);
      const leftTotal = Math.max(leftBranches.length, 1);

      const rightSpacing = Math.min(240, 760 / rightTotal);
      const leftSpacing = Math.min(240, 760 / leftTotal);

      const rightStartY = rootY - ((rightTotal - 1) * rightSpacing) / 2;
      const leftStartY = rootY - ((leftTotal - 1) * leftSpacing) / 2;

      const layouts: TreeBranchLayout[] = [];

      // Process Right Branches
      rightBranches.forEach((b, idx) => {
        const startX = rootX + rootWidth / 2;
        const startY = rootY;
        const branchX = 1180;
        const branchY = rightStartY + idx * rightSpacing;
        const isExp = expandedBranches[b.id] !== false;

        // Smooth cubic bezier from root right edge to branch left edge
        const c1X = startX + 120;
        const c1Y = startY;
        const c2X = branchX - 120;
        const c2Y = branchY;
        const pathD = `M ${startX} ${startY} C ${c1X} ${c1Y}, ${c2X} ${c2Y}, ${branchX} ${branchY}`;

        // Compute child concept nodes
        const nodeLayouts: TreeBranchLayout['nodes'] = [];
        if (isExp && b.nodes.length > 0) {
          const nodeTotal = b.nodes.length;
          const nodeSpacing = Math.min(68, 200 / nodeTotal);
          const nodeStartY = branchY - ((nodeTotal - 1) * nodeSpacing) / 2;
          const nodeX = 1490;

          b.nodes.forEach((n, nIdx) => {
            const nodeY = nodeStartY + nIdx * nodeSpacing;
            const nc1X = branchX + 90;
            const nc1Y = branchY;
            const nc2X = nodeX - 80;
            const nc2Y = nodeY;
            const nodePathD = `M ${branchX + 110} ${branchY} C ${nc1X} ${nc1Y}, ${nc2X} ${nc2Y}, ${nodeX} ${nodeY}`;

            nodeLayouts.push({
              node: n,
              x: nodeX,
              y: nodeY,
              pathD: nodePathD,
              isSelected: selectedNode?.id === n.id
            });
          });
        }

        layouts.push({
          branch: b,
          side: 'right',
          startX,
          startY,
          branchX,
          branchY,
          pathD,
          isExpanded: isExp,
          nodes: nodeLayouts
        });
      });

      // Process Left Branches
      leftBranches.forEach((b, idx) => {
        const startX = rootX - rootWidth / 2;
        const startY = rootY;
        const branchX = 620;
        const branchY = leftStartY + idx * leftSpacing;
        const isExp = expandedBranches[b.id] !== false;

        // Smooth cubic bezier from root left edge to branch right edge
        const c1X = startX - 120;
        const c1Y = startY;
        const c2X = branchX + 120;
        const c2Y = branchY;
        const pathD = `M ${startX} ${startY} C ${c1X} ${c1Y}, ${c2X} ${c2Y}, ${branchX} ${branchY}`;

        // Compute child concept nodes
        const nodeLayouts: TreeBranchLayout['nodes'] = [];
        if (isExp && b.nodes.length > 0) {
          const nodeTotal = b.nodes.length;
          const nodeSpacing = Math.min(68, 200 / nodeTotal);
          const nodeStartY = branchY - ((nodeTotal - 1) * nodeSpacing) / 2;
          const nodeX = 310;

          b.nodes.forEach((n, nIdx) => {
            const nodeY = nodeStartY + nIdx * nodeSpacing;
            const nc1X = branchX - 90;
            const nc1Y = branchY;
            const nc2X = nodeX + 80;
            const nc2Y = nodeY;
            const nodePathD = `M ${branchX - 110} ${branchY} C ${nc1X} ${nc1Y}, ${nc2X} ${nc2Y}, ${nodeX} ${nodeY}`;

            nodeLayouts.push({
              node: n,
              x: nodeX,
              y: nodeY,
              pathD: nodePathD,
              isSelected: selectedNode?.id === n.id
            });
          });
        }

        layouts.push({
          branch: b,
          side: 'left',
          startX,
          startY,
          branchX,
          branchY,
          pathD,
          isExpanded: isExp,
          nodes: nodeLayouts
        });
      });

      return { rootX, rootY, rootWidth, rootHeight, layouts };
    } else {
      // Horizontal Left-to-Right layout
      const total = Math.max(branchesToRender.length, 1);
      const spacing = Math.min(180, 800 / total);
      const startY = rootY - ((total - 1) * spacing) / 2;

      const layouts: TreeBranchLayout[] = [];

      branchesToRender.forEach((b, idx) => {
        const startX = rootX + rootWidth / 2;
        const startYPos = rootY;
        const branchX = 640;
        const branchY = startY + idx * spacing;
        const isExp = expandedBranches[b.id] !== false;

        const c1X = startX + 160;
        const c1Y = startYPos;
        const c2X = branchX - 160;
        const c2Y = branchY;
        const pathD = `M ${startX} ${startYPos} C ${c1X} ${c1Y}, ${c2X} ${c2Y}, ${branchX} ${branchY}`;

        const nodeLayouts: TreeBranchLayout['nodes'] = [];
        if (isExp && b.nodes.length > 0) {
          const nodeTotal = b.nodes.length;
          const nodeSpacing = Math.min(65, 180 / nodeTotal);
          const nodeStartY = branchY - ((nodeTotal - 1) * nodeSpacing) / 2;
          const nodeX = 1180;

          b.nodes.forEach((n, nIdx) => {
            const nodeY = nodeStartY + nIdx * nodeSpacing;
            const nc1X = branchX + 140;
            const nc1Y = branchY;
            const nc2X = nodeX - 140;
            const nc2Y = nodeY;
            const nodePathD = `M ${branchX + 110} ${branchY} C ${nc1X} ${nc1Y}, ${nc2X} ${nc2Y}, ${nodeX} ${nodeY}`;

            nodeLayouts.push({
              node: n,
              x: nodeX,
              y: nodeY,
              pathD: nodePathD,
              isSelected: selectedNode?.id === n.id
            });
          });
        }

        layouts.push({
          branch: b,
          side: 'right',
          startX,
          startY: startYPos,
          branchX,
          branchY,
          pathD,
          isExpanded: isExp,
          nodes: nodeLayouts
        });
      });

      return { rootX, rootY, rootWidth, rootHeight, layouts };
    }
  }, [filteredBranches, treeLayout, expandedBranches, selectedNode]);

  return (
    <div className={`space-y-6 ${isFullscreen ? 'fixed inset-0 z-50 bg-slate-950 p-4 overflow-y-auto' : ''}`}>
      {/* Top Banner / Unit Switcher Bar */}
      <div className="bg-white border border-slate-200 rounded-3xl p-4 sm:p-6 shadow-xs">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-5 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-indigo-600 uppercase tracking-wider mb-1.5">
              <Network className="w-4 h-4 text-indigo-600" />
              <span>Interactive Syllabus Knowledge Tree · Regulations R2023_V1.2</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2.5">
              <span>Mind Map Tree with Organic Branches</span>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-extrabold bg-linear-to-r from-indigo-500 to-purple-600 text-white shadow-xs">
                5 Units Complete
              </span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-3xl leading-relaxed">
              Visual knowledge tree radiating from the central course outcome into color-coded branches, sub-branches, formulas, and connected concept nodes. Pan, zoom, collapse, and launch paired interactive simulation laboratories directly from the tree branches.
            </p>
          </div>

          {/* Quick Metrics Bar */}
          <div className="flex items-center gap-2 shrink-0 bg-slate-50 border border-slate-200/80 p-2 rounded-2xl">
            <div className="px-3.5 py-2 bg-white rounded-xl border border-slate-200/60 shadow-2xs text-center">
              <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">Total Nodes</span>
              <span className="text-base font-extrabold text-indigo-600 font-mono">{totalConcepts} Nodes</span>
            </div>
            <div className="px-3.5 py-2 bg-white rounded-xl border border-slate-200/60 shadow-2xs text-center">
              <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">Branches</span>
              <span className="text-base font-extrabold text-purple-600 font-mono">{activeMindMap.branches.length} Limbs</span>
            </div>
            <div className="px-3.5 py-2 bg-white rounded-xl border border-slate-200/60 shadow-2xs text-center">
              <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">Active Labs</span>
              <span className="text-base font-extrabold text-emerald-600 font-mono">{totalInteractiveLabs} Labs</span>
            </div>
          </div>
        </div>

        {/* 5-Unit Segmented Switcher Pills */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5 pt-4">
          {unitMindMaps.map(unit => {
            const isSelected = unit.unitNumber === selectedUnitNum;
            const branchCount = unit.branches.length;
            const nodeCount = unit.branches.reduce((acc, b) => acc + b.nodes.length, 0);

            return (
              <button
                key={unit.unitNumber}
                onClick={() => {
                  setSelectedUnitNum(unit.unitNumber);
                  setPanOffset({ x: 0, y: 0 });
                }}
                className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer relative overflow-hidden group ${
                  isSelected
                    ? 'bg-slate-900 text-white border-slate-900 shadow-md ring-2 ring-indigo-500/20'
                    : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50/70 text-slate-800'
                }`}
              >
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className={`font-mono font-bold ${isSelected ? 'text-indigo-400' : 'text-slate-500'}`}>
                    Unit {unit.unitNumber}
                  </span>
                  <span
                    className={`font-mono text-[10px] font-bold px-1.5 py-0.5 rounded ${
                      isSelected ? 'bg-slate-800 text-slate-200' : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    {unit.courseOutcome}
                  </span>
                </div>
                <h3 className={`text-xs font-bold line-clamp-1 ${isSelected ? 'text-white' : 'text-slate-900'}`}>
                  {unit.shortTitle}
                </h3>
                <div className="mt-2 flex items-center justify-between text-[11px]">
                  <span className={isSelected ? 'text-slate-400' : 'text-slate-500'}>
                    {branchCount} Branches · {nodeCount} Nodes
                  </span>
                  <ChevronRight
                    className={`w-3.5 h-3.5 transition-transform ${
                      isSelected ? 'rotate-90 text-indigo-400' : 'text-slate-400 group-hover:translate-x-0.5'
                    }`}
                  />
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Control Bar: View Mode Switcher + Tree Layout + Search + Zoom */}
      <div className="bg-white border border-slate-200 rounded-2xl p-4 flex flex-col md:flex-row md:items-center justify-between gap-3 shadow-xs">
        {/* View Mode Tabs */}
        <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl">
          <button
            onClick={() => setViewMode('canvas')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              viewMode === 'canvas'
                ? 'bg-white text-indigo-600 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <GitFork className="w-3.5 h-3.5" />
            <span>Mind Map Tree</span>
          </button>

          <button
            onClick={() => setViewMode('tree')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              viewMode === 'tree'
                ? 'bg-white text-indigo-600 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <ListTree className="w-3.5 h-3.5" />
            <span>Categorical Tree</span>
          </button>

          <button
            onClick={() => setViewMode('flow')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              viewMode === 'flow'
                ? 'bg-white text-indigo-600 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Milestone className="w-3.5 h-3.5" />
            <span>Knowledge Flow</span>
          </button>

          <button
            onClick={() => setViewMode('checklist')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              viewMode === 'checklist'
                ? 'bg-white text-indigo-600 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <CheckSquare className="w-3.5 h-3.5" />
            <span>Exam Checklist</span>
          </button>
        </div>

        {/* Tree Layout Switcher & Branch Toggles (visible in canvas mode) */}
        {viewMode === 'canvas' && (
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl text-xs">
              <button
                onClick={() => setTreeLayout('bilateral')}
                className={`px-2.5 py-1 rounded-lg font-bold transition-all cursor-pointer ${
                  treeLayout === 'bilateral'
                    ? 'bg-white text-indigo-700 shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
                title="Bilateral Radial Tree with Left and Right Branches"
              >
                Bilateral Tree
              </button>
              <button
                onClick={() => setTreeLayout('horizontal')}
                className={`px-2.5 py-1 rounded-lg font-bold transition-all cursor-pointer ${
                  treeLayout === 'horizontal'
                    ? 'bg-white text-indigo-700 shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
                title="Left-to-Right Flowing Tree"
              >
                Left-to-Right
              </button>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={() => setAllBranchesExpanded(true)}
                className="px-2 py-1 text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg cursor-pointer transition-colors"
                title="Expand all branches"
              >
                Expand All
              </button>
              <button
                onClick={() => setAllBranchesExpanded(false)}
                className="px-2 py-1 text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg cursor-pointer transition-colors"
                title="Collapse all branches"
              >
                Collapse
              </button>
            </div>
          </div>
        )}

        {/* Search & Filter Controls */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Search Input */}
          <div className="relative">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Filter concepts..."
              className="pl-8 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 w-32 sm:w-44 text-slate-800"
            />
          </div>

          {/* Bloom Filter Dropdown */}
          <select
            value={selectedBloomFilter}
            onChange={e => setSelectedBloomFilter(e.target.value)}
            className="px-2.5 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-xl text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 cursor-pointer"
          >
            <option value="ALL">All Levels</option>
            <option value="K1">K1: Remember</option>
            <option value="K2">K2: Understand</option>
            <option value="K3">K3: Apply</option>
            <option value="K4">K4: Analyze</option>
          </select>

          {/* Labs Only Toggle */}
          <button
            onClick={() => setLabsOnlyFilter(!labsOnlyFilter)}
            className={`px-2.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 border ${
              labsOnlyFilter
                ? 'bg-emerald-50 text-emerald-700 border-emerald-300'
                : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
            }`}
          >
            <Zap className={`w-3.5 h-3.5 ${labsOnlyFilter ? 'text-emerald-600' : 'text-slate-400'}`} />
            <span className="hidden sm:inline">Labs Only</span>
          </button>

          {/* Canvas Zoom & Fullscreen Controls */}
          {viewMode === 'canvas' && (
            <div className="flex items-center gap-1 border-l border-slate-200 pl-2">
              <button
                onClick={() => setZoomLevel(prev => Math.min(prev + 0.15, 1.8))}
                title="Zoom In"
                className="p-1.5 rounded-lg text-slate-600 hover:bg-slate-100 cursor-pointer"
              >
                <ZoomIn className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setZoomLevel(prev => Math.max(prev - 0.15, 0.5))}
                title="Zoom Out"
                className="p-1.5 rounded-lg text-slate-600 hover:bg-slate-100 cursor-pointer"
              >
                <ZoomOut className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => {
                  setZoomLevel(0.95);
                  setPanOffset({ x: 0, y: 0 });
                }}
                title="Reset View & Center"
                className="p-1.5 rounded-lg text-slate-600 hover:bg-slate-100 cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setIsFullscreen(!isFullscreen)}
                title={isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
                className="p-1.5 rounded-lg text-slate-600 hover:bg-slate-100 cursor-pointer"
              >
                {isFullscreen ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* =====================================================================
          VIEW 1: TRUE MIND MAP TREE WITH CURVED SVG BRANCHES
         ===================================================================== */}
      {viewMode === 'canvas' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Main Mind Map Tree Canvas */}
          <div
            ref={canvasRef}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            className={`lg:col-span-8 bg-slate-950 border border-slate-800 rounded-3xl relative overflow-hidden shadow-2xl min-h-[700px] flex flex-col justify-between select-none ${
              isDragging ? 'cursor-grabbing' : 'cursor-grab'
            }`}
          >
            {/* Ambient Background Grid & Radial Lighting */}
            <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:28px_28px] opacity-45 pointer-events-none" />
            <div className="absolute top-1/4 left-1/3 w-[500px] h-[500px] bg-indigo-600/15 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-1/4 right-1/4 w-[450px] h-[450px] bg-purple-600/15 rounded-full blur-3xl pointer-events-none" />

            {/* Top Canvas Status Bar */}
            <div className="relative z-20 p-4 flex items-center justify-between text-xs text-slate-400 bg-slate-900/60 backdrop-blur-md border-b border-slate-800/80">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="font-mono font-bold text-slate-200">
                    Tree Canvas · {treeLayout === 'bilateral' ? 'Bilateral Radial Mode' : 'Left-to-Right Mode'}
                  </span>
                </div>
                <span className="text-slate-600 hidden sm:inline">|</span>
                <span className="text-[11px] text-slate-400 hidden sm:inline">
                  Drag to pan · Zoom: {Math.round(zoomLevel * 100)}% · Click branch (+ / -) to fold
                </span>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-indigo-400 border border-indigo-500/20">
                  {filteredBranches.length} Major Limbs
                </span>
              </div>
            </div>

            {/* Interactive Pannable & Zoomable SVG Canvas Container */}
            <div className="relative flex-1 w-full h-full min-h-[620px] overflow-hidden flex items-center justify-center">
              <div
                className="absolute transition-transform duration-75 origin-center"
                style={{
                  transform: `translate(${panOffset.x}px, ${panOffset.y}px) scale(${zoomLevel})`,
                  width: `${SVG_WIDTH}px`,
                  height: `${SVG_HEIGHT}px`
                }}
              >
                {/* SVG Layer: Renders all organic curved branch lines */}
                <svg
                  className="absolute inset-0 w-full h-full pointer-events-none"
                  viewBox={`0 0 ${SVG_WIDTH} ${SVG_HEIGHT}`}
                >
                  <defs>
                    {/* Shadow & Glow Filter */}
                    <filter id="branch-glow" x="-20%" y="-20%" width="140%" height="140%">
                      <feGaussianBlur stdDeviation="3" result="blur" />
                      <feComposite in="SourceGraphic" in2="blur" operator="over" />
                    </filter>
                    <linearGradient id="trunk-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#6366f1" />
                      <stop offset="50%" stopColor="#a855f7" />
                      <stop offset="100%" stopColor="#38bdf8" />
                    </linearGradient>
                  </defs>

                  {/* Render Primary and Secondary Branch Lines */}
                  {treeLayoutData.layouts.map(layout => {
                    const isBranchActive =
                      selectedNode && layout.branch.nodes.some(n => n.id === selectedNode.id);

                    return (
                      <g key={`svg-branch-${layout.branch.id}`}>
                        {/* 1. Primary Trunk-to-Branch Limb */}
                        <path
                          d={layout.pathD}
                          fill="none"
                          stroke={layout.branch.accentHex}
                          strokeWidth={isBranchActive ? 4.5 : 3}
                          strokeLinecap="round"
                          opacity={isBranchActive ? 1 : 0.8}
                          filter={isBranchActive ? 'url(#branch-glow)' : undefined}
                          className="transition-all duration-300"
                        />

                        {/* Joint circle at branch start */}
                        <circle
                          cx={layout.startX}
                          cy={layout.startY}
                          r={isBranchActive ? 6 : 4.5}
                          fill={layout.branch.accentHex}
                        />

                        {/* Joint circle at branch node anchor */}
                        <circle
                          cx={layout.branchX}
                          cy={layout.branchY}
                          r={isBranchActive ? 5 : 4}
                          fill={layout.branch.accentHex}
                        />

                        {/* 2. Secondary Branch-to-Concept Twigs */}
                        {layout.isExpanded &&
                          layout.nodes.map(nLayout => {
                            const isLeafSelected = nLayout.isSelected;

                            return (
                              <g key={`svg-twig-${nLayout.node.id}`}>
                                <path
                                  d={nLayout.pathD}
                                  fill="none"
                                  stroke={layout.branch.accentHex}
                                  strokeWidth={isLeafSelected ? 3.5 : 2}
                                  strokeDasharray={isLeafSelected ? undefined : '4 2'}
                                  strokeLinecap="round"
                                  opacity={isLeafSelected ? 1 : 0.65}
                                  className="transition-all duration-300"
                                />
                                <circle
                                  cx={nLayout.x}
                                  cy={nLayout.y}
                                  r={isLeafSelected ? 5 : 3.5}
                                  fill={isLeafSelected ? '#10b981' : layout.branch.accentHex}
                                />
                              </g>
                            );
                          })}
                      </g>
                    );
                  })}
                </svg>

                {/* HTML Nodes Overlay: Center Root Hub + Primary Branches + Concept Leaves */}

                {/* 1. CENTRAL ROOT NODE (The Tree Trunk) */}
                <div
                  className="absolute -translate-x-1/2 -translate-y-1/2 z-30"
                  style={{
                    left: `${treeLayoutData.rootX}px`,
                    top: `${treeLayoutData.rootY}px`,
                    width: `${treeLayoutData.rootWidth}px`
                  }}
                >
                  <div className="p-1 rounded-3xl bg-linear-to-r from-indigo-500 via-purple-500 to-pink-500 shadow-2xl shadow-indigo-500/30">
                    <div className="p-4 rounded-[22px] bg-slate-900 border border-slate-700/80 text-center relative overflow-hidden">
                      <div className="flex items-center justify-center gap-1.5 mb-1">
                        <span className="w-2 h-2 rounded-full bg-indigo-400 animate-ping" />
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                          {activeMindMap.courseOutcome} HUB
                        </span>
                      </div>
                      <h3 className="text-sm font-black text-white leading-tight">
                        {activeMindMap.centralHub.title}
                      </h3>
                      <p className="text-[11px] text-slate-400 mt-1 line-clamp-1">
                        {activeMindMap.unitTitle}
                      </p>
                    </div>
                  </div>
                </div>

                {/* 2. PRIMARY BRANCH NODES (Major Limbs) */}
                {treeLayoutData.layouts.map(layout => {
                  const Icon = getBranchIcon(layout.branch.iconName);
                  const isBranchActive =
                    selectedNode && layout.branch.nodes.some(n => n.id === selectedNode.id);

                  return (
                    <div
                      key={`node-branch-${layout.branch.id}`}
                      className="absolute -translate-x-1/2 -translate-y-1/2 z-20 mind-map-node-interactive"
                      style={{
                        left: `${layout.branchX}px`,
                        top: `${layout.branchY}px`,
                        width: '220px'
                      }}
                    >
                      <div
                        className={`p-3 rounded-2xl border transition-all shadow-xl backdrop-blur-md ${
                          isBranchActive
                            ? 'bg-slate-900/95 border-indigo-400 ring-2 ring-indigo-500/30 text-white'
                            : 'bg-slate-900/90 border-slate-700 text-slate-200 hover:border-slate-500'
                        }`}
                        style={{ borderLeftColor: layout.branch.accentHex, borderLeftWidth: '5px' }}
                      >
                        <div className="flex items-center justify-between gap-2">
                          <div className="flex items-center gap-2 min-w-0">
                            <div
                              className="w-7 h-7 rounded-xl flex items-center justify-center text-white shrink-0 shadow-xs"
                              style={{ backgroundColor: layout.branch.accentHex }}
                            >
                              <Icon className="w-3.5 h-3.5" />
                            </div>
                            <div className="min-w-0">
                              <h4 className="text-xs font-bold truncate leading-tight">
                                {layout.branch.title}
                              </h4>
                              <span className="text-[10px] text-slate-400 font-mono">
                                {layout.branch.nodes.length} concepts
                              </span>
                            </div>
                          </div>

                          {/* Branch Expand/Collapse Toggle Button */}
                          <button
                            onClick={e => {
                              e.stopPropagation();
                              toggleBranch(layout.branch.id);
                            }}
                            className="p-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer shrink-0"
                            title={layout.isExpanded ? 'Collapse branch concepts' : 'Expand branch concepts'}
                          >
                            {layout.isExpanded ? (
                              <Minus className="w-3.5 h-3.5" />
                            ) : (
                              <Plus className="w-3.5 h-3.5" />
                            )}
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}

                {/* 3. CONCEPT NODES (Leaf Nodes on the Branch Twigs) */}
                {treeLayoutData.layouts.map(layout => {
                  if (!layout.isExpanded) return null;

                  return layout.nodes.map(nLayout => {
                    const isSelected = nLayout.isSelected;
                    const hasLab = !!nLayout.node.linkedLabId;

                    return (
                      <div
                        key={`leaf-node-${nLayout.node.id}`}
                        onClick={() => setSelectedNode(nLayout.node)}
                        className={`absolute -translate-x-1/2 -translate-y-1/2 z-20 mind-map-node-interactive cursor-pointer group ${
                          layout.side === 'left' ? 'text-right' : 'text-left'
                        }`}
                        style={{
                          left: `${nLayout.x}px`,
                          top: `${nLayout.y}px`,
                          width: '260px'
                        }}
                      >
                        <div
                          className={`p-2.5 rounded-xl border transition-all shadow-md backdrop-blur-md flex items-center justify-between gap-2 ${
                            isSelected
                              ? 'bg-indigo-600/30 border-emerald-400 ring-2 ring-emerald-500/40 text-white shadow-emerald-900/30 shadow-lg'
                              : 'bg-slate-900/90 border-slate-700/80 hover:bg-slate-800/90 hover:border-slate-500 text-slate-200'
                          }`}
                        >
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-1.5 mb-0.5">
                              <span
                                className="w-2 h-2 rounded-full shrink-0"
                                style={{
                                  backgroundColor: isSelected ? '#10b981' : layout.branch.accentHex
                                }}
                              />
                              <h5 className="text-xs font-bold truncate group-hover:text-indigo-300 transition-colors">
                                {nLayout.node.label}
                              </h5>
                            </div>
                            <span className="text-[10px] text-slate-400 line-clamp-1 block">
                              {nLayout.node.category}
                            </span>
                          </div>

                          <div className="flex items-center gap-1 shrink-0">
                            {hasLab && (
                              <span
                                title="Interactive Lab Available"
                                className="px-1.5 py-0.5 rounded-md bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[9px] font-bold flex items-center gap-0.5"
                              >
                                <Zap className="w-2.5 h-2.5" />
                                <span>Lab</span>
                              </span>
                            )}
                            <span className="font-mono text-[9px] font-bold px-1.5 py-0.5 rounded bg-slate-800 text-slate-300">
                              {nLayout.node.bloomLevel}
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  });
                })}
              </div>
            </div>

            {/* Bottom Legend Strip */}
            <div className="relative z-20 p-3.5 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3 text-[11px] text-slate-400 bg-slate-900/70 backdrop-blur-md">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                  <span>Interactive Lab Node</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-indigo-500" />
                  <span>Selected Concept</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-4 h-0.5 bg-indigo-400 rounded-full" />
                  <span>Organic Tree Branch</span>
                </div>
              </div>
              <span className="font-mono text-slate-400">
                Regulations R2023_V1.2 · Click any branch node to inspect formulas
              </span>
            </div>
          </div>

          {/* Right Column: Concept Deep-Dive Inspector Sheet */}
          <div className="lg:col-span-4 space-y-4">
            {selectedNode ? (
              <div className="bg-white border border-slate-200 rounded-3xl p-5 shadow-sm space-y-4 sticky top-20">
                {/* Header Strip */}
                <div className="flex items-start justify-between gap-2 border-b border-slate-100 pb-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="px-2 py-0.5 rounded-md text-[10px] font-mono font-bold bg-indigo-50 text-indigo-700 border border-indigo-200">
                        {selectedNode.bloomLevel}: {selectedNode.bloomLabel}
                      </span>
                      <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                        {selectedNode.category}
                      </span>
                    </div>
                    <h3 className="text-base font-extrabold text-slate-900 leading-snug">
                      {selectedNode.label}
                    </h3>
                  </div>

                  {selectedNode.linkedLabId && (
                    <div className="p-2 rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-200 shrink-0">
                      <Zap className="w-4 h-4" />
                    </div>
                  )}
                </div>

                {/* Description */}
                <div>
                  <h4 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                    Concept Definition & Theory
                  </h4>
                  <p className="text-xs text-slate-700 leading-relaxed">
                    {selectedNode.description}
                  </p>
                </div>

                {/* Mathematical Formula (if present) */}
                {selectedNode.formula && (
                  <div className="bg-slate-900 text-slate-100 rounded-2xl p-3 border border-slate-800">
                    <span className="block text-[10px] font-mono uppercase tracking-wider text-indigo-400 mb-1">
                      Mathematical Formulation
                    </span>
                    <code className="text-xs font-mono text-emerald-400 block break-all font-semibold">
                      {selectedNode.formula}
                    </code>
                  </div>
                )}

                {/* Key Pedagogical Takeaways */}
                <div>
                  <h4 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                    Key Academic Principles
                  </h4>
                  <ul className="space-y-1.5">
                    {selectedNode.keyPoints.map((point, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-xs text-slate-600">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span className="leading-snug">{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Exam Significance Pill */}
                <div className="p-3 bg-amber-50/80 border border-amber-200 rounded-2xl">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-amber-900 mb-0.5">
                    <Award className="w-3.5 h-3.5 text-amber-600" />
                    <span>Exam Significance & Tip</span>
                  </div>
                  <p className="text-xs text-amber-800 leading-relaxed">
                    {selectedNode.examSignificance}
                  </p>
                </div>

                {/* Real-World Industry Application */}
                <div className="p-3 bg-slate-50 border border-slate-200/80 rounded-2xl">
                  <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">
                    Industrial Application
                  </span>
                  <p className="text-xs text-slate-700 leading-relaxed">
                    {selectedNode.realWorldExample}
                  </p>
                </div>

                {/* Cross-concept Connections */}
                {selectedNode.connections && selectedNode.connections.length > 0 && (
                  <div>
                    <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                      Interconnected Nodes in Tree
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {selectedNode.connections.map(connId => {
                        const targetNode = findNodeById(connId);
                        if (!targetNode) return null;

                        return (
                          <button
                            key={connId}
                            onClick={() => setSelectedNode(targetNode)}
                            className="px-2.5 py-1 rounded-lg text-xs font-medium bg-slate-100 hover:bg-indigo-50 hover:text-indigo-600 text-slate-700 transition-colors cursor-pointer border border-slate-200"
                          >
                            🌿 {targetNode.label}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* DIRECT ACTION: Launch Interactive Lab Button */}
                {selectedNode.linkedLabId && onLaunchLab && (
                  <button
                    onClick={() => onLaunchLab(selectedNode.linkedLabId!, selectedUnitNum)}
                    className="w-full mt-2 py-3 px-4 rounded-xl bg-linear-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-bold text-xs transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer group"
                  >
                    <Zap className="w-4 h-4 text-emerald-200 group-hover:scale-110 transition-transform" />
                    <span>Launch Interactive Lab: {selectedNode.linkedLabTitle || 'Open Lab'}</span>
                    <ArrowRight className="w-4 h-4 ml-auto group-hover:translate-x-1 transition-transform" />
                  </button>
                )}
              </div>
            ) : (
              <div className="bg-white border border-slate-200 rounded-3xl p-8 text-center text-slate-500">
                <Network className="w-8 h-8 mx-auto text-slate-300 mb-2" />
                <p className="text-xs">Click any concept node on the tree branches to view detailed academic notes, derivations, and simulation labs.</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* VIEW 2: CATEGORICAL TREE / MATRIX VIEW */}
      {viewMode === 'tree' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBranches.map(branch => {
            const Icon = getBranchIcon(branch.iconName);
            const isExpanded = expandedBranches[branch.id] !== false;

            return (
              <div
                key={branch.id}
                className="bg-white border border-slate-200 rounded-3xl p-5 shadow-xs flex flex-col justify-between hover:border-slate-300 transition-all"
              >
                <div>
                  {/* Branch Card Header */}
                  <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                    <div className="flex items-center gap-2.5">
                      <div
                        className="w-8 h-8 rounded-xl flex items-center justify-center text-white shadow-xs"
                        style={{ backgroundColor: branch.accentHex }}
                      >
                        <Icon className="w-4 h-4" />
                      </div>
                      <div>
                        <h3 className="text-sm font-extrabold text-slate-900 leading-tight">
                          {branch.title}
                        </h3>
                        <span className="text-[10px] text-slate-500 font-mono">
                          {branch.nodes.length} Key Concepts
                        </span>
                      </div>
                    </div>

                    <button
                      onClick={() => toggleBranch(branch.id)}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 cursor-pointer"
                    >
                      <ChevronRight
                        className={`w-4 h-4 transition-transform ${isExpanded ? 'rotate-90' : ''}`}
                      />
                    </button>
                  </div>

                  <p className="text-xs text-slate-600 mt-2.5 mb-4 leading-relaxed">
                    {branch.description}
                  </p>

                  {/* Expandable Concept List */}
                  {isExpanded && (
                    <div className="space-y-3">
                      {branch.nodes.map(node => {
                        const hasLab = !!node.linkedLabId;

                        return (
                          <div
                            key={node.id}
                            className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 hover:bg-slate-100/70 transition-all"
                          >
                            <div className="flex items-start justify-between gap-2 mb-1.5">
                              <div>
                                <span className="text-[10px] font-mono font-bold text-indigo-600 uppercase">
                                  {node.category} · {node.bloomLevel}
                                </span>
                                <h4 className="text-xs font-bold text-slate-900">
                                  {node.label}
                                </h4>
                              </div>

                              {hasLab && (
                                <span className="px-2 py-0.5 rounded-full text-[9px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-200 flex items-center gap-1 shrink-0">
                                  <Zap className="w-2.5 h-2.5" />
                                  <span>Lab</span>
                                </span>
                              )}
                            </div>

                            <p className="text-[11px] text-slate-600 leading-relaxed mb-2">
                              {node.description}
                            </p>

                            {node.formula && (
                              <div className="bg-slate-900 text-slate-100 p-2 rounded-xl text-[10px] font-mono text-emerald-400 mb-2 break-all">
                                {node.formula}
                              </div>
                            )}

                            {hasLab && onLaunchLab && (
                              <button
                                onClick={() => onLaunchLab(node.linkedLabId!, selectedUnitNum)}
                                className="w-full mt-1 py-1.5 px-3 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-[11px] font-bold transition-colors cursor-pointer flex items-center justify-center gap-1.5 shadow-2xs"
                              >
                                <Zap className="w-3 h-3" />
                                <span>Open {node.linkedLabTitle || 'Interactive Lab'}</span>
                              </button>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* VIEW 3: KNOWLEDGE FLOW TIMELINE VIEW */}
      {viewMode === 'flow' && (
        <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xs">
          <div className="max-w-3xl mb-8">
            <h3 className="text-lg font-bold text-slate-900">
              Curriculum Knowledge Flow: {activeMindMap.unitTitle}
            </h3>
            <p className="text-xs text-slate-600 mt-1 leading-relaxed">
              Step-by-step conceptual sequence showing how foundational definitions build into complex algorithms and real-world engineering systems.
            </p>
          </div>

          <div className="relative border-l-2 border-indigo-200 ml-4 sm:ml-6 pl-6 sm:pl-8 space-y-8">
            {activeMindMap.knowledgeFlow.map((flowStep, idx) => {
              const matchedNode = findNodeById(flowStep.conceptId);

              return (
                <div key={idx} className="relative group">
                  {/* Step Bubble Indicator */}
                  <div className="absolute -left-[35px] sm:-left-[43px] top-0 w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center font-mono font-bold text-xs shadow-md ring-4 ring-white">
                    {flowStep.step}
                  </div>

                  <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 hover:border-indigo-300 hover:bg-indigo-50/30 transition-all">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                      <h4 className="text-sm font-bold text-slate-900">
                        {flowStep.title}
                      </h4>
                      {matchedNode?.bloomLevel && (
                        <span className="font-mono text-[10px] font-bold px-2 py-0.5 rounded bg-indigo-100 text-indigo-700 self-start">
                          Level {matchedNode.bloomLevel}
                        </span>
                      )}
                    </div>

                    <p className="text-xs text-slate-600 leading-relaxed mb-3">
                      {flowStep.desc}
                    </p>

                    {matchedNode && (
                      <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-200/60">
                        <span className="text-[11px] font-bold text-slate-500">
                          Mapped Concept:
                        </span>
                        <span className="text-xs font-semibold text-indigo-700 bg-white px-2 py-0.5 rounded-md border border-slate-200">
                          {matchedNode.label}
                        </span>

                        {matchedNode.linkedLabId && onLaunchLab && (
                          <button
                            onClick={() => onLaunchLab(matchedNode.linkedLabId!, selectedUnitNum)}
                            className="ml-auto px-3 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold transition-colors cursor-pointer flex items-center gap-1 shadow-2xs"
                          >
                            <Zap className="w-3 h-3" />
                            <span>Launch Lab</span>
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* VIEW 4: EXAM RAPID CHECKLIST */}
      {viewMode === 'checklist' && (
        <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xs">
          <div className="max-w-3xl mb-6">
            <div className="flex items-center gap-2 text-xs font-bold text-amber-600 uppercase tracking-wider mb-1">
              <Award className="w-4 h-4 text-amber-600" />
              <span>High-Yield Anna University / Autonomous Exam Preparation</span>
            </div>
            <h3 className="text-lg font-bold text-slate-900">
              Exam Core Mastery Checklist: Unit {activeMindMap.unitNumber}
            </h3>
            <p className="text-xs text-slate-600 mt-1 leading-relaxed">
              Verify your comprehension of these non-negotiable syllabus derivations, proofs, and numerical calculations before appearing for the Nov/Dec regular examinations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {activeMindMap.examChecklist.map((item, idx) => (
              <div
                key={idx}
                className="p-4 rounded-2xl bg-amber-50/50 border border-amber-200/80 flex items-start gap-3 hover:bg-amber-50 transition-colors"
              >
                <div className="w-6 h-6 rounded-lg bg-amber-600 text-white flex items-center justify-center font-mono font-bold text-xs shrink-0 mt-0.5">
                  {idx + 1}
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900 mb-1 leading-snug">
                    Exam Topic #{idx + 1}
                  </h4>
                  <p className="text-xs text-slate-700 leading-relaxed">
                    {item}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Quick Summary Strip */}
          <div className="mt-8 pt-6 border-t border-slate-200">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
              Unit Executive Summary
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {activeMindMap.quickSummary.map((summaryPoint, idx) => (
                <div
                  key={idx}
                  className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-700 leading-relaxed flex items-start gap-2"
                >
                  <Sparkles className="w-3.5 h-3.5 text-indigo-600 shrink-0 mt-0.5" />
                  <span>{summaryPoint}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
