Frontend Folder Structure:

src/
  components/
  features/
  store/
  styles/

Rules:
- Feature-based structure
- No business logic inside UI components
- Global state only in store
- No cross-feature deep imports
- Reusable components inside components/