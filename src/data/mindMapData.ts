/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { UnitMindMap } from '../types/mindmap';

export const unitMindMaps: UnitMindMap[] = [
  // ==========================================
  // UNIT 1: INTRODUCTION TO AI & SEARCH
  // ==========================================
  {
    unitNumber: 1,
    unitTitle: 'Unit I: Introduction to AI and Search Algorithms',
    shortTitle: 'Search & Agents',
    courseOutcome: 'CO1',
    coDescription: 'Implement Artificial Intelligence in problem solving techniques.',
    centralHub: {
      title: 'AI Foundations & Search',
      subtitle: 'CO1: Intelligent Problem Solving',
      description: 'The science of formulating goal-driven tasks as state-space search spaces, designing rational agent architectures with PEAS specifications, and deploying uninformed and heuristic search algorithms.',
      gradient: 'from-blue-600 via-indigo-600 to-cyan-600',
      accentHex: '#3b82f6',
      badgeColor: 'bg-blue-600'
    },
    quickSummary: [
      'Rational agents maximize expected performance based on percept histories and built-in knowledge.',
      'PEAS specifies Performance measure, Environment, Actuators, and Sensors for any autonomous task.',
      'A problem is formally defined by Initial State, Actions, Transition Model, Goal Test, and Path Cost.',
      'Uninformed search (BFS, DFS, UCS) operates without domain guidance; BFS is complete and optimal for uniform step cost.',
      'A* search evaluates f(n) = g(n) + h(n) and is strictly optimal when the heuristic h(n) is admissible and consistent.'
    ],
    branches: [
      {
        id: 'u1-b1-foundations',
        title: 'Foundations & Definitions of AI',
        colorName: 'blue',
        badgeBg: 'bg-blue-100 text-blue-800 border-blue-200',
        borderColor: 'border-blue-400',
        textColor: 'text-blue-700',
        cardBg: 'bg-blue-50/50',
        ringColor: 'ring-blue-500/20',
        accentHex: '#2563eb',
        gradient: 'from-blue-500 to-indigo-600',
        iconName: 'Cpu',
        description: 'Core definitions, Turing test, cognitive modeling, rational agent paradigm, and philosophical dimensions of intelligence.',
        nodes: [
          {
            id: 'u1-turing-test',
            label: 'Turing Test & Acting Humanly',
            category: 'Definitions',
            description: 'Proposed by Alan Turing (1950), an operational test where a human interrogator poses written questions to an unseen human and machine. If the interrogator cannot reliably tell machine from human, the machine exhibits human-level intelligence.',
            bloomLevel: 'K1',
            bloomLabel: 'Remember',
            formula: 'P(Interrogator identifies Machine) \\le 0.5',
            keyPoints: [
              'Requires NLP for communication, Knowledge Representation to store memory, Automated Reasoning to conclude facts, and Machine Learning to adapt.',
              'Total Turing Test additionally tests vision and robotics through physical object manipulation.',
              'Emphasizes behavioral indistinguishability rather than internal consciousness or biological replication.'
            ],
            examSignificance: 'Very frequent 2-mark Part A question. Clearly list the 4 core AI capabilities needed to pass the standard Turing Test.',
            realWorldExample: 'Conversational customer support bots and conversational agents being evaluated against human benchmark conversations.',
            connections: ['u1-rational-agent', 'u1-agent-types']
          },
          {
            id: 'u1-rational-agent',
            label: 'Rational Agent Paradigm',
            category: 'Foundations',
            description: 'A rational agent is one that acts so as to achieve the best expected outcome, or, when there is uncertainty, the best expected outcome given its percept sequence and built-in knowledge.',
            bloomLevel: 'K2',
            bloomLabel: 'Understand',
            formula: 'Action^* = \\arg\\max_{a \\in A} E[U(s\') \\mid Percept\\ Sequence, a]',
            keyPoints: [
              'Distinguishes between rationality and omniscience: rationality maximizes expected outcome, not clairvoyant perfection.',
              'Encompasses autonomy: agent should learn from experience to compensate for partial initial knowledge.',
              'Focuses on correct mathematical decision-making rather than simulating human psychological flaws.'
            ],
            examSignificance: 'Underpins Course Outcome CO1. Differentiate between thinking humanly (cognitive science) and acting rationally (normative engineering).',
            realWorldExample: 'Automated high-frequency trading algorithms executing trades to maximize risk-adjusted financial returns.',
            connections: ['u1-peas', 'u1-agent-types']
          },
          {
            id: 'u1-ai-dimensions',
            label: 'The 4 Dimensions of AI',
            category: 'Taxonomy',
            description: 'Russell and Norvig 2x2 matrix categorizing AI along two axes: Thinking vs Acting, and Human-like vs Rational.',
            bloomLevel: 'K2',
            bloomLabel: 'Understand',
            keyPoints: [
              'Thinking Humanly: Cognitive modeling and psychological brain scanning.',
              'Acting Humanly: The Turing Test approach.',
              'Thinking Rationally: Laws of thought, formal deductive logic, syllogisms.',
              'Acting Rationally: Rational agent approach (the modern engineering standard).'
            ],
            examSignificance: 'Frequently asked in Part A to classify AI systems across the four historical quadrants.',
            realWorldExample: 'Expert medical diagnosis systems combining logical syllogisms (Thinking Rationally) with automated clinical workflows (Acting Rationally).'
          }
        ]
      },
      {
        id: 'u1-b2-agents',
        title: 'Intelligent Agents & PEAS Framework',
        colorName: 'emerald',
        badgeBg: 'bg-emerald-100 text-emerald-800 border-emerald-200',
        borderColor: 'border-emerald-400',
        textColor: 'text-emerald-700',
        cardBg: 'bg-emerald-50/50',
        ringColor: 'ring-emerald-500/20',
        accentHex: '#059669',
        gradient: 'from-emerald-500 to-teal-600',
        iconName: 'Compass',
        description: 'PEAS task environments, agent architectures (reflex, model, goal, utility, learning), and environmental taxonomy.',
        nodes: [
          {
            id: 'u1-peas',
            label: 'PEAS Task Environment Specification',
            category: 'Agents',
            description: 'The standard framework for specifying an intelligent agent by its Performance measure, Environment, Actuators, and Sensors.',
            bloomLevel: 'K3',
            bloomLabel: 'Apply',
            formula: 'PEAS = \\langle Performance, Environment, Actuators, Sensors \\rangle',
            keyPoints: [
              'Performance: Objective criterion for success (e.g., passenger safety, fuel efficiency, minimal transit time).',
              'Environment: External world the agent interacts with (e.g., roads, pedestrians, weather conditions).',
              'Actuators: Mechanisms by which the agent alters the environment (e.g., steering wheel, accelerator, brakes).',
              'Sensors: Devices providing percepts to the agent (e.g., cameras, LiDAR, sonar, GPS, speedometer).'
            ],
            examSignificance: 'Mandatory exam question. Must be able to write full 4-element PEAS tables for Autonomous Taxi, Medical Diagnosis System, and Satellite Controller.',
            realWorldExample: 'Waymo / Tesla full-self-driving PEAS specification balancing collision-avoidance with transit duration.',
            linkedLabId: 'u1-vacuum',
            linkedLabTitle: 'Vacuum Cleaner World & PEAS Agent',
            connections: ['u1-env-types', 'u1-agent-types']
          },
          {
            id: 'u1-agent-types',
            label: '5 Agent Architectures',
            category: 'Architectures',
            description: 'Hierarchy of agent internal complexity: Simple Reflex, Model-Based Reflex, Goal-Based, Utility-Based, and Learning Agent.',
            bloomLevel: 'K2',
            bloomLabel: 'Understand',
            keyPoints: [
              'Simple Reflex: Condition-Action rules (if status=Dirty then Suck); fails completely in partially observable environments.',
              'Model-Based Reflex: Maintains internal state memory to track unobserved aspects of the world.',
              'Goal-Based: Combines state tracking with explicit goal formulations to plan multi-step sequences.',
              'Utility-Based: Uses utility functions to weigh trade-offs between competing goals and calculate preferences.',
              'Learning Agent: Separated into Critic, Learning Element, Learning Goals, and Performance Element.'
            ],
            examSignificance: 'Core Part B question. Compare Simple Reflex vs Model-Based Reflex with architectural block diagrams.',
            realWorldExample: 'Roborock robotic vacuum using SLAM mapping (Model-Based) and battery-efficient docking goals (Utility-Based).',
            linkedLabId: 'u1-vacuum',
            linkedLabTitle: 'Vacuum Cleaner World & PEAS Agent',
            connections: ['u1-peas']
          },
          {
            id: 'u1-env-types',
            label: 'Environment Dimensions',
            category: 'Environments',
            description: 'Classification of task environments that dictate the appropriate agent design and algorithmic complexity.',
            bloomLevel: 'K2',
            bloomLabel: 'Understand',
            keyPoints: [
              'Fully vs Partially Observable: Sensors give complete state access vs incomplete noisy signals.',
              'Deterministic vs Stochastic: Next state uniquely determined by current state and action vs probabilistic uncertainty.',
              'Episodic vs Sequential: Current action does not affect future episodes vs current decisions chain into future states.',
              'Static vs Dynamic: World does not change while agent deliberates vs world evolves continuously.',
              'Discrete vs Continuous: Finite distinct states and actions vs infinite continuous numeric variables.'
            ],
            examSignificance: 'Classic Part A matching question. E.g., Chess is fully observable, deterministic, sequential, static, discrete.',
            realWorldExample: 'Urban traffic navigation is partially observable, stochastic, sequential, dynamic, continuous, and multi-agent.'
          }
        ]
      },
      {
        id: 'u1-b3-formulation',
        title: 'Problem Formulation & State Space',
        colorName: 'amber',
        badgeBg: 'bg-amber-100 text-amber-800 border-amber-200',
        borderColor: 'border-amber-400',
        textColor: 'text-amber-700',
        cardBg: 'bg-amber-50/50',
        ringColor: 'ring-amber-500/20',
        accentHex: '#d97706',
        gradient: 'from-amber-500 to-orange-600',
        iconName: 'Layers',
        description: 'The 5 formal elements of problem formulation, state space graphs, search trees, and branching factors.',
        nodes: [
          {
            id: 'u1-formal-formulation',
            label: 'The 5 Elements of Problem Formulation',
            category: 'Formulation',
            description: 'The mathematical tuple that defines a search problem unambiguously for automated solvers.',
            bloomLevel: 'K3',
            bloomLabel: 'Apply',
            formula: 'Problem = \\langle s_0, Actions(s), Result(s,a), GoalTest(s), c(s,a,s\') \\rangle',
            keyPoints: [
              '1. Initial State s0: State the agent starts in (e.g., In(Madurai)).',
              '2. Actions(s): Set of valid legal moves in state s.',
              '3. Transition Model Result(s, a): What state results from executing action a in state s.',
              '4. Goal Test: Predicate determining whether state is an acceptable terminal goal (e.g., s == In(Chennai)).',
              '5. Path Cost c(s, a, s\'): Additive cost of stepping from s to s\' via a (e.g., highway distance in km).'
            ],
            examSignificance: 'Mandatory Part B question. State the 5 components for the Madurai to Chennai navigation or 8-Puzzle problem.',
            realWorldExample: 'Google Maps routing engine formally computing routes using turn-by-turn transition models and toll/distance path costs.',
            connections: ['u1-bfs', 'u1-astar']
          },
          {
            id: 'u1-toy-problems',
            label: 'Standard Toy Problems (Vacuum & 8-Puzzle)',
            category: 'Examples',
            description: 'Canonical benchmark problems used to test search algorithms and heuristic admissibility.',
            bloomLevel: 'K3',
            bloomLabel: 'Apply',
            keyPoints: [
              'Vacuum World: 2 locations (A, B), dirt status (Clean, Dirty), agent location -> 2 * 2^2 = 8 discrete states.',
              '8-Puzzle: 3x3 board with 8 numbered tiles and 1 blank space. State space size = 9! / 2 = 181,440 reachable states.',
              'Heuristics for 8-Puzzle: h1 = misplaced tiles; h2 = Manhattan distance (sum of horizontal and vertical tile displacements).'
            ],
            examSignificance: 'Prove why Manhattan distance h2 dominates misplaced tiles h1 (h2(n) >= h1(n) for all n, expanding fewer nodes).',
            realWorldExample: 'Micro-fulfillment robotic warehouse automated inventory bin rearrangement.',
            linkedLabId: 'u1-vacuum',
            linkedLabTitle: 'Vacuum Cleaner World & PEAS Agent'
          }
        ]
      },
      {
        id: 'u1-b4-uninformed',
        title: 'Uninformed (Blind) Search Strategies',
        colorName: 'violet',
        badgeBg: 'bg-violet-100 text-violet-800 border-violet-200',
        borderColor: 'border-violet-400',
        textColor: 'text-violet-700',
        cardBg: 'bg-violet-50/50',
        ringColor: 'ring-violet-500/20',
        accentHex: '#7c3aed',
        gradient: 'from-violet-500 to-purple-600',
        iconName: 'GitBranch',
        description: 'Breadth-First, Depth-First, Uniform Cost, and Iterative Deepening search mechanisms, completeness, and complexity.',
        nodes: [
          {
            id: 'u1-bfs',
            label: 'Breadth-First Search (BFS)',
            category: 'Uninformed',
            description: 'Explores the state space systematically level-by-level using a First-In-First-Out (FIFO) queue for the frontier.',
            bloomLevel: 'K3',
            bloomLabel: 'Apply',
            formula: 'Time: O(b^d), \\quad Space: O(b^d)',
            keyPoints: [
              'Completeness: Yes, guaranteed if branching factor b is finite.',
              'Optimality: Yes, guaranteed if path costs are all identical non-negative constants (finds shallowest goal).',
              'Critical limitation: Memory requirement O(b^d) is exponential, causing RAM exhaustion before CPU timeouts on deep graphs.'
            ],
            examSignificance: 'Frequent Part B numerical. Trace BFS queue state step-by-step for a given graph and report time/space complexity.',
            realWorldExample: 'Social network shortest path analysis (Degrees of Separation / LinkedIn connection degrees).',
            linkedLabId: 'u1-search',
            linkedLabTitle: 'A* & Uninformed Search Lab',
            connections: ['u1-dfs', 'u1-ucs', 'u1-astar']
          },
          {
            id: 'u1-dfs',
            label: 'Depth-First Search (DFS)',
            category: 'Uninformed',
            description: 'Explores deepest unvisited node first using a Last-In-First-Out (LIFO) stack or system call stack recursion.',
            bloomLevel: 'K3',
            bloomLabel: 'Apply',
            formula: 'Time: O(b^m), \\quad Space: O(b \\cdot m)',
            keyPoints: [
              'Completeness: No, fails in cyclic or infinite-depth state spaces (unless cycle-checked).',
              'Optimality: No, may return arbitrarily deep suboptimal goal solutions.',
              'Key advantage: Modest linear space complexity O(b*m) where m is maximum tree depth, requiring vastly less memory than BFS.'
            ],
            examSignificance: 'Compare BFS vs DFS in tabular format across 4 dimensions: Completeness, Optimality, Time Complexity, Space Complexity.',
            realWorldExample: 'Maze path exploration and topological sorting in compiler dependency graphs.',
            linkedLabId: 'u1-search',
            linkedLabTitle: 'A* & Uninformed Search Lab',
            connections: ['u1-bfs', 'u1-ucs']
          },
          {
            id: 'u1-ucs',
            label: 'Uniform-Cost Search (UCS / Dijkstra)',
            category: 'Uninformed',
            description: 'Expands node with lowest cumulative path cost g(n) using a Priority Queue. Equivalent to Dijkstra algorithm.',
            bloomLevel: 'K3',
            bloomLabel: 'Apply',
            formula: 'f(n) = g(n), \\quad Time/Space: O(b^{1 + \\lfloor C^* / \\epsilon \\rfloor})',
            keyPoints: [
              'Completeness: Yes, if all step costs >= epsilon > 0.',
              'Optimality: Yes, guaranteed to find lowest-cost path for general positive edge weights.',
              'Drawback: Explores in concentric circles of equal cost regardless of goal direction, wasting cycles on irrelevant branches.'
            ],
            examSignificance: 'Trace UCS priority queue step-by-step; show why goal node is tested upon expansion, not generation.',
            realWorldExample: 'Network packet routing under non-uniform bandwidth and latency constraints.',
            linkedLabId: 'u1-search',
            linkedLabTitle: 'A* & Uninformed Search Lab',
            connections: ['u1-astar']
          }
        ]
      },
      {
        id: 'u1-b5-heuristic',
        title: 'Informed (Heuristic) Search & A* Algorithm',
        colorName: 'cyan',
        badgeBg: 'bg-cyan-100 text-cyan-800 border-cyan-200',
        borderColor: 'border-cyan-400',
        textColor: 'text-cyan-700',
        cardBg: 'bg-cyan-50/50',
        ringColor: 'ring-cyan-500/20',
        accentHex: '#0891b2',
        gradient: 'from-cyan-500 to-blue-600',
        iconName: 'Sparkles',
        description: 'Heuristic functions h(n), Greedy Best-First, A* search, admissibility, consistency, and optimality guarantees.',
        nodes: [
          {
            id: 'u1-astar',
            label: 'A* Search Algorithm (f = g + h)',
            category: 'Heuristic',
            description: 'The golden standard informed search algorithm evaluating nodes by f(n) = g(n) + h(n), balancing past cost and estimated future cost.',
            bloomLevel: 'K4',
            bloomLabel: 'Analyze',
            formula: 'f(n) = g(n) + h(n)',
            keyPoints: [
              'g(n): Exact cost incurred so far from start node to current node n.',
              'h(n): Estimated cost of cheapest path from n to the goal.',
              'f(n): Estimated total cost of path through node n to goal.',
              'Combines greedy focus toward the goal with UCS guarantee of shortest past paths.'
            ],
            examSignificance: 'Highest-yield question in Unit 1. Trace A* search table showing node expansion order, Open list, Closed list, and path cost.',
            realWorldExample: 'Video game pathfinding (NPC movement across 3D navigation meshes) and real-time GPS route recalculation.',
            linkedLabId: 'u1-search',
            linkedLabTitle: 'A* & Uninformed Search Lab',
            connections: ['u1-admissibility', 'u1-consistency']
          },
          {
            id: 'u1-admissibility',
            label: 'Heuristic Admissibility & Consistency',
            category: 'Theory',
            description: 'Mathematical properties required of h(n) to guarantee that A* returns an optimal solution.',
            bloomLevel: 'K4',
            bloomLabel: 'Analyze',
            formula: 'Admissible: 0 \\le h(n) \\le h^*(n), \\quad Consistent: h(n) \\le c(n,a,n\') + h(n\')',
            keyPoints: [
              'Admissibility: Never overestimates true remaining cost h*(n) to goal. Guarantees optimality in Tree Search.',
              'Consistency (Monotonicity): Adheres to triangle inequality. Guarantees f(n) along any path is non-decreasing.',
              'Consistency ensures optimal Graph Search without ever needing to reopen nodes in the Closed list.',
              'Straight-Line Distance (Euclidean) is provably admissible because a straight line is the absolute physical minimum distance.'
            ],
            examSignificance: 'Prove that if h(n) is admissible, A* tree search will never terminate with a suboptimal goal.',
            realWorldExample: 'Calculating airline flight shortest distances using geodesic great-circle arc distances as an admissible lower bound.',
            linkedLabId: 'u1-search',
            linkedLabTitle: 'A* & Uninformed Search Lab',
            connections: ['u1-astar']
          }
        ]
      }
    ],
    knowledgeFlow: [
      { step: 1, title: 'Define AI Foundations', desc: 'Determine intelligence criteria: Turing test vs rational agent maximization.', conceptId: 'u1-turing-test' },
      { step: 2, title: 'Specify PEAS Task Environment', desc: 'Formulate Performance, Environment, Actuators, and Sensors for the agent.', conceptId: 'u1-peas' },
      { step: 3, title: 'Formulate State Space', desc: 'Set up states, actions, transition model, goal condition, and path cost metrics.', conceptId: 'u1-formal-formulation' },
      { step: 4, title: 'Deploy Blind Search (BFS/DFS/UCS)', desc: 'Explore state space systematically when no domain heuristic is known.', conceptId: 'u1-bfs' },
      { step: 5, title: 'Engineer Admissible Heuristics', desc: 'Synthesize lower-bound estimates h(n) like Straight-Line Distance.', conceptId: 'u1-admissibility' },
      { step: 6, title: 'Execute Optimal A* Search', desc: 'Expand frontier prioritizing f(n) = g(n) + h(n) to reach goal optimally with minimal nodes.', conceptId: 'u1-astar' }
    ],
    examChecklist: [
      'Write PEAS formulation for Automated Taxi, Medical Diagnostician, and Vacuum Agent.',
      'Differentiate Simple Reflex vs Model-Based Reflex agents with internal state block diagrams.',
      'State the 5 formal problem formulation components for Madurai-to-Chennai route search.',
      'Tabulate comparison of BFS, DFS, UCS across Completeness, Optimality, Time, Space.',
      'Show full numerical step-by-step trace of A* search on the standard syllabus graph.',
      'State and prove conditions for heuristic admissibility and monotonicity/consistency.'
    ]
  },

  // ==========================================
  // UNIT 2: KNOWLEDGE, LOGIC & REASONING
  // ==========================================
  {
    unitNumber: 2,
    unitTitle: 'Unit II: Knowledge Representation, Logic & Adversarial Search',
    shortTitle: 'Logic & Reasoning',
    courseOutcome: 'CO2',
    coDescription: 'Interpret various knowledge representation and reasoning in AI systems.',
    centralHub: {
      title: 'Logic, Games & Probabilistic AI',
      subtitle: 'CO2: Deductive & Probabilistic Reasoning',
      description: 'Formal reasoning under deterministic and uncertain environments: adversarial zero-sum game trees, propositional calculus, first-order logic inferences, Wumpus World navigation, and Bayesian networks.',
      gradient: 'from-purple-600 via-violet-600 to-indigo-600',
      accentHex: '#7c3aed',
      badgeColor: 'bg-purple-600'
    },
    quickSummary: [
      'Adversarial games are modeled as zero-sum trees; Mini-Max computes optimal backward induction.',
      'Alpha-Beta pruning yields the exact same move as Mini-Max while skipping branches where alpha >= beta.',
      'Propositional logic uses truth tables and inference rules (Modus Ponens, Resolution) to deduce theorems.',
      'First-Order Logic adds universal (forall) and existential (exists) quantifiers to model rich domains.',
      'The Wumpus World illustrates how deductive KB agents safely navigate partially observable hazard grids.',
      'Bayesian Networks factor joint probability distributions into DAGs of conditional probability tables (CPTs).'
    ],
    branches: [
      {
        id: 'u2-b1-games',
        title: 'Adversarial Search & Game Playing',
        colorName: 'purple',
        badgeBg: 'bg-purple-100 text-purple-800 border-purple-200',
        borderColor: 'border-purple-400',
        textColor: 'text-purple-700',
        cardBg: 'bg-purple-50/50',
        ringColor: 'ring-purple-500/20',
        accentHex: '#9333ea',
        gradient: 'from-purple-500 to-indigo-600',
        iconName: 'Brain',
        description: 'Two-player zero-sum games, Mini-Max algorithm, Alpha-Beta pruning condition, and move-ordering efficiency.',
        nodes: [
          {
            id: 'u2-minimax',
            label: 'Mini-Max Decision Algorithm',
            category: 'Adversarial',
            description: 'Computes optimal adversarial moves in 2-player zero-sum games through recursive backward induction from terminal leaf states.',
            bloomLevel: 'K3',
            bloomLabel: 'Apply',
            formula: 'MiniMax(s) = \\begin{cases} Utility(s) & \\text{if Terminal}(s) \\\\ \\max_{a} MiniMax(Result(s,a)) & \\text{if Player}(s)=MAX \\\\ \\min_{a} MiniMax(Result(s,a)) & \\text{if Player}(s)=MIN \\end{cases}',
            keyPoints: [
              'Assumes optimal play from the opponent (MIN always chooses move minimizing MAX utility).',
              'Completeness: Yes, if tree is finite. Optimality: Yes, against an optimal opponent.',
              'Time complexity: O(b^m); space complexity: O(bm) with depth-first traversal.'
            ],
            examSignificance: 'Draw standard 3-level binary game tree and compute root Mini-Max utility value propagating bottom-up.',
            realWorldExample: 'Chess engine evaluation trees and Tic-Tac-Toe perfect minimax lookahead.',
            linkedLabId: 'u2-gametree',
            linkedLabTitle: 'Mini-Max & Alpha-Beta Pruning Studio',
            connections: ['u2-alphabeta']
          },
          {
            id: 'u2-alphabeta',
            label: 'Alpha-Beta Pruning (alpha >= beta cutoff)',
            category: 'Optimization',
            description: 'A pruning technique that eliminates game tree branches that cannot possibly influence the final root decision, returning the identical optimal move as Mini-Max.',
            bloomLevel: 'K4',
            bloomLabel: 'Analyze',
            formula: '\\text{Prune if } \\alpha \\ge \\beta',
            keyPoints: [
              'alpha: The highest utility value MAX is guaranteed to achieve so far on the path to root.',
              'beta: The lowest utility value MIN is guaranteed to achieve so far on the path to root.',
              'When alpha >= beta at any node, the remaining child branches are safely pruned.',
              'With perfect move ordering, reduces effective time complexity from O(b^m) to O(b^{m/2}), doubling search depth!'
            ],
            examSignificance: 'Mandatory Part B numerical. Trace alpha-beta tree, annotate alpha and beta at every node, and clearly cross out pruned branches.',
            realWorldExample: 'Deep Blue and Stockfish chess engines evaluating billions of candidate board positions.',
            linkedLabId: 'u2-gametree',
            linkedLabTitle: 'Mini-Max & Alpha-Beta Pruning Studio',
            connections: ['u2-minimax']
          }
        ]
      },
      {
        id: 'u2-b2-prop-logic',
        title: 'Propositional Logic & Inference',
        colorName: 'indigo',
        badgeBg: 'bg-indigo-100 text-indigo-800 border-indigo-200',
        borderColor: 'border-indigo-400',
        textColor: 'text-indigo-700',
        cardBg: 'bg-indigo-50/50',
        ringColor: 'ring-indigo-500/20',
        accentHex: '#4f46e5',
        gradient: 'from-indigo-500 to-violet-600',
        iconName: 'Shield',
        description: 'Propositional syntax, truth tables, logical equivalence, Modus Ponens, Resolution refutation, and CNF conversion.',
        nodes: [
          {
            id: 'u2-truth-tables',
            label: 'Syntax, Semantics & Truth Tables',
            category: 'Propositional',
            description: 'Atomic propositions (P, Q, R) connected by logical operators: Negation (~), Conjunction (&), Disjunction (|), Implication (->), and Biconditional (<->).',
            bloomLevel: 'K2',
            bloomLabel: 'Understand',
            formula: 'P \\Rightarrow Q \\equiv \\neg P \\vee Q',
            keyPoints: [
              'Tautology: A sentence that is true in all possible models (e.g., P | ~P).',
              'Satisfiability: Sentence is true in at least one model.',
              'Validity: Sentence is true in all models; sentence alpha entails beta (alpha |= beta) iff (alpha -> beta) is valid.'
            ],
            examSignificance: 'Construct complete truth tables to prove logical equivalence (e.g., contrapositive: P -> Q == ~Q -> ~P).',
            realWorldExample: 'Digital circuit logic gate design and safety interlock verification.',
            connections: ['u2-inference-rules']
          },
          {
            id: 'u2-inference-rules',
            label: 'Inference Rules: Modus Ponens & Resolution',
            category: 'Inference',
            description: 'Sound deductive transformation rules applied to knowledge bases to derive theorems without enumerating 2^n truth table rows.',
            bloomLevel: 'K3',
            bloomLabel: 'Apply',
            formula: '\\text{Modus Ponens: } \\frac{\\alpha \\Rightarrow \\beta, \\; \\alpha}{\\beta}, \\quad \\text{Resolution: } \\frac{l_1 \\vee \\dots \\vee l_k, \\; m_1 \\vee \\dots \\vee m_n}{(l_1 \\vee \\dots) \\vee (m_1 \\dots)}',
            keyPoints: [
              'Modus Ponens: If alpha -> beta and alpha are true, deduce beta.',
              'Modus Tollens: If alpha -> beta and ~beta are true, deduce ~alpha.',
              'Resolution: Combines two clauses with complementary literals (P and ~P) to resolve a new clause; complete for refutation (KB & ~alpha resolves to empty clause).',
              'CNF (Conjunctive Normal Form): Product-of-sums representation required for resolution theorem proving.'
            ],
            examSignificance: 'Convert sentences into CNF clauses and apply Resolution Refutation to prove an exam goal theorem.',
            realWorldExample: 'Automated theorem provers and static software code analysis tools verifying absence of runtime null pointers.',
            connections: ['u2-fol']
          }
        ]
      },
      {
        id: 'u2-b3-fol',
        title: 'First-Order Logic (FOL)',
        colorName: 'pink',
        badgeBg: 'bg-pink-100 text-pink-800 border-pink-200',
        borderColor: 'border-pink-400',
        textColor: 'text-pink-700',
        cardBg: 'bg-pink-50/50',
        ringColor: 'ring-pink-500/20',
        accentHex: '#db2777',
        gradient: 'from-pink-500 to-rose-600',
        iconName: 'GitBranch',
        description: 'Predicates, functions, universal (forall) and existential (exists) quantifiers, unification, and Most General Unifiers.',
        nodes: [
          {
            id: 'u2-fol-quantifiers',
            label: 'FOL Quantifiers & Expressive Power',
            category: 'Predicates',
            description: 'Extends propositional logic by modeling world as Objects, Relations, Functions, and Predicates, quantified over domains.',
            bloomLevel: 'K3',
            bloomLabel: 'Apply',
            formula: '\\forall x \\; [King(x) \\Rightarrow Person(x)], \\quad \\exists x \\; [Crown(x) \\wedge OnHead(x)]',
            keyPoints: [
              'Universal Quantifier (forall x): Sentence holds true for every object in the universe. Commonly pairs with Implication (->).',
              'Existential Quantifier (exists x): Sentence holds true for at least one object. Commonly pairs with Conjunction (&).',
              'Duality of Quantifiers: forall x P(x) == ~exists x ~P(x); ~forall x P(x) == exists x ~P(x).'
            ],
            examSignificance: 'Translate English sentences into First-Order Logic formulas (e.g. "Every student loves AI", "Some students passed exam").',
            realWorldExample: 'Semantic web ontologies (RDF/OWL) and enterprise relational knowledge graphs.',
            connections: ['u2-unification', 'u2-wumpus-rules']
          },
          {
            id: 'u2-unification',
            label: 'Unification & Most General Unifier (MGU)',
            category: 'FOL Inference',
            description: 'The algorithmic process of finding variable substitutions that make two different logical predicate expressions identical.',
            bloomLevel: 'K4',
            bloomLabel: 'Analyze',
            formula: 'UNIFY(Knows(John, x), Knows(John, Jane)) = \\{ x / Jane \\}',
            keyPoints: [
              'Finds substitution theta such that Sub(theta, p) = Sub(theta, q).',
              'Universal Instantiation: Allows replacing universally quantified variables with ground terms.',
              'MGU (Most General Unifier): Unique substitution that places minimal constraints on variables.'
            ],
            examSignificance: 'Compute MGU substitution sets for given pairs of FOL expressions in Part A and Part B.',
            realWorldExample: 'Prolog logic programming query engines finding variable assignments satisfying database constraints.',
            connections: ['u2-fol-quantifiers']
          }
        ]
      },
      {
        id: 'u2-b4-wumpus',
        title: 'Knowledge-Based Agents & The Wumpus World',
        colorName: 'rose',
        badgeBg: 'bg-rose-100 text-rose-800 border-rose-200',
        borderColor: 'border-rose-400',
        textColor: 'text-rose-700',
        cardBg: 'bg-rose-50/50',
        ringColor: 'ring-rose-500/20',
        accentHex: '#e11d48',
        gradient: 'from-rose-500 to-orange-600',
        iconName: 'Shield',
        description: 'KB agent loop (TELL, ASK), 4x4 Wumpus World sensory rules, and deductive reasoning for safe exploration.',
        nodes: [
          {
            id: 'u2-wumpus-rules',
            label: 'The Wumpus World 4x4 Grid Environment',
            category: 'Case Study',
            description: 'The seminal AI problem illustrating how knowledge-based agents use logical deduction to explore hazardous, partially observable environments.',
            bloomLevel: 'K3',
            bloomLabel: 'Apply',
            formula: 'B_{x,y} \\Leftrightarrow (P_{x-1,y} \\vee P_{x+1,y} \\vee P_{x,y-1} \\vee P_{x,y+1})',
            keyPoints: [
              'Sensory Percepts: [Stench, Breeze, Glitter, Bump, Scream].',
              'Pit Rule: Breeze occurs in squares adjacent to a Pit.',
              'Wumpus Rule: Stench occurs in squares adjacent to the Wumpus.',
              'Deductive safe exploration: At [1,1] percept is [None, None] -> implies [1,2] and [2,1] are provably SAFE without guessing!',
              'If Breeze at [2,1] but no Breeze at [1,2], agent deduces Pit is strictly at [3,1] or [2,2].'
            ],
            examSignificance: 'Write the propositional knowledge base for [1,1] and [2,1] percepts and mathematically prove why [1,2] is safe.',
            realWorldExample: 'Autonomous planetary exploration rovers navigating unknown Martian terrain with seismic and obstacle hazards.',
            linkedLabId: 'u2-wumpus',
            linkedLabTitle: 'Wumpus World 4×4 Deductive Grid',
            connections: ['u2-prop-logic']
          }
        ]
      },
      {
        id: 'u2-b5-uncertainty',
        title: 'Probabilistic Reasoning & Bayesian Networks',
        colorName: 'amber',
        badgeBg: 'bg-amber-100 text-amber-800 border-amber-200',
        borderColor: 'border-amber-400',
        textColor: 'text-amber-700',
        cardBg: 'bg-amber-50/50',
        ringColor: 'ring-amber-500/20',
        accentHex: '#d97706',
        gradient: 'from-amber-500 to-yellow-600',
        iconName: 'Sparkles',
        description: 'Conditional probability, Bayes rule, conditional independence, and Directed Acyclic Graph belief networks with CPTs.',
        nodes: [
          {
            id: 'u2-bayes-rule',
            label: 'Bayes Rule & Diagnostic Inference',
            category: 'Probability',
            description: 'Calculates posterior conditional probability of an unseen cause given observed symptoms or evidence.',
            bloomLevel: 'K3',
            bloomLabel: 'Apply',
            formula: 'P(Cause \\mid Effect) = \\frac{P(Effect \\mid Cause) \\cdot P(Cause)}{P(Effect)}',
            keyPoints: [
              'Overcomes limitations of purely deterministic logic in medical diagnosis where symptoms have multiple probabilistic causes.',
              'P(Cause): Prior probability of condition in the general population.',
              'P(Effect | Cause): Likelihood of symptom manifesting given condition.',
              'P(Effect): Marginal total probability across all causes.'
            ],
            examSignificance: 'Calculate probability of disease given positive lab test (Meningitis given Stiff Neck calculation).',
            realWorldExample: 'Medical blood test screening and Bayesian spam email filtering.',
            linkedLabId: 'u2-bayesian',
            linkedLabTitle: 'Bayesian Network & CPT Medical Inference',
            connections: ['u2-bayesian-nets']
          },
          {
            id: 'u2-bayesian-nets',
            label: 'Bayesian Networks & CPT Factorization',
            category: 'Belief Networks',
            description: 'Directed Acyclic Graphs (DAGs) representing probabilistic dependencies, factoring full joint distributions efficiently via local CPTs.',
            bloomLevel: 'K4',
            bloomLabel: 'Analyze',
            formula: 'P(X_1, \\dots, X_n) = \\prod_{i=1}^n P(X_i \\mid Parents(X_i))',
            keyPoints: [
              'Nodes represent random variables; directed edges represent direct causal dependencies.',
              'Conditional Independence: A node is conditionally independent of its non-descendants given its parents.',
              'Exponential parameter reduction: An n-variable joint distribution needing 2^n values is reduced to sum of small local CPT entries.'
            ],
            examSignificance: 'Compute query probability P(Burglary=T | Alarm=T, JohnCalls=T) using the Burglar Alarm Bayesian Network CPTs.',
            realWorldExample: 'ICU patient monitoring systems predicting sepsis and automotive sensor fusion.',
            linkedLabId: 'u2-bayesian',
            linkedLabTitle: 'Bayesian Network & CPT Medical Inference',
            connections: ['u2-bayes-rule']
          }
        ]
      }
    ],
    knowledgeFlow: [
      { step: 1, title: 'Adversarial Game Modeling', desc: 'Construct zero-sum game trees and apply Mini-Max backward induction.', conceptId: 'u2-minimax' },
      { step: 2, title: 'Alpha-Beta Branch Pruning', desc: 'Prune branches where alpha >= beta to double depth horizon with identical decisions.', conceptId: 'u2-alphabeta' },
      { step: 3, title: 'Propositional Formalization', desc: 'Model facts with logic connectives and verify validity using truth tables.', conceptId: 'u2-truth-tables' },
      { step: 4, title: 'Automated Deductive Proofs', desc: 'Convert to CNF and execute Resolution refutation to deduce consequences.', conceptId: 'u2-inference-rules' },
      { step: 5, title: 'Navigate Wumpus World', desc: 'Use percept rules to deduce provably safe squares in partially observable grids.', conceptId: 'u2-wumpus-rules' },
      { step: 6, title: 'Bayesian Network Inference', desc: 'Represent uncertain causal dependencies in DAGs and compute posterior CPT queries.', conceptId: 'u2-bayesian-nets' }
    ],
    examChecklist: [
      'Draw a 3-level game tree and trace Mini-Max value propagation.',
      'Identify pruned branches in Alpha-Beta pruning with exact [alpha, beta] interval tracking.',
      'Construct truth tables proving de Morgan laws and implication equivalence.',
      'Convert logical sentences to CNF and prove theorems by Resolution.',
      'Formulate knowledge base for Wumpus World and prove safe square exploration.',
      'Compute diagnostic probability queries from Bayesian network CPT tables using Bayes theorem.'
    ]
  },

  // ==========================================
  // UNIT 3: MACHINE LEARNING & SUPERVISED
  // ==========================================
  {
    unitNumber: 3,
    unitTitle: 'Unit III: Introduction to Machine Learning',
    shortTitle: 'Machine Learning',
    courseOutcome: 'CO3',
    coDescription: 'Analyze various machine learning algorithms such as linear and logistic regression.',
    centralHub: {
      title: 'ML Paradigms & Supervised Learning',
      subtitle: 'CO3: Regression & Classification',
      description: 'The transition from explicit programming to data-driven learning: ML taxonomy, end-to-end pipeline, bias-variance tradeoff, regularization, linear and logistic regression, decision trees, SVM, and KNN.',
      gradient: 'from-blue-600 via-cyan-600 to-teal-600',
      accentHex: '#0284c7',
      badgeColor: 'bg-sky-600'
    },
    quickSummary: [
      'Machine Learning learns rules from Data + Answers, unlike traditional programming.',
      'The ML pipeline spans data ingestion, preprocessing, train/val/test splitting, training, and evaluation.',
      'Underfitting stems from excessive bias (too simple); overfitting stems from high variance (too complex).',
      'Regularization (L2 Ridge and L1 LASSO) penalizes model complexity to restore generalization.',
      'Linear regression models continuous outcomes; Logistic regression models categorical probabilities via Sigmoid.',
      'Decision Trees split orthogonally, SVM maximizes margin boundaries, and KNN classifies by local neighborhood.'
    ],
    branches: [
      {
        id: 'u3-b1-paradigms',
        title: 'Machine Learning Paradigms & Taxonomy',
        colorName: 'sky',
        badgeBg: 'bg-sky-100 text-sky-800 border-sky-200',
        borderColor: 'border-sky-400',
        textColor: 'text-sky-700',
        cardBg: 'bg-sky-50/50',
        ringColor: 'ring-sky-500/20',
        accentHex: '#0284c7',
        gradient: 'from-sky-500 to-blue-600',
        iconName: 'Cpu',
        description: 'Traditional programming vs ML, supervised vs unsupervised vs reinforcement learning, and inductive bias.',
        nodes: [
          {
            id: 'u3-trad-vs-ml',
            label: 'Traditional Programming vs Machine Learning',
            category: 'Taxonomy',
            description: 'The fundamental inversion in system engineering: traditional programming takes Data + Rules -> Outputs; Machine Learning takes Data + Outputs -> Rules.',
            bloomLevel: 'K2',
            bloomLabel: 'Understand',
            keyPoints: [
              'Traditional: Humans craft manual if-else heuristics; brittle, difficult to maintain as complexity grows.',
              'Machine Learning: Optimization algorithms automatically extract statistical weight matrices from training examples.',
              'Inductive Learning Hypothesis: Any hypothesis found to approximate target function over sufficiently large training set will also approximate unseen data.'
            ],
            examSignificance: 'Standard Part A 2-mark question. Draw the input/output flow comparison diagram for both paradigms.',
            realWorldExample: 'Replacing hand-coded spam keyword filters with statistical Naive Bayes and Transformer classifiers.',
            connections: ['u3-pipeline']
          },
          {
            id: 'u3-ml-types',
            label: 'The 3 Main Types of Machine Learning',
            category: 'Taxonomy',
            description: 'Broad classification by nature of training feedback: Supervised, Unsupervised, and Reinforcement Learning.',
            bloomLevel: 'K2',
            bloomLabel: 'Understand',
            keyPoints: [
              'Supervised Learning: Training data includes ground truth output labels y. Tasks: Regression (continuous) and Classification (discrete).',
              'Unsupervised Learning: Training data has no target labels y. Tasks: Clustering, Dimensionality Reduction, Anomaly Detection.',
              'Reinforcement Learning: Agent learns optimal policy through trial-and-error actions in an environment to maximize cumulative reward.'
            ],
            examSignificance: 'Classify given real-world applications into Supervised, Unsupervised, or Reinforcement Learning.',
            realWorldExample: 'Speech-to-text (Supervised), Customer segmentation (Unsupervised), Autonomous drone flight control (Reinforcement).'
          }
        ]
      },
      {
        id: 'u3-b2-pipeline',
        title: 'The End-to-End ML Pipeline',
        colorName: 'teal',
        badgeBg: 'bg-teal-100 text-teal-800 border-teal-200',
        borderColor: 'border-teal-400',
        textColor: 'text-teal-700',
        cardBg: 'bg-teal-50/50',
        ringColor: 'ring-teal-500/20',
        accentHex: '#0d9488',
        gradient: 'from-teal-500 to-emerald-600',
        iconName: 'Layers',
        description: 'Data collection, cleaning, feature engineering, train-val-test split, model training, and deployment lifecycle.',
        nodes: [
          {
            id: 'u3-pipeline',
            label: 'The Machine Learning Lifecycle',
            category: 'Pipeline',
            description: 'The systematic multi-stage engineering workflow required to produce reliable machine learning models.',
            bloomLevel: 'K2',
            bloomLabel: 'Understand',
            keyPoints: [
              '1. Problem Definition: Formulate business objective into mathematical target.',
              '2. Data Ingestion & Cleaning: Handle missing values, outliers, deduplication.',
              '3. Feature Engineering: Scaling, encoding, feature construction.',
              '4. Train/Validation/Test Split: Typically 70% Train, 15% Validation, 15% Test to prevent data leakage.',
              '5. Training & Tuning: Fit weights on train set; select hyperparameters on validation set.',
              '6. Evaluation & Monitoring: Assess generalization on held-out test set.'
            ],
            examSignificance: 'Frequent Part B question. Illustrate the complete ML lifecycle with a block diagram and explain each phase.',
            realWorldExample: 'Credit card risk approval system pipeline from applicant data to fraud inference service.'
          }
        ]
      },
      {
        id: 'u3-b3-bias-variance',
        title: 'Bias-Variance Tradeoff & Generalization',
        colorName: 'blue',
        badgeBg: 'bg-blue-100 text-blue-800 border-blue-200',
        borderColor: 'border-blue-400',
        textColor: 'text-blue-700',
        cardBg: 'bg-blue-50/50',
        ringColor: 'ring-blue-500/20',
        accentHex: '#2563eb',
        gradient: 'from-blue-500 to-indigo-600',
        iconName: 'Zap',
        description: 'Underfitting vs overfitting, mathematical decomposition of generalization error, and optimal model complexity.',
        nodes: [
          {
            id: 'u3-bv-tradeoff',
            label: 'Bias-Variance Tradeoff Decomposition',
            category: 'Theory',
            description: 'The fundamental tension in supervised learning between model simplicity (bias) and model flexibility (variance).',
            bloomLevel: 'K4',
            bloomLabel: 'Analyze',
            formula: '\\text{Expected Error} = \\text{Bias}^2 + \\text{Variance} + \\sigma^2_{\\text{irreducible}}',
            keyPoints: [
              'High Bias (Underfitting): Model makes strong assumptions (e.g., straight line on curved data); high train error and high test error.',
              'High Variance (Overfitting): Model fits random noise and idiosyncrasies of training set (e.g., degree-15 polynomial); low train error but high test error.',
              'Irreducible Error (sigma^2): Noise inherent in the data collection process that cannot be eliminated by any model.',
              'Optimal Complexity: The sweet spot where total expected test error reaches its global minimum.'
            ],
            examSignificance: 'Mandatory exam question. Draw the Bias-Variance curves plotting Train Error, Test Error, Bias, and Variance against Model Complexity.',
            realWorldExample: 'Predicting stock prices where high-degree polynomial overfits daily market volatility and collapses on tomorrow\'s trades.',
            linkedLabId: 'u3-biasvar',
            linkedLabTitle: 'Polynomial Bias–Variance & Overfitting Simulator',
            connections: ['u3-regularization']
          },
          {
            id: 'u3-regularization',
            label: 'Regularization (L2 Ridge & L1 LASSO)',
            category: 'Remedies',
            description: 'Techniques that add penalty terms to the loss function to constrain model weights and prevent overfitting.',
            bloomLevel: 'K3',
            bloomLabel: 'Apply',
            formula: 'J_{Ridge} = MSE + \\lambda \\sum_{j=1}^p w_j^2, \\quad J_{LASSO} = MSE + \\lambda \\sum_{j=1}^p |w_j|',
            keyPoints: [
              'L2 Ridge Regularization: Penalizes squared magnitude of weights. Shrinks weights smoothly toward zero; keeps all features.',
              'L1 LASSO Regularization: Penalizes absolute magnitude of weights. Drives non-informative coefficients strictly to zero (performs automatic feature selection).',
              'Hyperparameter lambda: Controls regularization strength. lambda=0 yields unconstrained OLS; very high lambda underfits.'
            ],
            examSignificance: 'Compare L1 LASSO vs L2 Ridge in terms of penalty geometry (diamond vs sphere) and feature selection ability.',
            realWorldExample: 'High-dimensional genomic regression predicting disease risk from 10,000 gene markers using LASSO to identify the 20 active genes.',
            linkedLabId: 'u3-biasvar',
            linkedLabTitle: 'Polynomial Bias–Variance & Overfitting Simulator',
            connections: ['u3-bv-tradeoff', 'u3-linear-reg']
          }
        ]
      },
      {
        id: 'u3-b4-regression',
        title: 'Supervised Regression Models',
        colorName: 'teal',
        badgeBg: 'bg-teal-100 text-teal-800 border-teal-200',
        borderColor: 'border-teal-400',
        textColor: 'text-teal-700',
        cardBg: 'bg-teal-50/50',
        ringColor: 'ring-teal-500/20',
        accentHex: '#0d9488',
        gradient: 'from-teal-500 to-cyan-600',
        iconName: 'Home',
        description: 'Simple and multivariate linear regression, Ordinary Least Squares (OLS), Gradient Descent, and error metrics (MSE, RMSE, R²).',
        nodes: [
          {
            id: 'u3-linear-reg',
            label: 'Multivariate Linear Regression',
            category: 'Regression',
            description: 'Models linear relationship between multiple continuous input features X and a continuous target variable y.',
            bloomLevel: 'K3',
            bloomLabel: 'Apply',
            formula: '\\hat{y} = w_0 + w_1 x_1 + \\dots + w_p x_p = \\mathbf{w}^T \\mathbf{x}',
            keyPoints: [
              'Cost Function: Mean Squared Error (MSE) J(w) = (1/2n) * sum (y_i - y_hat_i)^2.',
              'Optimization: Gradient Descent updates weights iteratively: w_j := w_j - alpha * (dJ / dw_j).',
              'Normal Equation: Analytical closed-form solution w = (X^T X)^(-1) X^T y (computational bottleneck O(p^3)).',
              'Evaluation Metrics: MAE (median-robust), MSE (penalizes large errors), RMSE (interpretable units), and R² score (variance explained).'
            ],
            examSignificance: 'Derive the gradient update rule for linear regression and compute predicted price given feature weights.',
            realWorldExample: 'House price valuation based on square footage, bedroom count, property age, and neighborhood proximity.',
            linkedLabId: 'u3-regression',
            linkedLabTitle: 'Multivariate House Price Regression Studio',
            connections: ['u3-logistic-reg']
          }
        ]
      },
      {
        id: 'u3-b5-classification',
        title: 'Supervised Classification Models',
        colorName: 'indigo',
        badgeBg: 'bg-indigo-100 text-indigo-800 border-indigo-200',
        borderColor: 'border-indigo-400',
        textColor: 'text-indigo-700',
        cardBg: 'bg-indigo-50/50',
        ringColor: 'ring-indigo-500/20',
        accentHex: '#4f46e5',
        gradient: 'from-indigo-500 to-purple-600',
        iconName: 'GitBranch',
        description: 'Logistic regression, Decision Trees (Entropy/Gini), Support Vector Machines (Max Margin), and K-Nearest Neighbors.',
        nodes: [
          {
            id: 'u3-logistic-reg',
            label: 'Logistic Regression & Sigmoid Function',
            category: 'Classification',
            description: 'Models categorical binary probabilities by mapping continuous linear combinations through the non-linear Sigmoid activation function.',
            bloomLevel: 'K3',
            bloomLabel: 'Apply',
            formula: 'P(y=1 \\mid \\mathbf{x}) = \\sigma(\\mathbf{w}^T \\mathbf{x}) = \\frac{1}{1 + e^{-\\mathbf{w}^T \\mathbf{x}}}',
            keyPoints: [
              'Sigmoid function squashes any real-valued score (-inf, +inf) into valid probability [0, 1].',
              'Decision boundary: Predict class 1 if sigma(z) >= 0.5, corresponding to linear hyperplane w^T x >= 0.',
              'Loss Function: Binary Cross-Entropy (Log Loss) ensures convexity for gradient descent optimization.'
            ],
            examSignificance: 'Explain why linear regression is unsuitable for classification and calculate probability output given weights and inputs.',
            realWorldExample: 'Customer churn prediction (Yes/No) and loan default risk probability calculation.',
            connections: ['u3-classifiers']
          },
          {
            id: 'u3-classifiers',
            label: 'DT vs SVM vs KNN Comparison',
            category: 'Classifiers',
            description: 'Comparative analysis of the three foundational classification algorithms with distinct geometric decision boundaries.',
            bloomLevel: 'K4',
            bloomLabel: 'Analyze',
            keyPoints: [
              'Decision Tree: Orthogonal axis-aligned splits. Splits chosen using Information Gain (Entropy) or Gini Impurity. Highly interpretable.',
              'Support Vector Machine (SVM): Maximizes geometric margin between classes. Decision boundary defined strictly by Support Vectors. Kernel trick for non-linear boundaries.',
              'K-Nearest Neighbors (KNN): Lazy non-parametric instance learner. Computes Euclidean distance to all training points; classifies by majority vote of k nearest neighbors.'
            ],
            examSignificance: 'Construct a detailed comparison table comparing Decision Trees, SVM, and KNN across Decision Boundary, Training Speed, Prediction Speed, and Outlier Sensitivity.',
            realWorldExample: 'Medical triage diagnosis (DT for explainability), face verification (SVM with RBF kernel), recommendation systems (KNN).',
            linkedLabId: 'u3-classifiers',
            linkedLabTitle: 'Classifier Decision Boundaries: DT vs SVM vs KNN',
            connections: ['u3-logistic-reg']
          }
        ]
      }
    ],
    knowledgeFlow: [
      { step: 1, title: 'Understand ML Inversion', desc: 'Transition from hand-coded rules to learning functions from input-output data.', conceptId: 'u3-trad-vs-ml' },
      { step: 2, title: 'Analyze ML Pipeline', desc: 'Follow structured workflow from data cleaning to train/test partitioning.', conceptId: 'u3-pipeline' },
      { step: 3, title: 'Diagnose Bias vs Variance', desc: 'Identify underfitting vs overfitting and locate the optimal model complexity.', conceptId: 'u3-bv-tradeoff' },
      { step: 4, title: 'Apply Regularization', desc: 'Apply L2 Ridge or L1 LASSO penalty terms to shrink weights and restore test performance.', conceptId: 'u3-regularization' },
      { step: 5, title: 'Fit Regression Functions', desc: 'Optimize continuous parameters using Gradient Descent or OLS.', conceptId: 'u3-linear-reg' },
      { step: 6, title: 'Deploy Classification Models', desc: 'Apply Logistic Regression, Decision Trees, SVM, and KNN to discrete tasks.', conceptId: 'u3-classifiers' }
    ],
    examChecklist: [
      'Compare Traditional Programming vs Machine Learning with architectural diagrams.',
      'Plot Bias-Variance tradeoff curves showing underfitting, optimal fit, and overfitting regions.',
      'Differentiate L1 LASSO vs L2 Ridge regularization equations and feature selection behavior.',
      'Derive the Logistic Regression hypothesis using the Sigmoid mathematical function.',
      'Calculate Information Gain and Gini Impurity for a candidate Decision Tree split.',
      'Compare Decision Trees, SVM, and KNN across margin boundaries, training time, and memory.'
    ]
  },

  // ==========================================
  // UNIT 4: UNSUPERVISED LEARNING & CLUSTERING
  // ==========================================
  {
    unitNumber: 4,
    unitTitle: 'Unit IV: Unsupervised Learning & Dimensionality Reduction',
    shortTitle: 'Unsupervised Learning',
    courseOutcome: 'CO4',
    coDescription: 'Apply unsupervised learning techniques and clustering algorithms to analyze unlabelled data.',
    centralHub: {
      title: 'Clustering & Manifold Analysis',
      subtitle: 'CO4: Unsupervised Pattern Discovery',
      description: 'Discovering hidden structures in unlabeled datasets: partitioning methods (K-Means), density-based clustering (DBSCAN), hierarchical dendrograms, cluster quality validation (Silhouette score), and PCA dimensionality reduction.',
      gradient: 'from-emerald-600 via-teal-600 to-cyan-600',
      accentHex: '#059669',
      badgeColor: 'bg-emerald-600'
    },
    quickSummary: [
      'Unsupervised learning discovers intrinsic groupings without ground-truth labels y.',
      'K-Means iteratively minimizes within-cluster sum of squares (WCSS / Inertia); sensitive to initialization and outliers.',
      'DBSCAN identifies arbitrarily shaped clusters via density parameters (Epsilon, MinPts) and isolates noise (-1).',
      'Hierarchical clustering produces a dendrogram tree cut dynamically at desired similarity thresholds.',
      'Silhouette Coefficient S(i) = (b-a)/max(a,b) measures separation and compactness on [-1, +1].',
      'PCA eliminates the Curse of Dimensionality by projecting onto orthogonal eigenvectors of maximum variance.'
    ],
    branches: [
      {
        id: 'u4-b1-foundations',
        title: 'Foundations of Unsupervised Learning',
        colorName: 'emerald',
        badgeBg: 'bg-emerald-100 text-emerald-800 border-emerald-200',
        borderColor: 'border-emerald-400',
        textColor: 'text-emerald-700',
        cardBg: 'bg-emerald-50/50',
        ringColor: 'ring-emerald-500/20',
        accentHex: '#059669',
        gradient: 'from-emerald-500 to-teal-600',
        iconName: 'Layers',
        description: 'Core concepts of unlabeled data analysis, pattern discovery, clustering vs classification, and retail/bioinformatics use cases.',
        nodes: [
          {
            id: 'u4-unsupervised-core',
            label: 'Unsupervised Learning Principles',
            category: 'Foundations',
            description: 'Analyzing unlabeled datasets {x_1, ..., x_N} to extract latent patterns, geometric manifolds, and probabilistic groupings without supervision.',
            bloomLevel: 'K2',
            bloomLabel: 'Understand',
            keyPoints: [
              'No target variable y or teacher feedback exists during training.',
              'Primary Tasks: Clustering (grouping similar items), Dimensionality Reduction (compressing feature spaces), and Anomaly Detection.',
              'Challenging validation: Because ground truth is absent, internal geometric metrics (compactness, separation) must be used.'
            ],
            examSignificance: 'Contrast Supervised vs Unsupervised Learning across training objectives, target labels, and evaluation metrics.',
            realWorldExample: 'Customer segmentation for e-commerce marketing and discovering unknown disease subtypes from genomic expression.',
            connections: ['u4-kmeans', 'u4-dbscan']
          }
        ]
      },
      {
        id: 'u4-b2-kmeans',
        title: 'Partitioning Clustering: K-Means',
        colorName: 'teal',
        badgeBg: 'bg-teal-100 text-teal-800 border-teal-200',
        borderColor: 'border-teal-400',
        textColor: 'text-teal-700',
        cardBg: 'bg-teal-50/50',
        ringColor: 'ring-teal-500/20',
        accentHex: '#0d9488',
        gradient: 'from-teal-500 to-cyan-600',
        iconName: 'Compass',
        description: 'K-Means centroid updates, inertia formula, K-Means++ initialization, Elbow method, and spherical cluster assumptions.',
        nodes: [
          {
            id: 'u4-kmeans',
            label: 'K-Means Algorithm & Centroid Updating',
            category: 'Partitioning',
            description: 'Iterative centroid-based partitioning algorithm minimizing the Within-Cluster Sum of Squares (WCSS / Inertia).',
            bloomLevel: 'K3',
            bloomLabel: 'Apply',
            formula: 'J = \\sum_{k=1}^K \\sum_{x_i \\in C_k} \\| x_i - \\mu_k \\|^2, \\quad \\mu_k = \\frac{1}{|C_k|} \\sum_{x_i \\in C_k} x_i',
            keyPoints: [
              '1. Initialization: Choose K initial centroid coordinates randomly or via K-Means++ (spreading centroids apart).',
              '2. Assignment Step: Assign every data point to its closest centroid using Euclidean distance.',
              '3. Update Step: Recompute each centroid as the arithmetic mean of all points assigned to that cluster.',
              '4. Convergence: Repeat until centroids stabilize or assignments stop changing.',
              'Limitations: Assumes spherical clusters of equal size; highly vulnerable to outliers and random initialization traps.'
            ],
            examSignificance: 'Solve numerical question: Compute new centroid coordinates for given 2D points after 1 iteration of K-Means.',
            realWorldExample: 'Telecom customer usage profiling into low, medium, and high data consumer tiers.',
            linkedLabId: 'u4-clustering',
            linkedLabTitle: 'K-Means vs DBSCAN Clustering Sandbox',
            connections: ['u4-elbow', 'u4-dbscan']
          },
          {
            id: 'u4-elbow',
            label: 'The Elbow Method for Optimal K',
            category: 'Heuristic',
            description: 'A heuristic method used to determine the optimal number of clusters K by identifying the inflection point on an Inertia plot.',
            bloomLevel: 'K3',
            bloomLabel: 'Apply',
            formula: '\\text{Inertia}(K) = \\sum_{k=1}^K WCSS_k',
            keyPoints: [
              'Plot Inertia (WCSS) on y-axis against candidate K values (1 to 10) on x-axis.',
              'Inertia drops steeply as K increases initially, then flattens out.',
              'The "elbow point" (sharp bend) marks the optimal balance where adding more clusters yields diminishing explanatory return.'
            ],
            examSignificance: 'Interpret an Inertia-vs-K plot to identify the optimal cluster count and explain why K=N is a trivial meaningless minimum.',
            realWorldExample: 'Determining optimal number of warehouse distribution hubs across a geographic region.',
            linkedLabId: 'u4-clustering',
            linkedLabTitle: 'K-Means vs DBSCAN Clustering Sandbox'
          }
        ]
      },
      {
        id: 'u4-b3-dbscan',
        title: 'Density-Based Clustering: DBSCAN',
        colorName: 'cyan',
        badgeBg: 'bg-cyan-100 text-cyan-800 border-cyan-200',
        borderColor: 'border-cyan-400',
        textColor: 'text-cyan-700',
        cardBg: 'bg-cyan-50/50',
        ringColor: 'ring-cyan-500/20',
        accentHex: '#0891b2',
        gradient: 'from-cyan-500 to-blue-600',
        iconName: 'Layers',
        description: 'Epsilon neighborhood, MinPts threshold, Core vs Border vs Noise points, non-convex shapes, and outlier robustness.',
        nodes: [
          {
            id: 'u4-dbscan',
            label: 'DBSCAN: Density-Based Spatial Clustering',
            category: 'Density',
            description: 'Locates dense spatial regions separated by low-density regions, discovering arbitrary non-spherical shapes while isolating noise.',
            bloomLevel: 'K4',
            bloomLabel: 'Analyze',
            formula: 'N_\\epsilon(p) = \\{ q \\in D \\mid dist(p, q) \\le \\epsilon \\}',
            keyPoints: [
              'Epsilon (eps): Radius of the spatial neighborhood around point p.',
              'MinPts: Minimum number of neighbor points required within eps to form a dense cluster.',
              'Core Point: Has >= MinPts points within its eps neighborhood.',
              'Border Point: Has < MinPts points, but lies within eps neighborhood of a Core Point.',
              'Noise Point: Neither Core nor Border; isolated points flagged explicitly as -1.',
              'Key Advantage over K-Means: Finds non-convex clusters (concentric circles, crescent moons) and does not force outliers into clusters.'
            ],
            examSignificance: 'Mandatory Part B question. Given point coordinates, eps, and MinPts, classify each point as Core, Border, or Noise.',
            realWorldExample: 'GPS trajectory anomaly detection and astronomical star cluster identification.',
            linkedLabId: 'u4-clustering',
            linkedLabTitle: 'K-Means vs DBSCAN Clustering Sandbox',
            connections: ['u4-kmeans', 'u4-hierarchical']
          }
        ]
      },
      {
        id: 'u4-b4-hierarchical',
        title: 'Hierarchical Clustering & Dendrograms',
        colorName: 'blue',
        badgeBg: 'bg-blue-100 text-blue-800 border-blue-200',
        borderColor: 'border-blue-400',
        textColor: 'text-blue-700',
        cardBg: 'bg-blue-50/50',
        ringColor: 'ring-blue-500/20',
        accentHex: '#2563eb',
        gradient: 'from-blue-500 to-indigo-600',
        iconName: 'GitBranch',
        description: 'Agglomerative vs divisive approaches, linkage metrics (Single, Complete, Average, Ward), and dendrogram cutting.',
        nodes: [
          {
            id: 'u4-hierarchical',
            label: 'Agglomerative Clustering & Linkage Metrics',
            category: 'Hierarchical',
            description: 'Bottom-up hierarchical clustering where each point starts in its own cluster and closest pairs merge iteratively.',
            bloomLevel: 'K3',
            bloomLabel: 'Apply',
            keyPoints: [
              'Single Linkage (Min Distance): d(A, B) = min dist(a, b). Prone to chaining effect (stringy clusters).',
              'Complete Linkage (Max Distance): d(A, B) = max dist(a, b). Finds compact, spherical clusters.',
              'Average Linkage: d(A, B) = mean dist(a, b). Robust compromise.',
              'Ward\'s Linkage: Minimizes total within-cluster variance increase when merging.'
            ],
            examSignificance: 'Compute proximity distance matrix step-by-step and draw resulting dendrogram tree for 4 sample points.',
            realWorldExample: 'Phylogenetic evolutionary tree construction in biology and document taxonomy generation.',
            linkedLabId: 'u4-hierarchical',
            linkedLabTitle: 'Hierarchical Clustering & Dendrogram Cut Studio',
            connections: ['u4-dendrogram']
          },
          {
            id: 'u4-dendrogram',
            label: 'Dendrogram Interpretation & Dynamic Cut',
            category: 'Dendrogram',
            description: 'A 2D tree diagram displaying the exact sequence and distance thresholds at which clusters merged.',
            bloomLevel: 'K4',
            bloomLabel: 'Analyze',
            keyPoints: [
              'Vertical axis represents the distance/dissimilarity at which two clusters merged.',
              'Horizontal axis lists the individual leaf sample points.',
              'Dynamic Cut: Slicing the dendrogram with a horizontal line determines the exact number of output clusters K dynamically without rerunning the algorithm.'
            ],
            examSignificance: 'Analyze a provided dendrogram diagram, draw horizontal cut line at distance D, and report resulting cluster groups.',
            realWorldExample: 'Customer loyalty tier assignment where management adjusts tier cutoffs based on seasonal budgets.',
            linkedLabId: 'u4-hierarchical',
            linkedLabTitle: 'Hierarchical Clustering & Dendrogram Cut Studio'
          }
        ]
      },
      {
        id: 'u4-b5-evaluation',
        title: 'Cluster Evaluation: Silhouette Score',
        colorName: 'violet',
        badgeBg: 'bg-violet-100 text-violet-800 border-violet-200',
        borderColor: 'border-violet-400',
        textColor: 'text-violet-700',
        cardBg: 'bg-violet-50/50',
        ringColor: 'ring-violet-500/20',
        accentHex: '#7c3aed',
        gradient: 'from-violet-500 to-purple-600',
        iconName: 'Award',
        description: 'Internal validation metrics, Silhouette formula S(i) = (b-a)/max(a,b), Davies-Bouldin index, and Calinski-Harabasz score.',
        nodes: [
          {
            id: 'u4-silhouette',
            label: 'Silhouette Coefficient Formula & Interpretation',
            category: 'Validation',
            description: 'A mathematical measure of how well separated and internally compact clusters are, ranging from -1 to +1.',
            bloomLevel: 'K4',
            bloomLabel: 'Analyze',
            formula: 'S(i) = \\frac{b(i) - a(i)}{\\max(a(i), b(i))}, \\quad S \\in [-1, +1]',
            keyPoints: [
              'a(i): Mean distance from sample point i to all other points within the SAME cluster (cohesion / compactness).',
              'b(i): Mean distance from sample point i to all points in the NEAREST neighbor cluster (separation).',
              'S(i) near +1: Sample is far from neighboring clusters and tightly bound to its own cluster (excellent clustering).',
              'S(i) near 0: Sample lies on the boundary between two clusters.',
              'S(i) near -1: Sample is misassigned and is closer to another cluster than its own.'
            ],
            examSignificance: 'Mandatory syllabus calculation. Calculate Silhouette score S(P1) for point P1 given a(P1)=1.2 and b(P1)=4.5: S = (4.5-1.2)/4.5 = 0.733.',
            realWorldExample: 'Evaluating patient phenotype clustering quality in medical clinical trials.',
            linkedLabId: 'u4-clustering',
            linkedLabTitle: 'K-Means vs DBSCAN Clustering Sandbox',
            connections: ['u4-kmeans', 'u4-dbscan']
          }
        ]
      },
      {
        id: 'u4-b6-pca',
        title: 'Dimensionality Reduction & PCA',
        colorName: 'indigo',
        badgeBg: 'bg-indigo-100 text-indigo-800 border-indigo-200',
        borderColor: 'border-indigo-400',
        textColor: 'text-indigo-700',
        cardBg: 'bg-indigo-50/50',
        ringColor: 'ring-indigo-500/20',
        accentHex: '#4f46e5',
        gradient: 'from-indigo-500 to-blue-600',
        iconName: 'Compass',
        description: 'Curse of Dimensionality, Covariance matrix, Eigenvalues and Eigenvectors, PCA projection, and explained variance ratio.',
        nodes: [
          {
            id: 'u4-curse-dim',
            label: 'The Curse of Dimensionality',
            category: 'Dimensionality',
            description: 'Phenomena that arise when analyzing data in high-dimensional spaces where volume grows exponentially and data becomes sparse.',
            bloomLevel: 'K2',
            bloomLabel: 'Understand',
            keyPoints: [
              'Distance Concentration: Euclidean distances between any two points become equidistant as dimensions increase, degrading clustering.',
              'Data Sparsity: Required sample size to train models grows exponentially with feature count.',
              'Computational Overload: Massive memory and processing overhead in model training.'
            ],
            examSignificance: 'Explain the 3 consequences of the Curse of Dimensionality on distance-based algorithms like KNN and K-Means.',
            realWorldExample: 'Analyzing hyperspectral satellite imagery with 250 spectral frequency bands.',
            connections: ['u4-pca-math']
          },
          {
            id: 'u4-pca-math',
            label: 'Principal Component Analysis (PCA)',
            category: 'PCA',
            description: 'Unsupervised linear transformation technique that projects data onto orthogonal axes of maximum variance.',
            bloomLevel: 'K4',
            bloomLabel: 'Analyze',
            formula: '\\Sigma = \\frac{1}{n} X^T X, \\quad \\Sigma v_i = \\lambda_i v_i, \\quad \\text{Explained Ratio} = \\frac{\\lambda_j}{\\sum \\lambda_i}',
            keyPoints: [
              'Step 1: Standardize features to zero mean and unit variance (Z-score). Crucial so large-scale features do not dominate!',
              'Step 2: Compute Covariance Matrix Sigma.',
              'Step 3: Calculate Eigenvectors v_i (directions of principal components) and Eigenvalues lambda_i (variance explained).',
              'Step 4: Sort eigenvectors by descending eigenvalues; project data onto top k components.',
              'Principal components are strictly orthogonal (uncorrelated) to each other.'
            ],
            examSignificance: 'Frequent Part B question. State the 5 algorithmic steps of PCA and compute explained variance ratio for given eigenvalues.',
            realWorldExample: 'Eigenfaces facial recognition compressing 10,000-pixel images into 50 principal components.',
            linkedLabId: 'u4-pca',
            linkedLabTitle: 'PCA & Feature Scaling Studio',
            connections: ['u4-curse-dim']
          }
        ]
      }
    ],
    knowledgeFlow: [
      { step: 1, title: 'Understand Unsupervised Scope', desc: 'Identify when tasks lack target labels and require intrinsic pattern discovery.', conceptId: 'u4-unsupervised-core' },
      { step: 2, title: 'Apply K-Means Partitioning', desc: 'Iterate centroid assignments and find optimal K via the Elbow method.', conceptId: 'u4-kmeans' },
      { step: 3, title: 'Deploy Density-Based DBSCAN', desc: 'Isolate arbitrary clusters and flag outliers using Epsilon and MinPts.', conceptId: 'u4-dbscan' },
      { step: 4, title: 'Build Hierarchical Dendrograms', desc: 'Merge clusters agglomeratively and cut dendrogram at target similarity heights.', conceptId: 'u4-hierarchical' },
      { step: 5, title: 'Validate with Silhouette Score', desc: 'Measure cluster cohesion and separation on [-1, +1] using S = (b-a)/max(a,b).', conceptId: 'u4-silhouette' },
      { step: 6, title: 'Reduce Dimensions via PCA', desc: 'Standardize features, compute covariance eigenvectors, and project onto principal axes.', conceptId: 'u4-pca-math' }
    ],
    examChecklist: [
      'Contrast K-Means vs DBSCAN vs Hierarchical clustering in a comprehensive matrix.',
      'Show 1 full iteration of K-Means calculating new cluster centroids from point sets.',
      'Classify 2D points into Core, Border, and Noise points under DBSCAN parameters.',
      'Calculate Silhouette Score S(i) from provided intra-cluster a(i) and inter-cluster b(i) values.',
      'Explain the Curse of Dimensionality and why distance metrics become uninformative in high dimensions.',
      'List the mathematical steps of PCA from Z-score standardization to eigenvector projection.'
    ]
  },

  // ==========================================
  // UNIT 5: APPLIED ML, EVALUATION & PREPROCESSING
  // ==========================================
  {
    unitNumber: 5,
    unitTitle: 'Unit V: Applied Machine Learning, Preprocessing & Evaluation',
    shortTitle: 'Applied ML & Evaluation',
    courseOutcome: 'CO5',
    coDescription: 'Implement and evaluate supervised learning algorithms for classification and regression tasks.',
    centralHub: {
      title: 'Model Evaluation & Preprocessing',
      subtitle: 'CO5: Production ML Engineering',
      description: 'The rigorous evaluation and preprocessing toolkit for enterprise ML: confusion matrix metrics, ROC-AUC threshold curves, K-Fold cross validation, categorical encoding (One-Hot vs Label), feature selection (Filter, Wrapper, Embedded), and Grid Search hyperparameter optimization.',
      gradient: 'from-indigo-600 via-purple-600 to-pink-600',
      accentHex: '#4f46e5',
      badgeColor: 'bg-indigo-600'
    },
    quickSummary: [
      'Accuracy = (TP+TN)/Total can be deceptively high on imbalanced datasets; Precision and Recall are essential.',
      'Precision measures predictive purity (TP/(TP+FP)); Recall measures capture rate (TP/(TP+FN)).',
      'The ROC curve plots True Positive Rate vs False Positive Rate; AUC summarizes discrimination across all thresholds.',
      'K-Fold Cross-Validation guards against data snooping; Stratified K-Fold preserves class distributions.',
      'Nominal categories require One-Hot binary encoding; ordinal categories use sequential Label Encoding.',
      'Feature selection (Filter, RFE, LASSO) eliminates noise, boosts test accuracy, and prevents overfitting.',
      'Grid Search CV exhaustively tests the Cartesian product of hyperparameter pairs to find the global optimum.'
    ],
    branches: [
      {
        id: 'u5-b1-confusion',
        title: 'Confusion Matrix & Core Performance Metrics',
        colorName: 'indigo',
        badgeBg: 'bg-indigo-100 text-indigo-800 border-indigo-200',
        borderColor: 'border-indigo-400',
        textColor: 'text-indigo-700',
        cardBg: 'bg-indigo-50/50',
        ringColor: 'ring-indigo-500/20',
        accentHex: '#4f46e5',
        gradient: 'from-indigo-500 to-purple-600',
        iconName: 'Award',
        description: 'TP, TN, FP, FN quadrants, Accuracy paradox, Precision, Recall, Specificity, and F1-score harmonic mean.',
        nodes: [
          {
            id: 'u5-matrix-metrics',
            label: 'The Confusion Matrix & 5 Primary Metrics',
            category: 'Metrics',
            description: 'The 2x2 contingency table tabulating ground truth against predicted binary classes.',
            bloomLevel: 'K4',
            bloomLabel: 'Analyze',
            formula: '\\text{Accuracy} = \\frac{TP + TN}{TP + TN + FP + FN}, \\quad \\text{Precision} = \\frac{TP}{TP + FP}, \\quad \\text{Recall} = \\frac{TP}{TP + FN}',
            keyPoints: [
              'True Positives (TP): Correctly predicted positive instances.',
              'True Negatives (TN): Correctly predicted negative instances.',
              'False Positives (FP / Type I error): Negative instances wrongly predicted as positive.',
              'False Negatives (FN / Type II error): Positive instances missed and wrongly predicted as negative.',
              'Accuracy Paradox: A model predicting all 0s in a 95% negative dataset gets 95% accuracy while possessing 0% utility!',
              'F1-Score: Harmonic mean 2 * (Precision * Recall) / (Precision + Recall), penalizing extreme imbalances.'
            ],
            examSignificance: 'Mandatory syllabus numerical. Given TP=45, TN=40, FP=10, FN=5, calculate Accuracy (85.0%), Precision (81.8%), Recall (90.0%), and F1-Score (85.7%).',
            realWorldExample: 'Medical cancer screening where False Negatives (missing cancer) are fatal, demanding maximum Recall over Precision.',
            linkedLabId: 'u5-confusion',
            linkedLabTitle: 'Confusion Matrix & ROC Threshold Tuner',
            connections: ['u5-roc-auc']
          }
        ]
      },
      {
        id: 'u5-b2-roc',
        title: 'Diagnostic Curves & Threshold Tuning',
        colorName: 'purple',
        badgeBg: 'bg-purple-100 text-purple-800 border-purple-200',
        borderColor: 'border-purple-400',
        textColor: 'text-purple-700',
        cardBg: 'bg-purple-50/50',
        ringColor: 'ring-purple-500/20',
        accentHex: '#9333ea',
        gradient: 'from-purple-500 to-pink-600',
        iconName: 'Sparkles',
        description: 'Classification probability threshold shifting, Receiver Operating Characteristic (ROC), and AUC interpretation.',
        nodes: [
          {
            id: 'u5-roc-auc',
            label: 'ROC Curve & Area Under the Curve (AUC)',
            category: 'Curves',
            description: 'Evaluates classifier ranking performance across all possible probability classification thresholds (0.0 to 1.0).',
            bloomLevel: 'K4',
            bloomLabel: 'Analyze',
            formula: 'TPR = \\frac{TP}{TP + FN} = \\text{Recall}, \\quad FPR = \\frac{FP}{TN + FP} = 1 - \\text{Specificity}',
            keyPoints: [
              'y-axis: True Positive Rate (Sensitivity / Recall); x-axis: False Positive Rate (1 - Specificity).',
              'Diagonal Line (y=x): Represents purely random coin-flip guessing with AUC = 0.5.',
              'Top-Left Corner (0, 1): Perfect theoretical classifier with 100% TPR and 0% FPR; AUC = 1.0.',
              'Threshold Shifting: Lowering cutoff from 0.5 to 0.2 catches more positive cases (higher recall) at the cost of more false alarms (lower precision).'
            ],
            examSignificance: 'Draw the ROC curve graph, plot random vs excellent models, and explain how changing threshold impacts Precision and Recall.',
            realWorldExample: 'Credit card fraud detection operating at low probability thresholds (0.15) to catch suspicious transactions immediately.',
            linkedLabId: 'u5-confusion',
            linkedLabTitle: 'Confusion Matrix & ROC Threshold Tuner',
            connections: ['u5-matrix-metrics']
          }
        ]
      },
      {
        id: 'u5-b3-validation',
        title: 'Validation & Resampling Methodologies',
        colorName: 'pink',
        badgeBg: 'bg-pink-100 text-pink-800 border-pink-200',
        borderColor: 'border-pink-400',
        textColor: 'text-pink-700',
        cardBg: 'bg-pink-50/50',
        ringColor: 'ring-pink-500/20',
        accentHex: '#db2777',
        gradient: 'from-pink-500 to-rose-600',
        iconName: 'Shield',
        description: 'Hold-Out method, K-Fold Cross Validation, Stratified K-Fold for class imbalance, and preventing data leakage.',
        nodes: [
          {
            id: 'u5-cross-validation',
            label: 'K-Fold & Stratified K-Fold Cross-Validation',
            category: 'Validation',
            description: 'Resampling methodology that rotates training and validation partitions across K iterations to estimate true generalization error.',
            bloomLevel: 'K3',
            bloomLabel: 'Apply',
            formula: 'CV_{(K)} = \\frac{1}{K} \\sum_{i=1}^K Score_i',
            keyPoints: [
              'Standard K-Fold: Splits dataset into K equal folds; trains on K-1 folds, evaluates on 1 holdout fold; repeats K times and averages scores.',
              'Stratified K-Fold: Ensures each fold maintains the identical percentage of target classes as the complete dataset (crucial for imbalanced classes).',
              'Data Leakage Prevention: Scalers and encoders must be fit exclusively on training folds during each rotation, never on the holdout fold!'
            ],
            examSignificance: 'Diagram 5-fold cross validation and explain why Stratified K-Fold is mandatory when positive class frequency is under 10%.',
            realWorldExample: 'Clinical pharmaceutical trials where small sample sizes demand 10-fold cross validation to prove drug efficacy.',
            connections: ['u5-gridsearch']
          }
        ]
      },
      {
        id: 'u5-b4-preprocessing',
        title: 'Data Preprocessing & Categorical Encoding',
        colorName: 'violet',
        badgeBg: 'bg-violet-100 text-violet-800 border-violet-200',
        borderColor: 'border-violet-400',
        textColor: 'text-violet-700',
        cardBg: 'bg-violet-50/50',
        ringColor: 'ring-violet-500/20',
        accentHex: '#7c3aed',
        gradient: 'from-violet-500 to-purple-600',
        iconName: 'Palette',
        description: 'Missing value imputation, Min-Max vs StandardScaler scaling, and One-Hot vs Label Encoding for nominal/ordinal data.',
        nodes: [
          {
            id: 'u5-encoding',
            label: 'One-Hot vs Label (Ordinal) Encoding',
            category: 'Preprocessing',
            description: 'Techniques for transforming qualitative categorical text variables into numeric vectors digestible by machine learning models.',
            bloomLevel: 'K3',
            bloomLabel: 'Apply',
            keyPoints: [
              'Nominal Categories (Unordered, e.g. Color = {Red, Blue, Green}): Must use One-Hot Encoding (creates binary dummy columns). Prevents linear models from assuming Green(2) > Blue(1) > Red(0)!',
              'Ordinal Categories (Ranked, e.g. Education = {HighSchool, Bachelor, Master, PhD}): Uses sequential Label Encoding (0, 1, 2, 3) to preserve natural order.',
              'Dummy Variable Trap: In linear regression, drop 1 dummy column (p-1 columns) to prevent multi-collinearity with the intercept.'
            ],
            examSignificance: 'Mandatory syllabus question. Explain how to encode "Color" (Red, Blue, Green) and "Education" (UG, PG, PhD), specifying which gets One-Hot and which gets Label encoding.',
            realWorldExample: 'Encoding customer zip codes and subscription tiers for bank churn modeling.',
            linkedLabId: 'u5-encoding',
            linkedLabTitle: 'Categorical Encoding: One-Hot vs Label Encoding',
            connections: ['u5-scaling']
          },
          {
            id: 'u5-scaling',
            label: 'Feature Scaling: Min-Max vs StandardScaler',
            category: 'Scaling',
            description: 'Transforming features to comparable numerical ranges so large magnitude columns do not dominate gradient updates.',
            bloomLevel: 'K3',
            bloomLabel: 'Apply',
            formula: 'x_{norm} = \\frac{x - x_{min}}{x_{max} - x_{min}}, \\quad Z = \\frac{x - \\mu}{\\sigma}',
            keyPoints: [
              'Min-Max Normalization: Rescales values into bounded [0, 1] range; highly sensitive to extreme outliers.',
              'StandardScaler (Z-Score): Centers distribution around mean 0 with standard deviation 1; handles outliers robustly.',
              'Mandatory for distance-based models (KNN, K-Means, SVM, PCA) and gradient descent algorithms.'
            ],
            examSignificance: 'Calculate Z-score standardized value for a given data point with mean=50 and std=10.',
            realWorldExample: 'Scaling customer Age (20-80) and Annual Income ($20,000-$500,000) before feeding to K-Means clustering.'
          }
        ]
      },
      {
        id: 'u5-b5-features',
        title: 'Feature Selection Strategies',
        colorName: 'amber',
        badgeBg: 'bg-amber-100 text-amber-800 border-amber-200',
        borderColor: 'border-amber-400',
        textColor: 'text-amber-700',
        cardBg: 'bg-amber-50/50',
        ringColor: 'ring-amber-500/20',
        accentHex: '#d97706',
        gradient: 'from-amber-500 to-orange-600',
        iconName: 'Sliders',
        description: 'Filter methods (correlation, Chi-square), Wrapper methods (RFE), and Embedded methods (LASSO L1, tree importance).',
        nodes: [
          {
            id: 'u5-feature-selection',
            label: 'Filter, Wrapper & Embedded Methods',
            category: 'Feature Selection',
            description: 'Selecting optimal feature subsets to eliminate noisy variables, lower overfitting, and accelerate model inference.',
            bloomLevel: 'K4',
            bloomLabel: 'Analyze',
            keyPoints: [
              'Filter Methods: Fast statistical tests independent of model (Pearson correlation, Chi-Square, ANOVA F-test). Cannot detect feature interactions.',
              'Wrapper Methods: Evaluates feature subsets by training actual models iteratively (Recursive Feature Elimination RFE, Forward/Backward selection). Accurate but computationally intensive.',
              'Embedded Methods: Feature selection built directly into algorithm training (LASSO L1 penalty driving weights to zero, Random Forest Gini importance).'
            ],
            examSignificance: 'Construct a 3-column table comparing Filter, Wrapper, and Embedded methods across Computational Speed, Model Dependence, and Overfitting Risk.',
            realWorldExample: 'Selecting the top 15 informative features from 200 telemetry sensors on an aircraft engine.',
            linkedLabId: 'u5-features',
            linkedLabTitle: 'Automatic Feature Selection Lab: Filter, Wrapper, LASSO',
            connections: ['u5-gridsearch']
          }
        ]
      },
      {
        id: 'u5-b6-optimization',
        title: 'Hyperparameter Optimization & Grid Search',
        colorName: 'emerald',
        badgeBg: 'bg-emerald-100 text-emerald-800 border-emerald-200',
        borderColor: 'border-emerald-400',
        textColor: 'text-emerald-700',
        cardBg: 'bg-emerald-50/50',
        ringColor: 'ring-emerald-500/20',
        accentHex: '#059669',
        gradient: 'from-emerald-500 to-teal-600',
        iconName: 'Grid',
        description: 'Parameters vs Hyperparameters, Grid Search CV exhaustive Cartesian evaluation, Random Search, and validation heatmaps.',
        nodes: [
          {
            id: 'u5-gridsearch',
            label: 'Grid Search CV & Hyperparameter Tuning',
            category: 'Optimization',
            description: 'Exhaustively evaluates the Cartesian product of candidate hyperparameter combinations using K-Fold Cross Validation.',
            bloomLevel: 'K4',
            bloomLabel: 'Analyze',
            keyPoints: [
              'Parameters: Learned directly from training data (weights w, intercept b, split criteria).',
              'Hyperparameters: Configured prior to training by engineer (learning rate alpha, tree max_depth, regularization lambda, k in KNN).',
              'Grid Search: Evaluates every combination in the parameter grid; guaranteed to find best configuration in grid, but computationally expensive O(N_comb * K_folds).',
              'Random Search: Samples random combinations from distributions; significantly faster in high dimensions with comparable accuracy.'
            ],
            examSignificance: 'Calculate total model training runs required: 4 values of max_depth * 3 values of learning_rate * 5-fold CV = 60 model fits!',
            realWorldExample: 'Fine-tuning XGBoost tree depth and learning rate to maximize telecom churn AUC.',
            linkedLabId: 'u5-gridsearch',
            linkedLabTitle: 'Grid Search 2D Hyperparameter Heatmap',
            connections: ['u5-cross-validation']
          }
        ]
      }
    ],
    knowledgeFlow: [
      { step: 1, title: 'Preprocess & Encode Features', desc: 'Apply One-Hot encoding to nominal variables and scale numeric ranges.', conceptId: 'u5-encoding' },
      { step: 2, title: 'Prune Noisy Features', desc: 'Select high-yield features using Filter, RFE, or LASSO embedded methods.', conceptId: 'u5-feature-selection' },
      { step: 3, title: 'Establish Cross-Validation', desc: 'Partition data into Stratified K-Folds to prevent overfitting and data leakage.', conceptId: 'u5-cross-validation' },
      { step: 4, title: 'Tune Hyperparameters via Grid Search', desc: 'Sweep parameter combinations across folds to locate optimal settings.', conceptId: 'u5-gridsearch' },
      { step: 5, title: 'Evaluate Confusion Matrix', desc: 'Calculate Accuracy, Precision, Recall, and F1-Score on test predictions.', conceptId: 'u5-matrix-metrics' },
      { step: 6, title: 'Calibrate ROC Thresholds', desc: 'Plot ROC curve and tune probability cutoff to match operational business costs.', conceptId: 'u5-roc-auc' }
    ],
    examChecklist: [
      'Calculate complete Confusion Matrix metrics (Accuracy, Precision, Recall, F1) from raw counts.',
      'Explain the Accuracy Paradox with an imbalanced fraud or cancer detection scenario.',
      'Draw the ROC curve, define TPR and FPR formulas, and interpret AUC scores.',
      'Differentiate standard K-Fold vs Stratified K-Fold cross validation.',
      'Show how to encode Color {Red, Blue, Green} and Education {UG, PG, PhD}.',
      'Compare Filter, Wrapper (RFE), and Embedded (LASSO) feature selection methods.'
    ]
  }
];
