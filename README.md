# Redux Toolkit Query Todo App

A modern Todo application built with React, Redux Toolkit Query (RTK Query), and Tailwind CSS. This project demonstrates two approaches to API state management: using RTK Query directly with `ApiProvider` and integrating RTK Query with a full Redux store using `Provider`.

## Features

- ✅ Create, Read, Update, Delete (CRUD) operations for todos
- ✅ Real-time data fetching and caching with RTK Query
- ✅ Optimistic updates and automatic cache invalidation
- ✅ Loading states and error handling
- ✅ Responsive UI with Tailwind CSS
- ✅ Mock backend using json-server
- ✅ Two API calling approaches demonstrated

## Technologies Used

- **React 19** - UI library
- **Redux Toolkit Query (RTK Query)** - Data fetching and caching
- **Redux Toolkit** - State management
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **json-server** - Mock REST API
- **ESLint** - Code linting

## Project Structure

```
src/
├── App.jsx              # Main component with CRUD operations
├── main.jsx             # App entry point with providers
├── index.css            # Global styles
├── db.json              # Mock data for json-server
└── RTKQuery/
    ├── apiSlice.js      # RTK Query API definitions
    └── store.js         # Redux store configuration
```

## API Calling Approaches

This project demonstrates two ways to handle API calls using RTK Query:

### 1. ApiProvider (Direct RTK Query)

```jsx
import { ApiProvider } from "@reduxjs/toolkit/query/react";
import { api } from "./RTKQuery/apiSlice.js";

createRoot(document.getElementById("root")).render(
  <ApiProvider api={api}>
    <App />
  </ApiProvider>
);
```

### 2. Provider with Redux Store

```jsx
import { Provider } from "react-redux";
import { store } from "./RTKQuery/store.js";

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <App />
  </Provider>
);
```

## Differences Between ApiProvider and Provider Approaches

| Aspect               | ApiProvider               | Provider with Redux Store                        |
| -------------------- | ------------------------- | ------------------------------------------------ |
| **State Management** | RTK Query only            | Full Redux store + RTK Query                     |
| **Global State**     | Limited to API state      | Can manage additional app state                  |
| **Middleware**       | RTK Query middleware only | Default Redux middleware + RTK Query middleware  |
| **Reducers**         | Only RTK Query reducer    | RTK Query reducer + potential custom reducers    |
| **Use Case**         | API-focused apps          | Apps needing global state beyond API             |
| **Setup Complexity** | Simpler                   | More flexible but complex                        |
| **Performance**      | Optimized for API calls   | Same API performance + global state capabilities |

Currently, the app uses the **Provider with Redux Store** approach, which allows for future expansion with additional global state if needed.

## API Endpoints

The app interacts with a mock API (json-server) running on `http://localhost:3000`:

- `GET /todos` - Fetch all todos
- `POST /todos` - Create a new todo
- `PATCH /todos/:id` - Update a todo (toggle completion)
- `DELETE /todos/:id` - Delete a todo

## Data Flow

1. **Fetching Todos**: `useGetTodosQuery()` automatically fetches and caches todos on component mount
2. **Adding Todos**: `useAddTodosMutation()` sends POST request and invalidates cache to refetch
3. **Updating Todos**: `useUpdateTodosMutation()` sends PATCH request and invalidates cache
4. **Deleting Todos**: `useDeleteTodosMutation()` sends DELETE request and invalidates cache

## App Functions and Components

### App.jsx - Main Component

The `App.jsx` component handles all CRUD operations using RTK Query hooks:

#### State Management

- `newTodo`: Local state for input field value

#### RTK Query Hooks

- `useGetTodosQuery()`: Fetches todos data with loading/error states
- `useAddTodosMutation()`: Adds new todo
- `useUpdateTodosMutation()`: Updates todo completion status
- `useDeleteTodosMutation()`: Deletes todo

#### Functions

1. **`handleInput(e)`**

   - Updates `newTodo` state as user types
   - Triggered on input change

2. **`handleSubmit()`**

   - Creates new todo with text and `completed: false`
   - Calls `addTodos` mutation
   - Clears input field
   - Triggered on button click or Enter key

3. **`toggleTodo(id, completed)`**

   - Toggles completion status of a todo
   - Calls `updateTodo` mutation with inverted `completed` value
   - Triggered on ✅/⭕ button click

4. **`removeTodo(id)`**
   - Deletes a todo by ID
   - Calls `deleteTodo` mutation
   - Triggered on ❌ button click

#### UI Components

- **Input Field**: Text input for new todo with Enter key support
- **Add Button**: Green button to submit new todo
- **Todo List**: Displays todos with toggle and delete buttons
- **Loading/Error States**: Conditional rendering for data states

## Installation and Setup

1. **Clone the repository**

   ```bash
   git clone git@github.com:alihamza-12/Redux_ToolKit_Query.git
   cd redux-toolkit-query
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start the mock API server**

   ```bash
   npm run json-server
   ```

   This starts json-server on `http://localhost:3000` serving `src/db.json`

4. **Start the development server**
   ```bash
   npm run dev
   ```
   Open [http://localhost:5173](http://localhost:5173) in your browser

## Available Scripts

- `npm run dev` - Start Vite development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run json-server` - Start mock API server

## RTK Query Configuration

### apiSlice.js

- `baseQuery`: Uses `fetchBaseQuery` with base URL `http://localhost:3000`
- `tagTypes`: Defines "Todos" tag for cache invalidation
- Endpoints: getTodos, addTodos, updateTodos, deleteTodos
- Cache invalidation: Mutations invalidate "Todos" tag to trigger refetch

### store.js

- Configures Redux store with RTK Query reducer
- Adds RTK Query middleware for caching and request handling

## Mock Data

The `db.json` file contains sample todo data:

```json
{
  "todos": [
    {
      "id": "1",
      "text": "Buy groceries",
      "completed": false
    }
  ]
}
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.
