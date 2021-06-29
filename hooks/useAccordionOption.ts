export default function useAccordionOption({
  index,
  isOpen,
  onToggle,
  name,
}: {
  index: number
  isOpen: boolean
  onToggle: () => void
  name: string
}) {
  const buttonId = `${name}-${index}-button`
  const contentId = `${name}-${index}-content`

  return {
    buttonProps: {
      id: buttonId,
      "aria-controls": contentId,
      "aria-expanded": isOpen,
      onClick: onToggle,
    },
    contentProps: {
      role: "region",
      id: contentId,
      "aria-labelledby": buttonId,
    },
  }
}
