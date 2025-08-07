# Secret Friend App

This project is part of the Oracle Next Education and Alura program, specifically for the Programming Logic module. The goal is to provide a modern, user-friendly web application for drawing a "Secret Friend" (Secret Santa) among a list of participants, with a focus on clean code, responsive design, and practical logic skills.

## Features

### 1. Add Friends
- Enter a name in the input field and click "Add" to include a friend in the list.
- Only valid names (letters and spaces) are accepted; empty or invalid entries are ignored.

### 2. Edit Names
- Click the "Edit" button next to a name to modify it directly in the list.
- Press Enter or click "Save" to confirm changes, or "Cancel" to discard.

### 3. Delete Friends
- Click the "Delete" button to remove a friend.
- A custom confirmation tooltip appears to prevent accidental deletions.

### 4. Draw Secret Friend
- After adding at least one name, click "Draw Friend" to randomly select a secret friend from the list.
- The result is displayed in a highlighted area below the button.

### 5. Restart
- After drawing, a "Restart" button appears below the result.
- Clicking it clears the list and resets the app for a new round.

### 6. Responsive Design
- The interface adapts to mobile and desktop screens.
- On small screens, the form becomes vertical and all elements remain accessible and visually appealing.

### 7. Modern UI & Accessibility
- Clean, modern dark theme with custom SVG branding.
- All actions provide visual feedback (tooltips, highlights, button states).
- Keyboard navigation and accessibility are considered throughout.

### 8. Technology Stack
- Vite (vanilla TypeScript template)
- TypeScript for all logic
- Custom CSS for layout and style
- No external UI libraries, for maximum learning and control

## Project Context
This application was developed as part of the Oracle Next Education and Alura program, within the Programming Logic module. It demonstrates practical application of logic, DOM manipulation, and user experience best practices in a real-world scenario.

## How to Run
1. Clone the repository:
   ```bash
   git clone https://github.com/joqbay7/secret-friend.git
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
4. Open the app in your browser at the provided local address.

## License
This project is for educational purposes as part of the Oracle Next Education and Alura curriculum.

---

Feel free to use, modify, and learn from this project!
