const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex h-full flex-col items-center justify-center bg-[radial-gradient(ellipse_at_top,_hsl(var(--p300)),_hsl(var(--p50)))] text-white">
      {children}
    </div>
  );
};

export default AuthLayout;