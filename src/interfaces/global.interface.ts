/* ─── Navbar ─────────────────────────────── */
export interface NavbarProps {
  onNavigateToAuth: () => void;
}

/* ─── Reusable input field ─────────────────────────────── */
export interface InputFieldProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'label'> {
  id: string;
  label?: string;
  icon?: React.ReactNode;
  error?: string;
  borderless?: boolean;
}

export interface TextareaFieldProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  id: string;
  label?: string;
  error?: string;
  borderless?: boolean;
}

/* ─── Theme Context ─────────────────────────────── */
export interface ThemeContextType {
  isDark: boolean;
  toggleTheme: () => void;
}

/* ─── Auth Page ─────────────────────────────── */
export interface AuthPageProps {
  onNavigateHome: () => void;
}

/* ─── Home Page ─────────────────────────────── */
export interface HomePageProps {
  onNavigateToAuth: () => void;
}
