export const InfoRow = ({ label, children }) => (
  <div className="flex flex-col gap-0.5 sm:flex-row sm:gap-6">
    <span className="shrink-0 text-sm text-gray-100 sm:w-36">{label}</span>
    <span className="text-sm text-light-100">{children}</span>
  </div>
)