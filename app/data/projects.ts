export type Project = {
  id: string;
  title: string;
  description: string;
  tech: string[];
  liveUrl: string;
  githubUrl: string;
  color: string;
  architectureDetails?: {
    summaryBullets: string[];
    environments: { 
      name: string; 
      details: string;
      diagramNodes: { id: string; label: string; x: number; y: number; color: string }[];
      diagramEdges: { source: string; target: string; label: string }[];
    }[];
    decisions: { 
      title: string; 
      reason: string; 
      comparison: { method: string; pros: string; cons: string }[];
    }[];
    codeSnippets: { 
      title: string; 
      language: string; 
      code: string;
      explanation: string;
    }[];
  };
};

export const projects: Project[] = [
  {
    id: "fitpulse",
    title: "FitPulse",
    description: "AI-powered fitness tracking platform with a 365-day consistency heatmap and personalized AI coaching.",
    tech: ["FastAPI", "React", "PostgreSQL", "Gemini API"],
    liveUrl: "https://fitpulse-six-nu.vercel.app", 
    githubUrl: "https://github.com/thasneemsha/fitpulse",
    color: "from-violet-500 to-fuchsia-500",
    architectureDetails: {
      summaryBullets: [
        "Decoupled three-tier architecture: React frontend, FastAPI backend, PostgreSQL database.",
        "Backend serves as a secure API gateway, protecting sensitive API keys and database credentials.",
        "Flexible JSONB storage allows handling different workout types (cardio, strength) without migrations.",
        "Integrated Google Gemini API for personalized AI coaching based on user history.",
        "Stateless JWT authentication with bcrypt password hashing."
      ],
      environments: [
        { 
          name: "Local Development", 
          details: "Runs entirely on localhost. React uses Vite for fast HMR. Backend uses SQLite for zero-config testing.",
          diagramNodes: [
            { id: "local-client", label: "React (Vite)\nlocalhost:5173", x: 50, y: 100, color: "#3b82f6" },
            { id: "local-backend", label: "FastAPI\nlocalhost:8000", x: 300, y: 100, color: "#8b5cf6" },
            { id: "local-db", label: "SQLite\n(local file)", x: 300, y: 300, color: "#10b981" }
          ],
          diagramEdges: [
            { source: "local-client", target: "local-backend", label: "HTTP" },
            { source: "local-backend", target: "local-db", label: "SQLAlchemy" }
          ]
        },
        { 
          name: "Production Environment", 
          details: "Distributed cloud hosting. Vercel serves static assets globally. Render hosts the Dockerized API. Neon provides serverless Postgres.",
          diagramNodes: [
            { id: "prod-client", label: "Vercel\n(Edge Network)", x: 50, y: 100, color: "#3b82f6" },
            { id: "prod-backend", label: "Render\n(Docker Container)", x: 300, y: 100, color: "#8b5cf6" },
            { id: "prod-db", label: "Neon\n(Serverless Postgres)", x: 300, y: 300, color: "#10b981" },
            { id: "prod-gemini", label: "Google Gemini API", x: 550, y: 100, color: "#f59e0b" }
          ],
          diagramEdges: [
            { source: "prod-client", target: "prod-backend", label: "HTTPS" },
            { source: "prod-backend", target: "prod-db", label: "SSL Connection" },
            { source: "prod-backend", target: "prod-gemini", label: "REST API" }
          ]
        }
      ],
      decisions: [
        { 
          title: "Why JSONB for Workouts?", 
          reason: "Strength workouts need sets and reps. Cardio needs distance and time. A traditional relational schema would require creating new tables for every new workout type. JSONB allows us to store any shape of data in one column.",
          comparison: [
            { method: "Relational Tables", pros: "Strict schema, easy to index", cons: "Requires migrations for every new metric" },
            { method: "JSONB Columns (Chosen)", pros: "Infinitely flexible, no migrations needed", cons: "Harder to validate at DB level (solved via Pydantic)" }
          ]
        },
        { 
          title: "Why FastAPI + Pydantic?", 
          reason: "FastAPI automatically generates Swagger documentation. Pydantic validates incoming data at the API boundary. If a user sends a negative weight or a string instead of a number, Pydantic rejects it before it touches the database.",
          comparison: [
            { method: "Express.js", pros: "Simple, widely used", cons: "Requires manual validation libraries like Joi/Zod" },
            { method: "FastAPI (Chosen)", pros: "Built-in validation, auto-docs, extreme performance", cons: "Python async can be tricky to learn" }
          ]
        }
      ],
      codeSnippets: [
        { 
          title: "Flexible Database Schema", 
          language: "python", 
          code: `class Workout(Base):\n    __tablename__ = "workouts"\n    id = Column(Integer, primary_key=True)\n    user_id = Column(Integer, ForeignKey("users.id"))\n    \n    # JSONB allows dynamic workout structures\n    metrics = Column(JSONB, nullable=False)\n    created_at = Column(DateTime, default=datetime.utcnow)`,
          explanation: "This is how we store varying workout data in a single table. The `metrics` column can hold anything from `{distance: 5km}` to `{sets: 3, reps: 10}`."
        },
        { 
          title: "Secure API Proxy (Gemini)", 
          language: "python", 
          code: `@app.get("/api/insights")\nasync def get_insights(user_id: int):\n    history = fetch_user_history(user_id)\n    prompt = f"Analyze this workout history: {history}"\n    # The API key is injected via environment variables\n    response = await gemini_client.generate_content(prompt)\n    return {"insight": response.text}`,
          explanation: "The frontend NEVER talks to Gemini directly. It asks our FastAPI backend, which injects the secret API key and returns the result."
        }
      ]
    }
  },
  {
    id: "gamemesh",
    title: "GameMesh (API-GameScope)",
    description: "Server-side API orchestration engine combining Twitch and RAWG APIs with OAuth 2.0 token caching.",
    tech: ["Node.js", "REST APIs", "OAuth 2.0"],
    liveUrl: "#",
    githubUrl: "https://github.com/thasneemsha/API-GameScope",
    color: "from-cyan-500 to-blue-500",
    architectureDetails: {
      summaryBullets: [
        "Server-side Node.js application that merges Twitch live ecosystem data with RAWG game intelligence.",
        "Strict sequential API orchestration (Twitch Game ID → Live Streams → RAWG Metadata).",
        "OAuth 2.0 client-credentials authentication with server-side token caching.",
        "Server-rendered HTML output (no frontend frameworks or build tools).",
        "Graceful error handling for API timeouts, invalid searches, and empty responses."
      ],
      environments: [
        { 
          name: "Local Development", 
          details: "Runs via Node.js HTTP module. Requires Twitch and RAWG API keys in a local credentials.json file.",
          diagramNodes: [
            { id: "client", label: "Web Form\n(HTML)", x: 50, y: 100, color: "#3b82f6" },
            { id: "server", label: "Node.js Server", x: 300, y: 100, color: "#8b5cf6" }
          ],
          diagramEdges: [
            { source: "client", target: "server", label: "POST Request" }
          ]
        },
        { 
          name: "API Workflow", 
          details: "The server authenticates with Twitch, fetches the game ID, fetches live streams, then uses that data to query RAWG for game metadata.",
          diagramNodes: [
            { id: "node", label: "Node Server", x: 50, y: 150, color: "#8b5cf6" },
            { id: "twitch", label: "Twitch API\n(OAuth 2.0)", x: 300, y: 50, color: "#9146FF" },
            { id: "rawg", label: "RAWG API\n(API Key)", x: 300, y: 250, color: "#10b981" }
          ],
          diagramEdges: [
            { source: "node", target: "twitch", label: "Get Game ID" },
            { source: "node", target: "twitch", label: "Get Streams" },
            { source: "node", target: "rawg", label: "Get Metadata" }
          ]
        }
      ],
      decisions: [
        { 
          title: "Why Sequential Execution?", 
          reason: "The RAWG API cannot be called until we have the exact game name and ID from Twitch. Enforcing strict sequential execution prevents race conditions and ensures data dependency correctness.",
          comparison: [
            { method: "Parallel Requests", pros: "Faster response time", cons: "Will fail because RAWG needs Twitch data first" },
            { method: "Sequential Execution (Chosen)", pros: "Guarantees data correctness", cons: "Slightly slower" }
          ]
        },
        { 
          title: "Why Token Caching?", 
          reason: "Twitch OAuth tokens expire. Requesting a new token on every search is slow and hits rate limits. Caching the token locally in a JSON file drastically improves performance.",
          comparison: [
            { method: "No Cache", pros: "Always fresh token", cons: "Slow, redundant API calls, rate limit risk" },
            { method: "Local Cache (Chosen)", pros: "Fast, efficient", cons: "Must handle token expiration edge cases" }
          ]
        }
      ],
      codeSnippets: [
        { 
          title: "OAuth Token Caching", 
          language: "javascript", 
          code: `// Check if token exists and is valid\nif (!tokenCache || isExpired(tokenCache)) {\n  const response = await fetch('https://id.twitch.tv/oauth2/token', {\n    method: 'POST',\n    body: new URLSearchParams({\n      client_id: CLIENT_ID,\n      client_secret: SECRET,\n      grant_type: 'client_credentials'\n    })\n  });\n  tokenCache = await response.json();\n  fs.writeFileSync('cache/token.json', JSON.stringify(tokenCache));\n}`,
          explanation: "This prevents the app from requesting a new OAuth token on every single search, saving time and avoiding rate limits."
        }
      ]
    }
  },
  {
    id: "tipsplit",
    title: "TipSplit",
    description: "Native Android app for real-time bill splitting using Jetpack Compose and unidirectional data flow.",
    tech: ["Kotlin", "Jetpack Compose", "Material3"],
    liveUrl: "#",
    githubUrl: "https://github.com/thasneemsha/TipSplit",
    color: "from-emerald-500 to-teal-500",
    architectureDetails: {
      summaryBullets: [
        "Single-screen utility calculating tip, total, and per-person split in real-time.",
        "Single immutable TipUiState data class wrapped in StateFlow for atomic updates.",
        "LazyColumn with unique keys for efficient list recomposition.",
        "State hoisting used to separate stateful wrappers from stateless UI components.",
        "Material 3 UI with custom regex validation and divide-by-zero protection."
      ],
      environments: [
        { 
          name: "Android Runtime", 
          details: "The app runs on Android devices. The ViewModel survives configuration changes (like screen rotation).",
          diagramNodes: [
            { id: "ui", label: "UI (Jetpack Compose)", x: 50, y: 100, color: "#3b82f6" },
            { id: "vm", label: "ViewModel\n(StateFlow)", x: 300, y: 100, color: "#8b5cf6" }
          ],
          diagramEdges: [
            { source: "ui", target: "vm", label: "Events" },
            { source: "vm", target: "ui", label: "State" }
          ]
        }
      ],
      decisions: [
        { 
          title: "Why a Single UIState Class?", 
          reason: "The three inputs (bill, tip %, split count) are tightly coupled. Bundling them into one immutable data class ensures atomic updates, meaning the UI never renders a half-updated state.",
          comparison: [
            { method: "Multiple Variables", pros: "Simple for small apps", cons: "Risk of UI glitches from partial updates" },
            { method: "Single UIState (Chosen)", pros: "Guaranteed atomic updates, predictable UI", cons: "Slight performance overhead on massive screens" }
          ]
        }
      ],
      codeSnippets: [
        { 
          title: "StateFlow & Atomic Updates", 
          language: "kotlin", 
          code: `data class TipUiState(\n    val billInput: String = "",\n    val tipPercentage: Int = 15,\n    val splitCount: Int = 1\n) {\n    // Computed getters automatically recalculate\n    val totalBill: Double get() = ...\n}\n\n// ViewModel\nprivate val _uiState = MutableStateFlow(TipUiState())\nval uiState: StateFlow<TipUiState> = _uiState.asStateFlow()`,
          explanation: "By using an immutable data class and a computed getter for `totalBill`, we don't need to manually update the total every time the bill changes."
        }
      ]
    }
  }
];