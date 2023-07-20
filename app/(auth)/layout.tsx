interface layoutProps {
  children: React.ReactNode;
}

export default function layout({ children }: layoutProps) {
  return (
    <div className="flex items-center justify-center h-full">{children}</div>
  );
}
