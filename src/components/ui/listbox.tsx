// // src/components/ui/listbox.tsx

// import * as React from "react"

// // ListboxTrigger component
// export const ListboxTrigger = ({ children }: { children: React.ReactNode }) => {
//   return <div className="cursor-pointer">{children}</div>
// }

// // ListboxButton component
// export const ListboxButton = ({ children, className }: { children: React.ReactNode; className?: string }) => {
//   return <button className={`py-2 px-4 rounded-lg text-white bg-blue-500 hover:bg-blue-700 ${className}`}>{children}</button>
// }

// // ListboxContent component
// export const ListboxContent = ({ children }: { children: React.ReactNode }) => {
//   return (
//     <div className="absolute bg-white shadow-lg border rounded-lg mt-2 w-48">
//       {children}
//     </div>
//   )
// }

// // ListboxPopover component
// export const ListboxPopover = ({ children }: { children: React.ReactNode }) => {
//   return <div className="absolute">{children}</div>
// }

// // ListboxItem component
// export const ListboxItem = ({
//   children,
//   onClick,
//   value,
// }: {
//   children: React.ReactNode
//   onClick: () => void
//   value: string
// }) => {
//   return (
//     <div
//       onClick={onClick}
//       className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-200 cursor-pointer"
//     >
//       {children}
//     </div>
//   )
// }

// // Listbox component (Parent container)
// export const Listbox = ({ children, value, onChange }: { children: React.ReactNode; value: string; onChange: (value: string) => void }) => {
//   return <div className="relative">{children}</div>
// }
