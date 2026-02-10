const Footer = () => {
  return (
    <footer className="border-t border-border/50 py-12 px-6 md:px-12">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-md bg-primary/20 border border-primary/40 flex items-center justify-center">
            <span className="text-primary font-display font-bold text-xs">F</span>
          </div>
          <span className="font-display font-bold text-foreground">
            FIWB <span className="text-primary">AI</span>
          </span>
        </div>
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} FIWB AI. Built by students, for students.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
