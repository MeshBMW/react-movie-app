export const InfoRow = ({ label, children }) => (
  <div className="flex flex-row gap-0.5 sm:flex-row sm:gap-5">
    <span className="shrink-0 text-sm text-gray-100 w-24">{label}</span>
    <span className="text-sm text-light-100">{children}</span>
  </div>
)