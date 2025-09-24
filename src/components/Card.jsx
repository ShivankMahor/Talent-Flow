export default function Card({ children, className = "", variant = "default", hover = false, ...props }) {
  const variants = {
    default: `bg-white border border-gray-200 shadow-sm rounded-lg ${hover ? 'hover:shadow-md hover:-translate-y-0.5 transition-all duration-200' : ''}`,
    elevated: `bg-white shadow-lg rounded-lg ${hover ? 'hover:shadow-xl hover:-translate-y-1 transition-all duration-200' : ''}`,
    outlined: `bg-white border-2 border-gray-200 rounded-lg ${hover ? 'hover:border-gray-300 transition-colors duration-200' : ''}`,
    flat: `bg-gray-50 rounded-lg ${hover ? 'hover:bg-gray-100 transition-colors duration-200' : ''}`,
    inset: `
      bg-gray-200/40 rounded-lg shadow-inner
      ${hover ? "hover:shadow-md transition-all duration-200" : ""}
    `
  };

  return <div {...props} className={`${variants[variant]} p-4 ${className}`}>{children}</div>;
}