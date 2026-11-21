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
  // ... gamemesh and tipsplit remain the same
  {
    id: "gamemesh",
    title: "GameMesh",
    description: "Server-side API orchestration engine combining Twitch and RAWG APIs with OAuth 2.0 token caching.",
    tech: ["Node.js", "REST APIs", "OAuth 2.0"],
    liveUrl: "#",
    githubUrl: "https://github.com/thasneemsha/openlibrary-youtube-mashup",
    color: "from-cyan-500 to-blue-500",
  },
  {
    id: "tipsplit",
    title: "TipSplit",
    description: "Native Android app for real-time bill splitting using Jetpack Compose and unidirectional data flow.",
    tech: ["Kotlin", "Jetpack Compose", "Material3"],
    liveUrl: "#",
    githubUrl: "https://github.com/thasneemsha/TipSplit",
    color: "from-emerald-500 to-teal-500",
  },
];