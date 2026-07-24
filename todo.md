# Graphic Design Hub - Project TODO

## Database & Backend
- [ ] Create submissions table schema (userId, serviceType, customServiceType, description, location, fullName, fileUrls, createdAt)
- [ ] Add database query helpers for submissions (create, getByUserId, getAll)
- [ ] Add tRPC procedures for submissions (create, list, delete)
- [ ] Implement S3 file upload integration with storage helpers

## Design & Styling
- [ ] Define elegant color palette (premium, sophisticated aesthetic)
- [ ] Set up typography with Google Fonts (refined, elegant fonts)
- [ ] Configure Tailwind CSS with custom design tokens
- [ ] Create reusable component library (buttons, cards, forms)

## Navigation & Layout
- [ ] Build static header component with horizontal navigation
- [ ] Implement conditional rendering for "Submit Work" tab (show only when authenticated)
- [ ] Build footer component with contact info and social media links
- [ ] Create layout wrapper for consistent header/footer across pages

## Authentication
- [ ] Test OAuth login flow (Manus OAuth already integrated)
- [ ] Test OAuth logout functionality
- [ ] Verify session persistence and cookie handling
- [ ] Create sign-up/login page UI (if needed beyond default OAuth)

## Landing Page
- [ ] Build hero section with compelling headline and CTA
- [ ] Build services showcase section
- [ ] Build portfolio/showcase section
- [ ] Build about section
- [ ] Build call-to-action section
- [ ] Add smooth scrolling and micro-interactions

## Submit Work Page
- [ ] Create form component with all required fields
- [ ] Implement Full Name input field
- [ ] Implement Location input field
- [ ] Implement Description of Work textarea
- [ ] Build service type dropdown (Logo Design, Branding, Illustration, UI/UX, Print Design, Social Media Graphics, Other)
- [ ] Implement dynamic "Other" field reveal when selected
- [ ] Build file upload component with drag-and-drop
- [ ] Validate file types (PNG, JPEG, SVG, PDF, AI, PSD)
- [ ] Implement S3 upload functionality
- [ ] Add form validation and error handling
- [ ] Add success/error toast notifications
- [ ] Protect route with authentication check

## My Profile Page
- [ ] Display logged-in user's name
- [ ] Display logged-in user's email
- [ ] Build submission history table/list
- [ ] Display user's submitted works with details
- [ ] Add ability to view/delete submissions
- [ ] Protect route with authentication check

## Settings Page
- [ ] Create placeholder settings page
- [ ] Add navigation link to settings
- [ ] Plan future account preferences features

## Testing & Refinement
- [ ] Test OAuth flow end-to-end
- [ ] Test file upload with various file types
- [ ] Test form validation
- [ ] Test responsive design on mobile/tablet
- [ ] Test navigation between pages
- [ ] Verify S3 file storage and retrieval
- [ ] Test user data persistence

## Deployment & GitHub
- [ ] Initialize GitHub repository
- [ ] Push all code to GitHub
- [ ] Create comprehensive project prompt document
- [ ] Create checkpoint before publishing
