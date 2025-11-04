# AIO2030 Platform - Project Structure

## Overview
This is a comprehensive Web3 platform for the AIO2030 ecosystem, featuring AI-powered IoT device control, NFT marketplace, and token presales.

## Design System

### Visual Theme
- **Dark Mode**: Primary background `#0E1117`, Secondary `#0B0F14`
- **Glass Morphism**: Cards with subtle backdrop blur and transparency
- **Neon Gradients**: Blue to Purple (`#4F46E5` → `#8B5CF6`)
- **High Contrast**: Excellent readability with WCAG AA compliance

### Typography
- **Font Stack**: Inter, SF Pro, Roboto (system sans-serif)
- **Hierarchy**: 
  - H1: 28-32px
  - H2: 22-24px
  - H3: 18-20px
  - Body: 14-16px
  - Caption: 12-13px

### Colors
- **Text Primary**: `#E6EAF2`
- **Text Secondary**: `#9AA4B2`
- **Text Muted**: `#6B7280`
- **Success**: `#10B981`
- **Warning**: `#F59E0B`
- **Danger**: `#EF4444`

## Application Structure

### Main Layout (`MainLayout.tsx`)
- Fixed top navigation bar with logo, wallet connection, and social links
- Collapsible left sidebar navigation (responsive)
- Main content area with proper spacing
- Mobile-first responsive design

### Pages

#### 1. Dashboard (`/`)
- Hero section with project introduction
- Key statistics cards (Total Nodes, Active Holders, TVL)
- Feature showcase cards
- Quick action CTAs

#### 2. AIO Page (`/aio`)
- **Scrolling Banner**: Three rotating promotional images
- **Demo Section**: Visual flow of Voice → AI → Network → Device
- **Payment Card**: 0.001 ETH participation fee with wallet integration
- **Voice Input**: 
  - Text input field
  - Voice recording button (ElevenLabs integration ready)
  - AI processing button
- **Activity Table**: History of commands with airdrop rewards and status

#### 3. Univoice Page (`/univoice`)
- **NFT Showcase**: Large preview of NFT collection
- **Purchase Card**: 
  - Quantity selector
  - Price calculator
  - Purchase button with wallet integration
- **Benefits Section**: Four key holder benefits
- **Project Information**: Detailed description of Univoice NFT utility

#### 4. PMug Page (`/pmug`)
- **Presale Stats**: Progress bar, hardcap, raised amount, participants
- **Countdown Timer**: Days, hours, minutes, seconds until end
- **Tabbed Interface**:
  - Presale: Price, min/max contribution, dates
  - About: Product features and description
  - Tokenomics: Token distribution breakdown
- **Contribution Card**: 
  - Amount input with SOL
  - Token calculator
  - Quick amount buttons
- **Features Grid**: Four key product features
- **Contract Verification**: Display verified contract address

#### 5. About AIO (`/about`)
- Full presentation deck with 10 slides:
  1. Cover
  2. Problem Statement
  3. Solution
  4. Architecture
  5. Technology Stack
  6. Tokenomics
  7. Ecosystem
  8. Roadmap
  9. Team
  10. Call to Action
- Slide navigation with previous/next buttons
- Dot navigation indicator

### Components

#### WalletButton (`WalletButton.tsx`)
- **Features**:
  - MetaMask connection for Ethereum
  - Phantom connection for Solana
  - Balance display
  - Connection status indicator
  - Disconnect functionality
- **UI States**:
  - Disconnected: "Connect Wallet" button
  - Connecting: Loading state
  - Connected: Address + balance display
- **Dialog**: Modal for wallet selection and details

#### Navigation
- **Desktop**: Persistent left sidebar
- **Mobile**: Hamburger menu with slide-out drawer
- **Active State**: Highlighted current page with gradient background

## Responsive Design

### Breakpoints
- **Mobile**: < 640px (1 column layouts)
- **Tablet**: 640px - 1024px (2 column layouts)
- **Desktop**: > 1024px (3-4 column layouts)

### Mobile Optimizations
- Collapsible sidebar with overlay
- Stacked cards and sections
- Touch-friendly button sizes (minimum 44x44px)
- Horizontal scrolling for tables
- Condensed navigation
- Hidden secondary information with show/hide toggles

## Wallet Integration

### MetaMask (Ethereum)
```typescript
window.ethereum.request({ method: 'eth_requestAccounts' })
```

### Phantom (Solana)
```typescript
window.solana.connect()
```

### Features
- Auto-detection of installed wallets
- Network switching
- Transaction signing
- Balance queries
- Event listeners for account/network changes

## State Management
- React useState for local component state
- Toast notifications for user feedback
- No external state management (intentionally kept simple)

## API Integration Points (Ready for Implementation)

### 1. Voice Recognition
- **Service**: ElevenLabs API
- **Endpoint**: `/v1/speech-to-text`
- **Location**: `AIOPage.tsx` - `handleVoiceRecord()`

### 2. Blockchain Transactions
- **Payment Processing**: Web3/Ethers.js integration
- **Location**: `AIOPage.tsx` - `handlePayment()`

### 3. NFT Minting
- **Service**: Smart contract interaction
- **Location**: `UnivoicePage.tsx` - `handlePurchase()`

### 4. Presale Contribution
- **Service**: Solana program interaction
- **Location**: `PMugPage.tsx` - `handleContribute()`

## File Structure
```
src/
├── components/
│   ├── MainLayout.tsx          # Main application layout
│   ├── WalletButton.tsx        # Wallet connection component
│   ├── Navigation.tsx          # Slide navigation for About page
│   ├── Logo.tsx               # Logo components
│   ├── LogoWithText.tsx
│   ├── slides/                # Presentation slides
│   │   ├── CoverSlide.tsx
│   │   ├── ProblemSlide.tsx
│   │   └── ... (8 more)
│   └── ui/                    # Shadcn UI components
│       ├── button.tsx
│       ├── dialog.tsx
│       ├── toast.tsx
│       └── ... (30+ more)
├── pages/
│   ├── Dashboard.tsx          # Main landing page
│   ├── AIOPage.tsx           # Voice AI interaction page
│   ├── UnivoicePage.tsx      # NFT marketplace
│   ├── PMugPage.tsx          # Presale page
│   ├── AboutAIO.tsx          # Project deck
│   └── NotFound.tsx          # 404 page
├── hooks/
│   ├── use-mobile.ts         # Mobile detection hook
│   └── use-toast.ts          # Toast notification hook
├── lib/
│   └── utils.ts              # Utility functions
├── App.tsx                   # Root component with routing
├── main.tsx                  # Application entry point
└── index.css                 # Global styles + design system

## Running the Application

### Development
```bash
npm run dev
```
Starts Vite dev server at http://localhost:5173

### Build
```bash
npm run build
```
Builds production-ready files to `/dist`

### Preview
```bash
npm run preview
```
Preview production build locally

### Deploy
```bash
npm run deploy
```
Deploys to GitHub Pages

## Next Steps for Full Implementation

1. **Integrate ElevenLabs API** for voice recognition
2. **Connect Smart Contracts** for NFT minting and presale
3. **Add Real-time Data** from blockchain
4. **Implement User Profiles** with wallet history
5. **Add Analytics** for tracking user interactions
6. **Setup Backend API** for airdrop management
7. **Add Web3Modal** for better wallet connection UX
8. **Implement ENS/SNS** domain name resolution
9. **Add IPFS Integration** for decentralized asset storage
10. **Setup Subgraph** for efficient blockchain queries

## Design Principles

1. **Mobile-First**: All layouts start mobile and scale up
2. **Progressive Enhancement**: Core functionality works without JavaScript
3. **Accessibility**: WCAG AA compliant, keyboard navigation, screen reader support
4. **Performance**: Code splitting, lazy loading, optimized images
5. **Security**: Input validation, XSS protection, secure wallet connections
6. **User Feedback**: Toast notifications, loading states, error handling

## Browser Support
- Chrome/Edge: Latest 2 versions
- Firefox: Latest 2 versions
- Safari: Latest 2 versions
- Mobile Safari: iOS 13+
- Chrome Mobile: Android 8+

## Dependencies

### Core
- React 18.3.1
- React Router DOM 6.26.2
- React Hook Form 7.53.0
- Framer Motion 12.10.5

### UI Components
- Radix UI (30+ components)
- Lucide React (icons)
- Tailwind CSS 3.4.11
- Shadcn UI components

### Build Tools
- Vite 5.4.1
- TypeScript 5.5.3
- ESLint 9.9.0

## License
[Your License Here]

## Contributors
[Your Team Here]
```

