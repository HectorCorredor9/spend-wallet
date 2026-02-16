/**
 * Sidebar secondary child elements
 *
 * @typeParam color (Optional): boolean
 * @typeParam text: string
 * @typeParam icon: React.ReactNode
 * @typeParam href: string;
 * @typeParam onClick (Optional): () => void;
 */
export interface ItemSecondarySidebarProps {
  color?: boolean;
  text: string;
  icon: React.ReactNode;
  href: string;
  onClick?: () => void;
}

/**
 * Props for the NavbarLower component.
 *
 * @interface NavbarLowerProps
 * @property {function} onCLickDrawer - Function to handle the drawer click event.
 */
export interface NavbarLowerProps {
  onCLickDrawer: () => void;
}

/**
 * Sidebar
 *
 * @typeParam drawerWidth: number
 * @typeParam open: boolean
 * @typeParam onTransitionEnd: () => void
 * @typeParam onClose: () => void
 */
export interface SidebarProps {
  drawerWidth: number;
  open: boolean;
  onTransitionEnd: () => void;
  onClose: () => void;
}
