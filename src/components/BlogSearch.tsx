import * as React from "react";
import { Search } from "lucide-react";
import { Input } from "./ui/input";
import { motion } from "motion/react";

interface BlogSearchProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export function BlogSearch({ value, onChange, placeholder = "Search posts..." }: BlogSearchProps) {
  const [debouncedValue, setDebouncedValue] = React.useState(value);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      onChange(debouncedValue);
    }, 300);

    return () => clearTimeout(timer);
  }, [debouncedValue, onChange]);

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative"
    >
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
      <Input
        type="text"
        value={debouncedValue}
        onChange={(e) => setDebouncedValue(e.target.value)}
        placeholder={placeholder}
        className="pl-10 bg-black/50 border-white/10 text-white placeholder:text-gray-500 focus-visible:border-white/30"
      />
    </motion.div>
  );
}
