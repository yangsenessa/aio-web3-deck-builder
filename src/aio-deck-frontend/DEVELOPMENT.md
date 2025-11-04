# AIO2030 Platform - Development Guide

## Setup Instructions

### Prerequisites
- Node.js 18+ or Bun
- npm 9+ or Bun package manager
- Git
- Code editor (VS Code recommended)
- MetaMask browser extension (for testing)

### Initial Setup

```bash
# Clone repository
git clone <repository-url>
cd aio-deck-frontend

# Install dependencies
npm install
# or
bun install

# Start development server
npm run dev
# or
bun dev
```

The application will be available at `http://localhost:5173`

---

## Project Architecture

### Technology Stack
- **Framework**: React 18.3 + TypeScript 5.5
- **Build Tool**: Vite 5.4
- **Styling**: Tailwind CSS 3.4 + Custom Design System
- **Routing**: React Router DOM 6.26
- **UI Components**: Shadcn UI (Radix UI primitives)
- **Icons**: Lucide React
- **Animations**: Framer Motion
- **Form Handling**: React Hook Form + Zod validation

### Folder Structure

```
src/
├── components/           # Reusable React components
│   ├── MainLayout.tsx   # App shell with navigation
│   ├── WalletButton.tsx # Wallet connection logic
│   ├── slides/          # Presentation slides
│   └── ui/              # Shadcn UI components
├── pages/               # Route-level components
│   ├── Dashboard.tsx    # Home page
│   ├── AIOPage.tsx      # Voice AI feature
│   ├── UnivoicePage.tsx # NFT marketplace
│   ├── PMugPage.tsx     # Presale page
│   └── AboutAIO.tsx     # Project deck
├── hooks/               # Custom React hooks
├── lib/                 # Utility functions
├── App.tsx              # Root component + routing
├── main.tsx             # Entry point
└── index.css            # Global styles
```

---

## Design System

### Colors
Defined in `tailwind.config.ts`:
```typescript
colors: {
  aio: {
    dark: "#0E1117",
    darker: "#0B0F14",
    text: {
      primary: "#E6EAF2",
      secondary: "#9AA4B2",
      muted: "#6B7280"
    },
    gradient: {
      from: "#4F46E5",
      to: "#8B5CF6"
    },
    success: "#10B981",
    warning: "#F59E0B",
    danger: "#EF4444"
  }
}
```

### Utility Classes
Custom utilities in `index.css`:
- `.glass-card` - Glass morphism effect
- `.btn-primary` - Primary gradient button
- `.btn-ghost` - Outlined button
- `.text-gradient` - Gradient text

### Component Patterns

#### Card Component
```tsx
<div className="rounded-xl border border-white/10 bg-white/[0.02] p-6 hover:bg-white/[0.04] transition-all">
  {/* Content */}
</div>
```

#### Gradient Button
```tsx
<button className="px-6 py-3 rounded-full bg-gradient-to-r from-indigo-600 to-fuchsia-600 text-white font-medium hover:brightness-110 transition-all">
  Click Me
</button>
```

#### Progress Bar
```tsx
<div className="h-2 rounded-full bg-white/10 overflow-hidden">
  <div 
    className="h-full bg-gradient-to-r from-indigo-600 to-purple-600 transition-all"
    style={{ width: `${progress}%` }}
  />
</div>
```

---

## Adding New Features

### Creating a New Page

1. **Create page component** in `src/pages/`:
```tsx
// src/pages/NewPage.tsx
import React from "react";

const NewPage: React.FC = () => {
  return (
    <div className="min-h-screen p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-gradient mb-6">
          New Feature
        </h1>
        {/* Content */}
      </div>
    </div>
  );
};

export default NewPage;
```

2. **Add route** in `src/App.tsx`:
```tsx
import NewPage from "./pages/NewPage";

// In Routes:
<Route path="/new" element={<MainLayout><NewPage /></MainLayout>} />
```

3. **Add navigation link** in `src/components/MainLayout.tsx`:
```tsx
const navigation = [
  // ... existing items
  { name: "New Feature", href: "/new" },
];
```

### Adding a New Component

1. **Create component file**:
```tsx
// src/components/MyComponent.tsx
import React from "react";

interface MyComponentProps {
  title: string;
  onAction?: () => void;
}

const MyComponent: React.FC<MyComponentProps> = ({ title, onAction }) => {
  return (
    <div className="glass-card p-4">
      <h3 className="text-lg font-bold text-slate-200">{title}</h3>
      {onAction && (
        <button onClick={onAction} className="btn-primary">
          Action
        </button>
      )}
    </div>
  );
};

export default MyComponent;
```

2. **Import and use**:
```tsx
import MyComponent from "../components/MyComponent";

<MyComponent title="Hello" onAction={() => console.log("Clicked")} />
```

---

## State Management

### Local Component State
Use React useState for component-level state:
```tsx
const [count, setCount] = useState(0);
const [data, setData] = useState<DataType | null>(null);
```

### Form State
Use React Hook Form for forms:
```tsx
import { useForm } from "react-hook-form";

const { register, handleSubmit, formState: { errors } } = useForm();

const onSubmit = (data) => {
  console.log(data);
};
```

### Global State (if needed)
Consider adding React Context or Zustand:
```tsx
// Example with Context
const WalletContext = createContext<WalletState | null>(null);

export const WalletProvider: React.FC = ({ children }) => {
  const [wallet, setWallet] = useState<WalletState>(initialState);
  
  return (
    <WalletContext.Provider value={{ wallet, setWallet }}>
      {children}
    </WalletContext.Provider>
  );
};
```

---

## Web3 Integration

### Wallet Connection Pattern

```tsx
const connectWallet = async () => {
  try {
    if (typeof window.ethereum !== "undefined") {
      // Request accounts
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      
      // Get balance
      const balance = await window.ethereum.request({
        method: "eth_getBalance",
        params: [accounts[0], "latest"],
      });
      
      // Convert balance
      const ethBalance = (parseInt(balance, 16) / 1e18).toFixed(4);
      
      setWallet({
        connected: true,
        address: accounts[0],
        balance: ethBalance,
      });
    }
  } catch (error) {
    console.error("Wallet connection failed:", error);
  }
};
```

### Smart Contract Interaction (Example)

```tsx
import { ethers } from "ethers";

const interactWithContract = async () => {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  
  const contract = new ethers.Contract(
    CONTRACT_ADDRESS,
    CONTRACT_ABI,
    signer
  );
  
  try {
    const tx = await contract.mint(quantity, {
      value: ethers.utils.parseEther(price),
    });
    
    await tx.wait();
    console.log("Transaction successful!");
  } catch (error) {
    console.error("Transaction failed:", error);
  }
};
```

---

## API Integration

### Example API Call Pattern

```tsx
const fetchData = async () => {
  try {
    const response = await fetch("https://api.example.com/data");
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    setData(data);
  } catch (error) {
    console.error("API call failed:", error);
    toast({
      title: "Error",
      description: "Failed to fetch data",
      variant: "destructive",
    });
  }
};
```

### ElevenLabs Voice API (Example)

```tsx
const recognizeVoice = async (audioBlob: Blob) => {
  const formData = new FormData();
  formData.append("audio", audioBlob);
  
  try {
    const response = await fetch("https://api.elevenlabs.io/v1/speech-to-text", {
      method: "POST",
      headers: {
        "xi-api-key": API_KEY,
      },
      body: formData,
    });
    
    const result = await response.json();
    return result.text;
  } catch (error) {
    console.error("Voice recognition failed:", error);
    return null;
  }
};
```

---

## Testing

### Component Testing (Vitest + React Testing Library)

```typescript
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import MyComponent from "./MyComponent";

describe("MyComponent", () => {
  it("renders correctly", () => {
    render(<MyComponent title="Test" />);
    expect(screen.getByText("Test")).toBeInTheDocument();
  });
  
  it("handles click events", () => {
    const handleClick = vi.fn();
    render(<MyComponent title="Test" onAction={handleClick} />);
    
    fireEvent.click(screen.getByRole("button"));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
```

### Running Tests

```bash
# Run tests
npm test

# Run with coverage
npm test -- --coverage

# Run in watch mode
npm test -- --watch
```

---

## Linting & Formatting

### ESLint
```bash
# Run linter
npm run lint

# Fix auto-fixable issues
npm run lint -- --fix
```

### TypeScript Check
```bash
# Check types
npx tsc --noEmit
```

### Configuration Files
- `.eslintrc.js` - ESLint rules
- `tsconfig.json` - TypeScript config
- `tailwind.config.ts` - Tailwind settings

---

## Building & Deployment

### Production Build

```bash
# Build for production
npm run build

# Preview production build
npm run preview
```

### Build Optimization
- Code splitting by route
- Image optimization
- CSS purging (unused Tailwind classes)
- Tree shaking for unused code
- Minification and compression

### Deployment to GitHub Pages

```bash
# Deploy to gh-pages branch
npm run deploy
```

### Environment Variables

Create `.env` files:
```bash
# .env.local (not committed)
VITE_API_KEY=your_api_key
VITE_CONTRACT_ADDRESS=0x...
VITE_CHAIN_ID=1

# Access in code:
const apiKey = import.meta.env.VITE_API_KEY;
```

---

## Performance Optimization

### Code Splitting
```tsx
import { lazy, Suspense } from "react";

const LazyComponent = lazy(() => import("./LazyComponent"));

<Suspense fallback={<div>Loading...</div>}>
  <LazyComponent />
</Suspense>
```

### Image Optimization
```tsx
<img
  src="/image.jpg"
  loading="lazy"
  alt="Description"
  className="w-full h-auto"
/>
```

### Memo and useCallback
```tsx
const MemoizedComponent = React.memo(MyComponent);

const handleClick = useCallback(() => {
  // Handle click
}, [dependencies]);
```

---

## Debugging

### React DevTools
- Install React DevTools browser extension
- Inspect component tree
- View props and state
- Profile performance

### Console Debugging
```tsx
console.log("Debug:", variable);
console.table(arrayData);
console.time("operation");
// ... code ...
console.timeEnd("operation");
```

### Error Boundaries
```tsx
class ErrorBoundary extends React.Component {
  componentDidCatch(error, errorInfo) {
    console.error("Error caught:", error, errorInfo);
  }
  
  render() {
    return this.props.children;
  }
}
```

---

## Common Issues & Solutions

### Issue: MetaMask not detected
**Solution**: Ensure MetaMask is installed and page is refreshed

### Issue: Transaction fails
**Solution**: Check gas fees, wallet balance, network connection

### Issue: Styles not applying
**Solution**: Check Tailwind config, rebuild dev server, clear cache

### Issue: Build fails
**Solution**: Check TypeScript errors, run `npm install`, verify Node version

### Issue: Slow development server
**Solution**: Clear `.vite` cache, restart server, check for circular imports

---

## Git Workflow

### Branch Strategy
- `main` - Production code
- `develop` - Development branch
- `feature/*` - New features
- `fix/*` - Bug fixes
- `hotfix/*` - Production hotfixes

### Commit Message Format
```
type(scope): subject

body

footer
```

Examples:
```
feat(wallet): add phantom wallet support
fix(ui): resolve mobile menu overlay issue
docs(readme): update installation instructions
```

### Pull Request Process
1. Create feature branch from `develop`
2. Make changes with clear commits
3. Test thoroughly
4. Open PR with description
5. Request review
6. Address feedback
7. Merge after approval

---

## Useful Commands

```bash
# Development
npm run dev              # Start dev server
npm run build            # Production build
npm run preview          # Preview build
npm run lint             # Run ESLint
npm test                 # Run tests

# Package Management
npm install              # Install dependencies
npm update               # Update packages
npm audit                # Check vulnerabilities
npm audit fix            # Fix vulnerabilities

# Git
git status               # Check changes
git add .                # Stage changes
git commit -m "msg"      # Commit
git push                 # Push to remote
git pull                 # Pull from remote

# Deployment
npm run deploy           # Deploy to GitHub Pages
```

---

## Resources

### Documentation
- [React Docs](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Vite Guide](https://vitejs.dev/guide/)
- [Shadcn UI](https://ui.shadcn.com)

### Web3 Libraries
- [ethers.js](https://docs.ethers.org)
- [web3.js](https://web3js.readthedocs.io)
- [Solana Web3.js](https://solana-labs.github.io/solana-web3.js/)

### Tools
- [React DevTools](https://react.dev/learn/react-developer-tools)
- [Tailwind CSS IntelliSense](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss)
- [ES7+ React Snippets](https://marketplace.visualstudio.com/items?itemName=dsznajder.es7-react-js-snippets)

---

## Support & Contributing

### Getting Help
- Check existing documentation
- Search closed issues on GitHub
- Ask in Discord #dev-support
- Create detailed issue report

### Contributing Guidelines
1. Fork repository
2. Create feature branch
3. Follow code style
4. Add tests
5. Update documentation
6. Submit pull request

---

**Last Updated**: November 4, 2025
**Maintainers**: AIO2030 Development Team

