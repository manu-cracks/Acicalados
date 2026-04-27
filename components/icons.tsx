// Icon primitives — ported from origin, now as a proper React module
import React from 'react'

interface IProps extends React.SVGProps<SVGSVGElement> {
  d?: string
  size?: number
  sw?: number
  fill?: string
  children?: React.ReactNode
}

const I = ({ d, size = 18, sw = 1.5, fill = 'none', children, ...rest }: IProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={fill} stroke="currentColor" strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" {...rest}>
    {d ? <path d={d} /> : children}
  </svg>
)

export const Icon = {
  Menu: (p: IProps) => <I {...p}><line x1="3" y1="7" x2="21" y2="7" /><line x1="3" y1="17" x2="21" y2="17" /></I>,
  X: (p: IProps) => <I {...p}><line x1="5" y1="5" x2="19" y2="19" /><line x1="19" y1="5" x2="5" y2="19" /></I>,
  Cart: (p: IProps) => <I {...p}><path d="M3 5h3l2.4 12.5a2 2 0 0 0 2 1.5h7.5a2 2 0 0 0 2-1.6L21 8H6" /><circle cx="10" cy="22" r="1" /><circle cx="18" cy="22" r="1" /></I>,
  User: (p: IProps) => <I {...p}><circle cx="12" cy="8" r="4" /><path d="M4 22c0-4 4-7 8-7s8 3 8 7" /></I>,
  Search: (p: IProps) => <I {...p}><circle cx="11" cy="11" r="7" /><line x1="21" y1="21" x2="16.5" y2="16.5" /></I>,
  Arrow: (p: IProps) => <I {...p}><line x1="5" y1="12" x2="19" y2="12" /><polyline points="13 6 19 12 13 18" /></I>,
  ArrowLeft: (p: IProps) => <I {...p}><line x1="19" y1="12" x2="5" y2="12" /><polyline points="11 18 5 12 11 6" /></I>,
  Chevron: (p: IProps) => <I {...p}><polyline points="6 9 12 15 18 9" /></I>,
  Plus: (p: IProps) => <I {...p}><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></I>,
  Minus: (p: IProps) => <I {...p}><line x1="5" y1="12" x2="19" y2="12" /></I>,
  Check: (p: IProps) => <I {...p}><polyline points="4 12 10 18 20 6" /></I>,
  Calendar: (p: IProps) => <I {...p}><rect x="3" y="5" width="18" height="16" rx="1" /><line x1="3" y1="10" x2="21" y2="10" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="16" y1="2" x2="16" y2="6" /></I>,
  Clock: (p: IProps) => <I {...p}><circle cx="12" cy="12" r="9" /><polyline points="12 7 12 12 16 14" /></I>,
  Phone: (p: IProps) => <I {...p}><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2 4.1 2 2 0 0 1 4 2h3a2 2 0 0 1 2 1.7c.1.9.3 1.8.6 2.7a2 2 0 0 1-.4 2.1L7.9 9.9a16 16 0 0 0 6 6l1.4-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.5 2.7.6A2 2 0 0 1 22 16.9z" /></I>,
  Mail: (p: IProps) => <I {...p}><rect x="2" y="5" width="20" height="14" rx="1" /><polyline points="2 7 12 14 22 7" /></I>,
  Pin: (p: IProps) => <I {...p}><path d="M12 22s8-7 8-13a8 8 0 1 0-16 0c0 6 8 13 8 13z" /><circle cx="12" cy="9" r="3" /></I>,
  Whatsapp: (p: IProps) => <I {...p}><path d="M20 12a8 8 0 1 1-3.1-6.3L20 4l-1.1 3.5A8 8 0 0 1 20 12z" /><path d="M9 10c.3 1.5 1.5 3 3 3.5 0-.5 0-1 .3-1.3.3-.3.8-.2 1.2 0l.8.4c.3.2.4.5.3.8-.3 1-1.3 1.6-2.3 1.3-1.7-.5-3.2-2-3.7-3.8-.3-1 .3-2 1.3-2.3.3-.1.6 0 .8.3l.4.8c.2.4.3.9 0 1.2-.3.3-.8.3-1.3.3z" /></I>,
  Instagram: (p: IProps) => <I {...p}><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" /></I>,
  Star: (p: IProps) => <I fill="currentColor" sw={0} {...p}><polygon points="12 2 15 9 22 10 17 15 18.5 22 12 18.5 5.5 22 7 15 2 10 9 9 12 2" /></I>,
  Scissors: (p: IProps) => <I {...p}><circle cx="6" cy="6" r="3" /><circle cx="6" cy="18" r="3" /><line x1="20" y1="4" x2="8.12" y2="15.88" /><line x1="14.47" y1="14.48" x2="20" y2="20" /><line x1="8.12" y1="8.12" x2="12" y2="12" /></I>,
  Sparkle: (p: IProps) => <I {...p}><path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5L18 18M18 6l-2.5 2.5M8.5 15.5L6 18" /></I>,
  Hanger: (p: IProps) => <I {...p}><path d="M12 8a2 2 0 1 1 2-2" /><path d="M3 20l9-6 9 6H3z" /></I>,
  Upload: (p: IProps) => <I {...p}><path d="M12 16V4M7 9l5-5 5 5" /><path d="M4 20h16" /></I>,
  Shield: (p: IProps) => <I {...p}><path d="M12 3l8 3v6c0 5-4 8-8 9-4-1-8-4-8-9V6l8-3z" /></I>,
  Cash: (p: IProps) => <I {...p}><rect x="2" y="6" width="20" height="12" rx="1" /><circle cx="12" cy="12" r="3" /></I>,
  Play: (p: IProps) => <I fill="currentColor" sw={0} {...p}><polygon points="6 4 20 12 6 20 6 4" /></I>,
  Ext: (p: IProps) => <I {...p}><path d="M14 4h6v6" /><line x1="20" y1="4" x2="10" y2="14" /><path d="M20 14v6H4V4h6" /></I>,
  Close: (p: IProps) => <I {...p}><line x1="5" y1="5" x2="19" y2="19" /><line x1="19" y1="5" x2="5" y2="19" /></I>,
  Lock: (p: IProps) => <I {...p}><rect x="5" y="11" width="14" height="10" rx="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></I>,
  CreditCard: (p: IProps) => <I {...p}><rect x="2" y="5" width="20" height="14" rx="2" /><line x1="2" y1="10" x2="22" y2="10" /></I>,
  Loader: (p: IProps) => <I {...p}><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" /></I>,
  Trash: (p: IProps) => <I {...p}><polyline points="3 6 5 6 21 6" /><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" /></I>,
}
