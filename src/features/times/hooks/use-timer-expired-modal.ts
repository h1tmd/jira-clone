import { parseAsBoolean, useQueryState } from "nuqs";

export const useTimerExpiredModal = () => {
  const [isOpen, setIsOpen] = useQueryState(
    "timer-expired",
    parseAsBoolean.withDefault(false).withOptions({ clearOnDefault: true }),
  );

  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);

  return {
    isOpen,
    open,
    close,
    setIsOpen,
  };
};
